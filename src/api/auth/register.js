import User from "../../db/model/user";

const register = async (req, res) => {
  try {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) return res.status(400).send("Email already exists");

    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
    });

    res.send({ user: user.id });
  } catch (err) {
    res.status(400).send(err);
  }
};

export default register;
