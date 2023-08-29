import User from "../../db/model/user";

const register = async (req, res) => {
  try {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists)
      return res
        .status(400)
        .send(JSON.stringify({ success: false, message: "Email already exists" }));

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      country: req.body.country,
      password: req.body.password,
    });

    res.send({ success: true, user: user.id });
  } catch (err) {
    res.status(400).send(err);
  }
};

export default register;
