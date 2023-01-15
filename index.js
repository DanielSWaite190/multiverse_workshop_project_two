const express = require('express');
const app = express();
const { User } = require('./models/User');
const { Ring } = require('./models/Ring');
const db = require('./models')
app.use(express.json());


(async ()=> {
  await db.sequelize.sync();
})();


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
app.post('/', setUser, async (req, res) =>{
  if(!req.user)
    res.sendStatus(401)
  else{
    const {name, password} = req.body;
    const user = await User.create({name, password});
    res.status(201).send(user);
  }  
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