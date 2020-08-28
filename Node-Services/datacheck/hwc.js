'use strict';
var dbconn = require('../config/sshdbconn');
var async = require("async");
var util = require('../utils/helper');
const global_const = require('../utils/global');
const log4js = require('log4js');

log4js.configure({
    appenders: { wildseve: { type: 'file', filename: 'WS.log' } },
    categories: { default: { appenders: ['wildseve'], level: 'all' } }
});

const logger = log4js.getLogger('wildseve');

const hwc_insertQuery = "INSERT IGNORE INTO hwc_details set ? ";
const hwc_insertFlaggedQuery = "INSERT IGNORE INTO hwc_details_flagged set ? ";
const hwc_crop_insertQuery = "INSERT IGNORE INTO hwc_case_crop set ? ";
const hwc_property_insertQuery = "INSERT IGNORE INTO hwc_case_property set ? ";
const hwc_livestock_insertQuery = "INSERT IGNORE INTO hwc_case_livestock set ? ";
const hwc_checkexistQuery = "SELECT *, CASE WHEN HWC_WSID = ? THEN 1 WHEN HWC_WSID = ? AND HWC_FULL_NAME = ? THEN 1 WHEN HWC_WSID = ? AND HWC_TALUK_NAME = ? THEN 1 WHEN HWC_WSID = ? AND HWC_VILLAGE_NAME = ? THEN 1 WHEN HWC_WSID = ? AND HWC_OLDPHONE_NUMBER = ? THEN 1 WHEN HWC_WSID = ? AND HWC_NEWPHONE_NUMBER = ? THEN 1 WHEN HWC_WSID = ? AND HWC_SURVEY_NUMBER = ? THEN 1 WHEN HWC_WSID = ? AND HWC_RANGE = ? THEN 1 WHEN HWC_WSID = ? AND HWC_FD_SUB_RANGE = ? THEN 1 ELSE 0 END AS \'PRESENT\' FROM (SELECT * FROM hwc_details WHERE HWC_WSID = ? || HWC_WSID = ? AND HWC_FULL_NAME = ? || HWC_WSID = ? AND HWC_TALUK_NAME = ? || HWC_WSID = ? AND HWC_VILLAGE_NAME = ? || HWC_WSID = ? AND HWC_OLDPHONE_NUMBER = ? || HWC_WSID = ? AND HWC_NEWPHONE_NUMBER = ? || HWC_WSID = ? AND HWC_SURVEY_NUMBER = ? || HWC_WSID = ? AND HWC_RANGE = ? || HWC_WSID = ? AND HWC_FD_SUB_RANGE = ?) AS RESULTSET";
const hwc_insert_dupQuery = "INSERT IGNORE INTO dup_hwc set ? ";
const hwc_check_recordExist = "SELECT count(*) as ISEXIST FROM odk.hwc_details where HWC_METAINSTANCE_ID = ? ";
const hwc = {};

var dataInserted = 1;
var dataFlagged = 1;
var counter = 1;

hwc.syncallhwcdetails = function (req, res) {
    logger.trace("> Began Syncing HWC...");
    console.log("Syncing HWC . . . . ");
    const fetchquery = "SELECT * FROM HWC" + global_const.CONST.HWC_FORM + "CORE C1 JOIN HWC" + global_const.CONST.HWC_FORM + "CORE2 C2 ON C1._URI = C2._PARENT_AURI JOIN HWC" + global_const.CONST.HWC_FORM + "CORE3 C3 ON C1._URI = C3._PARENT_AURI";
    // console.log(fetchquery);
    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(fetchquery, function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            checkhwcusercase(JSON.parse(JSON.stringify(results)));
        });
    }).catch(err => {
        console.log(err);
    });
}

hwc.setDupRecordDetails = function (req, res) {
    console.log("Inserting the Duplicate record in HWC . . . . ");
    const fetchErrorRecordquery = "SELECT * FROM HWC" + global_const.CONST.HWC_FORM + "CORE C1 JOIN HWC" + global_const.CONST.HWC_FORM + "CORE2 C2 ON C1._URI = C2._PARENT_AURI JOIN HWC" + global_const.CONST.HWC_FORM + "CORE3 C3 ON C1._URI = C3._PARENT_AURI WHERE C1._URI = ?";

    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(fetchErrorRecordquery, req.params.id, function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            res.send(JSON.stringify(results[0]));
            inserthwcusercase(JSON.parse(JSON.stringify(results[0])));
        });
    }).catch(err => {
        console.log(err);
    });
}

