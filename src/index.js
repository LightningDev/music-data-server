import app from './api';
import database from "./db";

const port = process.env.PORT || 3000;

database.sync().then(() => {
  app.listen(port, () => {
    console.log(`Music data server listening on port ${port}`);
  });
});

export default app;