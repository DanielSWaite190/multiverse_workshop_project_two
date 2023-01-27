const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { models: { User } } = require('./models')
const { models: { Ring } } = require('./models')
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
const setUser = async (req, res, next) => {
  if(!req.header('Authorization'))
    next()
  else {
    const token = req.header('Authorization').split(" ")[1]
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user
    next();
  }
}

app.get('/', (req, res) => {
  res.send('Look Mom, its Express!')
})

app.get('/user/', setUser, async (req, res) => {
  if(!req.user)
    res.sendStatus(401)
  else
    res.send(await User.findAll())
})

app.post('/user/', async (req, res) =>{
  const {username, password} = req.body;
  const hashedPw = await bcrypt.hash(password, 10);
  const user = await User.create({username, password: hashedPw});
  res.status(201).send(user);
})

app.delete('/user/:id', setUser, async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if(!req.user || req.user.id != user.id)
    res.sendStatus(401)
  else{
    await user.destroy()
    res.send(`${user.username} was removed from the database.`)
  }
})

app.post('/login', async (req, res) => {
  const username = req.body.username
  const [foundUser] = await User.findAll({where: {username}});
  if(!foundUser){
    res.status(401).send('User not found');
    return
  }

  const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
  if(isMatch) {
    const token = jwt.sign({id: foundUser.id}, JWT_SECRET);
    res.status(200).send({
      message: `successfully logged in user ${foundUser.username}`,
      token: token});
  } else 
    res.status(401).send('Incorrect password');
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
    res.status(201).send(ring);
  }
})

app.get('/ring/',setUser, async (req, res) => {
  if(!req.user)
    res.sendStatus(401)
  else
    res.send(await Ring.findAll())
})

app.get('/ring/:id', setUser, async (req, res) => {
  const ring = await Ring.findByPk(req.params.id)
  if(!req.user || req.user.id != ring.userId)
    res.sendStatus(401)
  else
    res.send(ring)
})

app.delete('/ring/:id', setUser, async (req, res) => {
  const ring = await Ring.findByPk(req.params.id)
  if(!req.user || req.user.id != ring.userId)
    res.sendStatus(401)
  else{
    await ring.destroy()
    res.send(`Installation ${ring.installation} was removed from the database.`)
  }
})

module.exports = app;