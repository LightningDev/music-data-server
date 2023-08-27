import User from "../../db/model/user";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY

const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) return res.status(400).send("Email or password is wrong");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Email or password is wrong");

    const token = jwt.sign({ id: user.id }, SECRET_KEY);
    res.header("auth-token", token).send(token);
  } catch (err) {
    res.status(400).send(err);
  }
};

export default signIn;
