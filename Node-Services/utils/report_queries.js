const procedure = {};

procedure.bypark = function () {
    return "SELECT SUM(DC_NH_CASES) AS TOTAL_NH_CASES, SUM(DC_BP_CASES) AS TOTAL_BP_CASES FROM daily_count";
};

procedure.byFA = function () {
    const sum = "SUM(DC_CROP+DC_CROP_PROPERTY+DC_PROPERTY+DC_LIVESTOCK+DC_HUMAN_INJURY+DC_HUMAN_DEATH) AS TOTAL_CASES_BY_FA";
    return "SELECT DC_FA_UN AS FA_NAME, " + sum + " FROM dc_cases GROUP BY DC_FA_UN";
};

procedure.byHWCType = function () {
    return "SELECT SUM(DC_CROP) AS CROP_SUM, SUM(DC_CROP_PROPERTY) AS CROP_PROPERTY_SUM, SUM(DC_PROPERTY) AS PROPERTY_SUM, SUM(DC_LIVESTOCK) AS LIVESTOCK_SUM, SUM(DC_HUMAN_INJURY) AS HUMAN_INJURY_SUM, SUM(DC_HUMAN_DEATH) AS HUMAN_DEATH_SUM FROM dc_cases";
};

procedure.byHWCType_day = function () {
    return "SELECT DATE_FORMAT(DC_CASE_DATE, '%d-%m-%y') AS CASE_DATE, SUM(DC_CROP) AS CROP_SUM, SUM(DC_CROP_PROPERTY) AS CROP_PROPERTY_SUM, SUM(DC_PROPERTY) AS PROPERTY_SUM, SUM(DC_LIVESTOCK) AS LIVESTOCK_SUM, SUM(DC_HUMAN_INJURY) AS HUMAN_INJURY_SUM, SUM(DC_HUMAN_DEATH) AS HUMAN_DEATH_SUM FROM dc_cases GROUP BY DC_CASE_DATE ORDER BY DC_CASE_DATE DESC";
};

procedure.byFA_day = function () {
    return "SELECT DATE_FORMAT(DC_CASE_DATE, '%d-%m-%y') AS CASE_DATE, DC_FA_UN AS FA_NAME,  sum(DC_CROP + DC_CROP_PROPERTY + DC_PROPERTY + DC_LIVESTOCK + DC_HUMAN_DEATH + DC_HUMAN_INJURY) AS TOTAL_CASES_FA  FROM  dc_cases GROUP BY concat(DC_CASE_DATE,'_',DC_FA_UN) ORDER BY DC_CASE_DATE DESC";
};

procedure.bypark_day = function () {
    return "SELECT DATE_FORMAT(DC_CASE_DATE, '%d-%m-%y') AS CASE_DATE, SUM(DC_NH_CASES) AS TOTAL_NH_CASES, SUM(DC_BP_CASES) AS TOTAL_BP_CASES FROM daily_count GROUP BY DC_CASE_DATE ORDER BY DC_CASE_DATE DESC";
};

procedure.bypark_range = function (fromdate, todate) {
    return "SELECT DATE_FORMAT(DC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, SUM(DC_NH_CASES) AS TOTAL_NH_CASES, SUM(DC_BP_CASES) AS TOTAL_BP_CASES FROM daily_count WHERE (DATE_FORMAT(DC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) GROUP BY DC_CASE_DATE ORDER BY DC_CASE_DATE DESC";
};
procedure.byHWCType_range = function (fromdate, todate) {
    return "SELECT DATE_FORMAT(DC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, SUM(DC_CROP) AS CROP_SUM, SUM(DC_CROP_PROPERTY) AS CROP_PROPERTY_SUM, SUM(DC_PROPERTY) AS PROPERTY_SUM, SUM(DC_LIVESTOCK) AS LIVESTOCK_SUM, SUM(DC_HUMAN_INJURY) AS HUMAN_INJURY_SUM, SUM(DC_HUMAN_DEATH) AS HUMAN_DEATH_SUM FROM dc_cases WHERE (DATE_FORMAT(DC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) GROUP BY DC_CASE_DATE ORDER BY DC_CASE_DATE DESC";
};

procedure.byFA_range = function (fromdate, todate) {
    return "SELECT  DATE_FORMAT(DC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, DC_FA_UN AS FA_NAME,  sum(DC_CROP + DC_CROP_PROPERTY + DC_PROPERTY + DC_LIVESTOCK + DC_HUMAN_DEATH + DC_HUMAN_INJURY) AS TOTAL_CASES_FA  FROM  dc_cases WHERE (DATE_FORMAT(DC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) GROUP BY concat(DC_CASE_DATE,'_',DC_FA_UN) ORDER BY DC_CASE_DATE DESC";
};

procedure.gethwc_byNP = function () {
    return "SELECT HWC_PARK_NAME AS NATIONAL_PARK, Count(HWC_PARK_NAME) AS NO_OF_CASES FROM hwc_details group by HWC_PARK_NAME";
}

procedure.gethwc_byFA = function () {
    return "SELECT HWC_USER_NAME AS FIELD_ASSISTANT, Count(HWC_USER_NAME) AS NO_OF_CASES FROM hwc_details group by HWC_USER_NAME";
}

procedure.gethwc_byCAT = function () {
    return "SELECT HWC_CASE_CATEGORY AS CASE_CATEGORY, Count(HWC_CASE_CATEGORY) AS NO_OF_CASES FROM hwc_details group by HWC_CASE_CATEGORY";
}

procedure.gethwc_byNP_byday = function () {
    return "SELECT HWC_CASE_DATE AS CASE_DATE, HWC_PARK_NAME AS NATIONAL_PARK, Count(HWC_PARK_NAME) AS NO_OF_CASES FROM hwc_details group by HWC_PARK_NAME, HWC_CASE_DATE order by HWC_CASE_DATE";
}

procedure.gethwc_byFA_byday = function () {
    return "SELECT HWC_CASE_DATE AS CASE_DATE, HWC_USER_NAME AS FIELD_ASSISTANT, Count(HWC_USER_NAME) AS NO_OF_CASES FROM hwc_details group by HWC_USER_NAME, HWC_CASE_DATE order by HWC_CASE_DATE;";
}

procedure.gethwc_byCAT_byday = function () {
    return "SELECT HWC_CASE_DATE AS CASE_DATE,HWC_CASE_CATEGORY AS CASE_CATEGORY, Count(HWC_CASE_CATEGORY) AS NO_OF_CASES FROM hwc_details group by HWC_CASE_CATEGORY, HWC_CASE_DATE order by HWC_CASE_DATE;";
}

procedure.gethwc_byNP_range = function (fromdate, todate) {
    return "SELECT HWC_PARK_NAME AS NATIONAL_PARK, Count(HWC_PARK_NAME) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_PARK_NAME";
}

procedure.gethwc_byFA_range = function (fromdate, todate) {
    return "SELECT HWC_USER_NAME AS FIELD_ASSISTANT, Count(HWC_USER_NAME) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_USER_NAME";
}

procedure.gethwc_byCAT_range = function (fromdate, todate) {
    return "SELECT HWC_CASE_CATEGORY AS CASE_CATEGORY, Count(HWC_CASE_CATEGORY) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_CASE_CATEGORY";
}

procedure.gethwc_byNP_byday_byrange = function (fromdate, todate) {
    return "SELECT DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, HWC_PARK_NAME AS NATIONAL_PARK, Count(HWC_PARK_NAME) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_PARK_NAME, HWC_CASE_DATE order by HWC_CASE_DATE";
}

procedure.gethwc_byFA_byday_byrange = function (fromdate, todate) {
    return "SELECT DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, HWC_USER_NAME AS FIELD_ASSISTANT, Count(HWC_USER_NAME) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_USER_NAME, HWC_CASE_DATE order by HWC_CASE_DATE;";
}

procedure.gethwc_byCAT_byday_byrange = function (fromdate, todate) {
    return "SELECT DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE,HWC_CASE_CATEGORY AS CASE_CATEGORY, Count(HWC_CASE_CATEGORY) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_CASE_CATEGORY, HWC_CASE_DATE order by HWC_CASE_DATE;";
}

procedure.gethwc_byNP_byrange = function (fromdate, todate) {
    return "SELECT HWC_PARK_NAME AS NATIONAL_PARK, Count(HWC_PARK_NAME) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_PARK_NAME";
}

procedure.gethwc_byVillage_byrange = function (fromdate, todate) {
    return "SELECT HWC_VILLAGE_NAME AS VILLAGE, Count(HWC_VILLAGE_NAME) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_VILLAGE_NAME";
}

procedure.gethwc_byTaluk_byrange = function (fromdate, todate) {
    return "SELECT HWC_TALUK_NAME AS TALUK, Count(HWC_TALUK_NAME) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_TALUK_NAME";
}

procedure.gethwc_byRange_byrange = function (fromdate, todate) {
    return "SELECT HWC_RANGE , Count(HWC_RANGE) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_RANGE";
}

procedure.gethwc_byFARange_byrange = function (fromdate, todate) {
    return "SELECT HWC_FD_SUB_RANGE AS FA_SUB_RANGE, Count(HWC_FD_SUB_RANGE) AS NO_OF_CASES FROM hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) group by HWC_FD_SUB_RANGE";
}

procedure.gethwc_bycat_all = function () {
    return "select HWC_CASE_CATEGORY AS HWC_CATEGORY, count(HWC_CASE_CATEGORY) AS FREQ from hwc_details group by HWC_CASE_CATEGORY";
}

procedure.gethwc_bycat_animal = function () {
    return "select HWC_ANIMAL AS HWC_ANIMAL, count(HWC_ANIMAL) AS FREQ from hwc_details group by HWC_ANIMAL";
}

procedure.gethwc_bycat_crop = function () {
    return "select HWC_CROP_NAME AS HWC_CROP, count(HWC_CROP_NAME) AS FREQ from hwc_case_crop group by HWC_CROP_NAME";
}

procedure.gethwc_bycat_property = function () {
    return "select HWC_PROPERY_NAME AS HWC_CROP, count(HWC_PROPERY_NAME) AS FREQ from hwc_case_property group by HWC_PROPERY_NAME";
}

procedure.gethwc_bycat_livestock = function () {
    return "select HWC_LIVE_STOCK_NAME AS HWC_CROP, count(HWC_LIVE_STOCK_NAME) AS FREQ from hwc_case_livestock group by HWC_LIVE_STOCK_NAME";
}

// HOME Chart API's
procedure.getBPNH_byprojectYR = function (from, to) {
    return "select HWC_PARK_NAME,count(HWC_CASE_CATEGORY) as cases_july2june from hwc_details where HWC_CASE_DATE between '" + from + "' AND '" + to + "' group by HWC_PARK_NAME order by HWC_PARK_NAME;";
}

procedure.getBPNH_cat_byprojectYR = function (from, to) {
    return "select HWC_CASE_CATEGORY as BPNH,count(HWC_CASE_CATEGORY) as cases_july2june from hwc_details where HWC_CASE_DATE between '" + from + "' AND '" + to + "' group by HWC_CASE_CATEGORY order by field(hwc_case_category,'CR','CRPD','PD','LP','HI','HD');";
}

