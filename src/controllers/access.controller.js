'use strict';

const AccessService = require('../services/access.service');

class AccessController {
    Register = async (req, res, next) => {
        try {
            console.log(`[P]::Register`, req.body);
            // 200 : oke ; 201 : created
            return res.status(201).json(await AccessService.Register(req.body)); 
        } catch (error) {
            next(error);
        }
    }
}   

module.exports = new  AccessController();