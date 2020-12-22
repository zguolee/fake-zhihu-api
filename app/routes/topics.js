const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/topics' });
const { secret } = require('../config');

const {
  find, create, findById, update,
  checkTopicExist, listTopicsFollowers, listQuestions
} = require('../controllers/topics')

const auth = jwt({ secret });

router.get('/', find);
router.post('/', auth, create);
router.get('/:id', checkTopicExist, findById);
router.patch('/:id', auth, checkTopicExist, update);
// 话题关注者列表
router.get('/:id/followers', checkTopicExist, listTopicsFollowers);
// 话题下的问题列表
router.get('/:id/questions', checkTopicExist, listQuestions);

module.exports = router;