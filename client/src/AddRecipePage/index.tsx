import React, { Fragment, useState } from "react";
import NavBar from "../NavBar";
import "./AddRecipePage.css";

interface fetchInterface {
    method: string;
    headers: { [key: string]: string };
    body: string;
}

const AddRecipePage = () => {
    const [url, setUrl] = useState<string>("");
    const [responseStatus, setResponseStatus] = useState<number>();

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body = { url };

            let scrapeProps: fetchInterface = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            };
            const response = await fetch(`http://localhost:8000/scrape`, scrapeProps);
            const newRecipeID = await response.json();

            if (response.status === 404) {
                setResponseStatus(404);
            } else {
                window.location.href = `/recipe/${newRecipeID}`;
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const NavBarProps = { currentPage: "add-recipe" };

    return (
        <Fragment>
            <NavBar {...NavBarProps} />
            <div className="container centered">
                <div className="col">
                    <div className="row">
                        <h1 className="text-center mt-5">Enter a Recipe</h1>
                    </div>
                    <div className="row">
                        <form className="recipe-form d-flex" onSubmit={(e) => onSubmitForm(e)}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter a recipe url"
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <button className="btn btn-primary">Search</button>
                        </form>
                    </div>
                    <div className="row error fst-italic">
                        {responseStatus === 404 ? <p>Could not load recipe </p> : ""}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AddRecipePage;
// onChange={(e) => setLongUrl(e.target.value)}
