module.exports = (sequelize, DataTypes) => {
  const Admins = sequelize.define("Admins", {
    // here all the structure for table

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure email addresses are unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING, // Assuming full name is a string
      allowNull: false, // You can set this to false if full name is required
    },
    phoneNumber: {
      type: DataTypes.STRING, // Assuming phone number is a string
      allowNull: true, // You can set this to false if phone number is required
    },
  });
  return Admins;
};
