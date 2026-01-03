module.exports = (req, res, next) => {
  // for example iam using a custom header "x-user-id" to pass the user ID
  const userId = req.headers["x-user-id"];

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.userId = userId;
  next();
};
