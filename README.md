# AccuKnox Task

## Important Note

Kindly find the video demo link attached in this file, and check `package.json` for the necessary requirements

[Click me for Video demo](https://drive.google.com/file/d/1FRNoRb5zBIP62kp2-5kNVOI-ZjLrhX--/view?usp=sharing)

## Incase If git clone doesn't works

[click me to download the zip file of the project](https://drive.google.com/file/d/1rli-Ooi2E-zHVX5rKIWN_n3tIe62r953/view?usp=sharing)

And continue the step 2

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Skmnk/AccuKnox-task.git
   ```
2. **Navigate to the project directory:**

   ```bash
   cd accu-knox
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

   This will start the app on `http://localhost:3000`.

5. **Find backend server:**
   After running the react app find the `server.js` file inside the src folder to run the backend server for adding and removing widget.

6. **Running backend server:**
   Open a new terminal and move into src file to run server.

```bash
cd src

node server.js
```

this will run backend for adding and removing widgets.

7. **check dependencies:**
   Kindly check the package.json for required dependencies.

## JSON File Example

Here's an example structure of the `data.json` file:

```json
{
  "categories": [
    {
      "name": "CSPM Executive Dashboard",
      "widgets": [
        {
          "id": 1,
          "name": "Cloud Accounts",
          "message": "1st widget of CSPM"
        },
        {
          "id": 2,
          "name": "Cloud Account Risk Assessment",
          "message": "2nd widget of CSPM"
        }
      ]
    },
    {
      "name": "CWPP Dashboard",
      "widgets": [
        {
          "id": 1,
          "name": "Top 5 Namespace Specific Alerts",
          "message": "1st widget of CWPP"
        },
        {
          "id": 2,
          "name": "Workload Alerts",
          "message": "2nd widget of CWPP"
        }
      ]
    },
    {
      "name": "Registry Scan",
      "widgets": [
        {
          "id": 1,
          "name": "Image Risk Assessment",
          "message": "1st widget of Registry Scan"
        },
        {
          "id": 2,
          "name": "Image Security Issue",
          "message": "2nd widget of Registry Scan"
        }
      ]
    }
  ]
}
```

This json file will be automatically updated while user add and remove the widgets.
