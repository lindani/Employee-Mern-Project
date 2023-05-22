# Employee-Mern-Project

This is a MERN (MongoDB, Express.js, React, Node.js) application that provides Clients the ability to capture their employees details and manipulate accordingly.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)

## Installation

To run this application locally, you need to have the following installed:

- [Node.js](https://nodejs.org/en)
- MongoDB
- [Yarn](https://yarnpkg.com/) or [NPM](https://www.npmjs.com/)

Please follow these steps to get the application up and running:

1. Clone this [repository](https://github.com/lindani/employee-mern-project) to your local machine.
2. In the root directory, navigate to the client and server directory and install the client and server dependencies by running:

```
yarn install
```

3. Then concurrently run Node.js and React development servers by running.

```
yarn start
```

4. Open your web browser and visit http://localhost:3000 to access the application.

## Usage

1. Signup as a new user then sign in to the application.
2. Create a new employee by clicking ADD EMPLOYEE.
3. After adding employees information, you can Delete or Update the employee.
4. If you have more that five added employes, the sixth one will be on the next page so you can paginate them.
5. You can sign out by clicking the avatar on top right corner of the app and then click the log out button.

## Features

- CRUD support for Employee data.
- Authentication & Authorization.
- Paginated results.

## Technologies Used

- MongoDB: Non-sql database to store employee and user information due to flexible document schema.
- Express.js: Is a backend JavaScript framework to create used Restful API.
- React: Is a frontend JavaScript framework used to provide interactivity to the layout of a UI.
- Node.js: Is lightweight runtime used to offer both client-side and server-side in JavaScript.

## Contributing

Contributions to this project are welcome. If you find any issues or have any ideas for improvements, feel free to submit a pull request.

## Demo

[Emplo-App](https://emplo-app.netlify.app/)
