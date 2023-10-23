module.exports = (sequelize, DataTypes) => {
  const Questions = sequelize.define("Questions", {
    // here all the structure for table
    studentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    subjectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subjectID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "assigned",
    },
    openAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    closeAt: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  });
  return Questions;
};
