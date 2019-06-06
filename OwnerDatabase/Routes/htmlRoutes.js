var db = require("../models");

module.exports = function(app) {
  // Load restaurant home page
  app.get("/", function(req, res) {
    return res.render("Homepage");
  });

  // Login route if logged in goes straight to ownerwaitlist else it renders login page
  app.get("/login", function(req, res) {
    if (req.session.loggedin) {
      return res.render("ownerwaitlist");
    }
    return res.render("login");
  });

  // Logout route back to home
  app.get("/logout", function(req, res) {
    if (req.session.loggedin) {
      req.session.loggedin = false;
      return res.redirect("/");
    }
  });

  // Render 404 page for any unmatched, this should be pretty useful/neat
  app.get("*", function(req, res) {
    return res.render("404");
  });
};
