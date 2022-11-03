const express = require("express")
const petsRoutes = express.Router();
const fs = require('fs');
var cors = require('cors')
const dataPath = './Init/allPets.json'
petsRoutes.options('*', cors())
petsRoutes.use(cors())


petsRoutes.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

const savePetsData = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync(dataPath, stringifyData)

}

const getPetsData = () => {
  const jsonData = fs.readFileSync(dataPath)
  return JSON.parse(jsonData)
}



// Create new pets for adoption
petsRoutes.post('/pets/addpet', (req, res) => {

  var currentPets = getPetsData()
  var last = Object.keys(currentPets)[Object.keys(currentPets).length - 1];
  const petId = parseInt(1) + parseInt(last)

  const rndInt1 = Math.floor(Math.random() * (300 - 200 + 1)) + 200;
  const rndInt2 = Math.floor(Math.random() * (300 - 200 + 1)) + 200;

  if (req.body.category === "Cat") {
    req.body.image = `https://placekitten.com/${rndInt1}/${rndInt2}`
  } else {
    req.body.image = `https://placedog.net/${rndInt1}/${rndInt2}`
  }
  currentPets[petId] = req.body
  savePetsData(currentPets);
  res.send({ success: true, msg: 'new pet added successfully for adoption' })
})

// Get All Pets from json file
petsRoutes.get('/pets/list', (req, res) => {
  const allPets = getPetsData()
  res.send(allPets)
})

// Update - using Put method
petsRoutes.put('/pets/:id', (req, res) => {
  var allPets = getPetsData()
  fs.readFile(dataPath, 'utf8', (err, data) => {
    const petId = req.params['id'];
    allPets[petId] = req.body;

    savePetsData(allPets);
    res.send(`Pet Id: ${petId} updated successfully for adoption`)
  }, true);
});

//delete - using delete method
petsRoutes.delete('/pets/delete/:id', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    var allPets = getPetsData()

    const petId = req.params['id'];

    delete allPets[petId];
    savePetsData(allPets);
    res.send(`Pet Id: ${petId} deleted successfully`)
  }, true);
})

module.exports = petsRoutes