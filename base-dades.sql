-- MySQL dump 10.13  Distrib 5.7.32, for Linux (x86_64)
--
-- Host: localhost    Database: estudiant_mysql
-- ------------------------------------------------------
-- Server version	5.7.32-0ubuntu0.16.04.1

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
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20210114224046-create-estudiant.js'),('20210114225757-create-facultat.js'),('20210114230334-create-desplacament.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `desplacaments`
--

DROP TABLE IF EXISTS `desplacaments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `desplacaments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estudiant_id` int(11) DEFAULT NULL,
  `facultat_id` int(11) DEFAULT NULL,
  `distancia` varchar(255) DEFAULT NULL,
  `data` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `desplacaments`
--

LOCK TABLES `desplacaments` WRITE;
/*!40000 ALTER TABLE `desplacaments` DISABLE KEYS */;
INSERT INTO `desplacaments` VALUES (1,3,3,'65 KM','2020-01-14 00:00:00','2021-01-15 17:40:22','2021-01-15 17:40:22'),(8,3,3,'10000km','2020-02-02 00:00:00','2021-01-15 23:18:00','2021-01-17 14:46:40'),(12,3,3,'33km','1940-02-02 16:00:00','2021-01-17 22:24:29','2021-01-17 23:01:14');
/*!40000 ALTER TABLE `desplacaments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiants`
--

DROP TABLE IF EXISTS `estudiants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estudiants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `vivenda` varchar(255) DEFAULT NULL,
  `poblacio` varchar(255) DEFAULT NULL,
  `carrera` varchar(255) DEFAULT NULL,
  `tipus_estudi` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiants`
--

LOCK TABLES `estudiants` WRITE;
/*!40000 ALTER TABLE `estudiants` DISABLE KEYS */;
INSERT INTO `estudiants` VALUES (1,'Prova1','Carrer Prova1','Barcelona','Mecanica','online','2021-01-15 16:01:42','2021-01-17 19:12:39'),(2,'Prova2','Avinguda Prova2','Garraf','Disseny','presencial','2021-01-15 16:08:34','2021-01-17 19:12:50'),(3,'Est1','Carrer Prova3','Vilanova i la Geltru','Informatica','online\n','2021-01-15 16:11:41','2021-01-15 16:11:41'),(23,'Ubiwon','Atenea','Olimpo','Filosofia','presencial','2021-01-17 22:23:34','2021-01-17 22:59:30');
/*!40000 ALTER TABLE `estudiants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facultats`
--

DROP TABLE IF EXISTS `facultats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `facultats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) DEFAULT NULL,
  `direccio` varchar(255) DEFAULT NULL,
  `universitat` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facultats`
--

LOCK TABLES `facultats` WRITE;
/*!40000 ALTER TABLE `facultats` DISABLE KEYS */;
INSERT INTO `facultats` VALUES (1,'EPSEVG','Av. Víctor Balaguer, 1. 08800 Vilanova i la Geltrú','UPC','2021-01-15 16:48:45','2021-01-15 16:48:45'),(2,'FIB','Edifici B6 del Campus Nord C/Jordi Girona Salgado,1-3 08034 BARCELONA','UPC','2021-01-15 16:53:06','2021-01-15 16:53:06'),(3,'EETAC','C. Esteve Terradas, 7. 08860 Castelldefels','UPC','2021-01-15 16:56:16','2021-01-15 16:56:16'),(17,'Facultat','Moon','Jupyter','2021-01-15 23:04:21','2021-01-17 22:22:30'),(21,'Inventat','Lluny','Lloc d\'estudi','2021-01-17 22:23:59','2021-01-17 23:00:36');
/*!40000 ALTER TABLE `facultats` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-18  0:21:45
