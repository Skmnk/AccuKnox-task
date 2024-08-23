import React,{ useState } from 'react';
import '../App.css';
import SideBar from './SideBar';
import Dashboard from '../pages/DashBoard';
import data from '../data.json'

const Widget = ({visibleWidgets,data}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleOpenSidebar= () =>{
    setIsSidebarOpen(true);
  }
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  }

  

  

  return (
    <div>

      {data.categories.map((category, index) => (
        <div key={index} className="category-row">
          <h2>{category.name}</h2>
          <div className="widgets-row">
            {category.widgets.map(widget => (
              <div key={widget.id} className="widget">
                <h3>{widget.name}</h3>
                <p>{widget.message}</p>

              </div>
              // visibleWidgets[`${index}-${widget.id}`] && (
              //   <div key={widget.id} className="widget">
              //     <h3>{widget.name}</h3>
              //   </div>
              // )
            ))}
            <div className="widget">
                <button className='button-add' onClick={handleOpenSidebar} data={data}>+ Add Widget</button>
              </div>
          </div>
        </div>
      ))}

      <SideBar isOpen={isSidebarOpen} onClose={handleCloseSidebar} data={data} />

      
    </div>
  );
};

export default Widget;