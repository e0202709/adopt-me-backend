const express = require("express")
const router = express.Router();
const fs = require('fs');
const petsRoutes = require('./pets.js')

router.use(petsRoutes)
module.exports = router;