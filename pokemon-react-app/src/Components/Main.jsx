import React from "react";
import Card from "./Card";
import Pokeinfo from "./Pokeinfo";

const Main = () => {
    return (
        <div className="container">
            {/* Left side pokemon list */}
            <div className="left-content">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
            {/* Right side pokemon detail */}
            <div className="right-content">
                <Pokeinfo />
            </div>
        </div>
    )
}
export default Main;