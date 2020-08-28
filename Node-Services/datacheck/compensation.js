var dbconn = require('../config/sshdbconn');
const helper = require('../utils/helper');
const global_const = require('../utils/global');
const log4js = require('log4js');

log4js.configure({
    appenders: { wildseve: { type: 'file', filename: 'WS.log' } },
    categories: { default: { appenders: ['wildseve'], level: 'all' } }
});

const logger = log4js.getLogger('wildseve');

const com_insertQuery = "INSERT IGNORE INTO compensation_details set ? ";
const om_cases_insertQuery = "INSERT IGNORE INTO com_cases_details set ? ";
const Taluk_Query = "SELECT * FROM wls_taluk";// WHERE OLD_T_NAME = ";
const comp = {};
var taluk_list = [];

comp.syncallcompensationdetails = function (req, res) {
    logger.trace("> Began Syncing Compensation Records... ");
    console.log("Syncing Compensation . . . .");
    const fetchquery = "SELECT * FROM COMP" + global_const.CONST.HWC_FORM + "CORE c1 JOIN COMP" + global_const.CONST.HWC_FORM + "CORE2 c2 ON c1._URI = c2._PARENT_AURI JOIN COMP" + global_const.CONST.HWC_FORM + "CORE3 c3 ON c1._URI = c3._PARENT_AURI";

    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(fetchquery, function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            sortdata(JSON.parse(JSON.stringify(results)));
        });
    }).catch(err => {
        console.log(err);
    });
}

comp.getRawImage = function (req, res) {

    const comp_imagequery = "SELECT VALUE FROM COMP" + [req.params.form] + "OMDETAILS_OM_IMAGE" + [req.params.index] + "_BLB where _TOP_LEVEL_AURI = ?";
    console.log(comp_imagequery);
    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(comp_imagequery, [req.params.metaid], function (error, results, fields) {
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

function getotherdata(data, pos, caseCounter) {

    const CR_QUERY = "SELECT VALUE AS 'CROP_NAME' FROM COMP" + global_const.CONST.HWC_FORM + "COMPDETAILS_COMP_SET_" + pos + "_CROP_NAME_" + pos + " WHERE _PARENT_AURI=\'" + data.META_INSTANCE_ID + "\'";;
    const LS_QUERY = "SELECT VALUE AS 'LIVESTOCK_NAME' FROM COMP" + global_const.CONST.HWC_FORM + "COMPDETAILS_COMP_SET_" + pos + "_LIVESTOCK_NAME_" + pos + " WHERE _PARENT_AURI=\'" + data.META_INSTANCE_ID + "\'";;
    const PR_QUERY = "SELECT VALUE AS 'PROPERTY_NAME' FROM COMP" + global_const.CONST.HWC_FORM + "COMPDETAILS_COMP_SET_" + pos + "_PROPERTY_NAME_" + pos + " WHERE _PARENT_AURI=\'" + data.META_INSTANCE_ID + "\'";;

    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(CR_QUERY, function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            const CR = JSON.parse(JSON.stringify(results));
            data['CROP_NAME'] = (CR[0]) ? CR[0].CROP_NAME : null;
        });
    }).catch(err => {
        console.log(err);
    });
    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(LS_QUERY, function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            const LS = JSON.parse(JSON.stringify(results));
            data['LIVESTOCK_NAME'] = LS[0] ? LS[0].LIVESTOCK_NAME : null;
        });
    }).catch(err => {
        console.log(err);
    });
    dbconn.rdb.then(function (con_rdb) {
        con_rdb.query(PR_QUERY, function (error, results, fields) {
            if (error) {
                console.log(error);
                return;
            }
            const PR = JSON.parse(JSON.stringify(results));
            data['PROPERTY_NAME'] = PR[0] ? PR[0].PROPERTY_NAME : null;
            setOMcases(data, pos, caseCounter);
        });
    }).catch(err => {
        console.log(err);
    });
}

function sortdata(res) {
    logger.trace("Compensation records Available to sync :: " + res.length);
    console.log("No of Compensation records to sync :: " + res.length);
    var counter = 1;
    var casecounter = 1;
    var skipcount = 1;
    Array.from(res).forEach(data => {
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(com_insertQuery, setOM(data), function (error, om_result, fields) {
                if (error) {
                    console.log(error);
                    return;
                } else {

                    if (om_result.affectedRows > 0) {
                        logger.trace("COMPENSATION record inserted : " + counter);
                        console.log("COMPENSATION record inserted : " + counter++);

                        for (i = 1; i < 11; i++) {
                            if (data["COMPDETAILS_COMP_SET_" + i + "_CASE_WSIDINFO_" + i]) {
                                getotherdata(data, i, casecounter)
                                logger.trace("COMPENSATION cases to be inserted : " + casecounter);
                                console.log("COMPENSATION cases to be inserted : " + casecounter++);
                            }
                        }

                    } else {
                        logger.trace("COMPENSATION record already exists : " + skipcount);
                        console.log("COMPENSATION record already exists : " + skipcount++);
                    }
                }
            });
        }).catch(err => {
            console.log(err);
        });
    });
}

