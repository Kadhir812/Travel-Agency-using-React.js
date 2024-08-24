const express = require('express');
const Location = require('../models/Locations');

const router = express.Router();

router.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find({});
    res.json(locations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
