//Service
const UnitService = require('../services/unitservice.js');
const _unitServiceInstance = new UnitService();

// OAuth Service
const OAuthService = require('../services/oauthservice.js');
const _oAuthServiceInstance = new OAuthService();

//Validation
const { check, validationResult } = require('express-validator');

module.exports = {unit_Save, unit_List, unit_Delete, unit_DropDown, unit_UploadFromExcel, unit_BatchSave};

// Document Type
async function unit_List( req, res ){
    var joResult;
    var errors = null;

    var oAuthResult = await _oAuthServiceInstance.verifyToken( req.headers['x-token'], req.headers['x-method'] );

    if( oAuthResult.status_code == "00" ){
        if( oAuthResult.token_data.status_code == "00" ){
            // Validate first
            var errors = validationResult(req).array();   
            
            if( errors.length != 0 ){
                joResult = JSON.stringify({
                    "status_code": "-99",
                    "status_msg":"Parameter value has problem",
                    "error_msg": errors
                });
            }else{                      
                joResult = await _unitServiceInstance.list(req.query);
                joResult.token_data = oAuthResult.token_data;
                joResult = JSON.stringify(joResult);
            }
        }else{
            joResult = JSON.stringify(oAuthResult);
        }   
    }else{
        joResult = JSON.stringify(oAuthResult);
    }    

    res.setHeader('Content-Type','application/json');
    res.status(200).send(joResult);
}

async function unit_DropDown( req, res ){
    var joResult;
    var errors = null;

    var oAuthResult = await _oAuthServiceInstance.verifyToken( req.headers['x-token'], req.headers['x-method'] );

    if( oAuthResult.status_code == "00" ){
        if( oAuthResult.token_data.status_code == "00" ){
            // Validate first
            var errors = validationResult(req).array();   
            
            if( errors.length != 0 ){
                joResult = JSON.stringify({
                    "status_code": "-99",
                    "status_msg":"Parameter value has problem",
                    "error_msg": errors
                });
            }else{                      
                joResult = await _unitServiceInstance.dropDownList(req.query);
                joResult.token_data = oAuthResult.token_data;
                joResult = JSON.stringify(joResult);
            }
        }else{
            joResult = JSON.stringify(oAuthResult);
        }   
    }else{
        joResult = JSON.stringify(oAuthResult);
    }    

    res.setHeader('Content-Type','application/json');
    res.status(200).send(joResult);
}

async function unit_Save(req, res){
    var joResult;
    var errors = null;

    var oAuthResult = await _oAuthServiceInstance.verifyToken( req.headers['x-token'], req.headers['x-method'] );    

    if( oAuthResult.status_code == "00" ){
        if( oAuthResult.token_data.status_code == "00" ){

            // Validate first
            var errors = validationResult(req).array();   
            
            if( errors.length != 0 ){
                joResult = JSON.stringify({
                    "status_code": "-99",
                    "status_msg":"Parameter value has problem",
                    "error_msg": errors
                });
            }else{      
                
                req.body.user_id = oAuthResult.token_data.result_verify.id;
                req.body.user_name = oAuthResult.token_data.result_verify.name;
                joResult = await _unitServiceInstance.save(req.body);
                joResult.token_data = oAuthResult.token_data;
                joResult = JSON.stringify(joResult);
            }

        }else{
            joResult = JSON.stringify(oAuthResult);
        }

    }else{
        joResult = JSON.stringify(oAuthResult);
    }  

    res.setHeader('Content-Type','application/json');
    res.status(200).send(joResult);
}

async function unit_Delete( req, res ){
    var joResult;
    var errors = null;

    var oAuthResult = await _oAuthServiceInstance.verifyToken( req.headers['x-token'], req.headers['x-method'] );

    if( oAuthResult.status_code == "00" ){
        if( oAuthResult.token_data.status_code == "00" ){

            // Validate first
            var errors = validationResult(req).array();   
            
            if( errors.length != 0 ){
                joResult = JSON.stringify({
                    "status_code": "-99",
                    "status_msg":"Parameter value has problem",
                    "error_msg": errors
                });
            }else{      
                req.params.user_id = oAuthResult.token_data.result_verify.id;
                req.params.user_name = oAuthResult.token_data.result_verify.name;
                joResult = await _unitServiceInstance.delete(req.params);
                joResult.token_data = oAuthResult.token_data;
                joResult = JSON.stringify(joResult);
            }

        }else{
            joResult = JSON.stringify(oAuthResult);
        }

    }else{
        joResult = JSON.stringify(oAuthResult);
    }

    res.setHeader('Content-Type','application/json');
    res.status(200).send(joResult);
}

async function unit_UploadFromExcel( req, res ){
    var joResult = {};
    var oAuthResult = await _oAuthServiceInstance.verifyToken( req.headers['x-token'], req.headers['x-method'] );

    if( oAuthResult.status_code == "00" ){
        if( oAuthResult.token_data.status_code == "00" ){
            req.body.user_id = oAuthResult.token_data.result_verify.id;
            req.body.id = oAuthResult.token_data.result_verify.id;
            await _unitServiceInstance.uploadFromExcel(req, res);
        }else{
            joResult = JSON.stringify(oAuthResult);
            res.setHeader('Content-Type','application/json');
            res.status(200).send(joResult);
        }
    }else{
        joResult = JSON.stringify(oAuthResult);
        res.setHeader('Content-Type','application/json');
        res.status(200).send(joResult);
    }    
}

async function unit_BatchSave( req, res ){
    var joResult = {};
    var oAuthResult = await _oAuthServiceInstance.verifyToken( req.headers['x-token'], req.headers['x-method'] );

    if( oAuthResult.status_code == "00" ){
        if( oAuthResult.token_data.status_code == "00" ){
            req.body.user_id = oAuthResult.token_data.result_verify.id;
            req.body.id = oAuthResult.token_data.result_verify.id;
            joResult = await _unitServiceInstance.batchSave(req.body);

            joResult = JSON.stringify(joResult);
            res.setHeader('Content-Type','application/json');
            res.status(200).send(joResult);
            
        }else{
            joResult = JSON.stringify(oAuthResult);
            res.setHeader('Content-Type','application/json');
            res.status(200).send(joResult);
        }
    }else{
        joResult = JSON.stringify(oAuthResult);
        res.setHeader('Content-Type','application/json');
        res.status(200).send(joResult);
    }    
}