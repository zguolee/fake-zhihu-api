const jwt = require('koa-jwt');
const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const { secret } = require('../config');

const {
  find, findById, create,
  update, delete: del, login, checkOwner,
  listFollowing, checkUserExist, follow, unfollow, listFollowers,
  listFollowingTopics, followTopic, unfollowTopic, listQuestions,
  listLikingAnswer, likeAnswer, unlikeAnswer,
  listDislikingAnswer, dislikeAnswer, undislikeAnswer,
  listCollectingAnswer, collectAnswer, uncollectAnswer
} = require('../controllers/users');

const { checkTopicExist } = require('../controllers/topics');
const { checkAnswerExist } = require('../controllers/answers');
const auth = jwt({ secret });

router.get('/', find);
router.post('/', create);

router.get('/:id', findById);
router.patch('/:id', auth, checkOwner, update);
router.delete('/:id', auth, checkOwner, del);

router.post('/login', login);

router.get('/:id/following', listFollowing);
router.get('/:id/followers', listFollowers);

router.put('/following/:id', auth, checkUserExist, follow);
router.delete('/following/:id', auth, checkUserExist, unfollow);
// 话题相关
router.get('/:id/followingTopics', listFollowingTopics);
router.put('/followingTopics/:id', auth, checkTopicExist, followTopic);
router.delete('/followingTopics/:id', auth, checkTopicExist, unfollowTopic);
// 问题列表
router.get('/:id/questions', listQuestions);
// 喜欢答案
router.get('/:id/likingAnswer', listLikingAnswer);
router.put('/likingAnswer/:id', auth, checkAnswerExist, likeAnswer, undislikeAnswer);
router.delete('/likingAnswer/:id', auth, checkAnswerExist, unlikeAnswer);
// 不喜欢答案
router.get('/:id/dislikingAnswer', listDislikingAnswer);
router.put('/dislikingAnswer/:id', auth, checkAnswerExist, dislikeAnswer, unlikeAnswer);
router.delete('/dislikingAnswer/:id', auth, checkAnswerExist, undislikeAnswer);
// 收藏答案
router.get('/:id/listCollectingAnswer', listCollectingAnswer);
router.put('/collectingAnswer/:id', auth, checkAnswerExist, collectAnswer);
router.delete('/collectingAnswer/:id', auth, checkAnswerExist, uncollectAnswer);

module.exports = router;