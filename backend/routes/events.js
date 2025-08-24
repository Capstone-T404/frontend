const express = require('express');
const router = express.Router();

// Add game event to db
router.post('/addevent', (req, res, next) => {
  const { event_type, event_zone, username, game_id, game_time } = req.body;

  req.db
    .from('game_plays')
    .insert({
      game_id,
      game_time,
      event_type,
      event_zone,
      username,
    })
    .then(([id]) => {
      res.json({
        status: 200,
        message: `Successfully created entry; Type: ${event_type}, Zone: ${event_zone}, Event id: ${id}`,
      });
    })
    .catch(error => {
      res.status(500).json({
        error: true,
        message: `Unable to POST ${error.message}.`,
      });
    });
});

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

// Return all events for a given game_id
router.get('/:id', (req, res, next) => {
  const game_id = req.params.id;

  req.db
    .from('game_plays')
    .select('*')
    .where('game_id', game_id)
    .orderBy('game_id', 'asc')
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
