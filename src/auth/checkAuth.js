'use strict'

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
}

const { findByID } = require('../services/apikey.service');

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();
        if (!key) {
            return res.status(403).json({
                message: 'Forbidden error' 
            });
        }

        // check objKey

        const objKey = await findByID(key);
        
        if (!objKey) {
            return res.status(403).json({
                message: 'Forbidden error >>>>>' 
            });
        }

        req.objKey = objKey;
        return next();

    } catch (error) {
        console.log(error);
    }
}

const permission = (permission) => {
    return (req, res, next) => {
        // check permission
        if(!req.objKey.permissions){
            return res.status(403).json({
                message: 'Permission lololol' 
            });
        }

        console.log('>>>>>>>>>>', req.objKey.permissions);
        const validPermission = req.objKey.permissions.includes(permission);
        if (!validPermission) {
            return res.status(403).json({
                message: 'Permission >>>>>>>>>>' 
            });
        }

        return next();
    }

}

module.exports = {
    apiKey,
    permission
};