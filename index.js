const express = require('express');
const app = express();
const { User } = require('./db/User');
const { Ring } = require('./db/Ring');
const bcrypt = require('bcrypt');
// const db = require('./db/db')
app.use(express.json());


// (async ()=> {
//   await db.sequelize.sync();
// })();


app.get('/', (req, res) => {
  res.send('Hi Mom!')
})

const setUser = async (req, res, next) => {
  if(!req.header('Authorization'))
      res.sendStatus(401)
  else {
      let decrypted
      const token = req.header('Authorization').split(" ")[1]
      try{
          decrypted = jwt.verify(token, JWT_SECRET);
      } catch(error){
          decrypted = 'bad!'
      }
      req.user = decrypted
      // console.log('setUser:', token)
      // console.log('setUser:', JWT_SECRET)
      next();
  }
}

app.get('/user', setUser, async (req, res) => {
  res.send(await User.findAll())
})

app.post('/user', setUser, async (req, res) =>{
  if(!req.user)
    res.sendStatus(401)
  else{
    const {username, password} = req.body;
    const hashedPw = await bcrypt.hash(password, 10);
    const user = await User.create({username, password: hashedPw});
    res.status(201).send(user);
  }  
})

app.delete('/user/:id', setUser, async (req, res) => {
  const user = await User.findByPk(req.params.id)
  await user.destroy()
  res.send(`${user.username} was removed from the database.`)
})

app.post('/ring', setUser, async (req, res) =>{
  if(!req.user)
    res.sendStatus(401)
  else{
    const {installation, range, array} = req.body;
    const halo = await Ring.create({installation, range, array, ownerId: req.user.id});
    res.status(201).send(halo);
  }  
})

module.exports = app;