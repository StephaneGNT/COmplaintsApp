const express=require('express');
const app=express();
const bodyParser=require("body-parser"); // required for POST request
app.use(bodyParser.json()); // required for POST request

const cors = require('cors') // cross-origin-resource sharing ; allows HHTP request to a different domain

let corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions))

app.listen(8000,()=>{
    console.log("Server started");
});

// Get all objects at an end point
app.route('api/users').get((req,res)=>{
    res.send({
        //cats:[{name:"Lilly"},{name:"Lucy"}]
    });
});

// Get a specific object at an end point
app.route('api/cats/:name').get((req,res)=>{
    const requestedCatName=req.params['name'];
    res.send({name: requestedCatName});
});

// Create a new object at an end point
app.route("api/cats").post((req,res)=>{
    res.send(201,req.body);
});

// Changing an object at an end point
app.route("api/cats/:name").put((req,res)=>{
    res.send(200, req.body);
});

// Delete an object at an end point
app.route("api/cats/:name").delete((req,res)=>{
    res.sendStatus(204);
})