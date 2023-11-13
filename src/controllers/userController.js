import { createToken, decodeToken } from "../config/jwt.js";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import bcryct, { hashSync } from "bcrypt";
let model = initModels(sequelize);

export const userRegister = async (req, res) => {
  try {
    const { email, pass_word, name, age } = req.body;
    const checkUser = await model.user.findOne({
      where: {
        email,
      },
    });
    if (checkUser) {
      res.status(400).send("Email already exists");
    } else {
      let passCrypt = bcryct.hashSync(pass_word, 10);
      const newData = {
        email,
        pass_word: passCrypt,
        name,
        age,
        avatar: "",
      };
      await model.user.create(newData);
      res.send("Your registration was succesful!");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, pass_word } = req.body;
    let checkEmail = await model.user.findOne({
      where: {
        email,
      },
    });
    if (checkEmail) {
      let checkPass = bcryct.compareSync(pass_word, checkEmail.pass_word);
      if (checkPass) {
        let token = createToken({ checkEmail });
        res.send(token);
      } else {
        res.send("Your password is incorrect!");
      }
    } else {
      res.send("Your email is incorrect!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateUserInfo = async (req, res) => {
  try {
    const { token } = req.headers;
    const userInfo = decodeToken(token);
    const { user_id } = userInfo.data.checkEmail;
    const { pass_word, name, age, avatar } = req.body;
    let user = await model.user.findOne({
      where: {
        user_id,
      },
    });
    const passCrypt = hashSync(pass_word, 10);
    user = { ...user, pass_word: passCrypt, name, avatar, age };
    await model.user.update(user, {
      where: {
        user_id,
      },
    });
    res.send("Updated! ");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getUserInfo = async (req, res) => {
  try {
    const { token } = req.headers;
    const userInfo = decodeToken(token);
    const { user_id } = userInfo.data.checkEmail;
    const User = await model.user.findOne({
      where: {
        user_id,
      },
    });
    res.status(200).send(User);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
