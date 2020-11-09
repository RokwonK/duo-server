const router = require('express').Router();
const lolcomment = require('../controllers/comment/lolcomment');

router.post('/lol', lolcomment.addlolComment);
router.get('/lol', lolcomment.getlolComment);
router.put('/lol', lolcomment.updatelolComment);
router.delete('/lol', lolcomment.deletelolComment);
router.get('/me', lolcomment.getMyCommet);

module.exports = router;