const db_model = require('../utils/query_model');
const dbconn = require('../config/sshdbconn');
const util = require('../utils/helper');
var async = require("async");
const myfunctions = {};

myfunctions.get_errorRecords = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.getErrorRecordIDs, function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else {
                //    console.log(results);
                res.send(util.methods.setresponse(results));
            }
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });
}

myfunctions.update_errorRecord = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.updateErrorRecord, [req.params.status,req.params.id], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else
                res.send(util.methods.setresponse(results));
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });
}

myfunctions.get_hwcDuplicateData = function (req, res, next) {

    var getDuplicateData = "SELECT * FROM HWC"+[req.params.form]+"CORE C1 JOIN HWC"+[req.params.form]+"CORE2 C2 ON C1._URI = C2._PARENT_AURI JOIN HWC"+[req.params.form]+"CORE3 C3 ON C3._PARENT_AURI = C1._URI WHERE C1._URI = ? ";

    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(getDuplicateData, [req.params.id], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else {
                // console.log(results[0]);
                res.send(util.methods.setresponse(setHWCdata(results[0])));
            }
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });
}

myfunctions.get_markDuplicateData = async function (req, res, next) {
    var allres;
    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(db_model.sqlquery.getDuplicateData, [req.body.flagid], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else {                
                allres=results;
                // console.log(results[0]);
                // console.log(allres);
            }
        });
        con_mdb.query(db_model.sqlquery.getParentData, [req.body.orgid], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else {
                // res.send(util.methods.setresponse(results));
                if(allres !== null && allres !== ' ' )
                res.send(util.methods.setresponse(markHWCdata(allres[0], results[0])));
                else
                res.send(util.methods.setresponse("RETRY"));
            }
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });    
}

myfunctions.update_WildseveUserRecord = function (req, res, next) {
    console.log("ID: " +  req.body.HWC_METAINSTANCE_ID);
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.updateWildseveUser, [req.body, req.body.HWC_METAINSTANCE_ID], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else
                res.send(util.methods.setresponse(results));
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });
}

myfunctions.get_hwcParentData = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.getParentData, [req.params.id], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else {
                res.send(util.methods.setresponse(results));
            }
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });
}

myfunctions.get_hwcFlaggedData = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.getFlaggedData, [req.params.id], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else {
                res.send(util.methods.setresponse(results));
            }
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });
}

myfunctions.insert_hwcFlaggedData = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.transferFlaggedRecord, [req.params.id], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else {
                res.send(util.methods.setresponse(results));
            }
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });
}


myfunctions.update_hwcParentData = function (req, res, next) {
    console.log("ID: " +  req.body.HWC_METAINSTANCE_ID);
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.updateParentData, [req.body, req.body.HWC_METAINSTANCE_ID], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else
                res.send(util.methods.setresponse(results));
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });
}

myfunctions.update_hwcFlaggedData = function (req, res, next) {
    console.log("ID: " +  req.body.HWC_METAINSTANCE_ID);
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.updateFlaggedData, [req.body, req.body.HWC_METAINSTANCE_ID], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else
                res.send(util.methods.setresponse(results));
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });
}

myfunctions.update_hwcCropData = function (req, res, next) {
    console.log("ID: " + req.body.HWC_META_ID);
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.updateCropData, [req.body, req.body.HWC_META_ID], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else
                res.send(util.methods.setresponse(results));
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });
}


myfunctions.update_hwcLivestockData = function (req, res, next) {
    console.log("ID: " + req.body.HWC_META_ID);
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.updateLivestockData, [req.body, req.body.HWC_META_ID], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else
                res.send(util.methods.setresponse(results));
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });
}

myfunctions.update_hwcPropertyData = function (req, res, next) {
    console.log("ID: " + req.body.HWC_META_ID);
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.updatePropertyData, [req.body, req.body.HWC_META_ID], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else
                res.send(util.methods.setresponse(results));
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(error));
        return;
    });
}