procedure.getBP_NH_byprojectYR = function (from, to) {
    return "select hwc_park_name,HWC_CASE_CATEGORY as BPNH,count(HWC_CASE_CATEGORY) as cases_july2june from hwc_details where HWC_CASE_DATE between '" + from + "' AND '" + to + "' group by hwc_park_name,HWC_CASE_CATEGORY order by hwc_park_name,field(hwc_case_category,'CR','CRPD','PD','LP','HI','HD');";
}

procedure.getCatsplitpark_byprojectYR_month = function (from, to) {
    return "select HWC_PARK_NAME, monthname(HWC_CASE_DATE) as MONTH, HWC_CASE_CATEGORY, count(HWC_CASE_CATEGORY) AS TOTAL_CASES from hwc_details WHERE HWC_CASE_DATE between '" + from + "' AND '" + to + "' group by HWC_PARK_NAME, HWC_CASE_CATEGORY, month(HWC_CASE_DATE) order by HWC_PARK_NAME, field(HWC_CASE_CATEGORY,'CR','CRPD','PD','LP','HI','HD'),  field(monthname(HWC_CASE_DATE),'July','August','September','October','November','December','January','February','March','April','May','June');";
}

procedure.getBPNH_bydate = function (from, to) {
    return "select HWC_CASE_CATEGORY,count(HWC_CASE_CATEGORY) as No_of_cases from hwc_details where HWC_CASE_DATE between '" + from + "' AND '" + to + "' group by HWC_CASE_CATEGORY order by field(hwc_case_category,'CR','CRPD','PD','LP','HI','HD');";
}

procedure.getBP_bydate = function (from, to) {
    return "select HWC_PARK_NAME,HWC_CASE_CATEGORY,count(HWC_CASE_CATEGORY) as No_of_cases from hwc_details where HWC_CASE_DATE between '" + from + "' AND '" + to + "' and hwc_park_name='bandipur' group by HWC_PARK_NAME,HWC_CASE_CATEGORY order by field(hwc_case_category,'CR','CRPD','PD','LP','HI','HD'),hwc_park_name;";
}

procedure.getNH_bydate = function (from, to) {
    return "select HWC_PARK_NAME,HWC_CASE_CATEGORY,count(HWC_CASE_CATEGORY) as No_of_cases from hwc_details where HWC_CASE_DATE between '" + from + "' AND '" + to + "' and hwc_park_name='NAGARAHOLE' group by HWC_PARK_NAME,HWC_CASE_CATEGORY order by field(hwc_case_category,'CR','CRPD','PD','LP','HI','HD'),hwc_park_name;";
}

procedure.getBPNH_byprevdate = function () {
    return "select dc_case_date,DC_BP_CASES AS Bandipur, DC_NH_CASES as Nagarahole,(DC_NH_CASES+DC_BP_CASES) as CASES_BPNH from daily_count where dc_case_date >= CAST(NOW() - INTERVAL 1 DAY AS DATE) AND dc_case_date <= CAST(NOW() AS DATE) group by CASES_BPNH;";
}

procedure.getBPNH_cat_byprevdate = function () {
    return "select distinct(DC_CASE_DATE) as Date_S,sum(DC_CROP) as CR,sum(DC_CROP_PROPERTY) as CRPD,sum(DC_PROPERTY) as PD,sum(DC_LIVESTOCK) as LP, sum(DC_HUMAN_INJURY) as HI, sum(DC_HUMAN_DEATH) as HD, sum(DC_CROP+DC_CROP_PROPERTY+DC_PROPERTY+DC_LIVESTOCK+DC_HUMAN_INJURY+DC_HUMAN_DEATH) as TOTAL from dc_cases where dc_case_date >= CAST(NOW() - INTERVAL 1 DAY AS DATE) AND dc_case_date <= CAST(NOW() AS DATE);";
}

procedure.getTotalCasesByP_YR = function (from, to) {
    return "select year(HWC_CASE_DATE) as YEAR, count(*) as NO_OF_CASES from hwc_details where (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') between '" + from + "' AND '" + to + "') group by year(HWC_CASE_DATE)";
}

procedure.getparkcategory_YR = function (from, to) {
    return "select year(HWC_CASE_DATE) as YEAR, count(*) as NO_OF_CASES, HWC_PARK_NAME as PARK, HWC_CASE_CATEGORY as CATEGORY from hwc_details where (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') between '" + from + "' AND '" + to + "') group by year(HWC_CASE_DATE), HWC_PARK_NAME, HWC_CASE_CATEGORY;";
}

procedure.getTotalCasesByYEAR = function (year) {
    return "select year(HWC_CASE_DATE) as YEAR, count(HWC_CASE_CATEGORY) as NO_OF_CASES from hwc_details where (year(HWC_CASE_DATE) = '"+year+"') group by year(HWC_CASE_DATE);";
}

procedure.getTotalCasesByYEARnMONTH = function (year) {
    return "select year(HWC_CASE_DATE) as YEAR, monthname(HWC_CASE_DATE) as MONTH, count(HWC_CASE_CATEGORY) as NO_OF_CASES from hwc_details where (year(HWC_CASE_DATE) = '"+year+"') group by year(HWC_CASE_DATE), month(HWC_CASE_DATE) order by year(HWC_CASE_DATE), month(HWC_CASE_DATE);";
}

procedure.getParkCasesByYEARnMONTH = function (year) {
    return "select year(HWC_CASE_DATE) as YEAR, monthname(HWC_CASE_DATE) as MONTH, count(HWC_CASE_CATEGORY) as NO_OF_CASES, HWC_PARK_NAME from odk.hwc_details WHERE (year(HWC_CASE_DATE) = '"+year+"') group by month(HWC_CASE_DATE), year(HWC_CASE_DATE), HWC_PARK_NAME order by  HWC_PARK_NAME,month(HWC_CASE_DATE), year(HWC_CASE_DATE);";
}

procedure.getCategoryByYEAR = function (year) {
    return "select HWC_CASE_CATEGORY, YEAR(HWC_CASE_DATE) as YEAR, count(HWC_CASE_CATEGORY) as NO_OF_CASES from hwc_details where (year(HWC_CASE_DATE) = '"+year+"') group by field(HWC_CASE_CATEGORY,'CR','CRPD','PD','LP','HI','HD');";
}

procedure.getCategoryByYEARnMONTH = function (year) {
    return "select HWC_CASE_CATEGORY, monthname(HWC_CASE_DATE) as MONTH, YEAR(HWC_CASE_DATE) as YEAR, count(HWC_CASE_CATEGORY) as NO_OF_CASES from hwc_details where (year(HWC_CASE_DATE) = '"+year+"') group by month(HWC_CASE_DATE),  field(HWC_CASE_CATEGORY,'CR','CRPD','PD','LP','HI','HD');";
}

procedure.getTimeTaken_indays = function (fromdate, todate) {
    return "SELECT MONTHNAME(hwc_case_date) AS Month_s,year(hwc_case_date) as Year_s, hwc_wsid as WSID, concat(ucase(left(hwc_park_name,1)),substring(hwc_park_name,2)) as Park, concat(ucase(left(HWC_TALUK_NAME,1)),substring(hwc_taluk_name,2)) as Taluk, concat(ucase(left(HWC_VILLAGE_NAME,1)),substring(hwc_village_name,2)) as Village, concat(ucase(left(HWC_RANGE,1)),substring(hwc_range,2)) as Ranges, concat(ucase(left(HWC_USER_NAME,1)),substring(HWC_USER_NAME,2)) as Field_Asst, hwc_fd_sub_date as Fd_Sub_Date,hwc_case_date as Case_Date, datediff(hwc_fd_sub_date,hwc_case_date) AS Time_Taken_Days FROM hwc_details WHERE hwc_case_date between '" + fromdate + "' AND '" + todate + "' ORDER BY year_s,FIELD(Month_s,'January','February','March','April','May','June','July','August','September','October','November','December'), hwc_user_name;";
}

procedure.getTimeTaken_inall = function (fromdate, todate) {
    return "select monthname(hwc_case_date) as Month_s,sum(datediff(hwc_fd_sub_date,hwc_case_date)) as Time_Taken_Days from hwc_details where hwc_case_date between '" + fromdate + "' AND '" + todate + "' group by Month_s order by FIELD(Month_s,'January','February','March','April','May','June','July','August','September','October','November','December');";
}

procedure.getcases_byDCvsHWC = function (fromdate, todate) {
    return "select sum(dc_total_cases) as Cases from daily_count where dc_case_date between '" + fromdate + "' AND '" + todate + "' union select count(hwc_case_category) from hwc_details where hwc_case_date between '" + fromdate + "' AND '" + todate + "' ";
}

procedure.getFAcases_byDCvsHWC = function (fromdate, todate) {
    return "select sum(dc_crop) as CR, sum(dc_crop_property) as CRPD, sum(dc_property) as PD, sum(dc_livestock) as LP, sum(dc_human_injury) as HI, sum(dc_human_death) as HD from dc_cases where dc_case_date between '" + fromdate + "' AND '" + todate + "' union select count(if(hwc_case_category='CR', 1, NULL)) 'CR', count(if(hwc_case_category='CRPD', 1, NULL)) 'CRPD', count(if(hwc_case_category='PD',1,NULL)) 'PD', count(if(hwc_case_category='LP',1,NULL)) 'LP', count(if(hwc_case_category='HI',1,NULL)) 'HI', count(if(hwc_case_category='HD',1,NULL)) 'HD' from hwc_details where hwc_case_date between '" + fromdate + "' AND '" + todate + "';";
}

procedure.gettotalcases_byFA_DC = function () {
    return "select DC_FA_UN as FieldAssistant, count(DC_FA_UN) as Cases from dc_cases group by DC_FA_UN;";
}

procedure.gettotalcases_byFA_HWC = function () {
    return "select count(HWC_USER_NAME) as Cases, HWC_USER_NAME as FieldAssistant from hwc_details group by HWC_USER_NAME;";
}

procedure.gettotalcases_byFAcategory_DC = function () {
    return "select sum(DC_CROP) as CR,sum(DC_CROP_PROPERTY) as CRPD,sum(DC_PROPERTY) as PD,sum(DC_LIVESTOCK) as LP,sum(DC_HUMAN_INJURY) as HI,sum(DC_HUMAN_DEATH) as HD, sum(DC_TOTAL_ATTENDED_CASE) as Total, DC_FA_UN from dc_cases group by DC_FA_UN;";
}

procedure.gettotalcases_byFAcategory_HWC = function () {
    return "select hwc_case_category, count(HWC_USER_NAME) as Cases, HWC_USER_NAME as FieldAssistant from hwc_details group by HWC_USER_NAME,hwc_case_category;";
}

procedure.getAvgTimeTaken_indays = function (fromdate, todate) {
    return "select distinct concat(ucase(left(hwc_user_name,1)),substring(hwc_user_name,2)) as Field_Asst, count(HWC_USER_NAME) as Total_Cases, sum(datediff(hwc_fd_sub_date,hwc_case_date)) as Total_Time_Taken, max(datediff(hwc_fd_sub_date,hwc_case_date)) as Max_Time_Taken, min(datediff(hwc_fd_sub_date,hwc_case_date)) as Min_Time_Taken, round(avg(datediff(hwc_fd_sub_date,hwc_case_date)),2) as Avg_Time_Taken from hwc_details where hwc_case_date between '" + fromdate + "' AND '" + todate + "' group by hwc_user_name order by Avg_Time_Taken desc;";
}

