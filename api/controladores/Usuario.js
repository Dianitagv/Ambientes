"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../configuracion/sequelize");
const Sequelize = require('sequelize');
const Op = Sequelize.Op; // Los operadores de comparacion de sequelize
exports.crearUsuario = (req, res) => {
    let objUsuario = sequelize_1.Usuario.build(req.body.usuario);
    objUsuario.setSaltYHash(req.body.usuario.usu_pass);
    /** Promesa que GUARDA el registro en la base de datos */
    objUsuario.save().then((usuarioCreado) => {
        sequelize_1.Usuario.findByPk(usuarioCreado.usu_id).then((usuarioEncontrado) => {
            res.status(201).json({
                message: 'Usuario creado',
                content: usuarioEncontrado
            });
        });
    }).catch((error) => {
        res.status(501).json({
            message: 'error',
            content: error
        });
    });
};
exports.encontrarUsuByNomOApe = (req, res) => {
    let busqueda = req.body.busqueda;
    sequelize_1.Usuario.findAll({
        where: {
            [Op.or]: [
                {
                    usu_nom: {
                        [Op.substring]: busqueda
                    }
                },
                {
                    usu_ape: {
                        [Op.substring]: busqueda
                    }
                }
            ]
        }
    }).then((rpta) => {
        res.json(rpta);
    });
};
exports.iniciarSesion = (req, res) => {
    let { usu_email, usu_pass } = req.body;
    /**Tenemos que encriptar la contraseña hexadecimal */
    let buff = Buffer.from(usu_pass, 'utf-8').toString('ascii');
    sequelize_1.Usuario.findOne({
        where: {
            usu_email: usu_email
        }
    }).then((objUsuario) => {
        if (objUsuario) {
            let validarPass = objUsuario.validPass(buff);
            if (validarPass) {
                let token = objUsuario.generarJWT();
                res.status(200).json({
                    message: 'ok',
                    token
                });
            }
            else {
                res.status(500).json({
                    message: 'error',
                    content: 'Usuario o contraseña incorrectos'
                });
            }
        }
        else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro el usuario'
            });
        }
    });
};
