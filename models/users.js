
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      username: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
             
      },
      email: { 
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
          isEmail: true,
          notEmpty: true,
        }
      },
      password: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt:{
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      hooks: {
        beforeCreate: async (user) => {
          const hashPassword = await bcrypt.hash(user.password, 10);
          user.password = hashPassword;
        },
      },
    }
  );
  return User;
};
