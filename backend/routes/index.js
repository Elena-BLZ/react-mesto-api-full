const router = require('express').Router();
const { loginJoi, usersJoi } = require('../middlewares/celebrate');
const NotFoundError = require('../errors/not-found-err');

const { auth } = require('../middlewares/auth');
const { login, logOut, createUser } = require('../controllers/users');

router.post('/signin', loginJoi, login);
router.post('/signup', usersJoi, createUser);

router.use(auth);
router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

router.use('/logout', logOut);

router.use(() => {
  throw new NotFoundError('Нет такого покемона');
});

module.exports = router;
