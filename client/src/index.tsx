import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter } from "react-router-dom";

import App from "./App";
import AddRecipePage from "./AddRecipePage";
import OtherRecipesPage from "./OtherRecipesPage";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/recipe/:id" component={App} />
            <Route path="/add-recipe" component={AddRecipePage} />
            <Route path="/other-recipes" component={OtherRecipesPage} />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
