const dbconn = require('../config/sshdbconn');
const procedure = require('../utils/report_queries');
const async = require("async");

const reports = {};
var result_data = [];

//HOME Chart API's
reports.getTotalCasesByProjectYear = async function (req, res, next) {
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
                    con_mdb.query(procedure.func.getTotalCasesByP_YR(yr_data.from, yr_data.to), function (error, result, fields) {
                        if (error) {
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
            console.log(JSON.stringify(result_data));
            res.send({ success: true, data: JSON.stringify(result_data) });
        })

    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.getcategoryByProjectYear = async function (req, res, next) {
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
                    con_mdb.query(procedure.func.getparkcategory_YR(yr_data.from, yr_data.to), function (error, result, fields) {
                        if (error) {
                            res.send({ success: false, data: JSON.stringify(error) });
                            console.log(error);
                            return;
                        } else if (result) {
                            // if (result.length > 0)
                            //     result.forEach((v) => {
                            //         result_data.push(v);
                            //     })
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

reports.getTopVillages_Bycategory_all = async function (req, res, next) {
    try {
        var CAT = ['CR','CRPD','PD','LP','HI','HD'];
        var result_data = [];
        async.each(CAT, function (val, callback) {
            if (val) {
                dbconn.mdb.then(function (con_mdb) {
                    con_mdb.query(procedure.func.gettopvillages_bycategory_all(val), function (error, result, fields) {
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

reports.getTotalCasesByYear = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getTotalCasesByYEAR(req.body.year), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.getTotalCasesByYEARnMONTH(req.body.year), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data)
                res.send({ success: true, data: result_data });
                result_data.length = 0;
            }
        });
    });
}

reports.getCategoryByYear = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getCategoryByYEAR(req.body.year), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.getCategoryByYEARnMONTH(req.body.year), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data)
                res.send({ success: true, data: result_data });
                result_data.length = 0;
            }
        });
    });
}

reports.getRange_all = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getrange_year(req.body.year), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.getrange_monthyear(req.body.year), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data)
                res.send({ success: true, data: result_data });
                result_data.length = 0;
            }
        });
    });
}

reports.getBpNhByRange = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getBpNhByRange(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}
reports.getPreviousBpNhCount = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getBPNH_Previousday(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}
reports.getBpByCategory = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getBpByCategory(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}
reports.getNhByCategory = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getNhByCategory(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}
reports.getBpNhByCategory = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getBpNhByCategory(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}
reports.get_park_Yearly = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getBpNhYearly_all(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}
reports.get_park_cat_Yearly = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getBpNhByCategory_all(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}
reports.getTopVillages = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.gettopvillages_all(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}

reports.getBPNH_Bydate = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getBPNH_bydate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.getNH_bydate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.getBP_bydate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data)
                res.send({ success: true, data: result_data });
                result_data.length = 0;
            }
        });
    });
}

reports.getBPNH_prevday = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getBPNH_byprevdate(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.getBPNH_cat_byprevdate(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data)
                res.send({ success: true, data: result_data });
                result_data.length = 0;
            }
        });
    });
}

