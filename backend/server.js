import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import crypto from 'crypto'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/authAPI"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise
mongoose.set('useCreateIndex', true);


const User = mongoose.model('User', {
  name: {
    type: String, 
    unique: true
  },
  email:{
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken:{
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

// const user = new User({name: "Bob", password: bcrypt.hashSync("testing")})
// user.save()

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Middleware
const authenticateUser = async (req, res, next) => {
  const user = await User.findOne({accessToken: req.header('Authorization')})
  if (user){
    req.user = user;
    next()
  } else {
    res.status(401).json({loggedOut: true})
  }
}

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

//protected endpoint
app.get('/secrets', authenticateUser)
app.get('/secrets', (req,res) =>{
  res.json({secret: 'This is a super secret message'})
})

//Registration (creates the user)
app.post('/signup', async (req,res)=>{
  try{
    const {name, email, password} = req.body
    const user = await new User({name, email, password: bcrypt.hashSync(password)}).save()
    // await user.save()
    res.status(201).json({id: user._id, accessToken: user.accessToken})
  } catch (err){
    res.status(400).json({message: 'could not create user', errors: err.errors})
  }
})

//Login (finds the user)
app.post('/login', async (req, res) => {
try {
  const { name, password } = req.body
  const user = await User.findOne({ name })
  if (user && bcrypt.compareSync(password, user.password)) {
    res.status(201).json({ userId: user._id, accessToken: user.accessToken})
  } else {
    res.status(404).json({ notFound: true })
  }
} catch (err) {
  res.status(404).json({ notFound: true })
}
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

//console.log(crypto.randomBytes(1).toString('hex'))
//console.log(bcrypt.hashSync('testing'))
