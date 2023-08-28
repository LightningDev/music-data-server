export default (app) => {
  app.post("/auth/register", require("./register").default);
  app.post("/auth/signin", require("./signIn").default);
};
