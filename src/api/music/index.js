import { verifyBearerToken } from "../middleware/auth.middleware";

export default (app) => {
  app.get("/music/artists", verifyBearerToken, require("./artists").default);
  app.get("/music/albumns", verifyBearerToken, require("./albumns").default);
};