function setHWCdata(hwcformdata) {
    try {
        var MIN_ID = hwcformdata.META_INSTANCE_ID.split(":");

        var animal = (!hwcformdata.HWCINFO_INCIDENTINFO_ANI_NAME) ? null : hwcformdata.HWCINFO_INCIDENTINFO_ANI_NAME.toLowerCase();
        if ( (!animal) && animal == 'otheranimal')
            hwcformdata.HWCINFO_INCIDENTINFO_ANI_NAME = (!hwcformdata.HWCINFO_INCIDENTINFO_OTHERANIMAL) ? null : hwcformdata.HWCINFO_INCIDENTINFO_OTHERANIMAL.toLowerCase();


        const inserthwcdataset = {
            HWC_METAINSTANCE_ID: MIN_ID[1],
            HWC_METAMODEL_VERSION: hwcformdata._MODEL_VERSION,
            HWC_METAUI_VERSION: hwcformdata._UI_VERSION,
            HWC_METASUBMISSION_DATE: util.methods.GetFormattedDate(hwcformdata._SUBMISSION_DATE),
            HWC_WSID: (!hwcformdata.EXITINFO2_CONCAT_WSID)?null:hwcformdata.EXITINFO2_CONCAT_WSID.toUpperCase(),
            HWC_FIRST_NAME: (!hwcformdata.EXITINFO2_CONCAT_FIRSTNAME)?"":hwcformdata.EXITINFO2_CONCAT_FIRSTNAME,
            HWC_LAST_NAME: (!hwcformdata.EXITINFO2_CONCAT_LASTNAME)?"":hwcformdata.EXITINFO2_CONCAT_LASTNAME,
            HWC_FULL_NAME: (!hwcformdata.EXITINFO2_CONCAT_FULLNAME)?"":hwcformdata.EXITINFO2_CONCAT_FULLNAME,
            HWC_PARK_NAME: util.methods.format_park(hwcformdata.EXITINFO2_CONCAT_PARK),
            HWC_TALUK_NAME: util.methods.format_taluk(hwcformdata.EXITINFO2_CONCAT_TALUK),
            HWC_VILLAGE_NAME: (!hwcformdata.EXITINFO2_CONCAT_VILLAGE) ? null : hwcformdata.EXITINFO2_CONCAT_VILLAGE.toLowerCase(),
            HWC_OLDPHONE_NUMBER: hwcformdata.EXITINFO2_CONCAT_OLDPHNUM,
            HWC_NEWPHONE_NUMBER: hwcformdata.EXITINFO2_CONCAT_NEWPHNUM,
            HWC_SURVEY_NUMBER: (!hwcformdata.EXITINFO2_CONCAT_SURVEYNUM)?null:hwcformdata.EXITINFO2_CONCAT_SURVEYNUM.replace("-", "/"),
            HWC_RANGE: util.methods.format_range(hwcformdata.HWCINFO_RANGE),
            HWC_LATITUDE: hwcformdata.HWCINFO_SPATIALINFO_GPS_POINT_LAT,
            HWC_LONGITUDE: hwcformdata.HWCINFO_SPATIALINFO_GPS_POINT_LNG,
            HWC_ALTITUDE: hwcformdata.HWCINFO_SPATIALINFO_GPS_POINT_ALT,
            HWC_ACCURACY: hwcformdata.HWCINFO_SPATIALINFO_GPS_POINT_ACC,
            HWC_CASE_DATE: util.methods.GetFormattedDate(hwcformdata.HWCINFO_INCIDENTINFO_HWCDATE),
            HWC_CASE_CATEGORY: (!hwcformdata.HWCINFO_INCIDENTINFO_HWC_CAT)?null:hwcformdata.HWCINFO_INCIDENTINFO_HWC_CAT.toUpperCase(),
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
            HWC_FD_SUB_RANGE: util.methods.format_range(hwcformdata.FDSUBMISSION_RANGE_FDSUB),
            HWC_FD_NUM_FORMS: hwcformdata.FDSUBMISSION_NUMFORMS_FDSUB,
            HWC_FD_COMMENT: (!hwcformdata.EXITINFO2_ADDCOMMENTS2) ? null : hwcformdata.EXITINFO2_ADDCOMMENTS2.toLowerCase(),
            HWC_START: util.methods.GetFormattedDate(hwcformdata.START),
            HWC_END: util.methods.GetFormattedDate(hwcformdata.END),
            HWC_DEVICE_ID: hwcformdata.DEVICEID,
            HWC_SIMCARD_ID: hwcformdata.SIMSERIAL,
            HWC_FA_PHONE_NUMBER: hwcformdata.PHONENUMBER,
            HWC_USER_NAME: (!hwcformdata.USERNAME) ? null : hwcformdata.USERNAME.toLowerCase(),
            HWC_CASE_TYPE: (!hwcformdata.WILDSEVEIDDETAILS_CASE_WSIDINFO) ? null : hwcformdata.WILDSEVEIDDETAILS_CASE_WSIDINFO.toLowerCase()
        }

        return inserthwcdataset;
    }
    catch (e) {
        console.log("Some Exception Occured" + e);
    }
}

