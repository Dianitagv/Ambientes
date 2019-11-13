"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.tipoaula_model = (sequelize) => {
    let tipoaula = sequelize.define('t_TipoAula', {
        taula_id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        taula_desc: {
            type: sequelize_1.DataTypes.STRING(35),
            allowNull: false
        }
    }, {
        tableName: 't_tipoaula',
        timestamps: true
    });
    return tipoaula;
};
