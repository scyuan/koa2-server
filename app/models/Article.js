module.exports = (sequlize, DataTypes) => {
  const Article = sequlize.define('article', {
    a_id: {
      type: DataTypes.STRING(64),
      primaryKey: true,
    },
    // 文章标题
    title: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    // 文章关键字
    keywords: {
      type: DataTypes.STRING(64),
      defaultValue: ''
    },
    // 文章摘要
    description: {
      type: DataTypes.STRING(256),
      defaultValue: ''
    },
    // 文章原始内容
    content: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    // 文章渲染内容
    renderedContent: {
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    // 分类
    category: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    // 标签
    tag: {
      type: DataTypes.STRING(128),
    },
    // 缩略图
    thumb: {
      type: DataTypes.STRING(256)
    },
    // 来源 0 原创 | 1 混撰 | 2 转载
    source: {
      type: DataTypes.STRING,
    },
    // 原文链接
    sourceUrl: {
      type: DataTypes.STRING(256)
    },
    // 文章状态 -1 已删除 | 0 发布 | 1 草稿
    state: {
      type: DataTypes.STRING,
      defaultValue: '1'
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