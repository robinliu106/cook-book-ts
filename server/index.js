const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
// var HTMLParser = require("node-html-parser");
var $ = require("cheerio");

const app = express();
const pool = require("./db");
const { Console } = require("console");

//middleware
app.use(cors());
app.use(express.json()); //gives us access to request.body

//routes

// create a recipe
app.post("/recipes", async (req, res) => {
    try {
        // console.log(req.body);
        const { data } = req.body;
        console.log("hi", data);
        const newRecipe = await pool.query("INSERT INTO recipes (recipe_data) VALUES ($1) RETURNING *", [data]);

        res.json(newRecipe.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//get all recipes
app.get("/recipes", async (req, res) => {
    try {
        const allRecipes = await pool.query("SELECT * FROM recipes");
        res.json(allRecipes.rows);
    } catch (error) {
        console.log(error.message);
    }
});

//get a recipe
app.get("/recipes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await pool.query("SELECT * FROM recipes WHERE recipe_id=$1", [id]);
        res.json(recipe.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
});

//get the recipe name
app.get("/recipes/:id/name", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT recipe_data->'name' as name from recipes WHERE recipe_id=$1", [id]);
        const { name } = result.rows[0];
        res.json(name);
    } catch (error) {
        console.log(error.message);
    }
});

//scrape a recipe from a url
app.post("/scrape", async (req, res) => {
    try {
        const { url } = req.body;

        const scrapeData = await fetch(url).catch((err) => {
            res.sendStatus(404);
            console.log("there's an error fetching url ", err);
            return;
        });
        const html = await scrapeData.text();

        const parseHTML = $.load(html);
        const getScripts = parseHTML("script").toArray();

        const schemaNode = getScripts.find((script) => script.attribs.type === "application/ld+json");

        const recipeSchema = schemaNode?.children[0]?.data ?? 404;

        let recipeJSON = JSON.parse(recipeSchema);
        // console.log("recipeJSON", recipeJSON);

        if (html === 404 || recipeSchema === 404 || recipeJSON["@graph"] === undefined) {
            res.status(404).send();
            return;
        }

        let recipeData = recipeJSON["@graph"].filter((item) => item["@type"] === "Recipe")[0];
        // console.log("recipeData", recipeData);
        delete recipeData["@context"];
        delete recipeData["@type"];
        delete recipeData["author"];
        delete recipeData["datePublished"];
        // console.log("yolo", recipeData);

        try {
            // console.log("hi", data);
            const newRecipe = await pool.query("INSERT INTO recipes (recipe_data) VALUES ($1) RETURNING recipe_id", [
                JSON.stringify(recipeData),
            ]);

            console.log("added recipe_id: ", newRecipe.rows[0].recipe_id);
            res.json(newRecipe.rows[0].recipe_id);
            // res.json(newRecipe.rows[0]);
        } catch (error) {
            console.log(error.message);
        }

        // res.json("Added a Recipe!");
    } catch (error) {
        console.log(error.message);
    }
});

// //update a todo
// app.put("/todos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { description } = req.body;

//         const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id=$2", [description, id]);
//         res.json("TODO was updated");
//     } catch (error) {
//         console.log(error.message);
//     }
// });

// //delete a todo
// app.delete("/todos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [id]);
//         res.json("TODO was deleted!");
//     } catch (error) {
//         console.log(error.message);
//     }
// });

const port = 8000;
app.listen(port, () => {
    console.log(`server is up on ${port}`);
});
