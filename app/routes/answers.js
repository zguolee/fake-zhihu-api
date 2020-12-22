const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/questions/:questionId/answers' });
const { secret } = require('../config');

const {
  find, create, findById, update, delete: del, checkAnswerExist, checkAnswerer
} = require('../controllers/answers')

const auth = jwt({ secret });

router.get('/', find);
router.post('/', auth, create);
router.get('/:id', checkAnswerExist, findById);
router.del('/:id', checkAnswerExist, checkAnswerer, del);
router.patch('/:id', auth, checkAnswerExist, checkAnswerer, update);

module.exports = router;