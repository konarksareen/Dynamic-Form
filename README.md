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
