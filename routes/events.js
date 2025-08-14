const express = require('express');
const router = express.Router();

// DB test - Insert A
router.post('/insertA', (req, res, next) => {
  req.db
    .from('concept_events')
    .insert({ event: 'A' })
    .then(() => {
      res.json({
        status: 200,
        message: 'Success.',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: true,
        message: 'Unable to post A to DB.',
      });
    });
});

// DB test - Insert B
router.post('/insertB', (req, res, next) => {
  req.db
    .from('concept_events')
    .insert({ event: 'B' })
    .then(() => {
      res.json({
        status: 200,
        message: 'Success.',
      });
    })
    .catch(error => {
      res.status(500).json({
        error: true,
        message: 'Unable to post B to DB.',
      });
    });
});

// DB test - show all
router.get('/viewData', (req, res, next) => {
  req.db
    .from('concept_events')
    .select('*')
    .orderBy('id', 'asc')
    .then(data => {
      res.json({
        status: 200,
        message: data,
      });
    })
    .catch(error => {
      res.status(500).json({
        error: true,
        message: `Unable to retrieve data. ${error.message}`,
      });
    });
});

module.exports = router;
