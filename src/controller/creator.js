const express = require('express');
const creator = require('../model/Creator');

const router = express.Router();

// url = /api

// url = /api/creator
router.get('/', (req, res) => {
  creator.getAll(req, res);
});

router.get('/creators', (req, res) => {
  creator.search(req, res);
});

router.get('/creators/:id', (req, res) => {
  creator.getDetail(req, res);
});

module.exports = router;

