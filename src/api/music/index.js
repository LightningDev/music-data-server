export default (app) => {
  app.get("/music/artists", require("./artists").default);
};