procedure.getTotalAvgTime_indays = function (fromdate, todate) {
    return "select count(HWC_USER_NAME) as Case_Freq, sum(datediff(hwc_fd_sub_date,hwc_case_date)) as Total_Time_Taken, max(datediff(hwc_fd_sub_date,hwc_case_date)) as Max_Time_Taken, min(datediff(hwc_fd_sub_date,hwc_case_date)) as Min_Time_Taken, round(avg(datediff(hwc_fd_sub_date,hwc_case_date)),2) as Avg_Time_Taken from hwc_details where hwc_case_date between '" + fromdate + "' AND '" + todate + "';";
}

procedure.getBpNhByRange = function (fromdate, todate) {
    return "SELECT  DATE_FORMAT(DC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE,  sum(DC_NH_CASES) AS NH_CASES, sum(DC_BP_CASES) as BP_CASE  FROM  daily_count WHERE (DATE_FORMAT(DC_CASE_DATE, '%Y-%m-%d') BETWEEN '" + fromdate + "' AND '" + todate + "' ) GROUP BY DC_CASE_DATE ORDER BY DC_CASE_DATE DESC";
}
procedure.getBPNH_Previousday = function () {
    return "select DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, sum(HWC_CASE_DATE) AS CASES from hwc_details WHERE HWC_CASE_DATE BETWEEN CURDATE() - INTERVAL 1 DAY AND CURDATE()"
}
procedure.getBpByCategory = function (fromdate, todate) {
    return "select DATE_FORMAT(d.DC_CASE_DATE, '%d-%m-%Y')  as CASE_DATE, h.HWC_CASE_CATEGORY as CATEGORY, d.DC_BP_CASES AS BP_CASES , sum(d.DC_BP_CASES) AS BP_CASES from daily_count d, hwc_details h where (h.HWC_CASE_DATE between '" + fromdate + "' AND '" + todate + "') and (d.DC_CASE_DATE between '" + fromdate + "' AND '" + todate + "') group by d.DC_CASE_DATE, h.HWC_CASE_DATE;"
}
procedure.getNhByCategory = function (fromdate, todate) {
    return "select DATE_FORMAT(d.DC_CASE_DATE, '%d-%m-%Y')  as CASE_DATE, h.HWC_CASE_CATEGORY as CATEGORY, d.DC_NH_CASES AS NH_CASES , sum(d.DC_NH_CASES) AS NH_CASES from daily_count d, hwc_details h where (h.HWC_CASE_DATE between '" + fromdate + "' AND '" + todate + "') and (d.DC_CASE_DATE between '" + fromdate + "' AND '" + todate + "') group by d.DC_CASE_DATE, h.HWC_CASE_DATE;"
}
procedure.getBpNhByCategory = function (fromdate, todate) {
    return "select DATE_FORMAT(d.DC_CASE_DATE, '%d-%m-%Y')  as CASE_DATE, h.HWC_CASE_CATEGORY as CATEGORY, sum(d.DC_NH_CASES+d.DC_BP_CASES) AS TOTAL_BP_NH_CASES from daily_count d, hwc_details h where (h.HWC_CASE_DATE between '" + fromdate + "' AND '" + todate + "') and (d.DC_CASE_DATE between '" + fromdate + "' AND '" + todate + "') group by d.DC_CASE_DATE, h.HWC_CASE_DATE;"
}
procedure.getBpNhYearly_all = function () {
    return "select year(HWC_CASE_DATE) as YEAR, count(HWC_CASE_DATE) as NO_OF_CASES, HWC_PARK_NAME AS PARK from hwc_details WHERE (year(HWC_CASE_DATE) between '2015' and YEAR(CURDATE())) group by year(HWC_CASE_DATE), HWC_PARK_NAME;"
}
procedure.getBpNhByCategory_all = function () {
    return "select year(HWC_CASE_DATE) as YEAR, count(HWC_CASE_CATEGORY) as NO_OF_CASES, HWC_PARK_NAME AS PARK, HWC_CASE_CATEGORY as HWC_CATEGORY from hwc_details WHERE (year(HWC_CASE_DATE) between '2015' and YEAR(CURDATE())) group by year(HWC_CASE_DATE), HWC_CASE_CATEGORY, HWC_PARK_NAME;"
}
procedure.gettopvillages_all = function () {
    return "select HWC_VILLAGE_NAME as VILLAGE, count(HWC_VILLAGE_NAME) as FREQS from hwc_details group by HWC_VILLAGE_NAME order by count(HWC_VILLAGE_NAME) desc limit 10;";
}
procedure.gettopvillages_bycategory_all = function (type) {
    return "select HWC_VILLAGE_NAME as VILLAGE, count(HWC_VILLAGE_NAME) as FREQS, HWC_CASE_CATEGORY from hwc_details where HWC_CASE_CATEGORY = '" + type + "' group by HWC_VILLAGE_NAME, HWC_CASE_CATEGORY order by count(HWC_VILLAGE_NAME) desc limit 10;";
}
procedure.getrange_year = function (year) {
    return "select year(HWC_CASE_DATE) as YEAR, count(HWC_RANGE) as NO_OF_CASES, HWC_RANGE from hwc_details WHERE (year(HWC_CASE_DATE) = '"+year+"') group by year(HWC_CASE_DATE), HWC_RANGE;";
}
procedure.getrange_monthyear = function (year) {
    return "select year(HWC_CASE_DATE) as YEAR, monthname(HWC_CASE_DATE) as MONTH, count(HWC_RANGE) as NO_OF_CASES, HWC_RANGE from hwc_details WHERE (year(HWC_CASE_DATE) = '"+year+"') group by month(HWC_CASE_DATE), year(HWC_CASE_DATE), HWC_RANGE order by year(HWC_CASE_DATE), month(HWC_CASE_DATE), HWC_RANGE;";
}

//Compensation chart API's

procedure.getcompensation_sincestart = function () {
    return "select count(COM_HWC_CATAGORY) as Total_Com_Frequency,round(sum(com_amount),2) as Total_Com_Amt, round(avg(com_amount),2) as Average_Com_Amt, round(max(com_amount),2) as Max_Com_Amt, round(min(com_amount),2) as Min_Com_Amt, round(stddev(com_amount),2) as Com_Amt_std_dev from com_cases_details;";
}

procedure.getcompensation_bywsid = function () {
    return "select COM_WSID, count(COM_WSID) as Com_wsid_Frequency, round(stddev(com_amount),2) as STD_DEV, round(sum(com_amount),2) as Total_Com_Amt, round(avg(com_amount),2) as Average_Com_Amt, round(max(com_amount),2) as Max_Com_Amt, round(min(com_amount),2) as Min_Com_Amt from com_cases_details group by COM_WSID;";
}

procedure.getcompensation_bywsid_bydate = function (fromdate,todate) {
    return "select COM_WSID, count(COM_WSID) as Com_wsid_Frequency, round(stddev(com_amount),2) as STD_DEV, round(sum(com_amount),2) as Total_Com_Amt, round(avg(com_amount),2) as Average_Com_Amt, round(max(com_amount),2) as Max_Com_Amt, round(min(com_amount),2) as Min_Com_Amt from com_cases_details where com_hwc_date between '" + fromdate + "' AND '" + todate + "' group by COM_WSID;";
}

procedure.getcompensation_bydate = function (fromdate,todate) {
    return "select count(COM_HWC_CATAGORY) as Total_Com_Frequency,round(stddev(com_amount),2) as STD_DEV, round(sum(com_amount),2) as Total_Com_Amt, round(avg(com_amount),2) as Average_Com_Amt, round(max(com_amount),2) as Max_Com_Amt, round(min(com_amount),2) as Min_Com_Amt from com_cases_details where com_hwc_date between '" + fromdate + "' AND '" + todate + "';";
}

procedure.getcompensation_byCategory = function (fromdate,todate) {
    return "select UCASE(COM_HWC_CATAGORY) as HWC_Category,count(COM_HWC_CATAGORY) as Comp_Frequency, round(sum(com_amount),2) as Comp_Amt, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt, round(stddev(com_amount),2) as Com_Amt_std_dev from com_cases_details where com_hwc_date between '" + fromdate + "' AND '" + todate + "' group by com_hwc_catagory order by field(COM_HWC_CATAGORY, 'CR','CRPD','PD','LP','HI','HD');";
}

procedure.getTotalcompensation_byprojectyear = function (fromdate,todate) {
    return "select count(COM_HWC_CATAGORY) as Total_Com_Frequency,round(sum(com_amount),2) as Total_Com_Amt, round(avg(com_amount),2) as Average_Com_Amt, round(max(com_amount),2) as Max_Com_Amt, round(min(com_amount),2) as Min_Com_Amt from com_cases_details where com_hwc_date between '" + fromdate + "' AND '" + todate + "';";
}

procedure.getcompensationbycategory_byprojectyear = function (fromdate,todate) {
    return "select UCASE(COM_HWC_CATAGORY) as HWC_Category,count(COM_HWC_CATAGORY) as Comp_Frequency, round(sum(com_amount),2) as Comp_Amt, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt from com_cases_details where com_hwc_date between '" + fromdate + "' AND '" + todate + "' group by com_hwc_catagory order by field(COM_HWC_CATAGORY, 'CR','CRPD','PD','LP','HI','HD');";
}

procedure.getCompensationProcessedDays = function (fromdate,todate) {
    return "select x.com_om_sheet_num as OM_SHEET,x.COM_OM_SHEET_UPLOADED as UPLOADED_DATE, y.com_hwc_date as HWC_DATE, (timestampdiff(day,y.COM_HWC_DATE,x.COM_OM_SHEET_UPLOADED)) as COMPENSATION_DAYS from compensation_details x, com_cases_details y where x.COM_OM_SHEET_UPLOADED between '" + fromdate + "' AND '" + todate + "' and x.com_metainstance_id=y.com_parent_id order by x.com_om_sheet_num;";
}

procedure.getCompensationTotalProcessedDays = function (fromdate,todate) {
    return "select x.com_om_sheet_num as OM_SHEET, count(x.com_om_sheet_NUM) as NO_OF_SHEET, SUM(timestampdiff(day,y.COM_HWC_DATE,x.COM_OM_SHEET_UPLOADED)) as COMPENSATION_DAYS, round(SUM(timestampdiff(day,y.COM_HWC_DATE,x.COM_OM_SHEET_UPLOADED))/count(x.com_om_sheet_NUM),2) AS COMPENSATION_AVERAGE from compensation_details x, com_cases_details y where x.COM_OM_SHEET_UPLOADED between '" + fromdate + "' AND '" + todate + "' and x.com_metainstance_id=y.com_parent_id group by x.com_om_sheet_num order by x.com_om_sheet_num;";
}

procedure.getCompensationProcessedDays_bycategory = function (fromdate,todate) {
    return "select ucase(y.com_hwc_catagory) as HWC_CATEGORY,x.com_om_sheet_num as OM_SHEET, count(x.com_om_sheet_NUM) as NO_OF_SHEET, SUM(timestampdiff(day,y.COM_HWC_DATE,x.COM_OM_SHEET_UPLOADED)) as COMPENSATION_DAYS, round(SUM(timestampdiff(day,y.COM_HWC_DATE,x.COM_OM_SHEET_UPLOADED))/count(x.com_om_sheet_NUM),2) AS COMPENSATION_AVERAGE from compensation_details x, com_cases_details y where x.COM_OM_SHEET_UPLOADED between '" + fromdate + "' AND '" + todate + "' and x.com_metainstance_id=y.com_parent_id group by x.com_om_sheet_num,y.com_hwc_catagory order by field(y.COM_HWC_CATAGORY, 'CR','CRPD','PD','LP','HI','HD'),x.com_om_sheet_num;";
}

