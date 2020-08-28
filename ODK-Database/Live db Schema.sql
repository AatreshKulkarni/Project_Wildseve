/*-------schema created----------*/

CREATE SCHEMA `odk` DEFAULT CHARACTER SET utf8 ;

/*-------daily Countn table----------*/

create table odk.daily_count
(
DC_METAINSTANCE_ID varchar(200) Primary key, 
DC_METAMODEL_VERSION varchar(50), 
DC_METAUI_VERSION varchar(20), 
DC_METASUBMISSION_DATE date, 
DC_FILLIN_DATE date, 
DC_DEVICE_ID bigint(50), 
DC_SIMCARD_ID bigint(50), 
DC_CASE_ID varchar(200),
DC_PHONE_NUMBER decimal(10,0),
DC_USER_NAME varchar(50),
DC_CASE_DATE date, 
DC_NH_CASES int(50), 
DC_BP_CASES int(50), 
DC_TOTAL_CASES int(50) 
);

/*-------daily Countn cases table----------*/
create table odk.dc_cases
(
DC_CASE_ID varchar(200), 
DC_CASE_DATE date,
DC_FA_ID varchar(200) Primary key, 
DC_CROP bigint(50), 
DC_CROP_PROPERTY bigint(50), 
DC_PROPERTY int(50), 
DC_LIVESTOCK bigint(50), 
DC_HUMAN_INJURY int(50), 
DC_HUMAN_DEATH int(50), 
DC_TOTAL_ATTENDED_CASE int(50),
DC_FA_UN varchar(200)
);

/*-------compensation details table----------*/
create table odk.compensation_details
(
COM_METAINSTANCE_ID varchar(200) not null unique, 
COM_METAMODEL_VERSION varchar(50), 
COM_METAUI_VERSION varchar(20) ,
COM_METASUBMISSION_DATE date, 
COM_FORMSTART_DATE date, 
COM_FORMEND_DATE date, 
COM_FILLIN_DATE date, 
COM_DEVICE_ID varchar(200), 
COM_SIM_ID bigint(20), 
COM_FA_PHONE_NUM decimal(10,0), 
COM_USER_NAME varchar(50),
COM_OM_UID varchar(200), 
COM_OM_RANGE varchar(100), 
COM_OM_FORM_DATE date, 
COM_OM_TOTAL_CASES bigint(20), 
COM_OM_WS_CASES varchar(200), 
COM_WSID_FORM_DATE varchar(200) primary key
);

/*-------compensation images table----------*/
create table odk.compensation_images
(
COM_METAINSTANCE_ID varchar(200) not null primary key,
COM_OM_IMAGE1 blob, 
COM_OM_IMAGE2 blob, 
COM_OM_IMAGE3 blob
);

/*-------compensation cases table----------*/
create table odk.compensation_cases
(
COM_WSID_FORM_DATE varchar(200), 
COM_WSID varchar(100), 
COM_FIRST_NAME varchar(100), 
COM_FAMILY_NAME varchar(100), 
COM_TALUK varchar(100), 
COM_VILLAGE varchar(100), 
COM_PARK varchar(100), 
COM_PHONE_NUMBER decimal(10,0), 
COM_SURVEY_NUMBER varchar(100), 
COM_HWC_DATE date,
COM_HWC_CATAGORY varchar(50), 
COM_CROP_NAME varchar(100), 
COM_CROP_NAME_OPT varchar(200), 
COM_PROPERTY_NAME varchar(200), 
COM_PROPERTY_NAME_OPT varchar(200), 
COM_LIVESTOCK varchar(200), 
COM_LIVESTOCK_OPT varchar(200), 
COM_AMOUNT double(10,5), 
COM_FD_REF_NO varchar(100) not null primary key

);

/*-------hwc details table----------*/
create table odk.hwc_details
(
HWC_METAINSTANCE_ID varchar(200) not null primary key,
HWC_METAMODEL_VERSION varchar(200), 
HWC_METAUI_VERSION varchar(200), 
HWC_METASUBMISSION_DATE date,
HWC_DEVICE_ID bigint(50), 
HWC_SIMCARD_ID bigint(50), 
HWC_WSID varchar(200), 
HWC_FIRST_NAME varchar(50), 
HWC_FULL_NAME varchar(50), 
HWC_PARK_NAME varchar(50), 
HWC_TALUK_NAME varchar(50), 
HWC_VILLAGE_NAME varchar(50), 
HWC_OLDPHONE_NUMBER decimal(10,0), 
HWC_NEWPHONE_NUMBER decimal(10,0), 
HWC_SURVEY_NUMBER varchar(200), 
HWC_RANGE varchar(200), 
HWC_LATITUDE decimal(38,10), 
HWC_LONGITUDE decimal(38,10),
HWC_ALTITUDE decimal(38,10), 
HWC_ACCURACY decimal(38,10), 
HWC_CASE_DATE date, 
HWC_CASE_CATEGORY varchar(50), 
HWC_ANIMAL varchar(50), 
HWC_OTHER_ANIMAL varchar(50), 
HWC_HI_NAME varchar(50), 
HWC_HI_VILLAGE varchar(50), 
HWC_HI_AREA varchar(50), 
HWC_HI_DETAILS varchar(100), 
HWC_HD_NAME varchar(50), 
HWC_HD_VILLAGE varchar(50), 
HWC_HD_DETAILS varchar(100), 
HWC_COMMENT varchar(200), 
HWC_FD_SUB_DATE date, 
HWC_FD_SUB_RANGE varchar(100), 
HWC_FD_NUM_FORMS varchar(100), 
HWC_FD_COMMENT varchar(200), 
HWC_START date, 
HWC_END date,  
HWC_FA_PHONE_NUMBER decimal(10,0), 
HWC_USER_NAME varchar(100), 
HWC_CASE_TYPE varchar(100) 

);

