Dynamic Form Renderer (React + MUI)

This project is a dynamic form builder built using React and Material UI (MUI).
It accepts a JSON schema, generates a fully functional form at runtime, applies validations, and displays submitted data in a structured JSON format.

Overview

The component is designed to be reusable and schema-driven.
By changing the input JSON schema, you can create completely different forms without modifying any code.

Features

Dynamic form generation from a JSON schema

Field types supported:

    Text input
    
    Multiline text area
    
    Date picker
    
    Dropdown (single select and multi-select)
    
    Checkbox

Validation rules:

    Required fields
    
    Regex pattern validation
    
    Conditional rendering (fields shown/hidden based on other field values)

Field attributes: readonly, disabled, hidden

Configuration-driven placeholders and error messages

Handles invalid or unsupported JSON gracefully

Uses MUI for consistent and responsive UI



Steps to Run

Clone the repository

    git clone https://github.com/konarksareen/Dynamic-Form.git
    cd Dynamic-Form


Install dependencies

    npm install


Start the development server

    npm start


Open the app in your browser at

    http://localhost:3000


Testing

This project includes a small test suite built with Jest and React Testing Library.
The goal of these tests is to make sure the dynamic form behaves correctly across different scenarios: rendering fields from JSON, handling validation, and reacting to conditional logic.

What’s covered

    Dynamic rendering of form fields from schema
    
    Required and pattern-based validations
    
    Conditional fields using the condition.dependsOn rule
    
    Dropdowns, multi-selects, and text areas
    
    Form submission and output rendering

How to run the tests

In the project root, run:

    npm test


This will start Jest in watch mode so you can see test results as you make changes.

How to add more tests

    All tests live under src/Tests/.
    You can add new files there 
