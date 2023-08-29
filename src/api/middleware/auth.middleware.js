const jwt = require('jsonwebtoken');

const verifyBearerToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (typeof authHeader !== 'undefined') {
    const token = authHeader.split(' ').pop();
    console.log(authHeader)
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        console.log(err)
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

export { verifyBearerToken };