module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('tag', {
    t_id: {
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
    tableName: 'tag',
    engine: 'InnoDB',
    charset: 'utf8mb4',
    comment: '标签列表'
  })
  return Tag;
}