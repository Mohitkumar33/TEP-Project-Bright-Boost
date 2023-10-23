module.exports = (sequelize, DataTypes) => {
  const StudentAttendence = sequelize.define("StudentAttendence", {
    // here all the structure for table

    studentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  return StudentAttendence;
};