procedure.getCompProcessedDays_byProjectYear = function (fromdate,todate) {
    return "select x.com_om_sheet_num as OM_SHEET, count(x.com_om_sheet_NUM) as NO_OF_SHEET, SUM(timestampdiff(day,y.COM_HWC_DATE,x.COM_OM_SHEET_UPLOADED)) as COMPENSATION_DAYS, round(SUM(timestampdiff(day,y.COM_HWC_DATE,x.COM_OM_SHEET_UPLOADED))/count(x.com_om_sheet_NUM),2) AS COMPENSATION_AVERAGE from compensation_details x, com_cases_details y where x.COM_OM_SHEET_UPLOADED between '" + fromdate + "' AND '" + todate + "' and x.com_metainstance_id=y.com_parent_id group by x.com_om_sheet_num order by x.com_om_sheet_num;";
}

procedure.getCompProcessedDaysCategoryBysheet_byProjectYear = function (fromdate,todate) {
    return "select ucase(y.COM_HWC_CATAGORY) as HWC_CATEGORY,x.com_om_sheet_num as OM_SHEET, count(x.com_om_sheet_NUM) as NO_OF_SHEET, SUM(timestampdiff(day,y.COM_HWC_DATE,x.COM_OM_SHEET_UPLOADED)) as COMPENSATION_DAYS, round(SUM(timestampdiff(day,y.COM_HWC_DATE,x.COM_OM_SHEET_UPLOADED))/count(x.com_om_sheet_NUM),2) AS COMPENSATION_AVERAGE from compensation_details x, com_cases_details y where x.COM_OM_SHEET_UPLOADED between '" + fromdate + "' AND '" + todate + "' and x.com_metainstance_id=y.com_parent_id group by x.com_om_sheet_num,y.COM_HWC_CATAGORY order by field(y.COM_HWC_CATAGORY, 'CR','CRPD','PD','LP','HI','HD'),x.com_om_sheet_num;";
}

procedure.getCompProcessedDaysCategoryAll_byProjectYear = function (fromdate,todate) {
    return "select ucase(y.COM_HWC_CATAGORY) as HWC_CATEGORY, count(x.com_om_sheet_NUM) as NO_OF_SHEET, SUM(timestampdiff(day,y.COM_HWC_DATE,x.COM_OM_SHEET_UPLOADED)) as COMPENSATION_DAYS, round(SUM(timestampdiff(day,y.COM_HWC_DATE,x.COM_OM_SHEET_UPLOADED))/count(x.com_om_sheet_NUM),2) AS COMPENSATION_AVERAGE from compensation_details x, com_cases_details y where x.COM_OM_SHEET_UPLOADED between '" + fromdate + "' AND '" + todate + "' and x.com_metainstance_id=y.com_parent_id group by y.COM_HWC_CATAGORY order by field(y.COM_HWC_CATAGORY, 'CR','CRPD','PD','LP','HI','HD'); ";
}

//HWC chart API's
procedure.get_allhwc_category = function () {
    return "select HWC_CASE_CATEGORY AS CATEGORY, COUNT(HWC_CASE_CATEGORY) AS CAT_FREQ from hwc_details GROUP BY FIELD(HWC_CASE_CATEGORY,'CR','CRPD','PD','LP','HI','HD')"; // between YEAR(CURDATE())-3 and YEAR(CURDATE())) group by year(DC_CASE_DATE);"
}
procedure.get_hwc_category = function () {
    return "select HWC_PARK_NAME AS PARK, HWC_CASE_CATEGORY AS CATEGORY, COUNT(HWC_CASE_CATEGORY) AS CAT_FREQ from hwc_details GROUP BY HWC_PARK_NAME, FIELD(HWC_CASE_CATEGORY,'CR','CRPD','PD','LP','HI','HD')"; // between YEAR(CURDATE())-3 and YEAR(CURDATE())) group by year(DC_CASE_DATE);"
}
procedure.get_allhwc_animal = function () {
    return "select HWC_ANIMAL AS ANIMAL, COUNT(HWC_ANIMAL) AS ANIMAL_FREQ from hwc_details GROUP BY HWC_ANIMAL";
}
procedure.get_hwc_animal = function () {
    return "select HWC_PARK_NAME AS PARK, HWC_ANIMAL AS ANIMAL, COUNT(HWC_ANIMAL) AS ANIMAL_FREQ from hwc_details GROUP BY HWC_PARK_NAME, HWC_ANIMAL";
}
procedure.get_allhwc_taluk = function () {
    return "select HWC_TALUK_NAME AS TALUK, COUNT(HWC_TALUK_NAME) AS TALUK_FREQ from hwc_details GROUP BY HWC_TALUK_NAME";
}
procedure.get_hwc_taluk = function () {
    return "select HWC_PARK_NAME AS PARK, HWC_TALUK_NAME AS TALUK, COUNT(HWC_TALUK_NAME) AS TALUK_FREQ from hwc_details GROUP BY HWC_PARK_NAME, HWC_TALUK_NAME";
}
procedure.get_allhwc_village = function () {
    return "select HWC_VILLAGE_NAME AS VILLAGE, COUNT(HWC_VILLAGE_NAME) AS VILLAGE_FREQ from hwc_details GROUP BY HWC_VILLAGE_NAME";
}
procedure.get_hwc_village = function () {
    return "select HWC_PARK_NAME AS PARK, HWC_VILLAGE_NAME AS VILLAGE, COUNT(HWC_VILLAGE_NAME) AS VILLAGE_FREQ from hwc_details GROUP BY HWC_PARK_NAME, HWC_VILLAGE_NAME";
}
procedure.get_allhwc_park = function () {
    return "select COUNT(HWC_PARK_NAME) AS PARK_FREQ from hwc_details;";
}
procedure.get_hwc_park = function () {
    return "select HWC_PARK_NAME AS PARK, COUNT(HWC_PARK_NAME) AS PARK_FREQ from hwc_details GROUP BY HWC_PARK_NAME";
}
procedure.get_allhwc_range = function () {
    return "select HWC_RANGE, COUNT(HWC_RANGE) AS RANGE_FREQ from hwc_details GROUP BY HWC_RANGE";
}
procedure.get_hwc_range = function () {
    return "select HWC_PARK_NAME AS PARK, HWC_RANGE, COUNT(HWC_RANGE) AS RANGE_FREQ from hwc_details GROUP BY HWC_PARK_NAME, HWC_RANGE";
}

//by HWC_date
procedure.get_hwc_category_byhwcdate_sum = function (fromdate, todate) {
    return "select HWC_CASE_CATEGORY AS CATEGORY, COUNT(HWC_CASE_CATEGORY) AS CAT_FREQ from hwc_details where HWC_CASE_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY FIELD(HWC_CASE_CATEGORY,'CR','CRPD','PD','LP','HI','HD');";
}
procedure.get_hwc_category_byhwcdate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS HWC_DATE, HWC_CASE_CATEGORY AS CATEGORY, COUNT(HWC_CASE_CATEGORY) AS CAT_FREQ from hwc_details where HWC_CASE_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY HWC_CASE_DATE, FIELD(HWC_CASE_CATEGORY,'CR','CRPD','PD','LP','HI','HD');";
}
procedure.get_hwc_animal_byhwcdate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS HWC_DATE, HWC_ANIMAL AS ANIMAL, COUNT(HWC_ANIMAL) AS ANIMAL_FREQ from hwc_details where HWC_CASE_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY HWC_CASE_DATE, HWC_ANIMAL";
}
procedure.get_hwc_taluk_byhwcdate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS HWC_DATE, HWC_TALUK_NAME AS TALUK, COUNT(HWC_TALUK_NAME) AS TALUK_FREQ from hwc_details where HWC_CASE_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY HWC_CASE_DATE, HWC_TALUK_NAME";
}
procedure.get_hwc_village_byhwcdate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS HWC_DATE, HWC_VILLAGE_NAME AS VILLAGE, COUNT(HWC_VILLAGE_NAME) AS VILLAGE_FREQ from hwc_details where HWC_CASE_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY HWC_CASE_DATE, HWC_VILLAGE_NAME";
}
procedure.get_hwc_park_byhwcdate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS HWC_DATE, HWC_PARK_NAME AS PARK, COUNT(HWC_PARK_NAME) AS PARK_FREQ from hwc_details where HWC_CASE_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY HWC_CASE_DATE, HWC_PARK_NAME";
}
procedure.get_hwc_range_byhwcdate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS HWC_DATE, HWC_RANGE, COUNT(HWC_RANGE) AS RANGE_FREQ from hwc_details where HWC_CASE_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY HWC_CASE_DATE, HWC_RANGE";
}

//by FA_date
procedure.getFA_ByHWC_casedate = function (fromdate, todate) {
    return "select HWC_USER_NAME AS FA_NAME, COUNT(HWC_USER_NAME) AS FA_FREQ from hwc_details where HWC_CASE_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY HWC_USER_NAME";
}

procedure.get_hwc_category_byfadate_sum = function (fromdate, todate) {
    return "select HWC_CASE_CATEGORY AS CATEGORY, COUNT(HWC_CASE_CATEGORY) AS CAT_FREQ from hwc_details where HWC_FD_SUB_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY field(HWC_CASE_CATEGORY,'CR','CRPD','PD','LP','HI','HD')";
}
procedure.get_hwc_category_byfadate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_FD_SUB_DATE, '%d-%m-%Y') AS FA_DATE, HWC_CASE_CATEGORY AS CATEGORY, COUNT(HWC_CASE_CATEGORY) AS CAT_FREQ from hwc_details where HWC_FD_SUB_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY HWC_FD_SUB_DATE, field(HWC_CASE_CATEGORY,'CR','CRPD','PD','LP','HI','HD')";
}
procedure.get_hwc_animal_byfadate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_FD_SUB_DATE, '%d-%m-%Y') AS FA_DATE, HWC_ANIMAL AS ANIMAL, COUNT(HWC_ANIMAL) AS ANIMAL_FREQ from hwc_details where HWC_FD_SUB_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY HWC_FD_SUB_DATE, HWC_ANIMAL";
}
procedure.get_hwc_taluk_byfadate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_FD_SUB_DATE, '%d-%m-%Y') AS FA_DATE, HWC_TALUK_NAME AS TALUK, COUNT(HWC_TALUK_NAME) AS TALUK_FREQ from hwc_details where HWC_FD_SUB_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY HWC_FD_SUB_DATE, HWC_TALUK_NAME";
}
procedure.get_hwc_village_byfadate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_FD_SUB_DATE, '%d-%m-%Y') AS FA_DATE, HWC_VILLAGE_NAME AS VILLAGE, COUNT(HWC_VILLAGE_NAME) AS VILLAGE_FREQ from hwc_details where HWC_FD_SUB_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY HWC_FD_SUB_DATE, HWC_VILLAGE_NAME";
}
procedure.get_hwc_park_byfadate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_FD_SUB_DATE, '%d-%m-%Y') AS FA_DATE, HWC_PARK_NAME AS PARK, COUNT(HWC_PARK_NAME) AS PARK_FREQ from hwc_details where HWC_FD_SUB_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY HWC_FD_SUB_DATE, HWC_PARK_NAME";
}
procedure.get_hwc_range_byfadate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_FD_SUB_DATE, '%d-%m-%Y') AS FA_DATE, HWC_RANGE, COUNT(HWC_RANGE) AS RANGE_FREQ from hwc_details where HWC_FD_SUB_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY HWC_FD_SUB_DATE, HWC_RANGE";
}

