# UsersAPI

UsersAPI is a RESTful API designed for user management, including features such as user registration, login functionalities, and authentication via JSON Web Tokens (JWT). This project emphasizes security and efficient data handling, making it an ideal starting point for applications requiring user management capabilities.

## Getting Started

### Prerequisites

To clone and run this application, you'll need Git installed on your computer. For Git installation instructions, visit [Git's official site](https://git-scm.com/downloads).

### Clone the Repository

Execute the following command to clone the repository:

```bash
git clone https://github.com/matheusPavaneli/usersAPI.git
```

Then, navigate to the project directory:

```bash
cd usersAPI
```

### Setting Up Environment Variables

Set up the required environment variables by creating a `.env` file in the root directory and specifying the following:

```env
PORT=YOUR_PORT
DATABASE_URL=YOUR_DATABASE_URL
ORIGIN_URL=YOUR_ORIGIN_URL
SECRET_KEY=YOUR_SECRET_KEY
```

### Installing Dependencies

Install the necessary project dependencies by running:

```bash
npm install
```

### Running the Application

Launch the application with the following command:

```bash
npm run dev
```

## Features

- **CRUD Operations for Users:** Supports the creation, reading, updating, and deletion of user records.
- **Authentication System:** Facilitates user registration and login processes.
- **Field Validation:** Ensures all necessary fields are present and validates user uniqueness.
- **Security Measures:** Utilizes JSON Web Tokens for secure API access and bcrypt for password hashing.

## Technologies Used

- **Bcrypt:** For hashing and securely storing passwords.
- **Cookie-parser:** Manages cookies for storing user sessions.
- **Cors:** Allows for secure cross-origin requests.
- **Express:** A fast, unopinionated web framework for Node.js.
- **Helmet:** Provides security by setting various HTTP headers.
- **JSON Web Token (JWT):** Enables secure information exchange.
- **Mongoose:** Serves as an ODM for MongoDB, facilitating data modeling.
- **ts-node:** Enables direct execution of TypeScript files in Node.js.

## Final Observations

UsersAPI is designed to streamline the development of user management features within applications, focusing on security, efficiency, and ease of use. Whether you're building a new project from scratch or integrating user management into an existing system, UsersAPI provides a solid foundation for your needs.