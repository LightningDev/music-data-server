import { verifyBearerToken } from "../middleware/auth.middleware";

export default (app) => {
  app.get("/music/artists", verifyBearerToken, require("./artists").default);
  app.get("/music/albumns", verifyBearerToken, require("./albumns").default);
  app.get("/music/songs", verifyBearerToken, require("./songs").default);
  app.get("/music/lyrics", verifyBearerToken, require("./lyrics").default);
};