procedure.get_freq_byhwcdate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_CASE_DATE, '%d-%m-%Y') AS HWC_DATE, COUNT(HWC_CASE_DATE) AS DATE_FREQ from hwc_details where HWC_CASE_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY HWC_CASE_DATE";
}

procedure.get_FA_bydate_n_category = function (fromdate, todate) {
    return "SELECT distinct(HWC_CASE_CATEGORY) as CATEGORY, COUNT(HWC_CASE_CATEGORY) AS CASES, HWC_USER_NAME AS FA_NAME FROM hwc_details where hwc_case_date between '" + fromdate + "' AND '" + todate + "' group by hwc_case_category,HWC_USER_NAME ORDER BY field(HWC_CASE_CATEGORY,'CR','CRPD','PD','LP','HI','HD'),CASES desc;";
}

procedure.get_FAaverage_bySubTime = function (fromdate, todate) {
    return "select distinct concat(ucase(left(hwc_user_name,1)),substring(hwc_user_name,2)) as Field_Asst, monthname(hwc_case_date) as month_s,year(hwc_case_date) as year_s, count(HWC_USER_NAME) as Total_Cases, sum(datediff(hwc_fd_sub_date,hwc_case_date)) as Total_Time_Taken, max(datediff(hwc_fd_sub_date,hwc_case_date)) as Max_Days_Taken, min(datediff(hwc_fd_sub_date,hwc_case_date)) as Min_Days_Taken, round(avg(datediff(hwc_fd_sub_date,hwc_case_date)),2) as Avg_Time_Taken, round(stddev(datediff(hwc_fd_sub_date,hwc_case_date)),2) as STD_DEV_Days from hwc_details where hwc_case_date between '" + fromdate + "' AND '" + todate + "' group by hwc_user_name,year_s,month_s order by year_s,FIELD(Month_s,'January','February','March','April','May','June','July','August','September','October','November','December'),hwc_user_name;";
}

procedure.get_freq_byfadate = function (fromdate, todate) {
    return "select DATE_FORMAT(HWC_FD_SUB_DATE, '%d-%m-%Y') AS FA_DATE, COUNT(HWC_FD_SUB_DATE) AS DATE_FREQ from hwc_details where HWC_FD_SUB_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY HWC_FD_SUB_DATE";
}

procedure.get_cases_byyear_month = function () {
    return "select year(HWC_CASE_DATE) as YEAR, monthname(HWC_CASE_DATE) as MONTH, count(HWC_CASE_DATE) AS TOTAL_CASES from hwc_details WHERE (year(HWC_CASE_DATE) between '2015' and YEAR(CURDATE())) group by month(HWC_CASE_DATE), year(HWC_CASE_DATE) order by year(HWC_CASE_DATE), month(HWC_CASE_DATE)";
}

procedure.get_freqcases_byprojectyear = function (from, to) {
    return "select year(HWC_CASE_DATE) as YEAR, count(HWC_CASE_DATE) AS TOTAL_CASES from hwc_details WHERE (DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') between '" + from + "' AND '" + to + "') group by year(HWC_CASE_DATE) order by year(HWC_CASE_DATE);";
}

procedure.get_top50_wsid_bycases = function () {
    return "select HWC_WSID, count(HWC_WSID) AS CASES from hwc_details group by HWC_WSID order by count(HWC_WSID) desc limit 50";
}

procedure.get_top20_wsid_bycat = function () {
    return "select HWC_WSID, HWC_CASE_CATEGORY, count(HWC_WSID) AS CASES from hwc_details group by HWC_CASE_CATEGORY, HWC_WSID order by count(HWC_WSID) desc limit 20";
}

procedure.get_top10_crop = function () {
    return "SELECT HWC_CROP_NAME AS CROP_NAME, count(HWC_CROP_NAME) AS CROP_FREQ FROM hwc_case_crop GROUP BY HWC_CROP_NAME ORDER BY count(HWC_CROP_NAME) DESC LIMIT 10;";
}

procedure.get_top10_property = function () {
    return "SELECT HWC_PROPERY_NAME AS PROPERTY_NAME, count(HWC_PROPERY_NAME) AS PROPERTY_FREQ FROM hwc_case_property GROUP BY HWC_PROPERY_NAME ORDER BY count(HWC_PROPERY_NAME) DESC LIMIT 10;";
}

procedure.get_top10_livestock = function () {
    return "SELECT HWC_LIVE_STOCK_NAME AS LIVESTOCK_NAME, count(HWC_LIVE_STOCK_NAME) AS LIVESTOCK_FREQ FROM hwc_case_livestock GROUP BY HWC_LIVE_STOCK_NAME ORDER BY count(HWC_LIVE_STOCK_NAME) DESC LIMIT 10;";
}

procedure.get_top30_villages = function () {
    return "SELECT HWC_VILLAGE_NAME AS VILLAGE_NAME, count(HWC_VILLAGE_NAME) AS VILLAGE_FREQ FROM hwc_details GROUP BY HWC_VILLAGE_NAME ORDER BY count(HWC_VILLAGE_NAME) DESC LIMIT 50;";
}

procedure.get_total_comp = function () {
    return "select count(COM_HWC_CATAGORY) as Total_Com_Frequency,round(sum(com_amount),2) as Total_Com_Amt, round(stddev(com_amount),2) as Com_Amt_std_dev, round(avg(com_amount),2) as Average_Com_Amt, round(max(com_amount),2) as Max_Com_Amt, round(min(com_amount),2) as Min_Com_Amt from com_cases_details;";
}

procedure.get_total_comp_bycategory = function () {
    return "select UCASE(COM_HWC_CATAGORY) as HWC_Category,count(COM_HWC_CATAGORY) as Comp_Frequency, round(stddev(com_amount),2) as Com_Amt_std_dev, round(sum(com_amount),2) as Comp_Amt, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt from com_cases_details group by field(com_hwc_catagory,'CR','CRPD','PD','LP','HI','HD');";
}

procedure.get_total_comp_bycategory_bypark = function () {
    return "select COM_PARK, UCASE(COM_HWC_CATAGORY) as HWC_Category,count(COM_HWC_CATAGORY) as Comp_Frequency, round(stddev(com_amount),2) as Com_Amt_std_dev, round(sum(com_amount),2) as Comp_Amt, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt from com_cases_details group by COM_PARK, field(com_hwc_catagory,'CR','CRPD','PD','LP','HI','HD');";
}

procedure.get_total_comp_byvillage = function () {
    return "select CONCAT(UCASE(LEFT(COM_VILLAGE,1)),SUBSTRING(COM_VILLAGE,2)) as VILLAGE, count(COM_VILLAGE) as Comp_Frequency, round(stddev(com_amount),2) as Com_Amt_std_dev, round(sum(com_amount),2) as Comp_Amt, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt from com_cases_details group by COM_VILLAGE;";
}

procedure.get_total_comp_byrange = function () {
    return "select compmain.COM_OM_RANGE, count(compmain.COM_OM_RANGE) as RANGE_FREQ, round(stddev(com_amount),2) as STD_DEV, round(sum(com_amount),2) as Total_Com_Amt, round(avg(com_amount),2) as Average_Com_Amt, round(max(com_amount),2) as Max_Com_Amt, round(min(com_amount),2) as Min_Com_Amt from com_cases_details,(SELECT COM_METAINSTANCE_ID,COM_OM_RANGE FROM compensation_details) AS compmain where COM_PARENT_ID = compmain.COM_METAINSTANCE_ID group by compmain.COM_OM_RANGE;";
}

procedure.get_total_comp_bytaluk = function () {
    return "select CONCAT(UCASE(LEFT(COM_TALUK,1)),SUBSTRING(COM_TALUK,2)) as TALUK, count(COM_TALUK) as Comp_Frequency, round(stddev(com_amount),2) as Com_Amt_std_dev, round(sum(com_amount),2) as Comp_Amt, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt from com_cases_details group by COM_TALUK;";
}

procedure.get_total_comp_bypark = function () {
    return "select CONCAT(UCASE(LEFT(COM_PARK,1)),SUBSTRING(COM_PARK,2)) as PARK, count(COM_PARK) as Comp_Frequency, round(stddev(com_amount),2) as Com_Amt_std_dev,round(sum(com_amount),2) as Comp_Amt, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt from com_cases_details group by COM_PARK;";
}

procedure.get_comp_bywsid = function (fromdate, todate) {
    return "select COM_WSID, count(COM_WSID) as Com_wsid_Frequency, round(stddev(com_amount),2) as STD_DEV, round(sum(com_amount),2) as Total_Com_Amt, round(avg(com_amount),2) as Average_Com_Amt, round(max(com_amount),2) as Max_Com_Amt, round(min(com_amount),2) as Min_Com_Amt from com_cases_details where com_hwc_date between '" + fromdate + "' AND '" + todate + "' group by COM_WSID;";
}

procedure.get_comp_bywsid_byeachcategory = function (type) {
    return "select COM_WSID, COM_HWC_CATAGORY, count(COM_WSID) as Com_wsid_Frequency, round(stddev(com_amount),2) as STD_DEV, round(sum(com_amount),2) as Total_Com_Amt, round(avg(com_amount),2) as Average_Com_Amt, round(max(com_amount),2) as Max_Com_Amt, round(min(com_amount),2) as Min_Com_Amt from com_cases_details where COM_HWC_CATAGORY = '" + type + "' group by COM_WSID, COM_HWC_CATAGORY order by count(COM_WSID) desc limit 50;";
}

procedure.get_comp_bywsid_bycategory = function (fromdate, todate) {
    return "select COM_WSID, UCASE(com_hwc_catagory), count(COM_WSID) as Com_wsid_Frequency, round(stddev(com_amount),2) as STD_DEV, round(sum(com_amount),2) as Total_Com_Amt, round(avg(com_amount),2) as Average_Com_Amt, round(max(com_amount),2) as Max_Com_Amt, round(min(com_amount),2) as Min_Com_Amt from com_cases_details where com_hwc_date between '" + fromdate + "' AND '" + todate + "' group by COM_WSID, field(com_hwc_catagory,'CR','CRPD','PD','LP','HI','HD');";
}

procedure.get_comp_bywsid_bypark_bydate = function (fromdate, todate) {
    return "select COM_WSID, com_park, count(COM_WSID) as Com_wsid_Frequency, round(stddev(com_amount),2) as STD_DEV, round(sum(com_amount),2) as Total_Com_Amt, round(avg(com_amount),2) as Average_Com_Amt, round(max(com_amount),2) as Max_Com_Amt, round(min(com_amount),2) as Min_Com_Amt from com_cases_details where com_hwc_date between '" + fromdate + "' AND '" + todate + "' group by COM_WSID, COM_PARK;";
}

