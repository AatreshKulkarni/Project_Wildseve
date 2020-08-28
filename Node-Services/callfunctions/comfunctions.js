const dbconn = require('../config/sshdbconn');
const db_model = require('../utils/query_model');
const util = require('../utils/helper');
const myfunctions = {};

myfunctions.getOMdetails = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.selectOM_data, function (error, results, fields) {
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

myfunctions.getOM_casedetails = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.selectOM_casedata, [req.params.id], function (error, results, fields) {
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


myfunctions.get_compParentData = function (req, res, next) {
    var ResultSet = [];
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.getCompParentData, [req.params.id], function (error, results, fields) {
            if (error) {
                console.log(error);
                res.send(util.methods.seterror(error));
                return;
            } else {
                ResultSet.push(results);
                // res.send(util.methods.setresponse(results));
            }
        });
        con_mdb.query(db_model.sqlquery.getCompCases, [req.params.id], function (error, results, fields) {
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

myfunctions.update_compParentData = function (req, res, next) {
    console.log("ID: " +  req.body.COM_METAINSTANCE_ID);
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.updateCompParentData, [req.body, req.body.COM_METAINSTANCE_ID], function (error, results, fields) {
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
myfunctions.update_compCaseData = function (req, res, next) {
    console.log("ID: " + req.body.COM_META_ID);
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(db_model.sqlquery.updateCompCaseData, [req.body, req.body.COM_META_ID], function (error, results, fields) {
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