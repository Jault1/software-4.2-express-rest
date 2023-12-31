const express = require("express");
const app = express();

const port = 3000;
app.use(express.json());

//Data
const fruits = [
  {
    id: 1,
    name: "banana",
  },
  {
    id: 2,
    name: "mango",
  },
];

//Basic Routes
app.get("/", (req, res) => {
  res.send(
    "<h1>Hello World!</h1><h3>Implement the DELETE /fruits/:id endpoint in index.js</br>Hint: use the splice method to remove entries from an array</h3>"
  );
});

app.post("/login", (req, res) => {
  res.send("POST request at /login");
});

app.put("/cart", (req, res) => {
  res.send("PUT request at /cart");
});

app.delete("/cart", (req, res) => {
  res.send("DELETE request at /cart");
});

//Route Paramters
app.get("/items/:id", (req, res) => {
  res.json(req.params);
});

//Request Body
app.post("/register", (req, res) => {
  res.json(req.body);
});

//REST routes

//GET /fruits
app.get("/fruits", (req, res) => {
  res.json(fruits);
});

//GET /fruits/:id
app.get("/fruits/:id", (req, res) => {
  for (let fruit of fruits) {
    console.log(req.params.id);
    if (fruit.id == req.params.id) {
      res.status(200);
      return res.send(fruit);
    }
  }
  res.status(404);
  res.send("Fruit not found");
});

//POST /fruits
app.post("/fruits", function (req, res) {
  if (fruits.length > 0 && fruits.some((f) => f.name === req.body.name)) {
    res.status(409);
    return res.send("Fruit already exists");
  }
  let index = fruits[fruits.length - 1].id + 1;
  const newFruit = {
    id: index,
    name: req.body.name,
  };
  fruits.push(newFruit);
  res.json(newFruit);
});

//PUT /fruits/:id
app.put("/fruits/:id", function (req, res) {
  for (let fruit of fruits) {
    if (fruit.id == req.params.id) {
      fruit.name = req.body.name;
      res.status(200);
      return res.send("Update successful");
    }
  }
  res.status(404);
  res.send("Fruit not found");
});

//Assignment - Implement the delete endpoint
//End code here.
app.delete("/fruits/:id", function (req, res) {
  // This will delete the fruit found at THIS ID (not array index). Need to find the index of the item first.
  console.log("Request param ID: " + req.params.id);

  // Make sure an fruit ID was sent
  if (req.params.id !== undefined) {

    // Find the array index for this 'fruit ID'
    var findex = fruits.findIndex((f) => f.id == req.params.id);
    // console.log("findex: " + findex);

    // If it found the index for the passed ID, then delete it
    if (findex != -1) {
      // do this
      fruits.splice(findex, 1);
      res.status(200);
      return res.send("Delete successful");
    }

    // If it didn't find the index for the passed ID, then send error message
    res.status(404);
    res.send("Fruit not found");
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
