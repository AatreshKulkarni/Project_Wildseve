'use strict';
var dbconn = require('../config/sshdbconn');
var async = require("async");
const ImageFunction = {};

const imagequery1 = "SELECT _TOP_LEVEL_AURI FROM ";
const imagequery2 = "MEDIA_HWCIMAGE1_BLB";
var formName;

ImageFunction.getForm = function (req, res) {
    const getFormsQuery = 'SELECT Table_name FROM forms WHERE Access = "N"';
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(getFormsQuery, function (error, result, fields) {
            if (error) {
                console.log({ success: false, data: error });
                return;
            } else {
                console.log({ success: true, data: result[0].Table_name });
                formName = result[0].Table_name.replace('CORE', '');
                getmetaIds(formName);
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

function getmetaIds(form) {
    const query = imagequery1 + form + imagequery2;
    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(query, function (error, result, fields) {
            if (error) {
                console.log({ success: false, data: error });
                return;
            } else {
                // console.log({ success: true, data: result });
                getImageFromProd(result);
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

function getImageFromProd(MetaIds) {
    async.each(MetaIds, function (meta_data, callback) {
        if (meta_data) {
            const imagequery = "SELECT VALUE FROM " + formName + "MEDIA_HWCIMAGE1_BLB WHERE _TOP_LEVEL_AURI = '" + meta_data._TOP_LEVEL_AURI + "'";
            dbconn.rdb.then(function (con_rdb) {
                con_rdb.query(imagequery, function (error, result, fields) {
                    if (error) {
                        console.log({ success: false, data: error });
                        return;
                    } else {
                        // console.log({ success: true, data: result });
                        if (result.length > 0)
                            insertImageToProd(result[0].VALUE, meta_data._TOP_LEVEL_AURI);
                        else
                            console.log({ success: true, data: 'NO IMAGE' });
                    }
                });
            }).catch(err => {
                console.log(err);
            });
        }
    }, function (err, data) {
        if (err)
            console.log(err);
        console.log({ success: true, data: 'END OF SYNC' });
    })
}

function insertImageToProd(Imagebuffer, META_ID) {
    const insertQuery = "INSERT IGNORE INTO hwc_case_image set ? ";
    const ID = META_ID.split(":");
    const insertImgSet = {
        HWC_META_ID: ID[1],
        HWC_CASE_IMAGE1: new Buffer(Imagebuffer, 'binary')
    }
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(insertQuery, insertImgSet, function (error, result, fields) {
            if (error) {
                console.log({ success: false, data: error });
                return;
            } else {
                console.log({ success: true, data: result.affectedRows });
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.func = ImageFunction;