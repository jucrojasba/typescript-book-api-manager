# Project Documentation

## Overview

This project was initialized using `npm create vite@latest` with Vanilla JavaScript and TypeScript. It is a web application built with an MVC architecture, providing robust authentication and user management features.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jucrojasba/typescript-book-api-manager.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
The console will generate a link. Click on this link to open the web application in your browser.
   
## Features

The application includes the following features:

### Authentication

- **Login/Register:** Secure user authentication for both registration and login.
- **Session Persistence:** Session persistence through tokens to keep users logged in.
- **Role-Based Access Control:** Protect routes based on user roles (user, admin).

### User Interface

- **Home View:** A welcoming home page.
- **Dynamic Menu:** Menu items displayed based on the user’s role.

### User Management

- **User Administration:** Admin users can view and manage user roles (user or admin).

### Book Management

- **CRUD Operations:** Full Create, Read, Update, and Delete functionality for book management.

### Security

- **Encryption:** User information is encrypted and stored in local storage.
- **Protected Routes:** Only authorized users can access certain routes.

### Technical Details

- **MVC Architecture:** Ensures a clean separation of concerns.
- **Router Implementation:** Routes are protected and managed through a router.
- **Guard Services:** Services that guard routes and ensure security.

##Environment Variables

Credentials and other sensitive information are stored in the .env file. Ensure this file is configured correctly to

