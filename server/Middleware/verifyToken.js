const jwt = require("jsonwebtoken");
jwtKey = "secretKey";

const verifyToken = (admin, user) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    if (token) {
      jwt.verify(token, jwtKey, (err, valid) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token!" });
        } else {
          if (
            jwt.decode(token).role.includes(admin) ||
            jwt.decode(token).role.includes(user)
          ) {
            next();
          } else {
            res.status(401).json({ message: "Unauthorized request" });
          }
        }
      });
    } else {
      res.status(403).send({ message: "No token found!" });
    }
  };
};

module.exports = verifyToken;
