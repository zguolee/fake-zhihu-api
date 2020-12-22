const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/questions' });
const { secret } = require('../config');

const {
  find, create, findById, update, delete: del, checkQuestionExist, checkQuestioner
} = require('../controllers/questions')

const auth = jwt({ secret });

router.get('/', find);
router.post('/', auth, create);
router.get('/:id', checkQuestionExist, findById);
router.del('/:id', checkQuestionExist, checkQuestioner, del);
router.patch('/:id', auth, checkQuestionExist, checkQuestioner, update);

module.exports = router;