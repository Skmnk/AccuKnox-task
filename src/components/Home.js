import React from "react";
import DashBoard from "../pages/DashBoard";
import '../App.css';
export default function Home(){
    return(
        <div className="home--main">
            <a href="/dashboard">
            <button className="home--button">Go to dashboard V2 </button>
            </a>
        </div>
    )
}