# chat_wave

Welcome to the Chat Application, a React-based application that allows users to chat with other registered users of the application.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Table of Contents

[Libraries Used](#libraries-used)
[Folder Structure](#folder-structure)
[Design Patterns](#design-patterns)

### Libraries Used {#libraries-used}

The Chat Application utilizes several libraries to enhance its functionality and user experience:

Firebase: used for database management, including real-time data synchronization and user authentication.

Material UI: used for building the application's user interface, providing a clean and modern design.

React Router DOM: used for handling client-side routing, allowing for seamless navigation between different parts of the application.

React Hook Form: employed for efficient form management.

Yup: used for managing form validation schemas, ensuring data integrity and accuracy.

### Folder Structure {#folder-structure}

The project's folder structure is organized by file type and functionality to maintain a clean and maintainable codebase. Here's an overview of the main folders:

components

hooks

utils

### Design Patterns {#design-patterns}

1. Compound Pattern (Chat Page)
   The application employs the compound pattern on the Chat page. It uses the Context API to retrieve chat user data.

2. Hooks Pattern
   The application follows the hooks pattern extensively. Functional components and React hooks are used to manage component state, side effects, and global state, leading to a more modular and readable codebase.

Thank you for using the Chat Application. Happy chatting!