reports.getParkTotal_ByProjectYear = async function (req, res, next) {
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
                    con_mdb.query(procedure.func.getBPNH_byprojectYR(yr_data.from, yr_data.to), function (error, result, fields) {
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

reports.getParknCategory_ByProjectYear = async function (req, res, next) {
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
                    con_mdb.query(procedure.func.getBPNH_cat_byprojectYR(yr_data.from, yr_data.to), function (error, result, fields) {
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

reports.getPark_ByProjectYear = async function (req, res, next) {
    try {
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(procedure.func.getBP_NH_byprojectYR(req.body.fromdate+"-07-01", req.body.todate+"-06-30"), function (error, result, fields) {
                if (error) {
                    res.send({ success: false, data: JSON.stringify(error) });
                    console.log(error);
                    return;
                } else if (result) {
                    res.send({ success: true, data: JSON.stringify(result) });
                }
            });
        }).catch(err => {
            console.log(err);
        })
    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.getCatByPark_ByMonth_ByProjectYear = async function (req, res, next) {
    try {
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(procedure.func.getCatsplitpark_byprojectYR_month(req.body.fromdate+"-07-01", req.body.todate+"-06-30"), function (error, data, fields) {
                if (error) {
                    res.send({ success: false, data: error });
                } else {
                    res.send({ success: true, data: data });
                }
            });
        });
    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
    // try {
    //     var start_yr = 2015;
    //     var end_yr = (new Date()).getFullYear();
    //     var year_diff = end_yr - start_yr;
    //     var current_month = (new Date()).getMonth()+1;
    //     console.log(current_month)
    //     if(current_month>6)year_diff = year_diff+1;
    //     var year_range = [];
    //     var result_data = [];
    //     for (var i = 0; i < year_diff; i++) {
    //         year_range[i] = { "from": [start_yr + i] + "-07-01", "to": [start_yr + (i + 1)] + "-06-30" };
    //     }
    //     async.each(year_range, function (yr_data, callback) {
    //         if (yr_data) {
    //             dbconn.mdb.then(function (con_mdb) {
    //                 con_mdb.query(procedure.func.getCatsplitpark_byprojectYR_month(yr_data.from, yr_data.to), function (error, result, fields) {
    //                     if (error) {
    //                         res.send({ success: false, data: JSON.stringify(error) });
    //                         console.log(error);
    //                         return;
    //                     } else if (result) {
    //                         result_data.push(result);
    //                         callback();
    //                     }
    //                 });
    //             }).catch(err => {
    //                 console.log(err);
    //             })
    //         }
    //     }, function (err) {
    //         if (err)
    //             console.log(err);
    //         res.send({ success: true, data: JSON.stringify(result_data) });
    //     })
    // } catch (ex) {
    //     res.send({ success: false, data: ex });
    //     console.log(ex);
    // }
}

reports.getdcvshwc = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_dcvshwc_bydate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}

reports.getdcvshwcCategory = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.get_dcvshwc_cat_bydate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}

reports.getPark_ByYearnMonth = function (req, res, next) {
    
    try {
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(procedure.func.getParkCasesByYEARnMONTH(req.body.year), function (error, data, fields) {
                if (error) {
                    res.send({ success: false, data: error });
                } else {
                    res.send({ success: true, data: data });
                }
            });
        });
    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.OverallCompensation = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getcompensation_sincestart(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}

reports.getCompensationByWSID = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getcompensation_bywsid(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}

reports.getCompensationByDate = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getcompensation_bydate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}

reports.getCompensationByWSIDByDate = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getcompensation_bywsid_bydate(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}

reports.getCompensationByCategory = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getcompensation_byCategory(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}

reports.getTimeTakenForCompensation = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getCompensationProcessedDays(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}

reports.getTotalTimeTakenForCompensation = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getCompensationTotalProcessedDays(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}

reports.getTotalTimeTakenForCompensationByCategory = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.getCompensationProcessedDays_bycategory(req.body.fromdate, req.body.todate), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                res.send({ success: true, data: data });
            }
        });
    });
}

