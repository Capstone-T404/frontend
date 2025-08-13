const express = require('express');
const router = express.Router();

// Response for: api.*.com/hello
router.get('/hello', (req, res, next) => {
  // Return JSON object
  return res.send({
    name: 'Alex McConachie',
    message: 'Hi!',
  });
});

module.exports = router;
