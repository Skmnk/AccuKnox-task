import React ,{useState} from "react";
import "../App.css";
import SideBarContent from "./SideBarContent";
const SideBar = ({isOpen, onClose, data,onWidgetUpdate}) => {
    if (!isOpen) return null;

    return (
        <div className="sidebar">
            <div className="sidebar--navbar">
                <p className="sidebar--navtxt">Add Widget</p>
                <button className="sidebar--close" onClick={onClose}>X</button>
            </div>
            <SideBarContent 
            data={data}
            onWidgetUpdate={onWidgetUpdate}
            />
            
        </div>
    );
};

export default SideBar;