reports.getTimeTaken_btwHWCFD_date = function (req, res, next) {
    
    try {
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(procedure.func.getTimeTaken_indays(req.body.fromdate+"-07-01", req.body.todate+"-06-30"), function (error, data, fields) {
                if (error) {
                    res.send({ success: false, data: error });
                } else {
                    res.send({ success: true, data: data });
                }
            });
        });
    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.getTimeTaken_btwHWCFD_Total = function (req, res, next) {
    
    try {
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(procedure.func.getTimeTaken_inall(req.body.fromdate, req.body.todate), function (error, data, fields) {
                if (error) {
                    res.send({ success: false, data: error });
                } else {
                    res.send({ success: true, data: data });
                }
            });
        });
    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.getcases_dcvshwc = function (req, res, next) {    
    try {
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(procedure.func.getcases_byDCvsHWC(req.body.fromdate, req.body.todate), function (error, data, fields) {
                if (error) {
                    res.send({ success: false, data: error });
                } else {
                    res.send({ success: true, data: data });
                }
            });
        });
    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.getFAcases_dcvshwc = function (req, res, next) {
    
    try {
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(procedure.func.getFAcases_byDCvsHWC(req.body.fromdate, req.body.todate), function (error, data, fields) {
                if (error) {
                    res.send({ success: false, data: error });
                } else {
                    res.send({ success: true, data: data });
                }
            });
        });
    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.gettotalFAcases_ByHWCvsDC = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.gettotalcases_byFA_DC(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.gettotalcases_byFA_HWC(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data)
                res.send({ success: true, data: result_data });
                result_data.length = 0;
            }
        });
    });
}

reports.gettotalFAcases_Bycategory_ByHWCvsDC = function (req, res, next) {
    dbconn.mdb.then(function (con_mdb) {
        con_mdb.query(procedure.func.gettotalcases_byFAcategory_DC(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data);
            }
        });
        con_mdb.query(procedure.func.gettotalcases_byFAcategory_HWC(), function (error, data, fields) {
            if (error) {
                res.send({ success: false, data: error });
            } else {
                result_data.push(data)
                res.send({ success: true, data: result_data });
                result_data.length = 0;
            }
        });
    });
}

