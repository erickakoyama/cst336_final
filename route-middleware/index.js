/**
 * Express middleware to redirect unathenticated users to the
 * homepage, if they visit a route that requires authentication.
 */
const auth = (req, res, next) => {
  if (!req.session.authenticated) {
    res.redirect('/');
  }
  else {
    next();
  }
}

/**
 * Express middleware to provide application level variables for UI templates
 */
const appLocals = (req, res, next) => {
  // add authenticated to route variables
  res.locals = {
    authenticated: req.session.authenticated,
    customerId: req.session.customerId
  };
  next();
}

module.exports = {
  appLocals,
  auth,
}
