-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 25 fév. 2025 à 06:09
-- Version du serveur : 5.7.36
-- Version de PHP : 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `myiotdb`
--

-- --------------------------------------------------------

--
-- Structure de la table `iot_device`
--

DROP TABLE IF EXISTS `iot_device`;
CREATE TABLE IF NOT EXISTS `iot_device` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deviceControl` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2001 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `iot_device`
--

INSERT INTO `iot_device` (`id`, `deviceControl`) VALUES
(1000, 'boiler'),
(2000, 'switch');

-- --------------------------------------------------------

--
-- Structure de la table `iot_device_value`
--

DROP TABLE IF EXISTS `iot_device_value`;
CREATE TABLE IF NOT EXISTS `iot_device_value` (
  `id_device` int(11) NOT NULL AUTO_INCREMENT,
  `val` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id_device`)
) ENGINE=MyISAM AUTO_INCREMENT=2001 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `iot_device_value`
--

INSERT INTO `iot_device_value` (`id_device`, `val`, `name`, `id`) VALUES
(1, '0', 'switch', 1000),
(2, '23', 'now_temperature', 1000),
(3, '24', 'humidity', 1000),
(7, '0', 'switch', 1000),
(4, '1', 'switch', 2000),
(5, '10', '2000', 2000),
(6, '#486af0', 'color', 2000),
(8, '#1d0f6b', 'color', 1000);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
