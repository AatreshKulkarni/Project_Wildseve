-- MySQL dump 10.13  Distrib 5.7.27, for Win32 (AMD64)
--
-- Host: localhost    Database: odk
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `animal_color_master`
--

DROP TABLE IF EXISTS `animal_color_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `animal_color_master` (
  `animal_name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `animal_color_name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `animal_color_code` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `animal_color_id` int(11) NOT NULL AUTO_INCREMENT,
  UNIQUE KEY `animal_color_id_UNIQUE` (`animal_color_id`),
  UNIQUE KEY `animal_name_UNIQUE` (`animal_name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `animal_master`
--

DROP TABLE IF EXISTS `animal_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `animal_master` (
  `animal_name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `animal_id` int(11) DEFAULT NULL,
  UNIQUE KEY `animal_name_UNIQUE` (`animal_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `color_master`
--

DROP TABLE IF EXISTS `color_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `color_master` (
  `color_id` int(10) NOT NULL AUTO_INCREMENT,
  `color_code` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `color_name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`color_id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `com_cases_details`
--

DROP TABLE IF EXISTS `com_cases_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `com_cases_details` (
  `COM_META_ID` varchar(200) NOT NULL,
  `COM_PARENT_ID` varchar(200) DEFAULT NULL,
  `COM_WSID_FORM_DATE` varchar(200) DEFAULT NULL,
  `COM_WSID` varchar(100) DEFAULT NULL,
  `COM_FIRST_NAME` varchar(100) DEFAULT NULL,
  `COM_FAMILY_NAME` varchar(100) DEFAULT NULL,
  `COM_TALUK` varchar(100) DEFAULT NULL,
  `COM_VILLAGE` varchar(100) DEFAULT NULL,
  `COM_PARK` varchar(100) DEFAULT NULL,
  `COM_PHONE_NUMBER` decimal(10,0) DEFAULT NULL,
  `COM_SURVEY_NUMBER` varchar(100) DEFAULT NULL,
  `COM_HWC_DATE` date DEFAULT NULL,
  `COM_HWC_CATAGORY` varchar(200) DEFAULT NULL,
  `COM_CROP_NAME` varchar(100) DEFAULT NULL,
  `COM_CROP_NAME_OPT` varchar(200) DEFAULT NULL,
  `COM_PROPERTY_NAME` varchar(200) DEFAULT NULL,
  `COM_PROPERTY_NAME_OPT` varchar(200) DEFAULT NULL,
  `COM_LIVESTOCK` varchar(200) DEFAULT NULL,
  `COM_LIVESTOCK_OPT` varchar(200) DEFAULT NULL,
  `COM_AMOUNT` double(10,5) DEFAULT NULL,
  `COM_FD_REF_NO` varchar(100) DEFAULT NULL,
  `COM_COMMENT` varchar(200) DEFAULT NULL,
  `COM_ACK` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`COM_META_ID`),
  KEY `com_meta_id_fk_idx` (`COM_PARENT_ID`),
  CONSTRAINT `com_meta_id_fk` FOREIGN KEY (`COM_PARENT_ID`) REFERENCES `compensation_details` (`COM_METAINSTANCE_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `com_details_images`
--

DROP TABLE IF EXISTS `com_details_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `com_details_images` (
  `COM_METAINSTANCE_ID` varchar(200) NOT NULL,
  `COM_OM_IMAGE1` blob,
  `COM_OM_IMAGE2` blob,
  `COM_OM_IMAGE3` blob,
  PRIMARY KEY (`COM_METAINSTANCE_ID`),
  CONSTRAINT `com_details_images_ibfk_1` FOREIGN KEY (`COM_METAINSTANCE_ID`) REFERENCES `compensation_details` (`COM_METAINSTANCE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `compensation_details`
--

DROP TABLE IF EXISTS `compensation_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `compensation_details` (
  `COM_METAINSTANCE_ID` varchar(200) NOT NULL,
  `COM_METAMODEL_VERSION` varchar(50) DEFAULT NULL,
  `COM_METAUI_VERSION` varchar(20) DEFAULT NULL,
  `COM_METASUBMISSION_DATE` date DEFAULT NULL,
  `COM_INSTANCE_NAME` varchar(100) DEFAULT NULL,
  `COM_FORMSTART_DATE` date DEFAULT NULL,
  `COM_FORMEND_DATE` date DEFAULT NULL,
  `COM_OM_SHEET_ISSUED` date DEFAULT NULL,
  `COM_DEVICE_ID` varchar(200) DEFAULT NULL,
  `COM_SIM_ID` varchar(25) NOT NULL,
  `COM_FA_PHONE_NUM` decimal(10,0) DEFAULT NULL,
  `COM_USER_NAME` text NOT NULL,
  `COM_OM_SHEET_NUM` varchar(200) DEFAULT NULL,
  `COM_OM_RANGE` varchar(100) DEFAULT NULL,
  `COM_OM_SHEET_UPLOADED` date DEFAULT NULL,
  `COM_OM_TOTAL_CASES` bigint(20) DEFAULT NULL,
  `COM_OM_WS_CASES` varchar(200) DEFAULT NULL,
  `COM_WSID_FORM_DATE` varchar(200) DEFAULT NULL,
  `COM_DAY` int(5) DEFAULT NULL,
  `COM_MONTH` int(5) DEFAULT NULL,
  `COM_YEAR` int(5) DEFAULT NULL,
  PRIMARY KEY (`COM_METAINSTANCE_ID`),
  UNIQUE KEY `COM_METAINSTANCE_ID` (`COM_METAINSTANCE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `daily_count`
--

DROP TABLE IF EXISTS `daily_count`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daily_count` (
  `DC_METAINSTANCE_ID` varchar(200) NOT NULL,
  `DC_METAMODEL_VERSION` varchar(50) DEFAULT NULL,
  `DC_METAUI_VERSION` varchar(20) DEFAULT NULL,
  `DC_METASUBMISSION_DATE` date DEFAULT NULL,
  `DC_FILLIN_DATE` date DEFAULT NULL,
  `DC_DEVICE_ID` bigint(50) DEFAULT NULL,
  `DC_SIMCARD_ID` varchar(100) DEFAULT NULL,
  `DC_PHONE_NUMBER` decimal(10,0) DEFAULT NULL,
  `DC_USER_NAME` text,
  `DC_CASE_DATE` date DEFAULT NULL,
  `DC_NH_CASES` int(50) DEFAULT NULL,
  `DC_BP_CASES` int(50) DEFAULT NULL,
  `DC_TOTAL_CASES` int(50) DEFAULT NULL,
  `DC_CASE_ID` varchar(200) DEFAULT NULL,
  `DC_DAY` int(3) DEFAULT NULL,
  `DC_MONTH` int(2) DEFAULT NULL,
  `DC_YEAR` int(5) DEFAULT NULL,
  PRIMARY KEY (`DC_METAINSTANCE_ID`),
  UNIQUE KEY `DC_METAINSTANCE_ID_UNIQUE` (`DC_METAINSTANCE_ID`),
  UNIQUE KEY `DC_CASE_ID` (`DC_CASE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dc_cases`
--

DROP TABLE IF EXISTS `dc_cases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dc_cases` (
  `DC_CASE_ID` varchar(200) NOT NULL,
  `DC_FA_ID` varchar(200) NOT NULL,
  `DC_CROP` bigint(20) DEFAULT NULL,
  `DC_CROP_PROPERTY` bigint(50) DEFAULT NULL,
  `DC_PROPERTY` int(50) DEFAULT NULL,
  `DC_LIVESTOCK` bigint(50) DEFAULT NULL,
  `DC_HUMAN_INJURY` int(50) DEFAULT NULL,
  `DC_HUMAN_DEATH` int(50) DEFAULT NULL,
  `DC_TOTAL_ATTENDED_CASE` int(50) DEFAULT NULL,
  `DC_FA_UN` varchar(20) NOT NULL,
  `DC_CASE_DATE` date DEFAULT NULL,
  PRIMARY KEY (`DC_FA_ID`),
  UNIQUE KEY `DC_FA_ID_UNIQUE` (`DC_FA_ID`),
  KEY `DC_CASE_ID` (`DC_CASE_ID`),
  CONSTRAINT `dc_cases_ibfk_1` FOREIGN KEY (`DC_CASE_ID`) REFERENCES `daily_count` (`DC_CASE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dublicate_wildseve_users`
--

DROP TABLE IF EXISTS `dublicate_wildseve_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dublicate_wildseve_users` (
  `HWC_WSID` varchar(200) DEFAULT NULL,
  `HWC_FIRST_NAME` varchar(50) DEFAULT NULL,
  `HWC_LAST_NAME` varchar(100) DEFAULT NULL,
  `HWC_FULL_NAME` varchar(50) DEFAULT NULL,
  `HWC_PARENTS_NAME` varchar(100) DEFAULT NULL,
  `HWC_FAMILY_NAME` varchar(100) DEFAULT NULL,
  `HWC_PARK_NAME` varchar(50) DEFAULT NULL,
  `HWC_TALUK_NAME` varchar(100) DEFAULT NULL,
  `HWC_VILLAGE_NAME` varchar(100) DEFAULT NULL,
  `HWC_OLDPHONE_NUMBER` varchar(11) DEFAULT NULL,
  `HWC_NEWPHONE_NUMBER` int(11) DEFAULT NULL,
  `HWC_SURVEY_NUMBER` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dup_hwc`
--

DROP TABLE IF EXISTS `dup_hwc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dup_hwc` (
  `HWC_ORG_METAID` varchar(200) DEFAULT NULL,
  `HWC_DUP_METAID` varchar(200) NOT NULL,
  `HWC_VERIFIED` varchar(5) DEFAULT 'N',
  PRIMARY KEY (`HWC_DUP_METAID`),
  UNIQUE KEY `HWC_DUP_METAID_UNIQUE` (`HWC_DUP_METAID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `forms`
--

DROP TABLE IF EXISTS `forms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `forms` (
  `Table_name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `Access` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hwc_case_crop`
--

DROP TABLE IF EXISTS `hwc_case_crop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hwc_case_crop` (
  `HWC_META_ID` varchar(200) CHARACTER SET utf8 NOT NULL,
  `HWC_PARENT_ID` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `HWC_CASE_DATE` date DEFAULT NULL,
  `HWC_WSID` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `HWC_CROP_NAME` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `HWC_OTHER_CROP_NAME` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `HWC_AREA_GROWN` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `HWC_AREA_DAMAGE` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `HWC_CROP_DAMAGE_AMOUNT` double(10,3) DEFAULT NULL,
  `HWC_CROP_GEO_SHAPE` varchar(300) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`HWC_META_ID`),
  UNIQUE KEY `HWC_META_ID_UNIQUE` (`HWC_META_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hwc_case_image`
--

DROP TABLE IF EXISTS `hwc_case_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hwc_case_image` (
  `HWC_META_ID` varchar(200) NOT NULL,
  `HWC_CASE_DATE` date DEFAULT NULL,
  `HWC_WSID` varchar(200) DEFAULT NULL,
  `HWC_CASE_IMAGE1` blob,
  `HWC_CASE_IMAGE2` blob,
  `HWC_CASE_IMAGE3` blob,
  `HWC_CASE_IMAGE4` blob,
  `HWC_CASE_IMAGE5` blob,
  `HWC_CASE_IMAGE6` blob,
  `HWC_CASE_IMAGE7` blob,
  `HWC_CASE_VIDEO` blob,
  `HWC_CASE_RESP_PHOTO` blob,
  `HWC_CASE_RESP_SIGN` blob,
  `HWC_CASE_ACK_IMAGE` blob,
  PRIMARY KEY (`HWC_META_ID`),
  UNIQUE KEY `HWC_META_ID_UNIQUE` (`HWC_META_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hwc_case_livestock`
--

DROP TABLE IF EXISTS `hwc_case_livestock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hwc_case_livestock` (
  `HWC_META_ID` varchar(200) CHARACTER SET utf8 NOT NULL,
  `HWC_PARENT_ID` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `HWC_CASE_DATE` date DEFAULT NULL,
  `HWC_WSID` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `HWC_LIVE_STOCK_NAME` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `HWC_OTHER_LIVE_STOCK_NAME` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `HWC_LIVE_STOCK_PREDATED_NUMBER` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`HWC_META_ID`),
  UNIQUE KEY `HWC_META_ID_UNIQUE` (`HWC_META_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hwc_case_property`
--

DROP TABLE IF EXISTS `hwc_case_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hwc_case_property` (
  `HWC_META_ID` varchar(200) CHARACTER SET utf8 NOT NULL,
  `HWC_PARENT_ID` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `HWC_CASE_DATE` date DEFAULT NULL,
  `HWC_WSID` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `HWC_PROPERY_NAME` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `HWC_OTHER_PROPERTY_NAME` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `HWC_PROPERTY_DAMAGE` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`HWC_META_ID`),
  UNIQUE KEY `HWC_META_ID_UNIQUE` (`HWC_META_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hwc_details`
--

DROP TABLE IF EXISTS `hwc_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hwc_details` (
  `HWC_METAINSTANCE_ID` varchar(200) NOT NULL,
  `HWC_METAMODEL_VERSION` varchar(200) DEFAULT NULL,
  `HWC_METAUI_VERSION` varchar(200) DEFAULT NULL,
  `HWC_METASUBMISSION_DATE` date DEFAULT NULL,
  `HWC_WSID` varchar(200) DEFAULT NULL,
  `HWC_FIRST_NAME` varchar(50) DEFAULT NULL,
  `HWC_LAST_NAME` varchar(50) DEFAULT NULL,
  `HWC_PARENT_NAME` varchar(50) DEFAULT NULL,
  `HWC_FULL_NAME` varchar(50) DEFAULT NULL,
  `HWC_PARK_NAME` varchar(50) DEFAULT NULL,
  `HWC_TALUK_NAME` varchar(100) DEFAULT NULL,
  `HWC_VILLAGE_NAME` varchar(100) DEFAULT NULL,
  `HWC_OLDPHONE_NUMBER` decimal(11,0) DEFAULT NULL,
  `HWC_NEWPHONE_NUMBER` decimal(11,0) DEFAULT NULL,
  `HWC_SURVEY_NUMBER` varchar(200) DEFAULT NULL,
  `HWC_RANGE` varchar(200) DEFAULT NULL,
  `HWC_LATITUDE` decimal(38,10) DEFAULT NULL,
  `HWC_LONGITUDE` decimal(38,10) DEFAULT NULL,
  `HWC_ACCURACY` varchar(20) DEFAULT NULL,
  `HWC_ALTITUDE` decimal(38,10) DEFAULT NULL,
  `HWC_CASE_DATE` date DEFAULT NULL,
  `HWC_CASE_CATEGORY` varchar(100) DEFAULT NULL,
  `HWC_ANIMAL` varchar(100) DEFAULT NULL,
  `HWC_OTHER_ANIMAL` varchar(100) DEFAULT NULL,
  `HWC_HI_NAME` varchar(50) DEFAULT NULL,
  `HWC_HI_VILLAGE` varchar(50) DEFAULT NULL,
  `HWC_HI_AREA` varchar(50) DEFAULT NULL,
  `HWC_HI_DETAILS` varchar(200) DEFAULT NULL,
  `HWC_HD_NAME` varchar(50) DEFAULT NULL,
  `HWC_HD_VILLAGE` varchar(100) DEFAULT NULL,
  `HWC_HD_DETAILS` varchar(200) DEFAULT NULL,
  `HWC_COMMENT` varchar(200) DEFAULT NULL,
  `HWC_FD_SUB_DATE` date DEFAULT NULL,
  `HWC_FD_SUB_RANGE` varchar(100) DEFAULT NULL,
  `HWC_FD_NUM_FORMS` varchar(100) DEFAULT NULL,
  `HWC_FD_NUM_DAYS` varchar(10) DEFAULT NULL,
  `HWC_FD_COMMENT` varchar(200) DEFAULT NULL,
  `HWC_START` date DEFAULT NULL,
  `HWC_END` date DEFAULT NULL,
  `HWC_DEVICE_ID` varchar(100) DEFAULT NULL,
  `HWC_SIMCARD_ID` bigint(50) DEFAULT NULL,
  `HWC_FA_PHONE_NUMBER` decimal(11,0) DEFAULT NULL,
  `HWC_USER_NAME` varchar(100) DEFAULT NULL,
  `HWC_CASE_TYPE` varchar(100) DEFAULT NULL,
  `HWC_COMMENT_1` varchar(200) DEFAULT NULL,
  `HWC_COMMENT_2` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`HWC_METAINSTANCE_ID`),
  UNIQUE KEY `HWC_METAINSTANCE_ID_UNIQUE` (`HWC_METAINSTANCE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hwc_fa_master`
--

DROP TABLE IF EXISTS `hwc_fa_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hwc_fa_master` (
  `fa_name` varchar(100) COLLATE utf8_bin NOT NULL,
  `fa_id` int(11) DEFAULT NULL,
  UNIQUE KEY `fa_name` (`fa_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hwc_fd_image`
--

DROP TABLE IF EXISTS `hwc_fd_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hwc_fd_image` (
  `HWC_META_ID` varchar(200) NOT NULL,
  `HWC_CASE_DATE` date DEFAULT NULL,
  `HWC_WSID` varchar(200) DEFAULT NULL,
  `HWC_FD_IMAGE1` blob,
  `HWC_FD_IMAGE2` blob,
  `HWC_FD_IMAGE3` blob,
  PRIMARY KEY (`HWC_META_ID`),
  UNIQUE KEY `HWC_META_ID_UNIQUE` (`HWC_META_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hwcfa_color_master`
--

DROP TABLE IF EXISTS `hwcfa_color_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hwcfa_color_master` (
  `fa_name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `fa_color_name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `fa_color_code` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `fa_color_id` int(11) NOT NULL AUTO_INCREMENT,
  UNIQUE KEY `fa_color_id_UNIQUE` (`fa_color_id`),
  UNIQUE KEY `fa_name_UNIQUE` (`fa_name`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `publicity`
--

DROP TABLE IF EXISTS `publicity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publicity` (
  `PB_METAINSTANCE_ID` varchar(200) NOT NULL,
  `PB_METAMODEL_VERSION` varchar(50) DEFAULT NULL,
  `PB_METAUI_VERSION` varchar(20) DEFAULT NULL,
  `PB_METASUBMISSION_DATE` date DEFAULT NULL,
  `PB_META_INSTANCE_NAME` varchar(100) DEFAULT NULL,
  `PB_FILLIN_DATE` date DEFAULT NULL,
  `PB_DEVICE_ID` bigint(50) DEFAULT NULL,
  `PB_SIMCARD_ID` varchar(100) DEFAULT NULL,
  `PB_PHONE_NUMBER` decimal(10,0) DEFAULT NULL,
  `PB_USER_NAME` varchar(100) NOT NULL,
  `PB_V_DATE` date DEFAULT NULL,
  `PB_PARK` varchar(200) DEFAULT NULL,
  `PB_TALUK` varchar(200) DEFAULT NULL,
  `PB_VILLAGE_1` varchar(200) DEFAULT NULL,
  `PB_VILLAGE_2` varchar(200) DEFAULT NULL,
  `PB_LAT` decimal(38,10) DEFAULT NULL,
  `PB_LONG` decimal(38,10) DEFAULT NULL,
  `PB_ALT` decimal(38,10) DEFAULT NULL,
  `PB_ACC` decimal(38,10) DEFAULT NULL,
  `PB_C_VILLAGE` varchar(200) DEFAULT NULL,
  `PB_DAY` int(5) DEFAULT NULL,
  `PB_MONTH` int(5) DEFAULT NULL,
  `PB_YEAR` int(5) DEFAULT NULL,
  PRIMARY KEY (`PB_METAINSTANCE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `publicity_images`
--

DROP TABLE IF EXISTS `publicity_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `publicity_images` (
  `PB_METAINSTANCE_ID` varchar(200) NOT NULL,
  `PB_IMAGE_1` mediumblob,
  `PB_IMAGE_2` mediumblob,
  PRIMARY KEY (`PB_METAINSTANCE_ID`),
  CONSTRAINT `publicity_images_ibfk_1` FOREIGN KEY (`PB_METAINSTANCE_ID`) REFERENCES `publicity` (`PB_METAINSTANCE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wildseve_users`
--

DROP TABLE IF EXISTS `wildseve_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wildseve_users` (
  `HWC_WSID` varchar(200) NOT NULL,
  `HWC_FIRST_NAME` varchar(50) NOT NULL,
  `HWC_LAST_NAME` varchar(100) DEFAULT NULL,
  `HWC_FULL_NAME` varchar(50) DEFAULT NULL,
  `HWC_FAMILY_NAME` varchar(100) DEFAULT NULL,
  `HWC_PARENTS_NAME` varchar(100) DEFAULT NULL,
  `HWC_PARK_NAME` varchar(50) DEFAULT NULL,
  `HWC_TALUK_NAME` varchar(100) DEFAULT NULL,
  `HWC_VILLAGE_NAME` varchar(100) DEFAULT NULL,
  `HWC_OLDPHONE_NUMBER` decimal(11,0) DEFAULT NULL,
  `HWC_NEWPHONE_NUMBER` decimal(11,0) DEFAULT NULL,
  `HWC_SURVEY_NUMBER` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`HWC_WSID`),
  UNIQUE KEY `HWC_WSID_UNIQUE` (`HWC_WSID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wls_category`
--

DROP TABLE IF EXISTS `wls_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wls_category` (
  `WLS_COTEGORY_ID` varchar(200) NOT NULL,
  `WLS_CATEGORY_NAME` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`WLS_COTEGORY_ID`),
  UNIQUE KEY `WLS_CATEGORY_NAME` (`WLS_CATEGORY_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wls_month_year`
--

DROP TABLE IF EXISTS `wls_month_year`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wls_month_year` (
  `WLS_MONTH` varchar(20) NOT NULL,
  `WLS_YEAR` int(5) DEFAULT NULL,
  PRIMARY KEY (`WLS_MONTH`),
  UNIQUE KEY `WLS_YEAR` (`WLS_YEAR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wls_report`
--

DROP TABLE IF EXISTS `wls_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wls_report` (
  `WLS_REPORT_ID` varchar(200) NOT NULL,
  `WLS_REPORT_NAME` varchar(200) DEFAULT NULL,
  `WLS_CATEGORY_ID` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`WLS_REPORT_ID`),
  UNIQUE KEY `WLS_REPORT_NAME` (`WLS_REPORT_NAME`),
  UNIQUE KEY `WLS_CATEGORY_ID` (`WLS_CATEGORY_ID`),
  CONSTRAINT `wls_report_ibfk_1` FOREIGN KEY (`WLS_CATEGORY_ID`) REFERENCES `wls_category` (`WLS_COTEGORY_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wls_taluk`
--

DROP TABLE IF EXISTS `wls_taluk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wls_taluk` (
  `OLD_T_NAME` varchar(200) DEFAULT NULL,
  `NEW_T_NAME` varchar(200) NOT NULL,
  PRIMARY KEY (`NEW_T_NAME`),
  UNIQUE KEY `OLD_T_NAME` (`OLD_T_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `wls_users`
--

DROP TABLE IF EXISTS `wls_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wls_users` (
  `User_Id` int(10) NOT NULL AUTO_INCREMENT,
  `First_name` varchar(50) DEFAULT NULL,
  `Last_name` varchar(50) DEFAULT NULL,
  `Phone_number` decimal(10,0) DEFAULT NULL,
  `Email_id` varchar(50) DEFAULT NULL,
  `User_name` varchar(50) NOT NULL,
  `User_pwd` varchar(50) DEFAULT NULL,
  `User_Role_Id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`User_name`),
  UNIQUE KEY `User_Id_UNIQUE` (`User_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-30 23:20:48
