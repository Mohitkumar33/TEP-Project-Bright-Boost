module.exports = (sequelize, DataTypes) => {
  const Subjects = sequelize.define("Subjects", {
    // here all the structure for table
    subjectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teacherIDs: {
      type: DataTypes.STRING, // Store CSV list of teacher IDs as a string
      allowNull: true, // Allow the column to be empty (null)
      defaultValue: null, // Default value is null
    },
  });
  return Subjects;
};
