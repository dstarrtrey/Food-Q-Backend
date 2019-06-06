const { forwardTo } = require('prisma-binding');

const Query = {
  users: forwardTo('db'),
  menuItems: forwardTo('db'),
  waitlistItems: forwardTo('db'),
  user: forwardTo('db'),
  waitlistItem: forwardTo('db'),
  isLoggedIn: (_, __, { request }) => typeof request.session.user !== 'undefined',
  myId: (_, __, { request }) => {
    if (request.session.user) {
      return request.session.user.id;
    }
    return 'Login Error: Query MyID returned undefined';
  },
  doIExist: (_, __, { db, request }) => {
    return request.session.user ? db.exists.User({ id: request.session.user.id }) : false;
  },
};

module.exports = Query;