function setOMcasedata(res_data, caseNumber) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(om_cases_insertQuery, res_data, function (error, om_case_result, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                if (om_case_result.affectedRows > 0) {
                    logger.trace("COMPENSATION cases inserted : " + caseNumber);
                    console.log("COMPENSATION cases inserted : " + caseNumber);
                } else {
                    logger.trace("COMPENSATION cases already exists : " + caseNumber);
                    console.log("COMPENSATION cases already exists : " + caseNumber);
                }
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

function setOM(data) {
    try {
        var MIN_ID = data.META_INSTANCE_ID.split(":");

        var insertOMdata = {

            COM_METAINSTANCE_ID: MIN_ID[1],
            COM_METAMODEL_VERSION: data._MODEL_VERSION,
            COM_METAUI_VERSION: data._UI_VERSION,
            COM_METASUBMISSION_DATE: helper.methods.GetFormattedDate(data._SUBMISSION_DATE),
            COM_FORMSTART_DATE: helper.methods.GetFormattedDate(data.START),
            COM_FORMEND_DATE: helper.methods.GetFormattedDate(data.END),
            COM_OM_SHEET_ISSUED: helper.methods.GetFormattedDate(data.TODAY),
            COM_DEVICE_ID: data.DEVICEID,
            COM_SIM_ID: data.SIMSERIAL,
            COM_FA_PHONE_NUM: data.PHONENUMBER,
            COM_USER_NAME: data.USERNAME,
            COM_OM_SHEET_NUM: data.OMDETAILS_OM_SHEETNO,
            COM_OM_RANGE: data.OMDETAILS_OM_RANGE.slice(0, -3).toLowerCase(),
            COM_OM_SHEET_UPLOADED: helper.methods.GetFormattedDate(data.OMDETAILS_OM_DATE),
            COM_OM_TOTAL_CASES: data.OMDETAILS_OM_TOTNO,
            COM_OM_WS_CASES: data.OMDETAILS_OM_WSNO,
            COM_WSID_FORM_DATE: MIN_ID[1] + ":" + helper.methods.GetFormattedDate(data.OMDETAILS_OM_DATE),
            COM_FORM_NAME: global_const.CONST.HWC_FORM
        };
        return insertOMdata;
    } catch (e) {
        console.log("Some Exception Occured" + e);
    }
}

function setOMcases(dataset, pos, caseId) {
    try {
        var MIN_ID = dataset.META_INSTANCE_ID.split(":");
        const phone = ["COMPDETAILS_COMP_SET_" + pos + "_PHNUM_PULL_" + pos];
        const received_amount = ["COMPDETAILS_COMP_SET_" + pos + "_COMP_RECEIVED_" + pos];
        const hwc_cat = ["COMPDETAILS_COMP_SET_" + pos + "_HWC_CAT_" + pos];
        const taluk = ["COMPDETAILS_COMP_SET_" + pos + "_TALUK_PULL_" + pos];
        const park = ["COMPDETAILS_COMP_SET_" + pos + "_PARK_PULL_" + pos];
        const family_name = ["COMPDETAILS_COMP_SET_" + pos + "_FAMNAME_PULL_" + pos];
        const first_name = ["COMPDETAILS_COMP_SET_" + pos + "_FIRSTNAME_PULL_" + pos];
        const survey_no = ["COMPDETAILS_COMP_SET_" + pos + "_SURVEYNO_" + pos];
        const hwc_date = ["COMPDETAILS_COMP_SET_" + pos + "_HWCDATE_" + pos];
        const village = ["COMPDETAILS_COMP_SET_" + pos + "_VILLAGE_PULL_" + pos];
        const other_ls = ["COMPDETAILS_COMP_SET_" + pos + "_OTHERLIVESTOCK_" + pos];
        const other_cr = ["COMPDETAILS_COMP_SET_" + pos + "_OTHERCROP_" + pos];
        const other_pr = ["COMPDETAILS_COMP_SET_" + pos + "_OTHERPROPERTY_" + pos];
        const wsid = ["COMPDETAILS_COMP_SET_" + pos + "_CASE_WSIDINFO_" + pos];

        var insertModelSet = {
            COM_META_ID: MIN_ID[1] + "_" + pos,
            COM_PARENT_ID: MIN_ID[1],
            COM_WSID_FORM_DATE: MIN_ID[1] + ":" + helper.methods.GetFormattedDate(dataset.OMDETAILS_OM_DATE),
            COM_WSID: dataset[wsid],
            COM_FIRST_NAME: dataset[first_name],
            COM_FAMILY_NAME: dataset[family_name],
            COM_TALUK: dataset[taluk],
            COM_VILLAGE: dataset[village],
            COM_PARK: dataset[park],
            COM_PHONE_NUMBER: dataset[phone],
            COM_SURVEY_NUMBER: dataset[survey_no],
            COM_HWC_DATE: helper.methods.GetFormattedDate(dataset[hwc_date]),
            COM_HWC_CATAGORY: dataset[hwc_cat],
            COM_CROP_NAME: dataset.CROP_NAME,
            COM_CROP_NAME_OPT: dataset[other_cr],
            COM_PROPERTY_NAME: dataset.PROPERTY_NAME,
            COM_PROPERTY_NAME_OPT: dataset[other_pr],
            COM_LIVESTOCK: dataset.LIVESTOCK_NAME,
            COM_LIVESTOCK_OPT: dataset[other_ls],
            COM_AMOUNT: dataset[received_amount],
            COM_FD_REF_NO: MIN_ID[1] + "_" + pos + "_" + dataset.OMDETAILS_OM_SHEETNO,
            COM_FORM_NAME: global_const.CONST.HWC_FORM
        }
        setOMcasedata(insertModelSet, caseId);
    } catch (e) {
        console.log("Some Exception Occured" + e);
    }
}
exports.func = comp;