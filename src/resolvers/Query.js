const { forwardTo } = require('prisma-binding');

const Query = {
  users: forwardTo('db'),
  menuItems: forwardTo('db'),
  waitlistItems: forwardTo('db'),
  user: forwardTo('db'),
  waitlistItem: forwardTo('db'),
  isLoggedIn: (parent, args, { request }) => typeof request.session.user !== 'undefined',
  myId: (parent, args, { request }) => {
    if (request.session.user) {
      return request.session.user.id;
    }
    return 'Login Error: Query MyID returned undefined';
  },
  doIExist: (parent, args, { db, request }) => {
    return request.session.user ? db.exists.User({ id: request.session.user.id }) : false;
    return db.exists.User({ id: request.session.user.id });
  },
};

module.exports = Query;
