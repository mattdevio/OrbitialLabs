Public Square
========

[![See our progress on trello](https://img.shields.io/badge/tasks-trello-orange.svg)](https://trello.com/b/wnHuGpf1/project-and-portfolio-6)
![MERN Stack](https://img.shields.io/badge/stack-MERN-green.svg)
![Fullsail Class - WD6](https://img.shields.io/badge/class-WD6-blue.svg)
![MongoDB Version 3.2](https://img.shields.io/badge/mongo-v3.2-red.svg)
[![Get Redux Dev Tools!](https://img.shields.io/badge/redux-v4.0.0-yellow.svg)](https://github.com/zalmoxisus/redux-devtools-extension)

Public Square is a messenger application built by Orbital Labs; a small group of students @ Full Sail University.

___

### Up And Running

**ALERT: This project requires Node.js v8.11.3 (alias lts/carbon) or higher!**<br>

**Setup Mongodb**<br>
You are going to need MongoDB to get this application running. Here are some installation instructions for OSX.

```
which mongod                // If this spits out a path, you already have mongo installed
which brew                  // If this doesn't spit out a path, install homebrew -> https://brew.sh/
brew update                 // Update homebrew packages
brew install mongodb@3.2    // Install Mongodb
```

Getting the project setup in your local enviornment is simple. Here are some commands to help you get started.

```
# Start by cloning the repo to your local machine
git clone https://github.com/mattgreenberg/OrbitialLabs.git
cd OrbitialLabs

# Install all the required dependencies
npm install

# Start MongoDB
npm run mongo:start

# Start the application
npm start

# Stop Mongo
npm run mongo:stop
```

_Please Note: This project uses **ES-LINT** to help maintain coding standards. Please install your editor's **ES-LINT** plugin for inline linting feedback._

### Docker

Project was Dockerized for easy stand up / tear down. All you need is [Docker CE](https://www.docker.com/get-started).

```
// Start Project
$ docker-compose up

// Stop Project
$ docker-compose down
```

<h2 align="center">Maintainers</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://github.com/mattdevio.png?v=3&s=150">
        </br>
        <a href="https://github.com/mattdevio">Matt Greenberg</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://github.com/Codemax999.png?v=3&s=150">
        </br>
        <a href="https://github.com/Codemax999">Cody Maxwell</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://github.com/wsf235.png?v=3&s=150">
        </br>
        <a href="https://github.com/wsf235">William Fenner</a>
      </td>
    </tr>
  <tbody>
</table>
