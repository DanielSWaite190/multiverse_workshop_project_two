const app = require('./index');
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Multivers Workshop P2 is running on port ${PORT}.`);
});