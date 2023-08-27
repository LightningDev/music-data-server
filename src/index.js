import app from "./api";
import database from "./db";
require("dotenv").config();

const port = process.env.PORT || 3001;

database.sync().then(() => {
  app.listen(port, () => {
    console.log(`Music data server listening on port ${port}`);
  });
});

export default app;
