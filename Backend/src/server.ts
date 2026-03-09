import { App } from "./app.js";
import { sequelize } from "./config/db.js";
const PORT = process.env.PORT;

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Unable to connect:", err);
  });
App.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
