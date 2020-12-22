const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/questions/:questionId/answers/:answerId/comments' });
const { secret } = require('../config');

const {
  find, create, findById, update, delete: del, checkCommentExist, checkCommenter
} = require('../controllers/comments')

const auth = jwt({ secret });

router.get('/', find);
router.post('/', auth, create);
router.get('/:id', checkCommentExist, findById);
router.del('/:id', checkCommentExist, checkCommenter, del);
router.patch('/:id', auth, checkCommentExist, checkCommenter, update);

module.exports = router;