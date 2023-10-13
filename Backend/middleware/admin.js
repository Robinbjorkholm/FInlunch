const admin = (req, res, next) => {
  if (!req.user.admin) return res.status(403).send("not admin");

  next();
};

module.exports = admin;