function markHWCdata(flagdata, origindata) {
    try {
        // console.log(flagdata.EXITINFO2_CONCAT_WSID.toUpperCase() +'::'+ origindata.HWC_WSID);
        const inserthwcdataset = {
            HWC_WSID: flagdata.EXITINFO2_CONCAT_WSID.toUpperCase() === origindata.HWC_WSID ? 1: 0,
            HWC_FIRST_NAME: flagdata.EXITINFO2_CONCAT_FIRSTNAME === origindata.HWC_FIRST_NAME ? 1: 0,
            HWC_LAST_NAME: flagdata.EXITINFO2_CONCAT_LASTNAME === origindata.HWC_LAST_NAME ? 1: 0,
            HWC_FULL_NAME: flagdata.EXITINFO2_CONCAT_FULLNAME === origindata.HWC_FULL_NAME ? 1: 0,
            HWC_PARK_NAME: util.methods.format_park(flagdata.EXITINFO2_CONCAT_PARK) === origindata.HWC_PARK_NAME ? 1: 0,
            HWC_TALUK_NAME: util.methods.format_taluk(flagdata.EXITINFO2_CONCAT_TALUK) === origindata.HWC_TALUK_NAME ? 1: 0,
            HWC_VILLAGE_NAME: (!flagdata.EXITINFO2_CONCAT_VILLAGE) ? 0 : flagdata.EXITINFO2_CONCAT_VILLAGE.toLowerCase() === origindata.HWC_VILLAGE_NAME ? 1: 0,
            HWC_OLDPHONE_NUMBER: flagdata.EXITINFO2_CONCAT_OLDPHNUM === origindata.HWC_OLDPHONE_NUMBER ? 1: 0,
            HWC_NEWPHONE_NUMBER: flagdata.EXITINFO2_CONCAT_NEWPHNUM === origindata.HWC_NEWPHONE_NUMBER ? 1: 0,
            HWC_SURVEY_NUMBER: (flagdata.EXITINFO2_CONCAT_SURVEYNUM.replace("-", "/")) === origindata.HWC_SURVEY_NUMBER ? 1: 0,
            HWC_RANGE: util.methods.format_range(flagdata.HWCINFO_RANGE) === origindata.HWC_RANGE ? 1: 0,
            HWC_FD_SUB_RANGE: util.methods.format_range(flagdata.FDSUBMISSION_RANGE_FDSUB) === origindata.HWC_FD_SUB_RANGE ? 1: 0
           }
        return inserthwcdataset;
    }
    catch (e) {
        console.log("Some Exception Occured" + e);
    }
}

exports.caller = myfunctions;