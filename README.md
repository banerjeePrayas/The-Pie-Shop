# The-Pie-Shop

> eCommerce and Blogging platform built with the MERN stack & Redux along with Exquisite Admin Panel.

### Check Project [Here](https://the-pie-shop.herokuapp.com/)

![screenshot](https://ibb.co/44DFzHP)

### ES Modules in Node

I have used ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = Your paypal client id
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

## License

The MIT License

Copyright (c) 2021 Prayas Banerjee https://www.linkedin.com/in/prayas-banerjee/

PERMISSION IS GRANTED TO USE MY SOFTWARE BUT YOU SHOULD NOT EDIT OR CHANGE THE FOOTER
SECTION OF THE SOFTWARE. THE SOFTWARE NAME SHOULD BE SAME.
