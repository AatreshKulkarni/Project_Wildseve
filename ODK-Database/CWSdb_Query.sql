*******************************Session Query*********************************************
set global sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
set session sql_mode='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';

----------------------------------------------------------------------------------------------------------------------------------------------


select * from odk.daily_count;

select DC_CASE_DATE as CASE_DATE, sum(DC_NH_CASES) AS NH_CASES, sum(DC_BP_CASES) as BP_CASE from odk.daily_count where
(DC_CASE_DATE between '2018-08-01' and '2018-08-01');

select DC_CASE_DATE as CASE_DATE, sum(DC_BP_CASES) AS BP_CASES from odk.daily_count where (DC_CASE_DATE between '2018-07-11' and '2018-08-31');

select DC_CASE_DATE as CASE_DATE, sum(DC_NH_CASES+DC_BP_CASES) AS TOTAL_NH_BP_CASES from odk.daily_count where
(DC_CASE_DATE between '2018-07-11' and '2018-08-31');

select * from odk.wls_category;

select * from odk.hwc_details;

select hwc.HWC_PARK_NAME as Park, dc.DC_BP_CASES AS BP_CASES from odk.daily_count dc, odk.hwc_details hwc where
 (dc.DC_CASE_DATE between '2018-08-01' and '2018-08-31') and hwc.HWC_PARK_NAME='';



select d.DC_CASE_DATE as CASE_DATE, h.HWC_CASE_CATEGORY as CATEGORY, d.DC_BP_CASES AS BP_CASES from odk.daily_count d, odk.hwc_details h where 
h.HWC_CASE_DATE=(select HWC_CASE_DATE from odk.hwc_details where HWC_CASE_CATEGORY='CR' and (HWC_CASE_DATE between '2018-07-01' and '2018-08-01'))
and (d.DC_CASE_DATE between '2018-07-01' and '2018-08-01');

select count(*),sum(DC_BP_CASES) from (select d.DC_BP_CASES from odk.daily_count d, odk.hwc_details h where 
h.HWC_CASE_DATE='2018-08-01' and (d.DC_CASE_DATE between '2018-08-01' and '2018-08-01'))et;

select d.DC_CASE_DATE as CASE_DATE, h.HWC_CASE_CATEGORY as CATEGORY, sum(d.DC_BP_CASES) AS BP_CASES from 
odk.daily_count d, odk.hwc_details h where (h.HWC_CASE_DATE between '2018-07-01' and '2018-08-01') and 
(d.DC_CASE_DATE between '2018-07-01' and '2018-08-01');

call odk.hwc_cat;
call odk.hwc_cat_bpnh;


select year(DC_CASE_DATE) as YEAR, sum(DC_NH_CASES) AS NH_CASES, sum(DC_BP_CASES) as BP_CASE from odk.daily_count 
WHERE year(DC_CASE_DATE) in (YEAR(CURDATE())-3,YEAR(CURDATE())) group by year(DC_CASE_DATE);

select year(DC_CASE_DATE) as YEAR, sum(DC_NH_CASES + DC_BP_CASES) AS TOTAL_CASES from odk.daily_count 
WHERE year(DC_CASE_DATE) in ('2015','2018') group by year(DC_CASE_DATE);

select year(d.DC_CASE_DATE) as YEAR, sum(d.DC_NH_CASES + d.DC_BP_CASES) AS TOTAL_CASES, h.HWC_CASE_CATEGORY as CATEGORY 
from odk.daily_count d LEFT JOIN odk.hwc_details h on year(d.DC_CASE_DATE) = year(h.HWC_CASE_DATE)
WHERE year(d.DC_CASE_DATE) in (YEAR(CURDATE())-3,YEAR(CURDATE())) and year(h.HWC_CASE_DATE) in (YEAR(CURDATE())-3,YEAR(CURDATE()));



select d.DC_CASE_DATE as CASE_DATE, h.HWC_CASE_CATEGORY as CATEGORY, 
sum(d.DC_NH_CASES+d.DC_BP_CASES) AS TOTAL_BP_NH_CASES 
from ODK.daily_count d, ODK.hwc_details h 
where (h.HWC_CASE_DATE between '2018-03-01' and '2018-08-25') and (d.DC_CASE_DATE between '2018-03-01' and '2018-08-25'); 

select DC_CASE_DATE as CASE_DATE, sum(DC_NH_CASES+DC_BP_CASES) AS TOTAL_NH_BP_CASES from odk.daily_count where(DC_CASE_DATE between '2018-07-11' and '2018-08-31');


select distinct DC_CASE_DATE as CASE_DATE,h.HWC_CASE_DATE as HWC_CASE_DATE, h.HWC_CASE_CATEGORY as CATEGORY, sum(d.DC_BP_CASES+d.DC_NH_CASES) AS BPNH_CASES 
from odk.daily_count d, odk.hwc_details h 
where (h.HWC_CASE_DATE between '2018-03-01' and '2018-08-31')
and (d.DC_CASE_DATE between '2018-03-01' and '2018-08-31') group by d.DC_CASE_DATE, h.HWC_CASE_DATE order by h.HWC_CASE_CATEGORY;








