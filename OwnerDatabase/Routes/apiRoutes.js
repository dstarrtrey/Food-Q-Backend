const db = 'db';
// eslint-disable-next-line func-names
module.exports = function (app) {
  // /logger is where the login info is entered
  app.post('/logger', (req, res) => {
    const { username } = req.body;
    const { password } = req.body;
    if (username && password) {
      db.User.findOne({
        where: {
          username,
          password,
        },
      }).then((data) => {
        let user;
        if (data !== null) {
          user = data.dataValues;
        }

        if (data === null) {
          return res.render('invalidIDPage');
        }

        if (user.username === username && user.password === password) {
          req.session.loggedin = true;
          req.session.username = username;
          // redirects to login page
          return res.redirect('/login');
        }
        return res.render('invalidIDPage');

        res.end();
      });
    } else {
      return res.render('invalidIDPage');
      res.end();
    }
  });
};
