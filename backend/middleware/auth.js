const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token =
      req.headers.authorization.split(" ")[1]; /* Finding the token */
    const decodedToken = jwt.verify(
      token,
      "RANDOM_TOKEN_SECRET"
    ); /* checking if matching with the key*/
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valabe !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: new Error() | "Requête non authentifiée !" });
  }
};
