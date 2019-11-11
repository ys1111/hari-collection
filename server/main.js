'use strict'

const express = require('express')
let app = express()
const fs = require('fs');
const allItems = JSON.parse(fs.readFileSync('./json/all.json', 'utf8')); 
const categories = JSON.parse(fs.readFileSync('./json/categories.json', 'utf8'));

let server = app.listen(5000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/items', function(req, res, next){
  const { data } = allItems
  res.json(allItems);
});

app.get('/items/:id', function(req, res, next){
  let id = req.params.id - 1
  const { data } = allItems
  res.json(data[id]);
});

app.get('/categories', function(req, res, next){
    res.json(categories);
});

app.get('/not-found', function(req, res, next){
    res.status(404).send({'error': 'Not Found'});
});

