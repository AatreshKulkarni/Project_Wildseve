const dbconn = require('../config/sshdbconn');
const procedure = require('../utils/report_queries');
const async = require("async");

const reports = {};
var result_data = [];

reports.getHWC_block1 = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_hwc_category(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_allhwc_category(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_animal(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);

            }
        });
        con_mdb.query(procedure.func.get_allhwc_animal(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);

            }
        });
        con_mdb.query(procedure.func.get_hwc_park(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_allhwc_park(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_taluk(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_allhwc_taluk(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_range(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_allhwc_range(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_allhwc_village(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_village(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
                res.send(JSON.stringify(result_data));
                result_data.length = 0;
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.getHWC_block1_byhwcdate = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_hwc_category_byhwcdate_sum(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_category_byhwcdate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_animal_byhwcdate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);

            }
        });
        con_mdb.query(procedure.func.get_hwc_park_byhwcdate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_taluk_byhwcdate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_range_byhwcdate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_village_byhwcdate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
                res.send(JSON.stringify(result_data));
                result_data.length = 0;
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.getHWC_block1_byfadate = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_hwc_category_byfadate_sum(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_category_byfadate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_animal_byfadate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);

            }
        });
        con_mdb.query(procedure.func.get_hwc_park_byfadate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_taluk_byfadate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_range_byfadate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_hwc_village_byfadate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
                res.send(JSON.stringify(result_data));
                result_data.length = 0;
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.getfreq_block2_byhwcdate = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_freq_byhwcdate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.getFAcases_byhwcdate = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getFA_ByHWC_casedate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_FA_bydateCategory = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_FA_bydate_n_category(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_FA_AVG_bySubTime = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_FAaverage_bySubTime(req.body.fromdate + "-07-01", req.body.todate + "-06-30"), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.getfreq_block2_byfadate = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_freq_byfadate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_cases_byyear_month_block2 = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_cases_byyear_month(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.getFreqCasesByProjectYear = async function (req, res, next) {
    try {
        var start_yr = 2015;
        var end_yr = (new Date()).getFullYear();
        var year_diff = end_yr - start_yr;
        var current_month = (new Date()).getMonth()+1;
        console.log(current_month)
        if(current_month>6)year_diff = year_diff+1;
        var year_range = [];
        var result_data = [];
        for (var i = 0; i < year_diff; i++) {
            year_range[i] = { "from": [start_yr + i] + "-07-01", "to": [start_yr + (i + 1)] + "-06-30" };
        }
        async.each(year_range, function (yr_data, callback) {
            if (yr_data) {
                dbconn.mdb.then(function (con_mdb) {
                    con_mdb.query(procedure.func.get_freqcases_byprojectyear(yr_data.from, yr_data.to), function (error, result, fields) {
                        if (error) {
                            res.send({ success: false, data: JSON.stringify(error) });
                            console.log(error);
                            return;
                        } else if (result) {
                            result_data.push(result);
                            callback();
                        }
                    });
                }).catch(err => {
                    console.log(err);
                })
            }
        }, function (err) {
            if (err)
                console.log(err);
            // console.log(JSON.stringify(result_data));
            res.send({ success: true, data: JSON.stringify(result_data) });
        })

    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.get_top50cases_bywsid_block2 = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_top50_wsid_bycases(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_top20cases_bycat_block2 = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_top20_wsid_bycat(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_topfreq_block3 = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_top10_crop(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_top10_property(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_top10_livestock(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_top30_villages(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
                res.send(JSON.stringify(result_data));
                result_data.length = 0;
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get30incidents = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_30incident_WSID(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_30incident_Village(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.get_30incident_Range(), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                result_data.push(data);
                res.send(JSON.stringify(result_data));
                result_data.length = 0;
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.getwsidincidents_bycategory = async function (req, res, next) {
    try {
        var result_data = [];
        var CAT = ['CR', 'CRPD', 'PD', 'LP', 'HI', 'HD'];
        async.each(CAT, function (type, callback) {
            if (type) {
                dbconn.mdb.then(function (con_mdb) {
                    con_mdb.query(procedure.func.get_30incident_WSID_bycat(type), function (error, result, fields) {
                        if (error) {
                            res.send({ success: false, data: JSON.stringify(error) });
                            console.log(error);
                            return;
                        } else if (result) {
                            result_data.push(result);
                            callback();
                        }
                    });
                }).catch(err => {
                    console.log(err);
                })
            }
        }, function (err) {
            if (err)
                console.log(err);
            res.send({ success: true, data: JSON.stringify(result_data) });
        })
    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.getvillageincidents_bycategory = async function (req, res, next) {
    try {
        var result_data = [];
        var CAT = ['CR', 'CRPD', 'PD', 'LP', 'HI', 'HD'];
        async.each(CAT, function (type, callback) {
            if (type) {
                dbconn.mdb.then(function (con_mdb) {
                    con_mdb.query(procedure.func.get_30incident_Village_bycat(type), function (error, result, fields) {
                        if (error) {
                            res.send({ success: false, data: JSON.stringify(error) });
                            console.log(error);
                            return;
                        } else if (result) {
                            result_data.push(result);
                            callback();
                        }
                    });
                }).catch(err => {
                    console.log(err);
                })
            }
        }, function (err) {
            if (err)
                console.log(err);
            res.send({ success: true, data: JSON.stringify(result_data) });
        })
    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.getrangeincidents_bycategory = async function (req, res, next) {
    try {
        var result_data = [];
        var CAT = ['CR', 'CRPD', 'PD', 'LP', 'HI', 'HD'];
        async.each(CAT, function (type, callback) {
            if (type) {
                dbconn.mdb.then(function (con_mdb) {
                    con_mdb.query(procedure.func.get_30incident_Range_bycat(type), function (error, result, fields) {
                        if (error) {
                            res.send({ success: false, data: JSON.stringify(error) });
                            console.log(error);
                            return;
                        } else if (result) {
                            result_data.push(result);
                            callback();
                        }
                    });
                }).catch(err => {
                    console.log(err);
                })
            }
        }, function (err) {
            if (err)
                console.log(err);
            res.send({ success: true, data: JSON.stringify(result_data) });
        })
    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.get_HWCDB_projectwise = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_HWCDB_byprojectwise(req.body.fromdate + "-07-01", req.body.todate + "-06-30"), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_DCDB_projectwise = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_DCDB_byprojectwise(req.body.fromdate + "-07-01", req.body.todate + "-06-30"), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_COMPDB_projectwise = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_COMPDB_byprojectwise(req.body.fromdate + "-07-01", req.body.todate + "-06-30"), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_PUBDB_projectwise = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_PUBDB_byprojectwise(req.body.fromdate + "-07-01", req.body.todate + "-06-30"), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_HWC_mapbycategory = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_hwc_mapincidents_bycategory(req.body.fromdate + "-07-01", req.body.todate + "-06-30"), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_HWC_mapbyanimal = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_hwc_mapincidents_byanimal(req.body.fromdate + "-07-01", req.body.todate + "-06-30"), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_HWC_mapbyCR = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_hwc_mapincidents_byCR(req.body.fromdate + "-07-01", req.body.todate + "-06-30"), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_HWC_mapbyCRPD = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_hwc_mapincidents_byCRPD(req.body.fromdate + "-07-01", req.body.todate + "-06-30"), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_HWC_mapbyPD = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_hwc_mapincidents_byPD(req.body.fromdate + "-07-01", req.body.todate + "-06-30"), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_HWC_mapbyLP = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_hwc_mapincidents_byLP(req.body.fromdate + "-07-01", req.body.todate + "-06-30"), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_HWC_mapbyHI = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_hwc_mapincidents_byHI(req.body.fromdate + "-07-01", req.body.todate + "-06-30"), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_HWC_mapbyHD = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_hwc_mapincidents_byHD(req.body.fromdate + "-07-01", req.body.todate + "-06-30"), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_HWC_mapbyFA = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_hwc_mapincidents_byFA(req.body.fromdate + "-07-01", req.body.todate + "-06-30"), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

reports.get_PUB_mapbyFA = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_pub_mapincidents_byFA(req.body.fromdate + "-07-01", req.body.todate + "-06-30"), function (error, data, fields) {
            if (error) {
                console.log(error);
                return;
            } else {
                res.send(JSON.stringify(data));
            }
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.report = reports;