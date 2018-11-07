module.exports = (sequlize, DataTypes) => {
  const Category = sequlize.define('category', {
    c_id: {
      type: DataTypes.INTEGER(64),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(128),
    },
    description: {
      type: DataTypes.STRING(128),
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'category',
    engine: 'InnoDB',
    charset: 'utf8mb4',
    comment: '目录表'
  })
  // Category.associate = function (models) {
  //   models.category.hasMany(models.article);
  // };
  return Category;
}