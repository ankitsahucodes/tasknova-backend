const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // console.log(token);
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, JWT token wrong or expired." });
  }
};


module.exports = { verifyJWT }