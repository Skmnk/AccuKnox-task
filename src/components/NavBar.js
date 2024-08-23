// import React,{ useState, useEffect } from "react";
// import Home from "./Home";
// import {Link, useLocation} from "react-router-dom";
// import "../App.css"
// export default function NavBar(){
//   const [searchQuery, setSearchQuery] = useState('');
//     const [widgets, setWidgets] = useState([]);
//     const [loading, setLoading] = useState(true); // New state to track loading

//     const location = useLocation();
//     const pathnames = location.pathname.split("/").filter((x) =>x);
//     const showSearchBar = location.pathname.includes("/dashboard"); // Adjust condition as needed

//     useEffect(() => {
//       // Example fetch; replace with your data source
//       fetch('http://localhost:5000/api/widgets') 
//           .then(response => response.json())
//           .then(data => {
//             setWidgets(data.widgets);
//             setLoading(false); // Set loading to false once data is fetched
//         })
//         .catch(error => {
//           console.error('Error fetching widgets:', error);
//           setLoading(false); // Handle errors by setting loading to false
//       }); }, []);


//   const filteredWidgets = widgets.filter(widget =>
//     widget.name.toLowerCase().includes(searchQuery.toLowerCase())
// );
//     return (
//         <div className="nav">
//       <nav className="navbar-content">
//         <ul className="breadcrumb">
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           {pathnames.map((value, index) => {
//             const to = `/${pathnames.slice(0, index + 1).join("/")}`;
//             return (
//               <li key={to}>
//                 <Link to={to}>{value.charAt(0).toUpperCase() + value.slice(1)}</Link>
//               </li>
//             );
//           })}
//         </ul>
//         {showSearchBar && (
//           <div className="search-container">
//           <input
//             type="text"
//             placeholder="Search anything"
//             className="search-input"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <div className="search-results">
//                             {loading ? (
//                                 <p>Loading widgets...</p> // Display loading message
//                             ) : filteredWidgets.length > 0 ? (
//                                 <ul>
//                                     {filteredWidgets.map((widget) => (
//                                         <li key={widget.id}>{widget.name}</li>
//                                     ))}
//                                 </ul>
//                             ) : (
//                                 <p>No widgets found</p>
//                             )}
//                         </div>
         
//         </div>
//         )}
//       </nav>
//     </div>
//     )
// }


import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const showSearchBar = location.pathname.includes("/dashboard");

  useEffect(() => {
    fetch('http://localhost:5000/api/widgets')
      .then(response => response.json())
      .then(data => {
        // Extract widgets from the categories
        if (data && data.categories) {
          const allWidgets = data.categories.flatMap(category => category.widgets);
          setWidgets(allWidgets);
        } else {
          console.error('Unexpected data format:', data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching widgets:', error);
        setLoading(false);
      });
  }, []);

  const filteredWidgets = (widgets || []).filter(widget =>
    widget.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="nav">
      <nav className="navbar-content">
        <ul className="breadcrumb">
          <li>
            <Link to="/">Home</Link>
          </li>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            return (
              <li key={to}>
                <Link to={to}>{value.charAt(0).toUpperCase() + value.slice(1)}</Link>
              </li>
            );
          })}
        </ul>
        {showSearchBar && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Search anything"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <br />
            {searchQuery && (
              <div className="search-results">
                {loading ? (
                  <p>Loading widgets...</p>
                ) : filteredWidgets.length > 0 ? (
                  
                  <ul>
                    {filteredWidgets.map((widget) => (
                      <li key={widget.id}>{widget.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No widgets found</p>
                )}
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
