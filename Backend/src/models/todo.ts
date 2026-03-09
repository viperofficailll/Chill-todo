import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Todo = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "Todos",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default Todo;
