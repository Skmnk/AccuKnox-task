// server.js or app.js

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;


app.use(express.json());
const cors = require('cors');
app.use(cors());
app.post('/api/updateData', (req, res) => {
    const updatedData = req.body;
    
    // Validate data if needed
    if (!updatedData || !updatedData.categories) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(updatedData, null, 2), (err) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).json({ error: 'Failed to save data' });
        }

        res.status(200).json({ message: 'Data successfully saved' });
    });
});

app.get('/api/widgets', (req, res) => {
    // Define the path to your data.json file
    const dataFilePath = path.join(__dirname, 'data.json');
    
    // Read the data.json file
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading data file');
        return;
      }
      
      // Send the contents of the JSON file
      res.json(JSON.parse(data));
    });
  });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});