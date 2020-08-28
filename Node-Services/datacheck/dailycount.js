const dbconn = require('../config/sshdbconn');
const helper = require('../utils/helper');
const global_const = require('../utils/global');
const util = require('../utils/helper');
const log4js = require('log4js');

log4js.configure({
    appenders: { wildseve: { type: 'file', filename: 'WS.log' } },
    categories: { default: { appenders: ['wildseve'], level: 'all' } }
});

const logger = log4js.getLogger('wildseve');

const insertQuery = "INSERT IGNORE INTO daily_count set ? ";
const insertFAQuery = "INSERT IGNORE INTO dc_cases set ? ";

const dc = {};

dc.syncformdailyusers = function (req, res, next) {
    const fetchQuery = "SELECT * FROM DAILY_COUNT" + global_const.CONST.HWC_FORM + "CORE";
    console.log("Syncing Daily Count . . . .");
    logger.trace("Syncing Daily Count . . . . ");
    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(fetchQuery, function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                sortdata(JSON.parse(JSON.stringify(data)));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

function sortdata(res) {
    var counter = 1;
    logger.trace("DailyCount Records available to Sync - " + res.length);
    console.log("No Of DailyRecords to sync :: " + res.length);
    Array.from(res).forEach(data => {
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(insertQuery, setDAO(data), function (error, dao_result, fields) {
                if (error) {
                    console.log(error);
                    return;
                } else {
                    for (i = 1; i < 11; i++) {
                        insertFAdata(data, i);
                    }
                    if (dao_result.affectedRows > 0){
                        logger.trace("DAILY COUNT record inserted : " + counter);
                        console.log("DAILY COUNT record inserted : " + counter++);
                    }
                }
            });
        }).catch(err => {
            console.log(err);
        });
    });
}

function insertFAdata(res, pos) {
    var insertCounter = 1;
    if (res['ACTIVE_FA_FA_' + pos + '_FA_NAME_' + pos]) {
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(insertFAQuery, setFA(res, pos), function (err, fa_result, fields) {
                if (err) {
                    console.log(error);
                    return;
                } else {
                    if (fa_result.affectedRows > 0){
                        logger.trace("FA record inserted : " + pos + " :: " + insertCounter);
                        console.log("FA record inserted : " + pos + " :: " + insertCounter++);
                    }
                }
            });
        });
    }
}

function setDAO(data) {
    try {
        var MIN_ID = data._URI.split(":");

        var insertquery = {
            DC_METAINSTANCE_ID: MIN_ID[1],
            DC_FILLIN_DATE: util.methods.GetFormattedDate(data.TODAY),
            DC_DEVICE_ID: data.DEVICEID,
            DC_SIMCARD_ID: data.SIMSERIAL,
            DC_PHONE_NUMBER: data.PHONENUMBER,
            DC_USER_NAME: data.USERNAME,
            DC_CASE_DATE: util.methods.GetFormattedDate(data.DETAILS_DC_DATE),
            DC_NH_CASES: data.DETAILS_NH_CASES,
            DC_BP_CASES: data.DETAILS_BP_CASES,
            DC_TOTAL_CASES: data.DETAILS_NH_CASES + data.DETAILS_BP_CASES,
            DC_CASE_ID: MIN_ID[1] + "_" + data.USERNAME
        };

        return insertquery;
    } catch (e) {
        console.log("Some Exception Occured" + e);
    }
}

function setFA(data, i) {
    try {
        var MIN_ID = data._URI.split(":");
        const FA_CR = ['ACTIVE_FA_FA_' + i + '_FA_CASES_' + i + '_FA_CR_' + i];
        const FA_PD = ['ACTIVE_FA_FA_' + i + '_FA_CASES_' + i + '_FA_PD_' + i];
        const FA_CRPD = ['ACTIVE_FA_FA_' + i + '_FA_CASES_' + i + '_FA_CRPD_' + i];
        const FA_LP = ['ACTIVE_FA_FA_' + i + '_FA_CASES_' + i + '_FA_LP_' + i];
        const FA_HI = ['ACTIVE_FA_FA_' + i + '_FA_CASES_' + i + '_FA_HI_' + i];
        const FA_HD = ['ACTIVE_FA_FA_' + i + '_FA_CASES_' + i + '_FA_HD_' + i];
        const FA_CT = ['ACTIVE_FA_FA_' + i + '_FA_CASETOTCALC_' + i];
        const FA_NAME = ['ACTIVE_FA_FA_' + i + '_FA_NAME_' + i];
        var insertcasesquery = {
            DC_CROP: data[FA_CR],
            DC_CROP_PROPERTY: data[FA_PD],
            DC_PROPERTY: data[FA_CRPD],
            DC_LIVESTOCK: data[FA_LP],
            DC_HUMAN_INJURY: data[FA_HI],
            DC_HUMAN_DEATH: data[FA_HD],
            DC_TOTAL_ATTENDED_CASE: data[FA_CT],
            DC_CASE_ID: MIN_ID[1] + "_" + data.USERNAME,
            DC_FA_ID: MIN_ID[1] + "_" + data[FA_NAME],
            DC_FA_UN: data[FA_NAME],
            DC_CASE_DATE: util.methods.GetFormattedDate(data.DETAILS_DC_DATE)
        }
        return insertcasesquery;
    } catch (e) {
        console.log("Some Exception Occured" + e);
    }
}

exports.func = dc;