reports.getTotalAvgTimeTaken_btwHWCFD = function (req, res, next) {
    
    try {
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(procedure.func.getTotalAvgTime_indays(req.body.fromdate+"-07-01", req.body.todate+"-06-30"), function (error, data, fields) {
                if (error) {
                    res.send({ success: false, data: error });
                } else {
                    res.send({ success: true, data: data });
                }
            });
        });
    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.getAvgTimeTaken_btwHWCFD = function (req, res, next) {
    
    try {
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(procedure.func.getAvgTimeTaken_indays(req.body.fromdate+"-07-01", req.body.todate+"-06-30"), function (error, data, fields) {
                if (error) {
                    res.send({ success: false, data: error });
                } else {
                    res.send({ success: true, data: data });
                }
            });
        });
    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.getCompensationBySheet_ByProjectYear = async function (req, res, next) {
    try {
        // var start_yr = 2015;
        // var end_yr = (new Date()).getFullYear();
        // var year_diff = end_yr - start_yr;
        // var year_range = [];
        // var result_data = [];
        // for (var i = 0; i < year_diff; i++) {
        //     year_range[i] = { "from": [start_yr + i] + "-07-01", "to": [start_yr + (i + 1)] + "-06-30" };
        // }
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(procedure.func.getTotalcompensation_byprojectyear(req.body.fromdate+"-07-01",req.body.todate+"-06-30"), function (error, result, fields) {
                if (error) {
                    res.send({ success: false, data: JSON.stringify(error) });
                    console.log(error);
                    return;
                } else if (result) {
                    res.send({ success: true, data: JSON.stringify(result) });
                }
            });
        }).catch(err => {
            console.log(err);
        })
        // async.each(year_range, function (yr_data, callback) {
        //     if (yr_data) {
                
        //     }
        // }, function (err) {
        //     if (err)
        //         console.log(err);
        //     res.send({ success: true, data: JSON.stringify(result_data) });
        // })
    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.getCompensation_ByCategory_ByProjectYear = async function (req, res, next) {
    try {
        // var start_yr = 2015;
        // var end_yr = (new Date()).getFullYear();
        // var year_diff = end_yr - start_yr;
        // var year_range = [];
        // var result_data = [];
        // for (var i = 0; i < year_diff; i++) {
        //     year_range[i] = { "from": [start_yr + i] + "-07-01", "to": [start_yr + (i + 1)] + "-06-30" };
        // }
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(procedure.func.getcompensationbycategory_byprojectyear(req.body.fromdate+"-07-01",req.body.todate+"-06-30"), function (error, result, fields) {
                if (error) {
                    res.send({ success: false, data: JSON.stringify(error) });
                    console.log(error);
                    return;
                } else if (result) {
                    res.send({ success: true, data: JSON.stringify(result) });
                }
            });
        }).catch(err => {
            console.log(err);
        })
        // async.each(year_range, function (yr_data, callback) {
        //     if (yr_data) {
                
        //     }
        // }, function (err) {
        //     if (err)
        //         console.log(err);
        //     res.send({ success: true, data: JSON.stringify(result_data) });
        // })
    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.getCompensation_ByCategorySheet_ByProjectYear = async function (req, res, next) {
    try {
        // var start_yr = 2015;
        // var end_yr = (new Date()).getFullYear();
        // var year_diff = end_yr - start_yr;
        // var year_range = [];
        // var result_data = [];
        // for (var i = 0; i < year_diff; i++) {
        //     year_range[i] = { "from": [start_yr + i] + "-07-01", "to": [start_yr + (i + 1)] + "-06-30" };
        // }
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(procedure.func.getCompProcessedDaysCategoryBysheet_byProjectYear(req.body.fromdate+"-07-01",req.body.todate+"-06-30"), function (error, result, fields) {
                if (error) {
                    res.send({ success: false, data: JSON.stringify(error) });
                    console.log(error);
                    return;
                } else if (result) {
                    res.send({ success: true, data: JSON.stringify(result) });
                }
            });
        }).catch(err => {
            console.log(err);
        })
        // async.each(year_range, function (yr_data, callback) {
        //     if (yr_data) {
                
        //     }
        // }, function (err) {
        //     if (err)
        //         console.log(err);
        //     res.send({ success: true, data: JSON.stringify(result_data) });
        // })
    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.getCompensation_ByCategoryAll_ByProjectYear = async function (req, res, next) {
    try {
        // var start_yr = 2015;
        // var end_yr = (new Date()).getFullYear();
        // var year_diff = end_yr - start_yr;
        // var year_range = [];
        // var result_data = [];
        // for (var i = 0; i < year_diff; i++) {
        //     year_range[i] = { "from": [start_yr + i] + "-07-01", "to": [start_yr + (i + 1)] + "-06-30" };
        // }
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(procedure.func.getCompProcessedDaysCategoryAll_byProjectYear(req.body.fromdate+"-07-01",req.body.todate+"-06-30"), function (error, result, fields) {
                if (error) {
                    res.send({ success: false, data: JSON.stringify(error) });
                    console.log(error);
                    return;
                } else if (result) {
                    res.send({ success: true, data: JSON.stringify(result) });
                }
            });
        }).catch(err => {
            console.log(err);
        })
        // async.each(year_range, function (yr_data, callback) {
        //     if (yr_data) {
                
        //     }
        // }, function (err) {
        //     if (err)
        //         console.log(err);
        //     res.send({ success: true, data: JSON.stringify(result_data) });
        // })
    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

reports.getCompensation_ByProjectYear = async function (req, res, next) {
    try {
        dbconn.mdb.then(function (con_mdb) {
            con_mdb.query(procedure.func.getCompProcessedDays_byProjectYear(req.body.fromdate+"-07-01",req.body.todate+"-06-30"), function (error, result, fields) {
                if (error) {
                    res.send({ success: false, data: JSON.stringify(error) });
                    console.log(error);
                    return;
                } else if (result) 
                {
                    res.send({ success: true, data: JSON.stringify(result) });
                }
            });
        }).catch(err => {
            console.log(err);
        })
    } catch (ex) {
        res.send({ success: false, data: ex });
        console.log(ex);
    }
}

exports.report = reports;