import React, { Fragment, useEffect, useState } from "react";
import NavBar from "./NavBar";
import SkeletonLoader from "./SkeletonLoader";

const App = ({ match }) => {
    const [recipeData, setRecipeData] = useState<any>();
    const [displayApp, setDisplayApp] = useState<boolean>(false);

    const ListIngredients = () => {
        const list = recipeData?.recipeIngredient.map((ingredient, index) => (
            <li key={index} className="list-group-item">
                <label>{ingredient}</label>
            </li>
        ));

        return <ul className="list-group">{list}</ul>;
    };

    const ListInstructions = () => {
        const instructions: string[] = [];

        recipeData?.recipeInstructions.forEach((item) => {
            if (item["@type"] === "HowToStep") {
                instructions.push(item.text);
            } else if (item["@type"] === "HowToSection") {
                item.itemListElement.forEach((subItem) => {
                    instructions.push(subItem.text);
                });
            }
        });
        // console.log(instructions);
        const list = instructions.map((step, index) => (
            <li key={index} className="list-group-item">
                {step.replace("&quot;", '"')}
            </li>
        ));

        return <ul className="list-group">{list}</ul>;
    };

    useEffect(() => {
        const getRecipe = async () => {
            console.log("props", match.params.id);
            const recipeID: number = match.params.id;
            try {
                const response = await fetch(`http://localhost:8000/recipes/${recipeID}`);
                const json = await response.json();
                console.log(json.recipe_data);
                setRecipeData(json.recipe_data);
            } catch (error) {
                console.log(error.message);
            }
        };

        getRecipe();
    }, [match]);

    useEffect(() => {
        setTimeout(() => {
            setDisplayApp(true);
        }, 300);
    }, []);

    const RenderPage = () => {
        <SkeletonLoader />;

        return (
            <div className="container-sm">
                <Fragment>
                    <div className="row mt-5">
                        <div className="col-sm">
                            {"Ingredients"}
                            <ListIngredients />
                        </div>
                        <div className="col-sm">
                            {"Instructions"}
                            <ListInstructions />
                        </div>
                    </div>
                </Fragment>
            </div>
        );
    };

    const NavBarProps = { currentPage: "recipe", recipeName: recipeData?.name };

    return (
        <Fragment>
            <NavBar {...NavBarProps} />
            {displayApp ? <RenderPage /> : <SkeletonLoader />}
        </Fragment>
    );
};

export default App;
