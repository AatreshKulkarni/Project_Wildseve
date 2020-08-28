'use strict';
const utils = {};

utils.GetFormattedFullDate = function (convertdate) {
    var todayTime = new Date(convertdate);
    return ((todayTime.getFullYear()) + "-" + (todayTime.getMonth() + 1) + "-" + todayTime.getDate() + " " + (todayTime.getHours()) + ":" + (todayTime.getMinutes()) + ":" + (todayTime.getSeconds()));
}

utils.GetFormattedDate = function (convertdate) {
    var todayTime = new Date(convertdate);
    return ((todayTime.getFullYear()) + "-" + (todayTime.getMonth() + 1) + "-" + todayTime.getDate());
}

utils.GetDAY = function (convertdate) {
    var todayTime = new Date(convertdate);
    return todayTime.getDate();
}

utils.GetMONTH = function (convertdate) {
    var todayTime = new Date(convertdate);
    return (todayTime.getMonth() + 1);
}

utils.GetYEAR = function (convertdate) {
    var todayTime = new Date(convertdate);
    return todayTime.getFullYear();
}

utils.GetRandomId = function () {
    return Math.floor((Math.random() * 100000) + 100);
}

utils.seterror = function (msg) {
    return JSON.stringify({
        "status": 404,
        "error": msg
    })
}

utils.setresponse = function (result) {
    return JSON.stringify({
        "status": 200,
        "response": result
    })
}
utils.setAuthResponse = function (result, token) {
    return JSON.stringify({
        "status": 200,
        "response": result,
        "token": token
    })
}
utils.passwordError = function (msg) {
    return JSON.stringify({
        "status": 201,
        "response": msg
    })
}
utils.setImgData = function (result) {    
    return JSON.stringify({
        "status": 200,
        "response": result
    })
}

utils.format_park = function (park_name) {
    const park_list =
    {
        "bandipurprk": "Bandipur",
        "nagaraholeprk": "Nagarahole"
    }
    return (park_name === null ) ? "" : park_name.allReplace(park_list).toLowerCase();
}

String.prototype.allReplace = function (obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};

utils.format_taluk = function (taluk_name) {
    const taluk_list =
    {
        "gundlupettlk": "gundlupet",
        "hdkotetlk": "hdkote",
        "HD_Kote": "hdkote",
        "hd_kote": "hdkote",
        "hunsurtlk": "hunsur",
        "nanjangudtlk": "nanjangud",
        "piriyapatnatlk": "piriyapatna",
        "chamrajnagartlk": "chamrajnagar"
    }

    return (taluk_name === null) ? "" : taluk_name.allReplace(taluk_list).toLowerCase();
}

utils.format_range = function (range_name) {
    const range_list =
    {
        "antersantherng": "Antersanthe",
        "db_kupperng": "DBKuppe",
        "dbkupperng": "DBKuppe",
        "gsbettarng": "GSBetta",
        "gundlupetrng": "Gundlupet",
        "hdkoterng": "HDKote",
        "hediyalarng": "Hediyala",
        "hunsurrng": "Hunsur",
        "kachuvinahallyrng": "Kachuvinahally",
        "kundkererng": "Kundkere",
        "maddururng": "Madduru",
        "metikupperng": "Metikuppe",
        "moleyururng": "Moleyuru",
        "nbegururng": "NBeguru",
        "nugurng": "Nugu",
        "omkarrng": "Omkar",
        "piriyapattanarng": "Piriyapattana",
        "sargururng": "Sarguru",
        "veeranahosahallirng": "Veeranahosahalli"
    }

    return (range_name === null) ? "" : range_name.allReplace(range_list).toLowerCase();
}

exports.methods = utils;