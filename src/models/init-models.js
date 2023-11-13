import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _comment from  "./comment.js";
import _image from  "./images.js";
import _saved_image from  "./saved_image.js";
import _user from  "./user.js";

export default function initModels(sequelize) {
  const comment = _comment.init(sequelize, DataTypes);
  const image = _image.init(sequelize, DataTypes);
  const saved_image = _saved_image.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);

  comment.belongsTo(image, { as: "image", foreignKey: "image"});
  image.hasMany(comment, { as: "comments", foreignKey: "image_id"});
  saved_image.belongsTo(image, { as: "image", foreignKey: "image_id"});
  image.hasMany(saved_image, { as: "saved_images", foreignKey: "image_id"});
  comment.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(comment, { as: "comments", foreignKey: "user_id"});
  image.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(image, { as: "images", foreignKey: "user_id"});
  saved_image.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(saved_image, { as: "saved_images", foreignKey: "user_id"});

  return {
    comment,
    image,
    saved_image,
    user,
  };
}
