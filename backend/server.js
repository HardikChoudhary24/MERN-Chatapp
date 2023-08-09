const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const { Socket } = require("dgram");
const httpServer = createServer(app);
const { v4: uuid } = require("uuid");

app.use(cors());
app.use(bodyParser.json());
const users = [
  {
    email: "hardik@gmail.com",
    password: "123",
    name: "hardik",
    userId: "shho23bsayofyaofudoa",
  },
  {
    email: "test@test.com",
    password: "123",
    name: "test",
    userId: "dfafdsafdfdfds",
  },
  {
    email: "user@user.com",
    password: "123",
    name: "user",
    userId: "sfsfdhho23bsfafdfsdfdssfssf",
  },
];
const chat = [
  {
    chatId: "232ihr2ir2bi",
    chatBtw: [],
    latestmsg: "",
    bothInvolved: false,
  },
];
// const allmessages = [
//   {
//     chatId: "232ihr2ir2bi",
//     messages: [
//       {
//         sender: "shho23bssfssf",
//         content: "helloji",
//         time: "12:59 pm",
//       },
//     ],
//   },
// ];
const allMessages = {
  chatId: "232ihr2ir2bi",
  sender: "shho23bssfssf",
  content:"hello ji",
  time:"12:59am"
};

const secretKey = "s3cretk3y";

const extractUserDetails = (chat, sender) => {
  const userDetails = chat.chatBtw.map((personId) => {
    console.log(personId);
    if (personId !== sender.userId) {
      return users.find((user) => user.userId === personId);
    }
  });
  if (userDetails[0] === undefined) {
    return userDetails[1];
  }
  return userDetails[0];
};
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
      return user.name === username ? res.send(true) : res.send(false);
    }
  });
});

app.get("/userSearch", userAuthentication, (req, res) => {
  const { toSearch } = req.query;
  const user = users.filter((user) => user?.name?.startsWith(toSearch));
  if (user.length !== 0) {
    return res.status(200).json({ user });
  }
  return res.status(404).json({ message: "user not found" });
});

app.patch("/updateUsername", userAuthentication, (req, res) => {
  const { name } = req.body;
  const user = users.find((user) => user.email === req.email);
  user.name = name;
  return res.json({ message: "updated succesfully" });
});
app.post("/signup", (req, res) => {
  const { username: name, email, password } = req.body;
  const user = users.find((user) => user.email === email);
  if (!user) {
    users.push({ name, email, password, userId: uuid() });
    return res.status(200).json({ message: "user created" });
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
    return res.status(200).json({ token, name: user.name });
  }
  res.status(404).json({ message: "user not found" });
});

app.post("/newChat", userAuthentication, (req, res) => {
  const { reciveremail } = req.headers;
  const reciver = users.find((user) => reciveremail === user.email);
  const sender = users.find((user) => req.email === user.email);
  if (reciver) {
    // let allchats = chat.filter((ch) =>
    //   ch.bothInvolved
    //     ? ch.chatBtw.includes(sender.userId)
    //     : ch.chatBtw[1] === sender.userId
    // );
    const chatExist = chat.find(
      (ch) =>
        ch.chatBtw.includes(reciver.userId) &&
        ch.chatBtw.includes(sender.userId)
    );
    if (chatExist) {
      chatExist.bothInvolved = true;
    } else {
      chat.push({
        chatId: uuid(),
        chatBtw: [reciver.userId, sender.userId],
        latestmsg: "",
        bothInvolved: false,
      });
    }
    const allchats = chat.filter((ch) =>
      ch.bothInvolved
        ? ch.chatBtw.includes(sender.userId)
        : ch.chatBtw[1] === sender.userId
    );
    const chatCardDetails = allchats.map((chat) => {
      if (chat.bothInvolved) {
        return extractUserDetails(chat, sender);
      }
      return users.find((user) => user.userId === chat.chatBtw[0]);
    });
    return res.status(200).json({ chats: chatCardDetails });
  }
  res.status(400).json({ message: "failed" });
});
app.get("/allChats", userAuthentication, (req, res) => {
  const user = users.find((user) => req.email === user.email);
  const allchats = chat.filter((ch) =>
    ch.bothInvolved
      ? ch.chatBtw.includes(user.userId)
      : ch.chatBtw[1] === user.userId
  );
  const chatCardDetails = allchats.map((chat) => {
    if (chat.bothInvolved) {
      return extractUserDetails(chat, user);
    }
    return users.find((user) => user.userId === chat.chatBtw[0]);
  });
  return res.status(200).json({ chats: chatCardDetails });
});

// socketio setup
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
    methods:["GET" , "POST"]
  },
});

io.on("connection", (socket) => {
  
  socket.on("disconnect" , ()=>{
    console.log("user disconnected")
  })
});

//server listening on port 3000
httpServer.listen(3000, () => {
  console.log("server started");
});
