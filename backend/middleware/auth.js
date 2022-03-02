const jwt = require("jsonwebtoken");
require("dotenv").config({ path: process.cwd() + "/.env" });

module.exports = (req, res, next) => {
  try {
    const token =
      req.headers.authorization.split(" ")[1]; /* Finding the token */
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN
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
