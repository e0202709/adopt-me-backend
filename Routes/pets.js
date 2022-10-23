const express = require("express")
const petsRoutes = express.Router();
const fs = require('fs');

const dataPath = './Init/allPets.json' 

// util functions 

const savePetsData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getPetsData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)    
}


// Retreiving pets data
petsRoutes.get('/pets', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      res.send(JSON.parse(data));
    });
  });

// Create new pets for adoption
petsRoutes.post('/pets/addpet', (req, res) => {
   
    var currentPets = getPetsData()
    const petId = Math.floor(1000 + Math.random() * 9000)
   
    currentPets[petId] = req.body
     
    console.log(currentPets);

    savePetsData(currentPets);
    res.send({success: true, msg: 'new pet added successfully for adoption'})
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