import React, { Fragment } from "react";
import "./NavBar.css";

const NavBar = ({ currentPage, recipeName = "Default Recipe" }) => {
    console.log("navbar", currentPage);

    const renderTabs = () => {};

    return (
        <Fragment>
            <ul className="nav nav-tabs">
                {currentPage == "recipe" ? (
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page">
                            {recipeName}
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {currentPage == "add-recipe" || currentPage == "recipe" ? (
                    <li className="nav-item">
                        <a className="nav-link" href="/other-recipes">
                            Other Recipes
                        </a>
                    </li>
                ) : (
                    ""
                )}
                {currentPage == "other-recipes" ? (
                    <li className="nav-item">
                        <a className="nav-link" href="/add-recipe">
                            Add Recipe
                        </a>
                    </li>
                ) : (
                    ""
                )}
            </ul>
        </Fragment>
    );
};

export default NavBar;
