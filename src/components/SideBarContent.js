import React,  {useState, useEffect} from 'react';
import "../App.css";

const SideBarContent = ({ data, onWidgetUpdate, onClose }) => {
  const [sdata, setData] = useState(data);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [checkedWidgets, setCheckedWidgets] = useState({});
    const [newWidgetCategory, setNewWidgetCategory] = useState(''); 
  const [newWidgetName, setNewWidgetName] = useState('');         
  const [newWidgetMessage, setNewWidgetMessage] = useState('');  

    useEffect(() => {
        // Initialize the checkedWidgets state with all widgets checked
        const initialCheckedWidgets = {};
        data.categories.forEach((category, categoryIndex) => {
          category.widgets.forEach((widget) => {
            initialCheckedWidgets[`${categoryIndex}-${widget.id}`] = true;
          });
        });
        setCheckedWidgets(initialCheckedWidgets);
      }, [data]);
    const handleCategoryClick = (index) => {
        setSelectedCategory(index === selectedCategory ? null : index);
    }
    const handleCheckboxChange = (categoryIndex, widgetId) => {
        setCheckedWidgets((prev) => ({
          ...prev,
          [`${categoryIndex}-${widgetId}`]: !prev[`${categoryIndex}-${widgetId}`]
        }));
      };
      
      const handleAddWidget = () => {
        if (newWidgetCategory !== '' && newWidgetName !== '' && newWidgetMessage !== '') {
          const updatedData = { ...data };
          const categoryIndex = parseInt(newWidgetCategory);
          
          const newWidgetId = updatedData.categories[categoryIndex].widgets.length + 1; // Generate new widget ID
          
          const newWidget = {
            id: newWidgetId,
            name: newWidgetName,
            message: newWidgetMessage
          };
          
          updatedData.categories[categoryIndex].widgets.push(newWidget);
          // console.log(`updated data is ${JSON.stringify(updatedData)}`)
          setData(updatedData);
          // Update the data.json file via the server
          fetch('http://localhost:5000/api/updateData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => response.json())
        .then(data => console.log('Data successfully saved:', data))
        .catch(error => console.error('Error saving data:', error));
          // Clear inputs
          setNewWidgetName('');
          setNewWidgetMessage('');
          setNewWidgetCategory('');
          
          
        }
      };


      const handleConfirm = () => {
        const updatedData = {
            categories: data.categories.map((category, categoryIndex) => {
                return {
                    ...category,
                    widgets: category.widgets.filter((widget) => checkedWidgets[`${categoryIndex}-${widget.id}`])
                };
            }).filter((category) => category.widgets.length > 0)
        };

        fetch('http://localhost:5000/api/updateData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => response.json())
        .then(data => console.log('Data successfully saved:', data))
        .catch(error => console.error('Error saving data:', error));

        onClose(); // Close sidebar or perform other actions
    };
  return (
    <div className="sidebar-content">
      <nav className="sidebar-nav">
        {data.categories.map((category, index) => (
          <div key={index}>
            <button
              className="sidebar-nav-item"
              onClick={() => handleCategoryClick(index)}
            >
              {category.name}
            </button>
            {selectedCategory === index && (
              <div className="sidebar-widgets">
                {category.widgets.map((widget) => (
                  <div key={widget.id} className="sidebar-widget-item">
                    <label>
                    <input
                        type="checkbox"
                        
                        checked={!!checkedWidgets[`${index}-${widget.id}`]}
                        onChange={() => handleCheckboxChange(index, widget.id)}
                      />
                      {widget.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          
        ))}
        
      </nav>
      <br />
      <div className='addnew-widget'>
      <select className='select-category'
          value={newWidgetCategory}
          onChange={(e) => setNewWidgetCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {data.categories.map((category, index) => (
            <option key={index} value={index}>
              {category.name}
            </option>
          ))}
        </select>
        {newWidgetCategory !== '' && (
          <>
            <input
              className="newwidget-name"
              type="text"
              placeholder="Enter Widget Name"
              value={newWidgetName}
              onChange={(e) => setNewWidgetName(e.target.value)}
            />
            <br />
            <input
              className="newwidget-message"
              type="text"
              placeholder="Enter Widget Message"
              value={newWidgetMessage}
              onChange={(e) => setNewWidgetMessage(e.target.value)}
            />
            <br />
            <a href="/dashboard">
            <button onClick={handleAddWidget} className='newwidget-addbutton'>Add Widget</button>
            </a>
          </>
        )}

      </div>
      <br />
      <br />
       <footer className="sidebar--footer">
       <a href="/dashboard">
                <button className="cancel" onClick={onClose}>
                    Cancel
                </button>
                </a>
        <a href="/dashboard">
        <button className="confirm" onClick={handleConfirm}>
                    Confirm
                </button>
        </a>        
            </footer>
    </div>
  );
};

export default SideBarContent;