procedure.get_comp_bywsid_bytaluk_bydate = function (fromdate, todate) {
    return "select COM_WSID, COM_TALUK, count(COM_WSID) as Com_wsid_Frequency, round(stddev(com_amount),2) as STD_DEV, round(sum(com_amount),2) as Total_Com_Amt, round(avg(com_amount),2) as Average_Com_Amt, round(max(com_amount),2) as Max_Com_Amt, round(min(com_amount),2) as Min_Com_Amt from com_cases_details where com_hwc_date between '" + fromdate + "' AND '" + todate + "' group by COM_WSID, COM_TALUK;";
}

procedure.get_comp_bywsid_byrange_bydate = function (fromdate, todate) {
    return "select COM_WSID, compmain.COM_OM_RANGE, count(COM_WSID) as Com_wsid_Frequency, round(stddev(com_amount),2) as STD_DEV, round(sum(com_amount),2) as Total_Com_Amt, round(avg(com_amount),2) as Average_Com_Amt, round(max(com_amount),2) as Max_Com_Amt, round(min(com_amount),2) as Min_Com_Amt from com_cases_details,(SELECT COM_METAINSTANCE_ID,COM_OM_RANGE FROM compensation_details) AS compmain where COM_PARENT_ID = compmain.COM_METAINSTANCE_ID AND COM_HWC_DATE between '" + fromdate + "' AND '" + todate + "' group by COM_WSID, compmain.COM_OM_RANGE;";
}

procedure.get_comp_bywsid_all = function () {
    return "select COM_WSID, count(COM_WSID) as Com_wsid_Frequency, round(stddev(com_amount),2) as STD_DEV, round(sum(com_amount),2) as Total_Com_Amt, round(avg(com_amount),2) as Average_Com_Amt, round(max(com_amount),2) as Max_Com_Amt, round(min(com_amount),2) as Min_Com_Amt from com_cases_details group by COM_WSID;";
}

procedure.get_comp_bywsid_bycategory = function () {
    return "select COM_WSID, UCASE(com_hwc_catagory), count(COM_WSID) as Com_wsid_Frequency, round(stddev(com_amount),2) as STD_DEV, round(sum(com_amount),2) as Total_Com_Amt, round(avg(com_amount),2) as Average_Com_Amt, round(max(com_amount),2) as Max_Com_Amt, round(min(com_amount),2) as Min_Com_Amt from com_cases_details group by COM_WSID, field(com_hwc_catagory,'CR','CRPD','PD','LP','HI','HD');";
}

procedure.get_comp_bywsid_bypark = function () {
    return "select COM_WSID, com_park, count(COM_WSID) as Com_wsid_Frequency, round(stddev(com_amount),2) as STD_DEV, round(sum(com_amount),2) as Total_Com_Amt, round(avg(com_amount),2) as Average_Com_Amt, round(max(com_amount),2) as Max_Com_Amt, round(min(com_amount),2) as Min_Com_Amt from com_cases_details group by COM_WSID, COM_PARK;";
}

procedure.get_comp_bywsid_bytaluk = function () {
    return "select COM_WSID, COM_TALUK, count(COM_WSID) as Com_wsid_Frequency, round(stddev(com_amount),2) as STD_DEV, round(sum(com_amount),2) as Total_Com_Amt, round(avg(com_amount),2) as Average_Com_Amt, round(max(com_amount),2) as Max_Com_Amt, round(min(com_amount),2) as Min_Com_Amt from com_cases_details group by COM_WSID, COM_TALUK;";
}

procedure.get_comp_bywsid_byrange = function () {
    return "select COM_WSID, compmain.COM_OM_RANGE, count(COM_WSID) as Com_wsid_Frequency, round(stddev(com_amount),2) as STD_DEV, round(sum(com_amount),2) as Total_Com_Amt, round(avg(com_amount),2) as Average_Com_Amt, round(max(com_amount),2) as Max_Com_Amt, round(min(com_amount),2) as Min_Com_Amt from com_cases_details,(SELECT COM_METAINSTANCE_ID,COM_OM_RANGE FROM compensation_details) AS compmain where COM_PARENT_ID = compmain.COM_METAINSTANCE_ID group by COM_WSID, compmain.COM_OM_RANGE;";
}

procedure.get_comp_bycategory = function (fromdate, todate) {
    return "select UCASE(COM_HWC_CATAGORY) as HWC_Category,count(COM_HWC_CATAGORY) as Comp_Frequency,round(stddev(com_amount),2) as Com_Amt_std_dev, round(sum(com_amount),2) as Comp_Amt, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt from com_cases_details where com_hwc_date between '" + fromdate + "' AND '" + todate + "' group by field(com_hwc_catagory,'CR','CRPD','PD','LP','HI','HD');";
}

procedure.get_comp_byvillage = function (fromdate, todate) {
    return "select CONCAT(UCASE(LEFT(COM_VILLAGE,1)),SUBSTRING(COM_VILLAGE,2)) as VILLAGE, count(COM_VILLAGE) as Comp_Frequency, round(stddev(com_amount),2) as Com_Amt_std_dev, round(sum(com_amount),2) as Comp_Amt, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt from com_cases_details where com_hwc_date between '" + fromdate + "' AND '" + todate + "' group by COM_VILLAGE;";
}

procedure.get_comp_bytaluk = function (fromdate, todate) {
    return "select CONCAT(UCASE(LEFT(COM_TALUK,1)),SUBSTRING(COM_TALUK,2)) as TALUK, count(COM_TALUK) as Comp_Frequency, round(stddev(com_amount),2) as Com_Amt_std_dev, round(sum(com_amount),2) as Comp_Amt, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt from com_cases_details where com_hwc_date between '" + fromdate + "' AND '" + todate + "' group by COM_TALUK;";
}

procedure.get_comp_bypark = function (fromdate, todate) {
    return "select CONCAT(UCASE(LEFT(COM_PARK,1)),SUBSTRING(COM_PARK,2)) as PARK, count(COM_PARK) as Comp_Frequency, round(sum(com_amount),2) as Comp_Amt, round(stddev(com_amount),2) as Com_Amt_std_dev, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt from com_cases_details where com_hwc_date between '" + fromdate + "' AND '" + todate + "' group by COM_PARK;";
}

procedure.get_comp_byFArange = function (fromdate, todate) {
    return "select CONCAT(UCASE(LEFT(COM_OM_RANGE,1)),SUBSTRING(COM_OM_RANGE,2)) as COM_RANGE, count(COM_OM_RANGE) as Comp_Frequency, round(stddev(com_amount),2) as Com_Amt_std_dev, round(sum(com_amount),2) as Comp_Amt, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt from compensation_details, com_cases_details where com_hwc_date between '" + fromdate + "' AND '" + todate + "' and com_metainstance_id=com_parent_id group by COM_OM_RANGE;";
}

procedure.get_comp_top50_wsid = function (fromdate, todate) {
    return "select COM_WSID AS WSID,count(COM_WSID) as WSID_Frequency, round(stddev(com_amount),2) as Com_Amt_std_dev, round(sum(com_amount),2) as Comp_Amt, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt from com_cases_details where com_hwc_date between '" + fromdate + "' AND '" + todate + "' group by COM_WSID order by WSID_Frequency DESC LIMIT 50;"
}

procedure.get_comp_top20_village = function (fromdate, todate) {
    return "select CONCAT(UCASE(LEFT(COM_VILLAGE,1)),SUBSTRING(COM_VILLAGE,2)) as VILLAGE, count(COM_VILLAGE) as Comp_Frequency, round(stddev(com_amount),2) as Com_Amt_std_dev, round(sum(com_amount),2) as Comp_Amt, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt from com_cases_details where com_hwc_date between '" + fromdate + "' AND '" + todate + "' group by COM_VILLAGE order by Comp_Frequency DESC limit 20;"
}

procedure.get_comp_byomsheet = function (fromdate, todate) {
    return "select COM_OM_SHEET_NUM as OM_SHEET_NO,COM_WSID as WSID,count(COM_WSID) as Frequency, round(stddev(com_amount),2) as Com_Amt_std_dev, round(sum(com_amount),2) as Comp_Amt, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt from com_cases_details, compensation_details where com_om_sheet_uploaded between '" + fromdate + "' AND '" + todate + "' and com_metainstance_id=com_parent_id group by COM_OM_SHEET_NUM,COM_WSID order by COM_OM_SHEET_NUM,Frequency desc;";
}

procedure.get_comp_byomsheetdate = function (fromdate, todate) {
    return "select COM_OM_SHEET_UPLOADED as Om_Sheet_Date,count(COM_AMOUNT) as Freq_Comp, round(stddev(com_amount),2) as Com_Amt_std_dev, round(sum(com_amount),2) as Comp_Amt, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt from com_cases_details, compensation_details where com_om_sheet_uploaded between '" + fromdate + "' AND '" + todate + "' and com_metainstance_id=com_parent_id group by com_om_sheet_uploaded order by com_om_sheet_uploaded;"
}

procedure.get_comp_amount_byomsheetdate = function (fromdate, todate) {
    return "select COM_OM_SHEET_UPLOADED as Om_Sheet_Date, round(stddev(com_amount),2) as Com_Amt_std_dev, round(sum(com_amount),2) as Comp_Amt, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt from com_cases_details, compensation_details where com_om_sheet_uploaded between '" + fromdate + "' AND '" + todate + "' and com_metainstance_id=com_parent_id group by com_om_sheet_uploaded order by com_om_sheet_uploaded;";
}

procedure.get_comp_amount_byomsheetdate_bycategory = function (fromdate, todate) {
    return "select COM_OM_SHEET_UPLOADED as Om_Sheet_Date, ucase(COM_HWC_CATAGORY) as HWC_Category, count(COM_HWC_CATAGORY) as Freq_HWC_Category, round(stddev(com_amount),2) as Com_Amt_std_dev, round(sum(com_amount),2) as Comp_Amt, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt from com_cases_details, compensation_details where com_om_sheet_uploaded between '" + fromdate + "' AND '" + todate + "' and com_metainstance_id=com_parent_id group by com_om_sheet_uploaded,com_hwc_catagory order by com_om_sheet_uploaded,COM_HWC_CATAGORY;";
}

procedure.get_com_fdrange = function (fromdate, todate) {
    return "select CONCAT(UCASE(LEFT(COM_OM_RANGE,1)),SUBSTRING(COM_OM_RANGE,2)) as COM_RANGE, count(COM_OM_RANGE) as Comp_Frequency, round(stddev(com_amount),2) as Com_Amt_std_dev, round(sum(com_amount),2) as Comp_Amt, round(avg(com_amount),2) as Average_Comp_Amt, round(max(com_amount),2) as Max_Comp_Amt, round(min(com_amount),2) as Min_Comp_Amt from compensation_details, odk.com_cases_details where com_hwc_date between '" + fromdate + "' AND '" + todate + "' and com_metainstance_id=com_parent_id group by COM_OM_RANGE;"
}

