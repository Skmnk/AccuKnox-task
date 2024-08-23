import React, { useState } from 'react';
import '../App.css';
import Widget from '../components/Widget';
import SideBar from '../components/SideBar';

import data from '../data.json';



const DashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [visibleWidgets, setVisibleWidgets] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const handleOpenSidebar= () =>{
    setIsSidebarOpen(true);
  }
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  }

  const handleWidgetUpdate = (updatedData) => {
    setVisibleWidgets(updatedData);
  };

  const filteredWidgets = Object.keys(visibleWidgets).reduce((acc, key) => {
    const [categoryIndex, widgetId] = key.split("-");
    const category = data.categories[categoryIndex];
    const widget = category.widgets.find(widget => widget.id === parseInt(widgetId));

    if (widget && widget.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      acc[key] = true;
    }
    return acc;
  }, {});

  const handleRefresh = () => {
    window.location.reload();
  };


  return (
    <div className="dashboard">
        <div className="dashboard--title">
        <h1>CNAPP Dashboard</h1>
        <div className="dashboard--buttons">
          <button className="dashboard-addwidget" onClick={handleOpenSidebar}>Add Widget +</button>
          <button className="dashboard--refresh" onClick={handleRefresh}>Refresh</button>
          <button className="dashboard--settings">Settings</button>
          <select className='dashboard--select'>
            <option className='dashboard--option'>Last 2 days</option>
            <option className='dashboard--option'>Last 1 week</option>
            <option className='dashboard--option'>Last 1 month</option>
          </select>
        </div>
      </div>
      {/*Sidebar Component */}
      <SideBar
       isOpen={isSidebarOpen} 
       onClose={handleCloseSidebar} 
       data={data} 
       onWidgetUpdate={handleWidgetUpdate}
       />
        <Widget visibleWidgets={visibleWidgets} data={data}/>
    </div>
  );
};

export default DashBoard;
