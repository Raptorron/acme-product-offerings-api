const express = require('express');
const app = express();
const db = require('./db');
const path = require('path');
const port = process.env.PORT || 3000;

app.get('/', (req, res, next)=>{
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/products', (req, res, next)=>{
  db.module.Product.findAll()
    .then(products => res.send(products))
    .catch(next);
})

app.get('/api/companies', (req, res, next)=>{
  db.module.Company.findAll()
    .then(companies => res.send(companies))
    .catch(next);
})

app.get('/api/offerings', (req, res, next)=>{
  db.module.Offering.findAll()
    .then(offerings => res.send(offerings))
    .catch(next);
})

db.syncAndSeed()
  .then(()=> {
    app.listen(port, ()=> console.log(`you are listening on port ${port}`))
  });
