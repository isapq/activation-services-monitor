import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";

const Service = sequelize.define("Service", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nameOfClient: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  addressOfClient: {
    type: DataTypes.STRING,
  },
  specificationsOfService: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  specificationsOfTime: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  specificationsCheckList: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
  }
});

export default Service;
