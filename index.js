const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { models: { User } } = require('./models')
const { models: { Ring } } = require('./models')
dotenv.config({ path: '.env' });

const JWT_SECRET = process.env.JWT_SECRET;
app.use(express.json());

const setUser = async (req, res, next) => {
  if(!req.header('Authorization')){
      console.log('No header')
      next()
    }
  else {
  //     let decrypted
  //     const token = req.header('Authorization').split(" ")[1]
  //     try{
  //         decrypted = jwt.verify(token, JWT_SECRET);
  //     } catch(error){
  //         decrypted = 'cave man'
  //     }
  //     console.log('Token: ', token)
  //     req.user = decrypted
  //     next();
  // }
  let user
  const token = req.header('Authorization').split(" ")[1]
  user = jwt.verify(token, JWT_SECRET);
  req.user = user
  console.log('Token: ', token, user)
  next();
  }

}

app.get('/', setUser, (req, res) => {
  res.send('Hi Mom!')
})

app.get('/user/', async (req, res) => {
  res.send(await User.findAll())
})

app.post('/user', async (req, res) =>{
  // if(!req.user)
  //   res.sendStatus(401)
  // else{
    const {username, password} = req.body;
    const hashedPw = await bcrypt.hash(password, 10);
    const user = await User.create({username, password: hashedPw});
    res.status(201).send(user);
  // }  
})

app.delete('/user/:id', setUser, async (req, res) => {
  const user = await User.findByPk(req.params.id)
  await user.destroy()
  res.send(`${user.username} was removed from the database.`)
})

app.post('/login', async (req, res) => {
  const username = req.body.username
  const [foundUser] = await User.findAll({where: {username}});
  if(!foundUser) {
    res.send('Failed')
    res.status(401);
  }

  const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
  // res.send({"one": req.body.password, "two": foundUser.password})

  if(isMatch) {
    const token = jwt.sign({id: foundUser.id}, JWT_SECRET);
    res.status(200).send({
      message: `successfully logged in user ${foundUser.username}`,
      token: token});
  } else {
    res.send('incorrect username or password')
    res.status(401);
  }
})

app.post('/ring', setUser, async (req, res) =>{
  if(!req.user)
    res.sendStatus(401)
  else{
    const {installation, range, array, anchor, operational} = req.body;
    const ring = await Ring.create({
      installation, 
      range, 
      array, 
      anchor,
      operational,
      userId: req.user.id,
    });
    console.log('ID: ', req.user.id)
    res.status(201).send(ring);
  }  
})


app.get('/ring/', setUser, async (req, res) => {
  res.send(await Ring.findAll())
})


app.get('/ring/:id', setUser, async (req, res) => {
  const ring = await Ring.findByPk(req.params.id)
  if(!req.user){
    res.sendStatus(401)
  } else {
    if(req.user.id != ring.userId){
      res.sendStatus(401)
    }else{
      res.send(ring)
    }
  }
})

app.delete('/ring/:id', setUser, async (req, res) => {
  const ring = await Ring.findByPk(req.params.id)
  if(!req.user || req.user.id != ring.userId){
    res.sendStatus(401)
    return
  }
  await ring.destroy()
  res.send(`Installation ${ring.installation} was removed from the database.`)
})

module.exports = app;