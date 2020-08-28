const db_model = require('../utils/query_model');
const dbconn = require('../config/sshdbconn');
const util = require('../utils/helper');
const myfunctions = {};

myfunctions.getdailyDAO = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.selectallDAO, function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else
                res.send(util.methods.setresponse(results));
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(err));
        return;
    });
}

myfunctions.getFAusers = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.selectDCuser, [req.params.id], function (error, results, fields) {
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

myfunctions.getDailyCount = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.getallDC, function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else
                res.send(util.methods.setresponse(results));
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(err));
        return;
    });
}

myfunctions.get_dcParentData = function (req, res, next) {
    var ResultSet = [];
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.getDCParentData, [req.params.id], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else {
                ResultSet.push(results);
                // res.send(util.methods.setresponse(results));
            }
        });
        con_mdb.query(db_model.sqlquery.getDCCases, [req.params.cid], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else
            ResultSet.push(results);
            res.send(util.methods.setresponse(ResultSet));
                // res.send(JSON.stringify(results));
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(err));
        return;
    });
}

myfunctions.update_dcParentData = function (req, res, next) {
    console.log("ID: " +  req.body.DC_METAINSTANCE_ID);
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.updateDCParentData, [req.body, req.body.DC_METAINSTANCE_ID], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else
                res.send(util.methods.setresponse(results));
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(err));
        return;
    });
}
myfunctions.update_dcCaseData = function (req, res, next) {
    console.log("ID: " + req.body.DC_FA_ID);
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.updateDCCaseData, [req.body, req.body.DC_FA_ID], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else
                res.send(util.methods.setresponse(results));
        });
    }).catch(err => {
        console.log(err);
        res.send(util.methods.seterror(err));
        return;
    });
}

exports.caller = myfunctions;