function checkhwcusercase(res) {
    logger.trace("HWC Records Available to Sync - " + res.length);
    console.log("NO Of HWC Records to Sync - " + res.length);
    dataInserted = 1;
    dataFlagged = 1;
    counter = 1;
    Array.from(res).forEach(ucdata => {
        if (ucdata.EXITINFO2_CONCAT_WSID) {
            dbconn.mdb.then(function (con_mdb) {
                con_mdb.query(hwc_checkexistQuery, insertionset(ucdata), function (error, ext_result, fields) {
                    if (error) {
                        console.log(error);
                        return;
                    } else {
                        var resp = JSON.parse(JSON.stringify(ext_result));
                        if (resp.length > 0) {
                            var exist = resp[0].PRESENT;
                            if (exist == 0) {
                                inserthwcusercase(ucdata);
                            }
                            else {
                                var MIN_ID = ucdata.META_INSTANCE_ID.split(":");
                                if (resp[0].HWC_METAINSTANCE_ID != MIN_ID[1]) {
                                    checkIfAlreadyInserted(resp[0].HWC_METAINSTANCE_ID, ucdata.META_INSTANCE_ID, ucdata);
                                } else {
                                    logger.trace(ucdata.META_INSTANCE_ID + ":: Already Synced :: " + counter);
                                    console.log(ucdata.META_INSTANCE_ID + ":: Already Synced :: " + counter++);
                                }
                            }
                        }
                        else {
                            inserthwcusercase(ucdata);
                        }
                    }
                });
            }).catch(err => {
                console.log(err);
            });
        } else {
            console.log("WSID is missing");
        }
    });
}

function checkIfAlreadyInserted(org_id, dup_id, flagModel) {
    var cleanID = dup_id.split(":");
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(hwc_check_recordExist, cleanID[1], function (error, isExist, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                var data = JSON.parse(JSON.stringify(isExist));
                // console.log(data[0].ISEXIST);
                if (data[0].ISEXIST == 0) {
                    insert_duplicates(org_id, dup_id);
                    insertflaggedhwcusercase(flagModel)
                }
                else {
                    logger.trace(dup_id + " :: Record Already Synced in DB");
                    console.log(dup_id + " Record Already Exist in RDB");
                }

            }
        });
    }).catch(err => {
        console.log(err);
    });
}