/*-------hwc case crop table----------*/
create table odk.hwc_case_crop
(
HWC_META_ID varchar(200) not null Primary key,
HWC_CASE_DATE date, 
HWC_WSID varchar(100),
HWC_CROP_NAME varchar(50), 
HWC_OTHER_CROP_NAME varchar(50), 
HWC_AREA_GROWN varchar(100), 
HWC_AREA_DAMAGE varchar(100), 
HWC_CROP_DAMAGE_AMOUNT double(15,3), 
HWC_CROP_GEO_SHAPE varchar(200)
);

/*-------hwc case case image table----------*/

create table odk.hwc_case_image
(
HWC_META_ID varchar(200), 
HWC_CASE_DATE date, 
HWC_WSID varchar(100), 
HWC_CASE_IMAGE1 blob, 
HWC_CASE_IMAGE2 blob, 
HWC_CASE_IMAGE3 blob, 
HWC_CASE_IMAGE4 blob, 
HWC_CASE_IMAGE5 blob, 
HWC_CASE_IMAGE6 blob, 
HWC_CASE_IMAGE7 blob, 
HWC_CASE_VIDEO blob
);

/*------- hwc_case_livestock table----------*/
create table odk.hwc_case_livestock
(
HWC_META_ID varchar(200) not null primary key, 
HWC_CASE_DATE date, 
HWC_WSID varchar(100), 
HWC_LIVE_STOCK_NAME varchar(100), 
HWC_OTHER_LIVE_STOCK_NAME varchar(200), 
HWC_LIVE_STOCK_PREDATED_NUMBER varchar(100)
);

/*------- hwc_case_property table----------*/
create table odk.hwc_case_property
(
HWC_META_ID varchar(200) not null primary key,
HWC_CASE_DATE date, 
HWC_WSID varchar(100), 
HWC_PROPERY_NAME varchar(100), 
HWC_OTHER_PROPERTY_NAME varchar(200), 
HWC_PROPERTY_DAMAGE varchar(200)
);


/*------- hwc_fd_image table----------*/
create table odk.hwc_fd_image
(
HWC_META_ID varchar(200) not null primary key, 
HWC_CASE_DATE date, 
HWC_WSID varchar(100), 
HWC_FD_IMAGE1 blob, 
HWC_FD_IMAGE2 blob, 
HWC_FD_IMAGE3 blob
);

/*------- publicity table----------*/

create table odk.publicity
(
PB_METAINSTANCE_ID varchar(200) not null primary key, 
PB_METAMODEL_VERSION varchar(200), 
PB_METAUI_VERSION varchar(200), 
PB_METASUBMISSION_DATE date, 
PB_FILLIN_DATE date, 
PB_DEVICE_ID bigint(50), 
PB_SIMCARD_ID bigint(50), 
PB_PHONE_NUMBER decimal(10,0), 
PB_USER_NAME varchar(50), 
PB_V_DATE date, 
PB_PARK varchar(50), 
PB_TALUK varchar(50), 
PB_VILLAGE_1 varchar(50), 
PB_VILLAGE_2 varchar(500), 
PB_LAT decimal(38,10), 
PB_LONG decimal(38,10), 
PB_ALT decimal(38,10), 
PB_ACC decimal(38,10), 
PB_C_VILLAGE varchar(100) 
);

/*------- publicity_images table----------*/
create table odk.publicity_images
(
PB_METAINSTANCE_ID varchar(200) not null primary key, 
PB_IMAGE_1 blob, 
PB_IMAGE_2 blob
);


/*------- wls_users table----------*/
create table odk.wls_users
(
User_Id int(10)unique key auto_increment, 
First_name varchar(50), 
Last_name varchar(50), 
Phone_number decimal(10,0), 
Email_id varchar(50), 
User_Role_Id int(2),
User_name varchar(50) not null primary key, 
User_pwd varchar(50) 

);





