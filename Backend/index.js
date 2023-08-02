import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
// import jwt from 'jsonwebtoken';

const app = express();

const port = 4000;

const uri = "mongodb+srv://cluster0:cluster0@cluster0.6iwugyh.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to yourDB-name database');
  })
  .catch((err) => {
    console.log('Error connecting to database:', err);
  });

// Define User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const TaskSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  tasks: {
    type: [String],
    required: true,
  },
});
// Create User model
const User = mongoose.model('users', UserSchema);
const Task = mongoose.model('tasks', TaskSchema);
// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// const authenticateToken = (req, res, next) => {
//   const token = req.header('Authorization');

//   if (!token) {
//     return res.sendStatus(401);
//   }

//   jwt.verify(token, '05kfn503n59g04n959rnfir', (err, user) => {
//     if (err) {
//       return res.sendStatus(403);
//     }
//     req.user = user;
//     next();
//   });
// };

// API endpoint for user registration
app.post('/register', async (req, res) => {
  try {
    const { name, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ name, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

app.get('/users', async (req, res) => {
    try {
      const users = await User.find({});
  
      res.json(users);
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });

  app.post("/addTask", async (req, res)=>{
    try{
      const {username, tasks} = req.body;
      let user = await Task.findOne({username : username}); 
      if(!user){
        user = new Task({
          username: username, 
          tasks: tasks
        })
      }
      else{
        user.tasks.push(...tasks);
      }
      await user.save();
      res.status(201).json({message: "Tasks added successfully"});
    }catch(error){
      res.send(500).json({message: "Something went wrong"});
    }
  })

  app.post("/getTasks", async(req, res)=>{
    try{
      const username = req.body.username;
      const user = await Task.findOne({username: username});
      console.log("User is ", user);
      if(!user){
        return res.status(404).json({message: "User not found"});
      }
      const tasks = user.tasks;
      res.status(200).json(tasks);
    }catch(error){
      console.log("Error getting in tasks ", error);
      res.status(500).json({message: "Something went wrong"});
    }
  });

  // app.post('/login', async (req, res) => {
  //   try {
  //     const { name, password } = req.body;
  
  //     // Check if user exists and validate password
  //     const user = await User.findOne({ name, password });
  //     if (!user) {
  //       return res.status(401).json({ message: 'Invalid credentials' });
  //     }
  
  //     // Generate JWT token
  //     const token = jwt.sign({ name: user.name }, '05kfn503n59g04n959rnfir', {
  //       expiresIn: '1h',
  //     });
  
  //     res.json({ token });
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //     res.status(500).json({ message: 'Something went wrong' });
  //   }
  // });
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});