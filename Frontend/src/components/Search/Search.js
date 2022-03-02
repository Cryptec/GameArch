import { React, useState } from "react";
import List from "./list";

function Search() {
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    return (
        <div className="main">
            <div className="search">
                <input
                    id="outlined-basic"
                    onChange={inputHandler}
                    label="Search"
                />
            </div>
            <List input={inputText} />
        </div>
    );
}

export default Search;