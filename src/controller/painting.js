const express = require('express');
const painting = require('../model/Painting');

const router = express.Router();
router.get('/', (req, res) => {
  if (!req.query.search) {
    painting.getAll(req, res);
  } else {
    painting.search(req, res);
  }
});

router.get('/:id', (req, res) => {
  painting.getDetail(req, res);
});

module.exports = router;
