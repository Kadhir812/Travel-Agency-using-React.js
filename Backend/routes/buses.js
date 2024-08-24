const express = require('express');
const Bus = require('../models/Bus');

const router = express.Router();

router.post('/search-buses', async (req, res) => {
  const { from, to, date } = req.body;

  try {
    const buses = await Bus.find({ from, to, date });
    if (buses.length === 0) {
      return res.status(404).json({ message: 'No buses found' });
    }
    res.json(buses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
