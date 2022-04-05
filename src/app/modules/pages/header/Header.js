import React from "react";
import { Link } from "react-router-dom";
export function Header() {

return(
    <div>
    Header
    <Link to="/logout" >
        Sign Out
    </Link>
    <Link to="/favorites">
    Favorites
    </Link>
    </div>
);

}