 In the app.use() method, it will catch all HTTP requests, regardless of the HTTP method (GET, POST, PUT, etc.), as long as the URL matches. However, if you use {app.post(),app.get(),app.put()...more}, it will only match requests with the HTTP POST ,GET,PUT... method.

 In this example b is optional /ac and also work for /abc

 app.post("/ab?c", (req, res) => { console.log(req.body); console.log("data is sucessful saved in database"); res.send("sldkjkasd;sad dmaskndlksandlaksndkasndsandksandsadksadas"); });

 In this example url start with ab and end with c you can write between anything

 app.post("/ab\*c", (req, res) => { console.log(req.body); console.log("data is sucessful saved in database"); res.send("sldkjkasd;sad dmaskndlksandlaksndkasndsandksandsadksadas"); });

 Episode-01 | Microservices vs Monolith - How to Build a Project Understand the differences between microservices and monolithic architectures, and learn which approach suits different projects.

 Episode-02 | Features, HLD, LLD & Planning

 Understand how to define features, and create high-level (HLD) and low-level designs (LLD) for your project with proper planning.

 Episode-03 | Creating our Express Server

 Learn to set up an Express.js server from scratch, the backbone of your NodeJS application.

 Episode-04 | Routing and Request Handlers

 Understand how to create routes and request handlers in Express to manage your application's incoming traffic.

 Episode-05 | Middlewares & Error Handlers

 Explore how to use middlewares and error handling in Express to manage requests and ensure a smooth user experience.

 Episode-06 | Database, Schema & Models | Mongoose

 Learn how to define database schemas and create models using Mongoose to interact with MongoDB efficiently.

 Episode-07 | Diving into the APIs

 Learn how to build and interact with APIs in your NodeJS project, enabling communication between the server and clients.

 Episode-08 | Data Sanitization & Schema Validations

 Ensure your application’s security by implementing data sanitization and validation for both schemas and APIs.

 Episode-09 | Encrypting Passwords

 Understand how to securely store passwords using encryption techniques to protect user data.

 Episode-10 | Authentication, JWT & Cookies

 Master authentication with JWTs and cookies to manage user sessions and secure access to your application.

 Episode-11 | Diving into the APIs and express Router

 Learn how to manage and structure your API routes effectively using the Express Router.

 Episode-12 | Logical DB Query & Compound Indexes

 Learn how to write efficient logical queries and use compound indexes in MongoDB to optimize database performance.

 Episode-13 | ref, Populate & Thought process of writing APIs

 Learn how to use Mongoose ref and populate to manage relationships between MongoDB collections, along with the thought process behind writing efficient APIs.

 Episode-14 |Building Feed API & Pagination

 Learn how to build a feed API and implement pagination for efficient data loading in your NodeJS application -->
