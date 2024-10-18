const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const UserModel = require("./model/User");
const LogModel = require("./model/Log");

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    credentials: true
}));


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});


app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                req.session.user = { id: user._id, name: user.name, email: user.email };
                // console.log(email);
                console.log(user.name);
                res.json("Success");
            } else {
                res.status(401).json("Password doesn't match");
            }
        } else {
            res.status(404).json("No Records found");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.post("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ error: "Failed to logout" });
            } else {
                res.status(200).json("Logout successful");
            }
        });
    } else {
        res.status(400).json({ error: "No session found" });
    }
});

app.get('/user', (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json("Not authenticated");
    }
});

// Route for Get All Logs from database
app.get('/api/logs', async (request, response) => {
  try {
    const logs = await LogModel.find({});

    return response.status(200).json({
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Save a new Log
app.post('/api/logs', async (request, response) => {
  try {
    if (
      !request.body.distance ||
      !request.body.duration ||
      !request.body.avgSpeed ||
      !request.body.calBurned
    ) {
      return response.status(400).send({
        message: 'Send all required fields: distance, duration, avgSpeed, calBurned',
      });
    }
    const newLog = {
      distance: request.body.distance,
      duration: request.body.duration,
      avgSpeed: request.body.avgSpeed,
      calBurned: request.body.calBurned,
    };

    const log = await LogModel.create(newLog);

    return response.status(201).send(log);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Log from database by id
app.get('/api/logs/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const log = await LogModel.findById(id);

    return response.status(200).json(log);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Log
app.put('/api/logs/:id', async (request, response) => {
  try {
    if (
      !request.body.distance ||
      !request.body.duration ||
      !request.body.avgSpeed ||
      !request.body.calBurned
    ) {
      return response.status(400).send({
        message: 'Send all required fields: distance, duration, avgSpeed, calBurned',
      });
    }

    const { id } = request.params;

    const result = await LogModel.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Log not found' });
    }

    return response.status(200).send({ message: 'Log updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a Log
app.delete('/api/logs/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await LogModel.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Log not found' });
    }

    return response.status(200).send({ message: 'Log deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});





