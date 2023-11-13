import Sequelize from "sequelize/types/sequelize.js";
import { decodeToken } from "../config/jwt.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const model = initModels(sequelize);

let Op = Sequelize.Op;

export const getImagesList = async (req, res) => {
  try {
    const imagesList = await model.image.findAll();
    res.send(imagesList);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getImagesListByName = async (req, res) => {
  try {
    let { nameImage } = req.query;
    let data = await model.image.findAll({
      where: {
        image_name: {
          [Op.like]: `%${nameImage}%`,
        },
      },
    });
    res.send(data);
    return;
  } catch (error) {
    res.status(500).send(error.message);
  }
};
//
export const getDetailImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const image_id = Number(imageId);
    const data = await model.image.findOne({
      where: {
        image_id,
      },
      include: {
        model: model.user,
        as: "user",
      },
    });
    if (data) {
      res.send(data);
      return;
    }
    res.status(404).send("Not Found!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getCommentByIdImage = async (req, res) => {
  try {
    const { imageId } = req.params;
    const image_id = Number(imageId);
    const data = await model.comment.findAll({
      where: {
        image_id,
      },
    });
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getCheckImage = async (req, res) => {
  try {
    const { token } = req.headers;
    const { imageId } = req.params;
    const user = decodeToken(token);
    const { user_id } = user.data.checkEmail;
    const image_id = Number(imageId);
    const checkImage = await model.saved_image.findOne({
      where: {
        user_id,
        image_id,
      },
    });
    if (checkImage) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const saveImage = async (req, res) => {
  try {
    const { token } = req.headers;
    const { hinhId } = req.params;
    const userInfo = decodeToken(token);
    const { user_id } = userInfo.data.checkEmail;
    const { idImage } = req.params;
    const image_id = Number(idImage);
    const check = await model.image.findOne({
      where: {
        image_id,
      },
    });
    if (check) {
      const checkImage = await model.saved_image.findOne({
        where: {
          user_id,
          image_id,
        },
      });
      if (!checkImage) {
        const data = {
          user_id,
          image_id,
          date: new Date(),
        };
        await model.saved_image.create(data);
        res.send("Image was saved!");
        return;
      }
      res.send("Image already was saved!");
      return;
    }
    res.send("Image is currently unavailable now!");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const postCommentImage = async (req, res) => {
  try {
    const { token } = req.headers;
    const { hinhId } = req.params;
    const image_id = Number(hinhId);
    const { content } = req.body;
    const userInfo = decodeToken(token);
    const { user_id } = userInfo.data.checkEmail;
    const newData = {
      image_id,
      user_id,
      content,
      date: new Date(),
    };

    await model.comment.create(newData);
    res.status(201).send(true);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
//

export const getSavedImage = async (req, res) => {
  try {
    const { userId } = req.params;
    const user_id = Number(userId);
    const Images = await model.saved_image.findAll({
      where: {
        user_id,
      },
    });
    if (Images) {
      res.send(Images);
    } else {
      res.send("There are no picture was saved!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getCreatedImage = async (req, res) => {
  try {
    const { userId } = req.params;
    const user_id = Number(userId);
    const Images = await model.image.findAll({
      where: {
        user_id,
      },
    });
    if (Images) {
      res.send(Images);
    } else {
      res.send("You haven’t uploaded any images yet!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { token } = req.headers;
    const { hinhId } = req.params;
    const image_id = Number(hinhId);
    const userInfo = decodeToken(token);
    const { user_id } = userInfo.data.checkEmail;
    await model.image.destroy({
      where: {
        user_id,
        image_id,
      },
    });
    res.send("Deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const postImage = async (req, res) => {
  try {
    const { token } = req.headers;
    const { image_name, url, desc } = req.body;
    const userInfo = decodeToken(token);
    const { user_id } = userInfo.data.checkEmail;
    const newImage = {
      image_name,
      url,
      desc,
      user_id,
    };
    await model.image.create(newImage);
    res.send("Uploaded");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