procedure.get_com_omnum_omdate = function () {
    return "SELECT COM_OM_SHEET_NUM, count(COM_OM_SHEET_NUM) as SHEET_FREQ, year(COM_OM_SHEET_UPLOADED) as YEAR, monthname(COM_OM_SHEET_UPLOADED) as MONTH, COM_OM_SHEET_UPLOADED, sum(COM_OM_TOTAL_CASES) AS COM_OM_TOTAL_CASES, sum(COM_OM_WS_CASES) AS COM_OM_WS_CASES FROM compensation_details group by  COM_OM_SHEET_UPLOADED, COM_OM_SHEET_NUM order by COM_OM_SHEET_UPLOADED;";
}

procedure.get_com_omnum_omdate_omrange = function () {
    return "SELECT COM_OM_RANGE, COM_OM_SHEET_NUM, count(COM_OM_SHEET_NUM) as SHEET_FREQ, COM_OM_SHEET_UPLOADED, sum(COM_OM_TOTAL_CASES) AS COM_OM_TOTAL_CASES, sum(COM_OM_WS_CASES) AS COM_OM_WS_CASES FROM compensation_details group by  COM_OM_SHEET_UPLOADED, COM_OM_SHEET_NUM, COM_OM_RANGE order by COM_OM_SHEET_UPLOADED;";
}

procedure.get_com_omsheet = function () {
    return "select count(com_om_sheet_num) as No_of_sheet from compensation_details;"
}

procedure.get_com_omsheet_bydate = function (fromdate,todate) {
    return "select count(com_om_sheet_num) as No_of_sheets from compensation_details where COM_OM_SHEET_UPLOADED between '" + fromdate + "' AND '" + todate + "';"
}

procedure.get_30incident_WSID = function () {
    return "select HWC_WSID, count(HWC_WSID) as INCIDENT from hwc_details group by HWC_WSID order by count(HWC_WSID) desc limit 30;"
}

procedure.get_30incident_WSID_bycat = function (type) {
    return "select HWC_WSID, count(HWC_WSID) as INCIDENT , HWC_CASE_CATEGORY from hwc_details where HWC_CASE_CATEGORY = '" + type + "' group by HWC_WSID, HWC_CASE_CATEGORY order by HWC_CASE_CATEGORY, count(HWC_WSID) desc limit 50;"
}

procedure.get_30incident_Village = function () {
    return "select HWC_VILLAGE_NAME, count(HWC_VILLAGE_NAME) AS INCIDENT from hwc_details group by HWC_VILLAGE_NAME order by count(HWC_VILLAGE_NAME) desc limit 50;"
}

procedure.get_30incident_Range = function () {
    return "select HWC_RANGE, count(HWC_RANGE) AS INCIDENT from hwc_details group by HWC_RANGE order by count(HWC_RANGE) desc limit 30;"
}

procedure.get_30incident_Village_bycat = function (type) {
    return "select HWC_VILLAGE_NAME, count(HWC_VILLAGE_NAME) AS INCIDENT, HWC_CASE_CATEGORY from hwc_details where HWC_CASE_CATEGORY = '" + type + "' group by HWC_VILLAGE_NAME, HWC_CASE_CATEGORY order by count(HWC_VILLAGE_NAME) desc limit 30;"
}

procedure.get_30incident_Range_bycat = function (type) {
    return "select HWC_RANGE, count(HWC_RANGE) AS INCIDENT, HWC_CASE_CATEGORY from hwc_details where HWC_CASE_CATEGORY = '" + type + "' group by HWC_RANGE, HWC_CASE_CATEGORY order by count(HWC_RANGE) desc limit 30;"
}

//QUERY for Daily count
procedure.get_dc_total_cases = function () {
    return "SELECT SUM(DC_TOTAL_CASES) AS DC_TOTAL_CASES, SUM(DC_NH_CASES) AS TOTAL_NH_CASES, SUM(DC_BP_CASES) AS TOTAL_BP_CASES FROM daily_count;"
}

procedure.get_dc_total_cases_byhwc_cat = function () {
    return "SELECT SUM(DC_TOTAL_ATTENDED_CASE) AS TOTAL, SUM(DC_CROP) AS CROP, SUM(DC_PROPERTY) AS PROPERTY, SUM(DC_CROP_PROPERTY) AS CROP_PROPERTY, SUM(DC_LIVESTOCK) AS LIVESTOCK, SUM(DC_HUMAN_INJURY) AS HUMAN_INJURY, SUM(DC_HUMAN_DEATH) AS HUMAN_DEATH FROM dc_cases;"
}

procedure.get_dc_total_cases_byFA = function () {
    return "SELECT SUM(DC_TOTAL_ATTENDED_CASE) AS TOTAL, DC_FA_UN AS FIELD_ASSISTANT FROM dc_cases GROUP BY DC_FA_UN;"
}

procedure.get_dc_total_cases_hwc_byFA = function () {
    return "SELECT DC_FA_UN AS FIELD_ASSISTANT, SUM(DC_TOTAL_ATTENDED_CASE) AS TOTAL, SUM(DC_CROP) AS CROP, SUM(DC_PROPERTY) AS PROPERTY, SUM(DC_CROP_PROPERTY) AS CROP_PROPERTY, SUM(DC_LIVESTOCK) AS LIVESTOCK, SUM(DC_HUMAN_INJURY) AS HUMAN_INJURY, SUM(DC_HUMAN_DEATH) AS HUMAN_DEATH FROM dc_cases GROUP BY DC_FA_UN;"
}

procedure.get_dc_cases_bydate = function (fromdate, todate) {
    return "SELECT DATE_FORMAT(DC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, sum(DC_CROP) AS TOTAL_CR, sum(DC_CROP_PROPERTY) AS TOTAL_CRPD, sum(DC_LIVESTOCK) AS TOTAL_LS, sum(DC_PROPERTY) AS TOTAL_PD, sum(DC_HUMAN_INJURY) AS TOTAL_HI,sum(DC_HUMAN_DEATH) AS TOTAL_HD, sum(DC_TOTAL_ATTENDED_CASE) AS DC_TOTAL_CASES FROM dc_cases where DC_CASE_DATE between '" + fromdate + "' AND '" + todate + "' group by DC_CASE_DATE order by DC_CASE_DATE DESC;"
}

procedure.get_dc_cases_hwc_bydate = function (fromdate, todate) {
    return "SELECT DATE_FORMAT(DC_CASE_DATE, '%d-%m-%Y') AS CASE_DATE, SUM(DC_TOTAL_ATTENDED_CASE) AS TOTAL, SUM(DC_CROP) AS CROP, SUM(DC_PROPERTY) AS PROPERTY, SUM(DC_CROP_PROPERTY) AS CROP_PROPERTY, SUM(DC_LIVESTOCK) AS LIVESTOCK, SUM(DC_HUMAN_INJURY) AS HUMAN_INJURY, SUM(DC_HUMAN_DEATH) AS HUMAN_DEATH FROM dc_cases where DC_CASE_DATE between '" + fromdate + "' AND '" + todate + "' group by DC_CASE_DATE order by count(DC_CASE_DATE) DESC;"
}

procedure.get_dcvshwc_bydate = function (fromdate, todate) {
    return "select sum(dc_total_cases) as Cases from daily_count where dc_case_date between '" + fromdate + "' AND '" + todate + "' union select count(hwc_case_category) from hwc_details where hwc_case_date between '" + fromdate + "' AND '" + todate + "';"
}

procedure.get_dcvshwc_cat_bydate = function (fromdate, todate) {
    return "select sum(dc_crop) as CR, sum(dc_crop_property) as CRPD, sum(dc_property) as PD, sum(dc_livestock) as LP, sum(dc_human_injury) as HI, sum(dc_human_death) as HD from dc_cases where dc_case_date between '" + fromdate + "' AND '" + todate + "' union select count(if(hwc_case_category='CR', 1, NULL)) 'CR', count(if(hwc_case_category='CRPD', 1, NULL)) 'CRPD', count(if(hwc_case_category='PD',1,NULL)) 'PD', count(if(hwc_case_category='LP',1,NULL)) 'LP', count(if(hwc_case_category='HI',1,NULL)) 'HI', count(if(hwc_case_category='HD',1,NULL)) 'HD' from hwc_details where hwc_case_date between '" + fromdate + "' AND '" + todate + "';"
}

//Publicity Query
procedure.get_pb_total = function () {
    return "SELECT count(PB_C_VILLAGE) AS TOTAL_VILLAGE from publicity;"
}

procedure.get_pb_byvillage = function () {
    return "SELECT PB_C_VILLAGE AS VILLAGE_NAME, count(PB_C_VILLAGE) AS VILLAGE_FREQ from publicity GROUP BY PB_C_VILLAGE;"
}

procedure.get_pb_bypark = function () {
    return "SELECT PB_PARK AS PARK, count(PB_PARK) AS PARK_FREQ from publicity GROUP BY PB_PARK;"
}

procedure.get_pb_bysinglepark = function () {
    return "SELECT PB_PARK AS PARK,PB_C_VILLAGE, count(PB_C_VILLAGE) AS PARK_FREQ from publicity GROUP BY PB_C_VILLAGE ORDER BY PARK, PB_C_VILLAGE;"
}

procedure.get_pb_bytaluk = function () {
    return "SELECT PB_TALUK AS TALUK, count(PB_TALUK) AS TALUK_FREQ from publicity GROUP BY PB_TALUK;"
}

procedure.get_pb_byvillage_bydate = function (fromdate, todate) {
    return "SELECT PB_C_VILLAGE AS VILLAGE_NAME, count(PB_C_VILLAGE) AS VILLAGE_FREQ from publicity where PB_V_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY PB_C_VILLAGE;"
}

procedure.get_pb_bypark_bydate = function (fromdate, todate) {
    return "SELECT PB_PARK AS PARK, count(PB_PARK) AS PARK_FREQ from publicity where PB_V_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY PB_PARK;"
}

procedure.get_pb_bytaluk_bydate = function (fromdate, todate) {
    return "SELECT PB_TALUK AS TALUK, count(PB_TALUK) AS TALUK_FREQ from publicity where PB_V_DATE between '" + fromdate + "' AND '" + todate + "' GROUP BY PB_TALUK;"
}

procedure.get_freq_byvillagevisit = function () {
    return "select distinct(PB_C_VILLAGE) as Village,count(PB_C_VILLAGE) as Visits from publicity group by PB_C_VILLAGE order by Visits desc;"
}

procedure.get_freq_byvillagevisit_bydate = function (fromdate, todate) {
    return "select distinct(PB_VILLAGE_1) as Village,count(PB_VILLAGE_1) as Visits from publicity WHERE pb_v_date between '" + fromdate + "' AND '" + todate + "' group by PB_VILLAGE_1 order by Visits desc;"
}

procedure.get_villagevisit_byFA = function () {
    return "select distinct(PB_USER_NAME) as FA,count(PB_VILLAGE_1) as Visited_to_villages from publicity group by PB_USER_NAME order by Visited_to_villages desc;"
}

procedure.get_villagevisit_byFA_bydate = function (fromdate, todate) {
    return "select distinct(PB_USER_NAME) as FA,count(PB_VILLAGE_1) as Visited_to_villages from publicity WHERE PB_V_DATE BETWEEN '" + fromdate + "' AND '" + todate + "' group by PB_USER_NAME order by Visited_to_villages desc;"
}

//DB Records Download
procedure.get_HWCDB_byprojectwise = function (fromdate, todate) {
    return "select * from hwc_details where DATE_FORMAT(HWC_CASE_DATE, '%Y-%m-%d') between '"+fromdate+"' AND '"+todate+"';";
}

