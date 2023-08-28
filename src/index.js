import app from "./api";
import database from "./db";
require("dotenv").config();

const port = process.env.PORT || 3001;
const host = process.env.HOST || "localhost";
database.sync().then(() => {
  app.listen(port, host, () => {
    console.log(`Music data server listening on ${host} port ${port}`);
  });
});

export default app;
