import React, { Fragment, useState, useEffect } from "react";
import RecipeCard from "../Card";
import NavBar from "../NavBar";

const OtherRecipesPage = () => {
    const [recipes, setRecipes] = useState([]);

    const getRecipes = async () => {
        // console.log("props", match.params.id);
        // const recipeID = match.params.id;
        try {
            const response = await fetch(`http://localhost:8000/recipes`);
            const json = await response.json();
            // console.log(json);
            const temp = json.map((item) => {
                let imageUrl = item.recipe_data.image[0] ? item.recipe_data.image[0] : "No Image";
                return { id: item.recipe_id, name: item.recipe_data.name, imageUrl };
            });

            console.log("temp", temp);
            setRecipes(temp);
            // setRecipeData(json.recipe_data);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getRecipes();
    }, []);

    const NavBarProps = { currentPage: "other-recipes" };
    return (
        <Fragment>
            <NavBar {...NavBarProps} />
            <div className="container-md mt-5">
                <div className="row row-cols-5">
                    {recipes.map((recipe, index) => (
                        <RecipeCard key={index} {...recipe} />
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

export default OtherRecipesPage;
