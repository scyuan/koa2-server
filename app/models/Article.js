module.exports = (sequlize, DataTypes) => {
  const Article = sequlize.define('article', {
    a_id: {
      type: DataTypes.INTEGER(64),
      primaryKey: true,
      autoIncrement: true,
    },
    // 文章标题
    title: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    // 文章关键字
    keywords: {
      type: DataTypes.STRING(64),
    },
    // 文章摘要
    description: {
      type: DataTypes.STRING(256),
      defaultValue: ''
    },
    // 文章原始内容
    content: {
      type: DataTypes.TEXT,
    },
    // 文章渲染内容
    renderedContent: {
      type: DataTypes.TEXT,
    },
    // 分类
    category: {
      type: DataTypes.INTEGER,
      defaultValue: 1
      // references: {
      //   model: Category,
      //   key: 'c_id',
      // }
    },
    // 标签
    tag: {
      type: DataTypes.STRING(128),
    },
    // 缩略图
    thumb: {
      type: DataTypes.STRING(256)
    },
    // 来源
    source: {
      type: DataTypes.INTEGER,
    },
    // 原文链接
    sourceUrl: {
      type: DataTypes.STRING(256)
    },
    state: {
      type: DataTypes.INTEGER,
    },
    publishedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    // 浏览量
    pvs: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // 喜欢数
    ups: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    // 评论数
    comments: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'article',
    engine: 'InnoDB',
    charset: 'utf8mb4',
    comment: '文章列表'
  })
  // Article.associate = function (models) {
  //   models.article.belongsTo(models.category, {
  //     onDelete: "CASCADE",
  //     foreignKey: 'c_id'
  //   })
  // }
  return Article;
}