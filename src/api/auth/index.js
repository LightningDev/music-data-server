import { verifyForm } from "../middleware/auth.middleware";

export default (app) => {
  app.post("/auth/register", require("./register").default);
  app.post("/auth/signin", require("./signIn").default);
};
