const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const users = [
  {
    email: "hardik@gmail.com",
    password: "123",
    name: "hardik",
  },
  {
    email: "hardik1@gmail.com",
    password: "123",
    name: "hardikry",
  },
  {
    email: "hardik2@gmail.com",
    password: "123",
    name: "hardikrq",
  },
  {
    email: "hardik3@gmail.com",
    password: "123",
    name: "hardikre",
  },
  {
    email: "hardik4@gmail.com",
    password: "123",
    name: "hardikrw",
  },
  {
    email: "hardik5@gmail.com",
    password: "123",
    name: "hardikrt",
  },
  {
    email: "hardik@gmail.com",
    password: "123",
    name: "hardikru",
  },
];
const secretKey = "s3cretk3y";

const createJWT = (email) => {
  const token = jwt.sign({ email }, secretKey);
  return token;
};

const userAuthentication = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  jwt.verify(token, secretKey, (err, email) => {
    if (err) {
      return res.status(403).json({ message: "User authentication failed" });
    }
    req.email = email.email;
    next();
  });
};

app.get("/getUser", userAuthentication, (req, res) => {
  const user = users.find((user) => user.email === req.email);
  res.status(200).json({ username: user.name, email: user.email });
});

app.get("/validate", (req, res) => {
  const { username } = req.query;
  const token = req.headers.authorization;
  jwt.verify(token, secretKey, (err, email) => {
    if (err) {
      return res.send(false);
    }
    const user = users.find((user) => user.email === email.email);
    if (user) {
      user.name === username ? res.send(true) : res.send(false);
    }
  });
});

app.get("/userSearch",userAuthentication,(req,res)=>{
  const {toSearch} = req.query;
  const user = users.filter(user=>user.name.startsWith(toSearch));
  if(user.length!==0){
    res.status(200).json({user});
  }
  res.status(404).json({message:"user not found"});
});

app.patch("/updateUsername", userAuthentication, (req, res) => {
  const { name } = req.body;
  const user = users.find((user) => user.email === req.email);
  user.name = name;
  res.json({ message: "updated succesfully" });
});
app.post("/signup", (req, res) => {
  const { username:name, email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (!user) {
    users.push({ name, email, password });
    res.status(200).json({ message: "user created" });
  }
  res.status(400).json({ message: "user already exist" });
});
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    const token = createJWT(email);
    res.status(200).json({ token, name: user.name });
  }
  res.status(404).json({ message: "user not found" });
});

app.listen(3000, () => {
  console.log("server started");
});
