-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: mysql-sgringlax-fintech2024-bruzzese.j.aivencloud.com    Database: nazioni
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '1f91c105-199e-11ef-b52d-768b56900ac8:1-32,
7bda3cc2-1a98-11ef-9244-42c7dd6ac946:1-232';

--
-- Table structure for table `nazioniquiz`
--

DROP TABLE IF EXISTS `nazioniquiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nazioniquiz` (
  `alphacod` varchar(2) NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `continente` varchar(255) DEFAULT NULL,
  `capitale` varchar(255) DEFAULT NULL,
  `popolazione` int NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nazioniquiz`
--

LOCK TABLES `nazioniquiz` WRITE;
/*!40000 ALTER TABLE `nazioniquiz` DISABLE KEYS */;
INSERT INTO `nazioniquiz` VALUES ('AE','United Arab Emirates','Asia','Abu Dhabi',9890400,'https://flagcdn.com/256x192/ae.png',1),
('AF','Afghanistan','Asia','Kabul',38928341,'https://flagcdn.com/256x192/af.png',2),
('AL','Albania','Europe','Tirana',2837743,'https://flagcdn.com/256x192/al.png',3),
('AM','Armenia','Asia','Yerevan',2963234,'https://flagcdn.com/256x192/am.png',4),
('AO','Angola','Africa','Luanda',32866268,'https://flagcdn.com/256x192/ao.png',5),
('AR','Argentina','Americas','Buenos Aires',45376763,'https://flagcdn.com/256x192/ar.png',6),
('AT','Austria','Europe','Vienna',8917205,'https://flagcdn.com/256x192/at.png',7),
('AU','Australia','Oceania','Canberra',25687041,'https://flagcdn.com/256x192/au.png',8),
('AZ','Azerbaijan','Asia','Baku',10110116,'https://flagcdn.com/256x192/az.png',9),
('BA','Bosnia and Herzegovina','Europe','Sarajevo',3280815,'https://flagcdn.com/256x192/ba.png',10),
('BD','Bangladesh','Asia','Dhaka',164689383,'https://flagcdn.com/256x192/bd.png',11),
('BE','Belgium','Europe','Brussels',11555997,'https://flagcdn.com/256x192/be.png',12),
('BF','Burkina Faso','Africa','Ouagadougou',20903278,'https://flagcdn.com/256x192/bf.png',13),
('BG','Bulgaria','Europe','Sofia',6927288,'https://flagcdn.com/256x192/bg.png',14),
('BH','Bahrain','Asia','Manama',1701583,'https://flagcdn.com/256x192/bh.png',15),
('BI','Burundi','Africa','Gitega',11890781,'https://flagcdn.com/256x192/bi.png',16),
('BJ','Benin','Africa','Porto-Novo',12123198,'https://flagcdn.com/256x192/bj.png',17),
('BO','Bolivia (Plurinational State of)','Americas','Sucre',11673029,'https://flagcdn.com/256x192/bo.png',18),
('BR','Brazil','Americas','Brasília',212559409,'https://flagcdn.com/256x192/br.png',19),
('BT','Bhutan','Asia','Thimphu',771612,'https://flagcdn.com/256x192/bt.png',20),
('BW','Botswana','Africa','Gaborone',2351625,'https://flagcdn.com/256x192/bw.png',21),
('BY','Belarus','Europe','Minsk',9398861,'https://flagcdn.com/256x192/by.png',22),
('BZ','Belize','Americas','Belmopan',397621,'https://flagcdn.com/256x192/bz.png',23),
('CA','Canada','Americas','Ottawa',38005238,'https://flagcdn.com/256x192/ca.png',24),
('CF','Central African Republic','Africa','Bangui',4829764,'https://flagcdn.com/256x192/cf.png',25),
('CG','Congo','Africa','Brazzaville',5518092,'https://flagcdn.com/256x192/cg.png',26),
('CH','Switzerland','Europe','Bern',8636896,'https://flagcdn.com/256x192/ch.png',27),
('CI','Ivory Coast','Africa','Yamoussoukro',26378275,'https://flagcdn.com/256x192/ci.png',28),
('CL','Chile','Americas','Santiago',19116209,'https://flagcdn.com/256x192/cl.png',29),
('CM','Cameroon','Africa','Yaoundé',26545864,'https://flagcdn.com/256x192/cm.png',30),
('CN','China','Asia','Beijing',1402112000,'https://flagcdn.com/256x192/cn.png',31),
('CO','Colombia','Americas','Bogotá',50882884,'https://flagcdn.com/256x192/co.png',32),
('CR','Costa Rica','Americas','San José',5094114,'https://flagcdn.com/256x192/cr.png',33),
('CU','Cuba','Americas','Havana',11326616,'https://flagcdn.com/256x192/cu.png',34),
('CV','Cabo Verde','Africa','Praia',555988,'https://flagcdn.com/256x192/cv.png',35),
('CY','Cyprus','Europe','Nicosia',1207361,'https://flagcdn.com/256x192/cy.png',36),
('CZ','Czech Republic','Europe','Prague',10698896,'https://flagcdn.com/256x192/cz.png',37),
('DE','Germany','Europe','Berlin',83240525,'https://flagcdn.com/256x192/de.png',38),
('DJ','Djibouti','Africa','Djibouti',988002,'https://flagcdn.com/256x192/dj.png',39),
('DK','Denmark','Europe','Copenhagen',5831404,'https://flagcdn.com/256x192/dk.png',40),
('DO','Dominican Republic','Americas','Santo Domingo',10847904,'https://flagcdn.com/256x192/do.png',41),
('DZ','Algeria','Africa','Algiers',43851043,'https://flagcdn.com/256x192/dz.png',42),
('EC','Ecuador','Americas','Quito',17643060,'https://flagcdn.com/256x192/ec.png',43),
('EE','Estonia','Europe','Tallinn',1331057,'https://flagcdn.com/256x192/ee.png',44),
('EG','Egypt','Africa','Cairo',102334403,'https://flagcdn.com/256x192/eg.png',45),
('ES','Spain','Europe','Madrid',47351567,'https://flagcdn.com/256x192/es.png',46),
('ET','Ethiopia','Africa','Addis Ababa',114963583,'https://flagcdn.com/256x192/et.png',47),
('FI','Finland','Europe','Helsinki',5530719,'https://flagcdn.com/256x192/fi.png',48),
('FJ','Fiji','Oceania','Suva',896444,'https://flagcdn.com/256x192/fj.png',49),
('FR','France','Europe','Paris',67391582,'https://flagcdn.com/256x192/fr.png',50),
('GA','Gabon','Africa','Libreville',2225728,'https://flagcdn.com/256x192/ga.png',51),
('GE','Georgia','Asia','Tbilisi',3714000,'https://flagcdn.com/256x192/ge.png',52),
('GH','Ghana','Africa','Accra',31072945,'https://flagcdn.com/256x192/gh.png',53),
('GN','Guinea','Africa','Conakry',13132792,'https://flagcdn.com/256x192/gn.png',54),
('GQ','Equatorial Guinea','Africa','Malabo',1402985,'https://flagcdn.com/256x192/gq.png',55),
('GR','Greece','Europe','Athens',10715549,'https://flagcdn.com/256x192/gr.png',56),
('GT','Guatemala','Americas','Guatemala City',16858333,'https://flagcdn.com/256x192/gt.png',57),
('GW','Guinea-Bissau','Africa','Bissau',1967998,'https://flagcdn.com/256x192/gw.png',58),
('GY','Guyana','Americas','Georgetown',786559,'https://flagcdn.com/256x192/gy.png',59),
('HK','Hong Kong','Asia','City of Victoria',7481800,'https://flagcdn.com/256x192/hk.png',60),
('HN','Honduras','Americas','Tegucigalpa',9904608,'https://flagcdn.com/256x192/hn.png',61),
('HR','Croatia','Europe','Zagreb',4047200,'https://flagcdn.com/256x192/hr.png',62),
('HT','Haiti','Americas','Port-au-Prince',11402533,'https://flagcdn.com/256x192/ht.png',63),
('HU','Hungary','Europe','Budapest',9749763,'https://flagcdn.com/256x192/hu.png',64),
('ID','Indonesia','Asia','Jakarta',273523621,'https://flagcdn.com/256x192/id.png',65),
('IE','Ireland','Europe','Dublin',4994724,'https://flagcdn.com/256x192/ie.png',66),
('IL','Israel','Asia','Jerusalem',9216900,'https://flagcdn.com/256x192/il.png',67),
('IN','India','Asia','New Delhi',1380004385,'https://flagcdn.com/256x192/in.png',68),
('IQ','Iraq','Asia','Baghdad',40222503,'https://flagcdn.com/256x192/iq.png',69),
('IR','Iran (Islamic Republic of)','Asia','Tehran',83992953,'https://flagcdn.com/256x192/ir.png',70),
('IS','Iceland','Europe','Reykjavík',366425,'https://flagcdn.com/256x192/is.png',71),
('IT','Italy','Europe','Rome',59554023,'https://flagcdn.com/256x192/it.png',72),
('JM','Jamaica','Americas','Kingston',2961161,'https://flagcdn.com/256x192/jm.png',73),
('JO','Jordan','Asia','Amman',10203140,'https://flagcdn.com/256x192/jo.png',74),
('JP','Japan','Asia','Tokyo',125836021,'https://flagcdn.com/256x192/jp.png',75),
('KE','Kenya','Africa','Nairobi',53771300,'https://flagcdn.com/256x192/ke.png',76),
('KG','Kyrgyzstan','Asia','Bishkek',6591600,'https://flagcdn.com/256x192/kg.png',77),
('KH','Cambodia','Asia','Phnom Penh',16718971,'https://flagcdn.com/256x192/kh.png',78),
('KM','Comoros','Africa','Moroni',869595,'https://flagcdn.com/256x192/km.png',79),
('KP','North Korea','Asia','Pyongyang',25778815,'https://flagcdn.com/256x192/kp.png',80),
('KR','Korea (Republic of)','Asia','Seoul',51780579,'https://flagcdn.com/256x192/kr.png',81),
('KW','Kuwait','Asia','Kuwait City',4270563,'https://flagcdn.com/256x192/kw.png',82),
('KZ','Kazakhstan','Asia','Nur-Sultan',18754440,'https://flagcdn.com/256x192/kz.png',83),
('LA','Laos','Asia','Vientiane',7275556,'https://flagcdn.com/256x192/la.png',84),
('LB','Lebanon','Asia','Beirut',6825442,'https://flagcdn.com/256x192/lb.png',85),
('LC','Saint Lucia','Americas','Castries',183629,'https://flagcdn.com/256x192/lc.png',86),
('LK','Sri Lanka','Asia','Sri Jayawardenepura Kotte',21919000,'https://flagcdn.com/256x192/lk.png',87),
('LR','Liberia','Africa','Monrovia',5057677,'https://flagcdn.com/256x192/lr.png',88),
('LS','Lesotho','Africa','Maseru',2142252,'https://flagcdn.com/256x192/ls.png',89),
('LT','Lithuania','Europe','Vilnius',2794700,'https://flagcdn.com/256x192/lt.png',90),
('LU','Luxembourg','Europe','Luxembourg',632275,'https://flagcdn.com/256x192/lu.png',91),
('LV','Latvia','Europe','Riga',1901548,'https://flagcdn.com/256x192/lv.png',92),
('LY','Libya','Africa','Tripoli',6871287,'https://flagcdn.com/256x192/ly.png',93),
('MA','Morocco','Africa','Rabat',36910558,'https://flagcdn.com/256x192/ma.png',94),
('MD','Moldova (Republic of)','Europe','Chișinău',2617820,'https://flagcdn.com/256x192/md.png',95),
('ME','Montenegro','Europe','Podgorica',621718,'https://flagcdn.com/256x192/me.png',96),
('MG','Madagascar','Africa','Antananarivo',27691019,'https://flagcdn.com/256x192/mg.png',97),
('MK','North Macedonia','Europe','Skopje',2083380,'https://flagcdn.com/256x192/mk.png',98),
('ML','Mali','Africa','Bamako',20250834,'https://flagcdn.com/256x192/ml.png',99),
('MM','Myanmar','Asia','Naypyidaw',54409794,'https://flagcdn.com/256x192/mm.png',100),
('MN','Mongolia','Asia','Ulan Bator',3278292,'https://flagcdn.com/256x192/mn.png',101),
('MR','Mauritania','Africa','Nouakchott',4649660,'https://flagcdn.com/256x192/mr.png',102),
('MT','Malta','Europe','Valletta',525285,'https://flagcdn.com/256x192/mt.png',103),
('MU','Mauritius','Africa','Port Louis',1265740,'https://flagcdn.com/256x192/mu.png',104),
('MV','Maldives','Asia','Malé',540542,'https://flagcdn.com/256x192/mv.png',105),
('MW','Malawi','Africa','Lilongwe',19129955,'https://flagcdn.com/256x192/mw.png',106),
('MX','Mexico','Americas','Mexico City',128932753,'https://flagcdn.com/256x192/mx.png',107),
('MY','Malaysia','Asia','Kuala Lumpur',32365998,'https://flagcdn.com/256x192/my.png',108),
('MZ','Mozambique','Africa','Maputo',31255435,'https://flagcdn.com/256x192/mz.png',109),
('NA','Namibia','Africa','Windhoek',2540916,'https://flagcdn.com/256x192/na.png',110),
('NE','Niger','Africa','Niamey',24206636,'https://flagcdn.com/256x192/ne.png',111),
('NG','Nigeria','Africa','Abuja',206139587,'https://flagcdn.com/256x192/ng.png',112),
('NI','Nicaragua','Americas','Managua',6624554,'https://flagcdn.com/256x192/ni.png',113),
('NL','Netherlands','Europe','Amsterdam',17441139,'https://flagcdn.com/256x192/nl.png',114),
('NO','Norway','Europe','Oslo',5379475,'https://flagcdn.com/256x192/no.png',115),
('NP','Nepal','Asia','Kathmandu',29136808,'https://flagcdn.com/256x192/np.png',116),
('NZ','New Zealand','Oceania','Wellington',5084300,'https://flagcdn.com/256x192/nz.png',117),
('OM','Oman','Asia','Muscat',5106622,'https://flagcdn.com/256x192/om.png',118),
('PA','Panama','Americas','Panama City',4314768,'https://flagcdn.com/256x192/pa.png',119),
('PE','Peru','Americas','Lima',32971846,'https://flagcdn.com/256x192/pe.png',120),
('PG','Papua New Guinea','Oceania','Port Moresby',8947027,'https://flagcdn.com/256x192/pg.png',121),
('PH','Philippines','Asia','Manila',109581085,'https://flagcdn.com/256x192/ph.png',122),
('PK','Pakistan','Asia','Islamabad',220892331,'https://flagcdn.com/256x192/pk.png',123),
('PL','Poland','Europe','Warsaw',37950802,'https://flagcdn.com/256x192/pl.png',124),
('PT','Portugal','Europe','Lisbon',10305564,'https://flagcdn.com/256x192/pt.png',125),
('PY','Paraguay','Americas','Asunción',7132530,'https://flagcdn.com/256x192/py.png',126),
('QA','Qatar','Asia','Doha',2881060,'https://flagcdn.com/256x192/qa.png',127),
('RO','Romania','Europe','Bucharest',19286123,'https://flagcdn.com/256x192/ro.png',128),
('RS','Serbia','Europe','Belgrade',6908224,'https://flagcdn.com/256x192/rs.png',129),
('RU','Russian Federation','Europe','Moscow',144104080,'https://flagcdn.com/256x192/ru.png',130),
('RW','Rwanda','Africa','Kigali',12952209,'https://flagcdn.com/256x192/rw.png',131),
('SA','Saudi Arabia','Asia','Riyadh',34813867,'https://flagcdn.com/256x192/sa.png',132),
('SC','Seychelles','Africa','Victoria',98462,'https://flagcdn.com/256x192/sc.png',133),
('SD','Sudan','Africa','Khartoum',43849269,'https://flagcdn.com/256x192/sd.png',134),
('SE','Sweden','Europe','Stockholm',10353442,'https://flagcdn.com/256x192/se.png',135),
('SG','Singapore','Asia','Singapore',5685807,'https://flagcdn.com/256x192/sg.png',136),
('SI','Slovenia','Europe','Ljubljana',2100126,'https://flagcdn.com/256x192/si.png',137),
('SK','Slovakia','Europe','Bratislava',5458827,'https://flagcdn.com/256x192/sk.png',138),
('SL','Sierra Leone','Africa','Freetown',7976985,'https://flagcdn.com/256x192/sl.png',139),
('SN','Senegal','Africa','Dakar',16743930,'https://flagcdn.com/256x192/sn.png',140),
('SO','Somalia','Africa','Mogadishu',15893219,'https://flagcdn.com/256x192/so.png',141),
('SR','Suriname','Americas','Paramaribo',586634,'https://flagcdn.com/256x192/sr.png',142),
('SS','South Sudan','Africa','Juba',11193729,'https://flagcdn.com/256x192/ss.png',143),
('ST','Sao Tome and Principe','Africa','São Tomé',219161,'https://flagcdn.com/256x192/st.png',144),
('SV','El Salvador','Americas','San Salvador',6486201,'https://flagcdn.com/256x192/sv.png',145),
('SY','Syrian Arab Republic','Asia','Damascus',17500657,'https://flagcdn.com/256x192/sy.png',146),
('SZ','Eswatini','Africa','Mbabane',1160164,'https://flagcdn.com/256x192/sz.png',147),
('TD','Chad','Africa','N\'Djamena',16425859,'https://flagcdn.com/256x192/td.png',148),
('TG','Togo','Africa','Lomé',8278737,'https://flagcdn.com/256x192/tg.png',149),
('TH','Thailand','Asia','Bangkok',69799978,'https://flagcdn.com/256x192/th.png',150),
('TJ','Tajikistan','Asia','Dushanbe',9537642,'https://flagcdn.com/256x192/tj.png',151),
('TL','Timor-Leste','Asia','Dili',1318442,'https://flagcdn.com/256x192/tl.png',152),
('TM','Turkmenistan','Asia','Ashgabat',6031187,'https://flagcdn.com/256x192/tm.png',153),
('TN','Tunisia','Africa','Tunis',11818618,'https://flagcdn.com/256x192/tn.png',154),
('TR','Turkey','Asia','Ankara',84339067,'https://flagcdn.com/256x192/tr.png',155),
('TT','Trinidad and Tobago','Americas','Port of Spain',1399491,'https://flagcdn.com/256x192/tt.png',156),
('TW','Taiwan','Asia','Taipei',23503349,'https://flagcdn.com/256x192/tw.png',157),
('TZ','Tanzania, United Republic of','Africa','Dodoma',59734213,'https://flagcdn.com/256x192/tz.png',158),
('UA','Ukraine','Europe','Kyiv',44134693,'https://flagcdn.com/256x192/ua.png',159),
('UG','Uganda','Africa','Kampala',45741000,'https://flagcdn.com/256x192/ug.png',160),
('US','United States of America','Americas','Washington, D.C.',329484123,'https://flagcdn.com/256x192/us.png',161),
('UY','Uruguay','Americas','Montevideo',3473727,'https://flagcdn.com/256x192/uy.png',162),
('UZ','Uzbekistan','Asia','Tashkent',34232050,'https://flagcdn.com/256x192/uz.png',163),
('VA','Vatican City','Europe','Vatican City',451,'https://flagcdn.com/256x192/va.png',164),
('VE','Venezuela (Bolivarian Republic of)','Americas','Caracas',28435943,'https://flagcdn.com/256x192/ve.png',165),
('VN','Vietnam','Asia','Hanoi',97338583,'https://flagcdn.com/256x192/vn.png',166),
('YE','Yemen','Asia','Sana\'a',29825968,'https://flagcdn.com/256x192/ye.png',167),
('ZA','South Africa','Africa','Pretoria',59308690,'https://flagcdn.com/256x192/za.png',168),
('ZM','Zambia','Africa','Lusaka',18383956,'https://flagcdn.com/256x192/zm.png',169),
('ZW','Zimbabwe','Africa','Harare',14862927,'https://flagcdn.com/256x192/zw.png',170),
('SB','Isole Salomone','Oceania','Honiara',686884,'https://flagcdn.com/256x192/sb.png',171),
('VU','Vanuatu','Oceania','Port Vila',307145,'https://flagcdn.com/256x192/vu.png',172),
('FM','Micronesia','Oceania','Palikir',115023,'https://flagcdn.com/256x192/fm.png',173),
('KI','Kiribati','Oceania','Tarawa',120428,'https://flagcdn.com/256x192/ki.png',174),
('MH','Isole Marshall','Oceania','Majuro',59190,'https://flagcdn.com/256x192/mh.png',175),
('PW','Palau','Oceania','Ngerulmud',18907,'https://flagcdn.com/256x192/pw.png',176),
('NR','Nauru','Oceania','Yaren',10860,'https://flagcdn.com/256x192/nr.png',177),
('WS','Samoa','Oceania','Apia',200874,'https://flagcdn.com/256x192/ws.png',178),
('TO','Tonga','Oceania','Nukuʻalofa',100651,'https://flagcdn.com/256x192/to.png',179),
('TV','Tuvalu','Oceania','Funafuti',11646,'https://flagcdn.com/256x192/tv.png',180),
('AD','Andorra','Europe','Andorra la Vella',77265,'https://flagcdn.com/256x192/ad.png',181),
('AG','Antigua and Barbuda','Americas','Saint John\'s',97929,'https://flagcdn.com/256x192/ag.png',182),
('BS','Bahamas','Americas','Nassau',393244,'https://flagcdn.com/256x192/bs.png',183),
('BB','Barbados','Americas','Bridgetown',287375,'https://flagcdn.com/256x192/bb.png',184),
('BN','Brunei Darussalam','Asia','Bandar Seri Begawan',437479,'https://flagcdn.com/256x192/bn.png',185),
('KM','Comoros','Africa','Moroni',869601,'https://flagcdn.com/256x192/km.png',186),
('DM','Dominica','Americas','Roseau',71986,'https://flagcdn.com/256x192/dm.png',187),
('GM','Gambia','Africa','Banjul',2416668,'https://flagcdn.com/256x192/gm.png',188),
('GQ','Guinea Equatoriale','Africa','Malabo',1402985,'https://flagcdn.com/256x192/gq.png',189),
('LI','Liechtenstein','Europe','Vaduz',38128,'https://flagcdn.com/256x192/li.png',190),
('MH','Marshall Islands','Oceania','Majuro',59190,'https://flagcdn.com/256x192/mh.png',191),
('MC','Monaco','Europe','Monaco',39242,'https://flagcdn.com/256x192/mc.png',192),
('NR','Nauru','Oceania','Yaren',10929,'https://flagcdn.com/256x192/nr.png',193),
('KN','Saint Kitts and Nevis','Americas','Basseterre',52823,'https://flagcdn.com/256x192/kn.png',194),
('SM','San Marino','Europe','San Marino',33931,'https://flagcdn.com/256x192/sm.png',195);
/*!40000 ALTER TABLE `nazioniquiz` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-24 22:28:25
