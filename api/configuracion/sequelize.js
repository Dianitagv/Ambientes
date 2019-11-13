"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pabellon_1 = require("../modelo/Pabellon");
const Aula_1 = require("../modelo/Aula");
const tipoAula_1 = require("../modelo/tipoAula");
const Usuario_1 = require("../modelo/Usuario");
const Reserva_1 = require("../modelo/Reserva");
const Sequelize = require('sequelize');
exports.conexion = new Sequelize('aulas', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-05:00',
    //configuracion para lectura de fechas en la base de datos
    dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: true
    }
});
exports.Pabellon = Pabellon_1.pabellon_model(exports.conexion);
exports.Aula = Aula_1.aula_model(exports.conexion);
exports.TipoAula = tipoAula_1.tipoaula_model(exports.conexion);
exports.Usuario = Usuario_1.usuario_model(exports.conexion);
exports.Reserva = Reserva_1.reserva_model(exports.conexion);
exports.Pabellon.hasMany(exports.Aula, { foreignKey: 'pab_id' });
exports.Aula.belongsTo(exports.Pabellon, { foreignKey: 'pab_id' });
exports.Aula.hasMany(exports.Reserva, { foreignKey: 'aula_id' });
exports.Reserva.belongsTo(exports.Aula, { foreignKey: 'aula_id' });
exports.TipoAula.hasMany(exports.Aula, { foreignKey: 'taula_id' });
exports.Aula.belongsTo(exports.TipoAula, { foreignKey: 'taula_id' });
exports.Usuario.hasMany(exports.Reserva, { foreignKey: 'usu_id' });
exports.Reserva.belongsTo(exports.Usuario, { foreignKey: 'usu_id' });