procedure.get_DCDB_byprojectwise = function (fromdate, todate) {
    return "select * from daily_count where DATE_FORMAT(DC_CASE_DATE, '%Y-%m-%d') between '"+fromdate+"' AND '"+todate+"';";
}

procedure.get_PUBDB_byprojectwise = function (fromdate, todate) {
    return "select * from publicity where DATE_FORMAT(PB_V_DATE, '%Y-%m-%d') between '"+fromdate+"' AND '"+todate+"';";
}

procedure.get_COMPDB_byprojectwise = function (fromdate, todate) {
    return "select * from compensation_details where DATE_FORMAT(COM_METASUBMISSION_DATE, '%Y-%m-%d') between '"+fromdate+"' AND '"+todate+"';";
}

procedure.get_pub_mapincidents_bydaterange = function (fromdate, todate) {
    return "select concat('#',SUBSTRING((lpad(hex(round(rand() * 10000000)),6,0)),-6)) AS Color, concat(ucase(left(PB_C_VILLAGE,1)),substring(PB_C_VILLAGE,2)) as Village, concat(ucase(left(PB_USER_NAME,1)),substring(PB_USER_NAME,2)) as USER_NAME, concat(ucase(left(PB_PARK,1)),substring(PB_PARK,2)) as PARK, concat(ucase(left(PB_TALUK,1)),substring(PB_TALUK,2)) as TALUK, PB_V_DATE,PB_LAT,PB_LONG,PB_ALT,PB_ACC from publicity WHERE PB_V_DATE between '"+fromdate+"' AND '"+todate+"' order by village;";
}

procedure.get_pub_mapincidents = function () {
    return "select concat(ucase(left(PB_C_VILLAGE,1)),substring(PB_C_VILLAGE,2)) as Village, concat(ucase(left(PB_USER_NAME,1)),substring(PB_USER_NAME,2)) as USER_NAME, concat(ucase(left(PB_PARK,1)),substring(PB_PARK,2)) as PARK, concat(ucase(left(PB_TALUK,1)),substring(PB_TALUK,2)) as TALUK, PB_V_DATE,PB_LAT,PB_LONG,PB_ALT,PB_ACC from publicity order by pb_v_date;";
}

procedure.get_hwc_mapincidents_bycategory = function (fromdate, todate) {
    return "select concat(ucase(left(HWC_VILLAGE_NAME,1)),substring(HWC_VILLAGE_NAME,2)) as HWC_VILLAGE, concat(ucase(left(HWC_RANGE,1)),substring(HWC_RANGE,2)) as HWC_RANGE, concat(ucase(left(HWC_CASE_CATEGORY,1)),substring(HWC_CASE_CATEGORY,2)) as HWC_CAT, HWC_WSID as WSID, HWC_CASE_DATE AS HWC_DATE, HWC_LATITUDE as HWC_LAT, HWC_LONGITUDE as HWC_LONG, HWC_ACCURACY as HWC_ACC,HWC_ALTITUDE as HWC_ALT from hwc_details where hwc_case_date between '"+fromdate+"' AND '"+todate+"' order by hwc_case_category,hwc_case_date;";
}

procedure.get_hwc_mapincidents_byanimal = function (fromdate, todate) {
    return "select concat(ucase(left(HWC_VILLAGE_NAME,1)),substring(HWC_VILLAGE_NAME,2)) as HWC_VILLAGE, concat(ucase(left(HWC_RANGE,1)),substring(HWC_RANGE,2)) as HWC_RANGE, concat(ucase(left(HWC_CASE_CATEGORY,1)),substring(HWC_CASE_CATEGORY,2)) as HWC_CAT, concat(ucase(left(HWC_ANIMAL,1)),substring(HWC_ANIMAL,2)) as HWC_ANIMAL, HWC_WSID as WSID, HWC_CASE_DATE AS HWC_DATE, HWC_LATITUDE as HWC_LAT, HWC_LONGITUDE as HWC_LONG, HWC_ACCURACY as HWC_ACC,HWC_ALTITUDE as HWC_ALT from hwc_details where hwc_case_date between '"+fromdate+"' AND '"+todate+"' order by hwc_animal,hwc_case_date;";
}

procedure.get_hwc_mapincidents_byCR = function (fromdate, todate) {
    return "select concat(ucase(left(HWC_VILLAGE_NAME,1)),substring(HWC_VILLAGE_NAME,2)) as HWC_VILLAGE, concat(ucase(left(HWC_RANGE,1)),substring(HWC_RANGE,2)) as HWC_RANGE, concat(ucase(left(HWC_CASE_CATEGORY,1)),substring(HWC_CASE_CATEGORY,2)) as HWC_CAT, HWC_WSID as WSID, HWC_CASE_DATE AS HWC_DATE, HWC_LATITUDE as HWC_LAT, HWC_LONGITUDE as HWC_LONG, HWC_ACCURACY as HWC_ACC,HWC_ALTITUDE as HWC_ALT from hwc_details where hwc_case_date between '"+fromdate+"' AND '"+todate+"' and hwc_case_category='CR' order by hwc_case_category,hwc_case_date;"
}

procedure.get_hwc_mapincidents_byCRPD = function (fromdate, todate) {
    return "select concat(ucase(left(HWC_VILLAGE_NAME,1)),substring(HWC_VILLAGE_NAME,2)) as HWC_VILLAGE, concat(ucase(left(HWC_RANGE,1)),substring(HWC_RANGE,2)) as HWC_RANGE, concat(ucase(left(HWC_CASE_CATEGORY,1)),substring(HWC_CASE_CATEGORY,2)) as HWC_CAT, HWC_WSID as WSID, HWC_CASE_DATE AS HWC_DATE, HWC_LATITUDE as HWC_LAT, HWC_LONGITUDE as HWC_LONG, HWC_ACCURACY as HWC_ACC,HWC_ALTITUDE as HWC_ALT from hwc_details where hwc_case_date between '"+fromdate+"' AND '"+todate+"' and hwc_case_category='CRPD' order by hwc_case_category,hwc_case_date;"
}

procedure.get_hwc_mapincidents_byPD = function (fromdate, todate) {
    return "select concat(ucase(left(HWC_VILLAGE_NAME,1)),substring(HWC_VILLAGE_NAME,2)) as HWC_VILLAGE, concat(ucase(left(HWC_RANGE,1)),substring(HWC_RANGE,2)) as HWC_RANGE, concat(ucase(left(HWC_CASE_CATEGORY,1)),substring(HWC_CASE_CATEGORY,2)) as HWC_CAT, HWC_WSID as WSID, HWC_CASE_DATE AS HWC_DATE, HWC_LATITUDE as HWC_LAT, HWC_LONGITUDE as HWC_LONG, HWC_ACCURACY as HWC_ACC,HWC_ALTITUDE as HWC_ALT from hwc_details where hwc_case_date between '"+fromdate+"' AND '"+todate+"' and hwc_case_category='PD' order by hwc_case_category,hwc_case_date;"
}

procedure.get_hwc_mapincidents_byLP = function (fromdate, todate) {
    return "select concat(ucase(left(HWC_VILLAGE_NAME,1)),substring(HWC_VILLAGE_NAME,2)) as HWC_VILLAGE, concat(ucase(left(HWC_RANGE,1)),substring(HWC_RANGE,2)) as HWC_RANGE, concat(ucase(left(HWC_CASE_CATEGORY,1)),substring(HWC_CASE_CATEGORY,2)) as HWC_CAT, HWC_WSID as WSID, HWC_CASE_DATE AS HWC_DATE, HWC_LATITUDE as HWC_LAT, HWC_LONGITUDE as HWC_LONG, HWC_ACCURACY as HWC_ACC,HWC_ALTITUDE as HWC_ALT from hwc_details where hwc_case_date between '"+fromdate+"' AND '"+todate+"' and hwc_case_category='LP' order by hwc_case_category,hwc_case_date;"
}

procedure.get_hwc_mapincidents_byHI = function (fromdate, todate) {
    return "select concat(ucase(left(HWC_VILLAGE_NAME,1)),substring(HWC_VILLAGE_NAME,2)) as HWC_VILLAGE, concat(ucase(left(HWC_RANGE,1)),substring(HWC_RANGE,2)) as HWC_RANGE, concat(ucase(left(HWC_CASE_CATEGORY,1)),substring(HWC_CASE_CATEGORY,2)) as HWC_CAT, HWC_WSID as WSID, HWC_CASE_DATE AS HWC_DATE, HWC_LATITUDE as HWC_LAT, HWC_LONGITUDE as HWC_LONG, HWC_ACCURACY as HWC_ACC,HWC_ALTITUDE as HWC_ALT from hwc_details where hwc_case_date between '"+fromdate+"' AND '"+todate+"' and hwc_case_category='HI' order by hwc_case_category,hwc_case_date;"
}

procedure.get_hwc_mapincidents_byHD = function (fromdate, todate) {
    return "select concat(ucase(left(HWC_VILLAGE_NAME,1)),substring(HWC_VILLAGE_NAME,2)) as HWC_VILLAGE, concat(ucase(left(HWC_RANGE,1)),substring(HWC_RANGE,2)) as HWC_RANGE, concat(ucase(left(HWC_CASE_CATEGORY,1)),substring(HWC_CASE_CATEGORY,2)) as HWC_CAT, HWC_WSID as WSID, HWC_CASE_DATE AS HWC_DATE, HWC_LATITUDE as HWC_LAT, HWC_LONGITUDE as HWC_LONG, HWC_ACCURACY as HWC_ACC,HWC_ALTITUDE as HWC_ALT from hwc_details where hwc_case_date between '"+fromdate+"' AND '"+todate+"' and hwc_case_category='HD' order by hwc_case_category,hwc_case_date;"
}

procedure.get_hwc_mapincidents_byFA = function (fromdate, todate) {
    return "select concat(ucase(left(HWC_VILLAGE_NAME,1)),substring(HWC_VILLAGE_NAME,2)) as HWC_VILLAGE, concat(ucase(left(HWC_RANGE,1)),substring(HWC_RANGE,2)) as HWC_RANGE, concat(ucase(left(HWC_CASE_CATEGORY,1)),substring(HWC_CASE_CATEGORY,2)) as HWC_CAT, concat(ucase(left(HWC_USER_NAME,1)),substring(HWC_USER_NAME,2)) as HWC_FIELD_ASST, HWC_WSID as WSID, HWC_CASE_DATE AS HWC_DATE, HWC_LATITUDE as HWC_LAT, HWC_LONGITUDE as HWC_LONG, HWC_ACCURACY as HWC_ACC,HWC_ALTITUDE as HWC_ALT from hwc_details where hwc_case_date between '"+fromdate+"' AND '"+todate+"' order by hwc_user_name,hwc_case_date;"    
}

procedure.get_pub_mapincidents_byFA = function (fromdate, todate) {
    return "select PB_USER_NAME as FA_NAME, PB_C_VILLAGE as VILLAGE_NAME, count(PB_C_VILLAGE) as VILLAGE_FREQ from publicity where PB_V_DATE between '"+fromdate+"' AND '"+todate+"' group by PB_C_VILLAGE order by PB_USER_NAME;"    
}
exports.func = procedure;
