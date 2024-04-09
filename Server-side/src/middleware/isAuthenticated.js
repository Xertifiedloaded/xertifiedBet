import jwt from "jsonwebtoken";


const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      return res.sendStatus(401);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = decoded;
      next();
    });
  };
export default isAuthenticated