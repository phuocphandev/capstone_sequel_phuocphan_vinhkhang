import {Sequelize} from "sequelize"
import config from "../config/config.js"

const sequelize = new Sequelize(config.dataBase,config.userName,config.pass,{
    port : config.port,
    host : config.host,
    dialect : config.dialect
})

export default sequelize