function insert_duplicates(org_id, dup_id) {
    const inserthwc_dupdataset = {
        HWC_ORG_METAID: org_id,
        HWC_DUP_METAID: dup_id,
        HWC_FORM_NAME: global_const.CONST.HWC_FORM
    }
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(hwc_insert_dupQuery, inserthwc_dupdataset, function (error, dup_result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (dup_result.affectedRows > 0) {
                    logger.trace(dup_id + " :: is Flagged HWC Record :: " + counter);
                    console.log("HWC Duplicate ID inserted :: " + counter++);
                }
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

function inserthwcusercase(ucdata) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(hwc_insertQuery, setHWCdata(ucdata), function (error, uc_result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (uc_result.affectedRows > 0) {
                    logger.trace(ucdata.META_INSTANCE_ID + " :: HWC Record inserted :: " + dataInserted);
                    console.log("HWC Record inserted :: " + dataInserted++);

                    insert_hwc_crop(ucdata);
                    insert_hwc_property(ucdata);
                    insert_hwc_livestock(ucdata);
                } else {
                    logger.trace(ucdata.META_INSTANCE_ID + " :: HWC Record Already Synced :: " + dataInserted);
                    console.log("HWC Record exists :: " + dataInserted++);
                }
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

function insertflaggedhwcusercase(ucdata) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(hwc_insertFlaggedQuery, setHWCdata(ucdata), function (error, uc_result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (uc_result.affectedRows > 0) {
                    logger.trace("Flagged HWC Record inserted :: " + dataFlagged);
                    console.log("Flagged HWC Record inserted :: " + dataFlagged++);
                    insert_hwc_crop(ucdata);
                    insert_hwc_property(ucdata);
                    insert_hwc_livestock(ucdata);
                } else {
                    logger.trace("Flagged HWC Record Already Synced :: " + dataFlagged);
                    console.log("Flagged HWC Record Already Synced :: " + dataFlagged++);
                }
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

function insert_hwc_crop(cropdata) {
    var insertcrop_data = [];
    var crop_counter = 1;
    for (var i = 1; i < 5; i++) {
        insertcrop_data[i - 1] = setHWC_cropdata(cropdata, i);
    }
    async.each(insertcrop_data, function (inc_data, callback) {
        if (inc_data) {
            dbconn.mdb.then(function (con_mdb) {
                con_mdb.query(hwc_crop_insertQuery, inc_data, function (error, crop_result, fields) {
                    if (error) {
                        console.log(error);
                        return;
                    } else {
                        if (crop_result.affectedRows > 0)
                            console.log(inc_data.HWC_META_ID + " :: " + inc_data.HWC_WSID + " :: CROP CASE inserted :: " + crop_counter++);
                        else
                            console.log(inc_data.HWC_META_ID + " - CR : No new records inserted.");
                    }
                });
            }).catch(err => {
                console.log(err);
            })
        }
    }, function (err, data) {
        if (err)
            console.log(err);
    })
}

function insert_hwc_property(pd_data) {
    var insertPD_data = [];
    for (var i = 1; i < 5; i++) {
        insertPD_data[i - 1] = setHWC_propertydata(pd_data, i);
    }
    async.each(insertPD_data, function (inpd_data, callback) {
        if (inpd_data) {
            dbconn.mdb.then(function (con_mdb) {
                con_mdb.query(hwc_property_insertQuery, inpd_data, function (error, property_result, fields) {
                    if (error) {
                        console.log(error);
                        return;
                    } else {
                        if (property_result.affectesRows > 0)
                            console.log(inpd_data.HWC_META_ID + " :: " + inpd_data.HWC_WSID + " :: PROPERTY CASE inserted :" + JSON.stringify(property_result.affectedRows));
                        else
                            console.log(inpd_data.HWC_META_ID + " - PD : No new records inserted.");
                    }
                });
            }).catch(err => {
                console.log(err);
            })
        }
    }, function (err, data) {
        if (err)
            console.log(err);
    })
}

function insert_hwc_livestock(lp_data) {
    var insertLP_data = [];
    for (var i = 1; i < 4; i++) {
        insertLP_data[i - 1] = setHWC_livestockdata(lp_data, i);
    }
    async.each(insertLP_data, function (inl_data, callback) {
        if (inl_data) {
            dbconn.mdb.then(function (con_mdb) {
                con_mdb.query(hwc_livestock_insertQuery, inl_data, function (error, livestock_result, fields) {
                    if (error) {
                        console.log(error);
                        return;
                    } else {
                        if (livestock_result.affectedRows > 0)
                            console.log(inl_data.HWC_META_ID + " :: " + inl_data.HWC_WSID + " :: LIVESTOCK CASE inserted:" + JSON.stringify(livestock_result.affectedRows));
                        else
                            console.log(inl_data.HWC_META_ID + " - LS : No new records inserted.");
                    }
                });
            }).catch(err => {
                console.log(err);
            })
        }
    }, function (err, data) {
        if (err)
            console.log(err);
    })
}

function setHWC_cropdata(hwcformdata, pos) {
    if (hwcformdata['HWCINFO_CR_GROUP_CR_GROUP' + pos + '_CROP_NAME' + pos]) {
        var MIN_ID = hwcformdata.META_INSTANCE_ID.split(":");
        const inserthwc_cropdataset = {
            HWC_META_ID: MIN_ID[1] + "_" + pos,
            HWC_PARENT_ID: MIN_ID[1],
            HWC_CASE_DATE: util.methods.GetFormattedDate(hwcformdata.HWCINFO_INCIDENTINFO_HWCDATE),
            HWC_WSID: hwcformdata.EXITINFO2_CONCAT_WSID,
            HWC_CROP_NAME: hwcformdata['HWCINFO_CR_GROUP_CR_GROUP' + pos + '_CROP_NAME' + pos],
            HWC_OTHER_CROP_NAME: hwcformdata['HWCINFO_CR_GROUP_CR_GROUP' + pos + '_OTHERCROP' + pos],
            HWC_AREA_GROWN: hwcformdata['HWCINFO_CR_GROUP_CR_GROUP' + pos + '_AREAGROWN_' + pos],
            HWC_AREA_DAMAGE: hwcformdata['HWCINFO_CR_GROUP_CR_GROUP' + pos + '_CROPAREADAMAGE' + pos],
            HWC_CROP_DAMAGE_AMOUNT: hwcformdata['HWCINFO_CR_GROUP_CR_GROUP' + pos + '_CROPESTAMT' + pos],
            HWC_CROP_GEO_SHAPE: hwcformdata['HWCINFO_CR_GROUP_CR_GROUP' + pos + '_CROPGEOSHAPE' + pos],
        }
        return inserthwc_cropdataset;
    }
    else return null;
}

function setHWC_propertydata(hwcformdata, pos) {

    var MIN_ID = hwcformdata.META_INSTANCE_ID.split(":");
    const inserthwc_property_dataset = {
        HWC_META_ID: MIN_ID[1] + "_" + pos,
        HWC_PARENT_ID: MIN_ID[1],
        HWC_CASE_DATE: util.methods.GetFormattedDate(hwcformdata.HWCINFO_INCIDENTINFO_HWCDATE),
        HWC_WSID: hwcformdata.EXITINFO2_CONCAT_WSID,
        HWC_PROPERY_NAME: hwcformdata['HWCINFO_PD_GROUP_PD_GROUP' + pos + '_PROPERTY_NAME' + pos],
        HWC_OTHER_PROPERTY_NAME: hwcformdata['HWCINFO_PD_GROUP_PD_GROUP' + pos + '_OTHERPROPERTY' + pos],
        HWC_PROPERTY_DAMAGE: hwcformdata['HWCINFO_PD_GROUP_PD_GROUP' + pos + '_PROPERTYDAMAGEEXTENT' + pos]
    }
    if (inserthwc_property_dataset.HWC_PROPERY_NAME)
        return inserthwc_property_dataset;
    else return null;
}

function setHWC_livestockdata(hwcformdata, pos) {

    var MIN_ID = hwcformdata.META_INSTANCE_ID.split(":");
    const inserthwc_livestock_dataset = {
        HWC_META_ID: MIN_ID[1] + "_" + pos,
        HWC_PARENT_ID: MIN_ID[1],
        HWC_CASE_DATE: util.methods.GetFormattedDate(hwcformdata.HWCINFO_INCIDENTINFO_HWCDATE),
        HWC_WSID: hwcformdata.EXITINFO2_CONCAT_WSID,
        HWC_LIVE_STOCK_NAME: hwcformdata['HWCINFO_LP_GROUP_LP_GROUP' + pos + '_LIVESTOCK_NAME' + pos],
        HWC_OTHER_LIVE_STOCK_NAME: hwcformdata['HWCINFO_LP_GROUP_LP_GROUP' + pos + '_OTHERLIVESTOCK' + pos],
        HWC_LIVE_STOCK_PREDATED_NUMBER: hwcformdata['HWCINFO_LP_GROUP_LP_GROUP' + pos + '_LIVESTOCKPREDATEDNUMBER' + pos]
    }
    if (inserthwc_livestock_dataset.HWC_LIVE_STOCK_NAME)
        return inserthwc_livestock_dataset;
    else return null;
}

function setHWCdata(hwcformdata) {

    var MIN_ID = hwcformdata.META_INSTANCE_ID.split(":");
    var animal = (!hwcformdata.HWCINFO_INCIDENTINFO_ANI_NAME) ? null : hwcformdata.HWCINFO_INCIDENTINFO_ANI_NAME.toLowerCase();

    if ((!animal) && animal == 'otheranimal')
        hwcformdata.HWCINFO_INCIDENTINFO_ANI_NAME = (!hwcformdata.HWCINFO_INCIDENTINFO_OTHERANIMAL) ? null : hwcformdata.HWCINFO_INCIDENTINFO_OTHERANIMAL.toLowerCase();


    const inserthwcdataset = {
        HWC_METAINSTANCE_ID: MIN_ID[1],
        HWC_METAMODEL_VERSION: hwcformdata._MODEL_VERSION,
        HWC_METAUI_VERSION: hwcformdata._UI_VERSION,
        HWC_METASUBMISSION_DATE: util.methods.GetFormattedDate(hwcformdata._SUBMISSION_DATE),
        HWC_WSID: hwcformdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
        HWC_FIRST_NAME: hwcformdata.EXITINFO2_CONCAT_FIRSTNAME,
        HWC_FULL_NAME: hwcformdata.EXITINFO2_CONCAT_FULLNAME,
        HWC_PARK_NAME: (!hwcformdata.EXITINFO2_CONCAT_PARK) ? null : util.methods.format_park(hwcformdata.EXITINFO2_CONCAT_PARK),
        HWC_TALUK_NAME: (!hwcformdata.EXITINFO2_CONCAT_TALUK) ? null : util.methods.format_taluk(hwcformdata.EXITINFO2_CONCAT_TALUK),
        HWC_VILLAGE_NAME: (!hwcformdata.EXITINFO2_CONCAT_VILLAGE) ? null : hwcformdata.EXITINFO2_CONCAT_VILLAGE.toLowerCase(),
        HWC_OLDPHONE_NUMBER: hwcformdata.EXITINFO2_CONCAT_OLDPHNUM,
        HWC_NEWPHONE_NUMBER: hwcformdata.EXITINFO2_CONCAT_NEWPHNUM,
        HWC_SURVEY_NUMBER: (!hwcformdata.EXITINFO2_CONCAT_SURVEYNUM) ? null : hwcformdata.EXITINFO2_CONCAT_SURVEYNUM.replace("-", "/"),
        HWC_RANGE: (!hwcformdata.HWCINFO_RANGE) ? null : util.methods.format_range(hwcformdata.HWCINFO_RANGE),
        HWC_LATITUDE: hwcformdata.HWCINFO_SPATIALINFO_GPS_POINT_LAT,
        HWC_LONGITUDE: hwcformdata.HWCINFO_SPATIALINFO_GPS_POINT_LNG,
        HWC_ALTITUDE: hwcformdata.HWCINFO_SPATIALINFO_GPS_POINT_ALT,
        HWC_ACCURACY: hwcformdata.HWCINFO_SPATIALINFO_GPS_POINT_ACC,
        HWC_CASE_DATE: util.methods.GetFormattedDate(hwcformdata.HWCINFO_INCIDENTINFO_HWCDATE),
        HWC_CASE_CATEGORY: (!hwcformdata.HWCINFO_INCIDENTINFO_HWC_CAT) ? null : hwcformdata.HWCINFO_INCIDENTINFO_HWC_CAT.toUpperCase(),
        HWC_ANIMAL: (!hwcformdata.HWCINFO_INCIDENTINFO_ANI_NAME) ? null : hwcformdata.HWCINFO_INCIDENTINFO_ANI_NAME.toLowerCase(),
        // HWC_OTHER_ANIMAL: (!hwcformdata.HWCINFO_INCIDENTINFO_OTHERANIMAL) ? null : hwcformdata.HWCINFO_INCIDENTINFO_OTHERANIMAL.toLowerCase(),
        HWC_HI_NAME: (!hwcformdata.HWCINFO_HIINFO_HINAME) ? null : hwcformdata.HWCINFO_HIINFO_HINAME.toLowerCase(),
        HWC_HI_VILLAGE: (!hwcformdata.HWCINFO_HIINFO_HIVILLAGE) ? null : hwcformdata.HWCINFO_HIINFO_HIVILLAGE.toLowerCase(),
        HWC_HI_AREA: hwcformdata.HWCINFO_HIINFO_HIAREA,
        HWC_HI_DETAILS: hwcformdata.HWCINFO_HIINFO_HIDETAILS,
        HWC_HD_NAME: (!hwcformdata.HWCINFO_HDINFO_HDNAME) ? null : hwcformdata.HWCINFO_HDINFO_HDNAME.toLowerCase(),
        HWC_HD_VILLAGE: (!hwcformdata.HWCINFO_HDINFO_HDVILLAGE) ? null : hwcformdata.HWCINFO_HDINFO_HDVILLAGE.toLowerCase(),
        HWC_HD_DETAILS: hwcformdata.HWCINFO_HDINFO_HDDETAILS,
        HWC_COMMENT: (!hwcformdata.EXITINFO1_ADDCOMMENTS) ? null : hwcformdata.EXITINFO1_ADDCOMMENTS.toLowerCase(),
        HWC_FD_SUB_DATE: util.methods.GetFormattedDate(hwcformdata.FDSUBMISSION_DATE_FDSUB),
        HWC_FD_SUB_RANGE: (!hwcformdata.FDSUBMISSION_RANGE_FDSUB) ? null : util.methods.format_range(hwcformdata.FDSUBMISSION_RANGE_FDSUB),
        HWC_FD_NUM_FORMS: hwcformdata.FDSUBMISSION_NUMFORMS_FDSUB,
        HWC_FD_COMMENT: (!hwcformdata.EXITINFO2_ADDCOMMENTS2) ? null : hwcformdata.EXITINFO2_ADDCOMMENTS2.toLowerCase(),
        HWC_START: util.methods.GetFormattedDate(hwcformdata.START),
        HWC_END: util.methods.GetFormattedDate(hwcformdata.END),
        HWC_DEVICE_ID: hwcformdata.DEVICEID,
        HWC_SIMCARD_ID: hwcformdata.SIMSERIAL,
        HWC_FA_PHONE_NUMBER: hwcformdata.PHONENUMBER,
        HWC_USER_NAME: (!hwcformdata.USERNAME) ? null : hwcformdata.USERNAME.toLowerCase(),
        HWC_CASE_TYPE: (!hwcformdata.WILDSEVEIDDETAILS_CASE_WSIDINFO) ? null : hwcformdata.WILDSEVEIDDETAILS_CASE_WSIDINFO.toLowerCase(),
        HWC_FORM_NAME: global_const.CONST.HWC_FORM
    }

    return inserthwcdataset;
}

hwc.getRawImage = function (req, res) {

    const hwc_imagequery = "SELECT VALUE FROM HWC" + [req.params.form] + "MEDIA_HWCIMAGE" + [req.params.index] + "_BLB where _TOP_LEVEL_AURI = ?";
    console.log(hwc_imagequery);
    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(hwc_imagequery, [req.params.metaid], function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (results.length > 0) {
                    var img_buf = JSON.parse(JSON.stringify(results[0].VALUE));
                    img1 = !img_buf ? null : new Buffer(img_buf.data, 'binary').toString('base64');
                    res.send({ success: true, data: img1 });
                } else {
                    res.send({ success: false, data: JSON.stringify("No Image Available") });
                }
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

hwc.getFDSubImage = function (req, res) {

    const hwc_imagequery = "SELECT VALUE FROM HWC" + [req.params.form] + "FDSUBMISSION_SUBIMAGE" + [req.params.index] + "_BLB where _TOP_LEVEL_AURI = ?";
    console.log(hwc_imagequery);
    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(hwc_imagequery, [req.params.metaid], function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (results.length > 0) {
                    var img_buf = JSON.parse(JSON.stringify(results[0].VALUE));
                    img1 = !img_buf ? null : new Buffer(img_buf.data, 'binary').toString('base64');
                    res.send({ success: true, data: img1 });
                } else {
                    res.send({ success: false, data: JSON.stringify("No Image Available") });
                }
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

hwc.getSignImage = function (req, res) {

    const hwc_imagequery = "SELECT VALUE FROM HWC" + [req.params.form] + "EXITINFO_RESPSIGN_BLB where _TOP_LEVEL_AURI = ?";
    console.log(hwc_imagequery);
    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(hwc_imagequery, [req.params.metaid], function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (results.length > 0) {
                    var img_buf = JSON.parse(JSON.stringify(results[0].VALUE));
                    img1 = !img_buf ? null : new Buffer(img_buf.data, 'binary').toString('base64');
                    res.send({ success: true, data: img1 });
                } else {
                    res.send({ success: false, data: JSON.stringify("No Image Available") });
                }
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

hwc.getRespImage = function (req, res) {

    const hwc_imagequery = "SELECT VALUE FROM HWC" + [req.params.form] + "EXITINFO_RESPPHOTO_BLB where _TOP_LEVEL_AURI = ?";
    console.log(hwc_imagequery);
    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(hwc_imagequery, [req.params.metaid], function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (results.length > 0) {
                    var img_buf = JSON.parse(JSON.stringify(results[0].VALUE));
                    img1 = !img_buf ? null : new Buffer(img_buf.data, 'binary').toString('base64');
                    res.send({ success: true, data: img1 });
                } else {
                    res.send({ success: false, data: JSON.stringify("No Image Available") });
                }
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

hwc.getFDAckImage = function (req, res) {

    const hwc_imagequery = "SELECT VALUE FROM HWC" + [req.params.form] + "FDSUBMISSION_ACK_IMAGE_BLB where _TOP_LEVEL_AURI = ?";
    console.log(hwc_imagequery);
    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(hwc_imagequery, [req.params.metaid], function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (results.length > 0) {
                    var img_buf = JSON.parse(JSON.stringify(results[0].VALUE));
                    img1 = !img_buf ? null : new Buffer(img_buf.data, 'binary').toString('base64');
                    res.send({ success: true, data: img1 });
                } else {
                    res.send({ success: false, data: JSON.stringify("No Image Available") });
                }
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

function insertionset(ucdata) {
    try {
        const ins_set = [
            (!ucdata.EXITINFO2_CONCAT_WSID) ? "" : ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            (!ucdata.EXITINFO2_CONCAT_WSID) ? "" : ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            ucdata.EXITINFO2_CONCAT_FULLNAME,
            (!ucdata.EXITINFO2_CONCAT_WSID) ? "" : ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            (!ucdata.EXITINFO2_CONCAT_TALUK) ? null : util.methods.format_taluk(ucdata.EXITINFO2_CONCAT_TALUK),
            (!ucdata.EXITINFO2_CONCAT_WSID) ? "" : ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            (!ucdata.EXITINFO2_CONCAT_VILLAGE) ? null : ucdata.EXITINFO2_CONCAT_VILLAGE.toLowerCase(),
            (!ucdata.EXITINFO2_CONCAT_WSID) ? "" : ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            ucdata.EXITINFO2_CONCAT_OLDPHNUM,
            (!ucdata.EXITINFO2_CONCAT_WSID) ? "" : ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            ucdata.EXITINFO2_CONCAT_NEWPHNUM,
            (!ucdata.EXITINFO2_CONCAT_WSID) ? "" : ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            (!ucdata.EXITINFO2_CONCAT_SURVEYNUM) ? null : ucdata.EXITINFO2_CONCAT_SURVEYNUM.replace("-", "/"),
            (!ucdata.EXITINFO2_CONCAT_WSID) ? "" : ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            (!ucdata.HWCINFO_RANGE) ? null : util.methods.format_range(ucdata.HWCINFO_RANGE),
            (!ucdata.EXITINFO2_CONCAT_WSID) ? "" : ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            (!ucdata.FDSUBMISSION_RANGE_FDSUB) ? null : util.methods.format_range(ucdata.FDSUBMISSION_RANGE_FDSUB),
            //WHERE CLAUSE
            (!ucdata.EXITINFO2_CONCAT_WSID) ? "" : ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            (!ucdata.EXITINFO2_CONCAT_WSID) ? "" : ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            ucdata.EXITINFO2_CONCAT_FULLNAME,
            (!ucdata.EXITINFO2_CONCAT_WSID) ? "" : ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            (!ucdata.EXITINFO2_CONCAT_TALUK) ? null : util.methods.format_taluk(ucdata.EXITINFO2_CONCAT_TALUK),
            (!ucdata.EXITINFO2_CONCAT_WSID) ? "" : ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            (!ucdata.EXITINFO2_CONCAT_VILLAGE) ? null : ucdata.EXITINFO2_CONCAT_VILLAGE.toLowerCase(),
            (!ucdata.EXITINFO2_CONCAT_WSID) ? "" : ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            ucdata.EXITINFO2_CONCAT_OLDPHNUM,
            (!ucdata.EXITINFO2_CONCAT_WSID) ? "" : ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            ucdata.EXITINFO2_CONCAT_NEWPHNUM,
            (!ucdata.EXITINFO2_CONCAT_WSID) ? "" : ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            (!ucdata.EXITINFO2_CONCAT_SURVEYNUM) ? null : ucdata.EXITINFO2_CONCAT_SURVEYNUM.replace("-", "/"),
            (!ucdata.EXITINFO2_CONCAT_WSID) ? "" : ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            (!ucdata.HWCINFO_RANGE) ? null : util.methods.format_range(ucdata.HWCINFO_RANGE),
            (!ucdata.EXITINFO2_CONCAT_WSID) ? "" : ucdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            (!ucdata.FDSUBMISSION_RANGE_FDSUB) ? null : util.methods.format_range(ucdata.FDSUBMISSION_RANGE_FDSUB)
        ];
        return ins_set;
    }
    catch (e) {
        console.log("Some Exception Occured" + e);
    }
}

exports.func = hwc;