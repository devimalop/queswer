-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 22-02-2019 a las 22:40:23
-- Versión del servidor: 10.3.12-MariaDB
-- Versión de PHP: 7.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `id4272972_1718d0_ivan`
--
DROP DATABASE IF EXISTS `id4272972_1718d0_ivan`;
CREATE DATABASE IF NOT EXISTS `id4272972_1718d0_ivan` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `id4272972_1718d0_ivan`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ASIGNATURAS`
--

DROP TABLE IF EXISTS `ASIGNATURAS`;
CREATE TABLE `ASIGNATURAS` (
  `P_ASIGNATURA` int(8) NOT NULL,
  `A_CURSO` int(8) NOT NULL,
  `A_TEMATICA` int(8) NOT NULL,
  `NOMBRE` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `ASIGNATURAS`
--

INSERT INTO `ASIGNATURAS` (`P_ASIGNATURA`, `A_CURSO`, `A_TEMATICA`, `NOMBRE`) VALUES
(1, 1, 5, 'Lengua Española y Literatura1'),
(2, 1, 6, 'Ciencias Matematicas1'),
(3, 1, 7, 'Ingles1'),
(4, 1, 8, 'Ciencias de la Naturaleza1'),
(5, 1, 4, 'Ciencias Sociales1'),
(6, 2, 5, 'Lengua Española y Literatura2'),
(7, 2, 6, 'Ciencias Matematicas2'),
(8, 2, 7, 'Ingles2'),
(9, 2, 8, 'Ciencias de la Naturaleza2'),
(10, 2, 3, 'Ciencias Sociales2'),
(11, 3, 5, 'Lengua Española y Literatura3'),
(12, 3, 6, 'Ciencias Matematicas3'),
(13, 3, 7, 'Ingles3'),
(14, 3, 9, 'Biologia y Geologia3'),
(15, 3, 10, 'Fisica y Quimica3'),
(16, 4, 8, 'Ciencias Sociales4'),
(17, 4, 5, 'Lengua Castellana y Literatura4'),
(18, 4, 7, 'Ingles4'),
(19, 4, 9, 'Biologia y Geologia4'),
(20, 4, 10, 'Fisica y Quimica4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CURSOS`
--

DROP TABLE IF EXISTS `CURSOS`;
CREATE TABLE `CURSOS` (
  `P_CURSO` int(8) NOT NULL,
  `NOMBRE` varchar(10) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `CURSOS`
--

INSERT INTO `CURSOS` (`P_CURSO`, `NOMBRE`) VALUES
(1, '1ºESO'),
(2, '2ºESO'),
(3, '3ºESO'),
(4, '4ºESO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ESTADISTICAS_GENERAL`
--

DROP TABLE IF EXISTS `ESTADISTICAS_GENERAL`;
CREATE TABLE `ESTADISTICAS_GENERAL` (
  `P_ESTADISTICAS_GENERAL` int(8) NOT NULL,
  `IDENTIFICADOR` int(8) NOT NULL,
  `TIPO` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `A_TEMATICA` int(8) NOT NULL,
  `ACIERTOS` int(8) NOT NULL,
  `TOTAL` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `ESTADISTICAS_GENERAL`
--

INSERT INTO `ESTADISTICAS_GENERAL` (`P_ESTADISTICAS_GENERAL`, `IDENTIFICADOR`, `TIPO`, `A_TEMATICA`, `ACIERTOS`, `TOTAL`) VALUES
(1, 8, 'USUARIO', 2, 1, 1),
(2, 8, 'USUARIO', 3, 1, 2),
(3, 8, 'USUARIO', 4, 0, 1),
(4, 8, 'USUARIO', 6, 1, 1),
(5, 8, 'USUARIO', 7, 0, 1),
(6, 8, 'USUARIO', 8, 0, 1),
(7, 8, 'USUARIO', 9, 1, 1),
(8, 8, 'USUARIO', 10, 2, 2),
(9, 2, 'CURSO', 2, 1, 1),
(10, 2, 'CURSO', 3, 1, 2),
(11, 2, 'CURSO', 4, 0, 1),
(12, 2, 'CURSO', 6, 1, 1),
(13, 2, 'CURSO', 7, 0, 1),
(14, 2, 'CURSO', 8, 0, 1),
(15, 2, 'CURSO', 9, 1, 1),
(16, 2, 'CURSO', 10, 2, 2),
(17, 3, 'INSTITUTO', 2, 1, 1),
(18, 3, 'INSTITUTO', 3, 1, 2),
(19, 3, 'INSTITUTO', 4, 0, 1),
(20, 3, 'INSTITUTO', 6, 1, 1),
(21, 3, 'INSTITUTO', 7, 0, 1),
(22, 3, 'INSTITUTO', 8, 0, 1),
(23, 3, 'INSTITUTO', 9, 1, 1),
(24, 3, 'INSTITUTO', 10, 2, 2),
(25, 10, 'INSTCURS', 2, 1, 1),
(26, 10, 'INSTCURS', 3, 1, 2),
(27, 10, 'INSTCURS', 4, 0, 1),
(28, 10, 'INSTCURS', 6, 1, 1),
(29, 10, 'INSTCURS', 7, 0, 1),
(30, 10, 'INSTCURS', 8, 0, 1),
(31, 10, 'INSTCURS', 9, 1, 1),
(32, 10, 'INSTCURS', 10, 2, 2),
(33, 1, 'USUARIO', 1, 1, 2),
(34, 1, 'USUARIO', 3, 2, 4),
(35, 1, 'USUARIO', 4, 3, 3),
(36, 1, 'USUARIO', 5, 2, 2),
(37, 1, 'USUARIO', 6, 1, 3),
(38, 1, 'USUARIO', 7, 2, 2),
(39, 1, 'USUARIO', 8, 1, 1),
(40, 1, 'USUARIO', 10, 2, 2),
(41, 1, 'CURSO', 1, 1, 2),
(42, 1, 'CURSO', 3, 2, 4),
(43, 1, 'CURSO', 4, 3, 3),
(44, 1, 'CURSO', 5, 2, 2),
(45, 1, 'CURSO', 6, 1, 3),
(46, 1, 'CURSO', 7, 2, 2),
(47, 1, 'CURSO', 8, 1, 1),
(48, 1, 'CURSO', 10, 2, 2),
(49, 1, 'INSTITUTO', 1, 1, 2),
(50, 1, 'INSTITUTO', 3, 2, 4),
(51, 1, 'INSTITUTO', 4, 3, 3),
(52, 1, 'INSTITUTO', 5, 2, 2),
(53, 1, 'INSTITUTO', 6, 1, 3),
(54, 1, 'INSTITUTO', 7, 2, 2),
(55, 1, 'INSTITUTO', 8, 1, 1),
(56, 1, 'INSTITUTO', 10, 2, 2),
(57, 1, 'INSTCURS', 1, 1, 2),
(58, 1, 'INSTCURS', 3, 2, 4),
(59, 1, 'INSTCURS', 4, 3, 3),
(60, 1, 'INSTCURS', 5, 2, 2),
(61, 1, 'INSTCURS', 6, 1, 3),
(62, 1, 'INSTCURS', 7, 2, 2),
(63, 1, 'INSTCURS', 8, 1, 1),
(64, 1, 'INSTCURS', 10, 2, 2),
(65, 1, 'USUARIO', 2, 1, 1),
(66, 1, 'CURSO', 2, 1, 1),
(67, 1, 'INSTITUTO', 2, 1, 1),
(68, 1, 'INSTCURS', 2, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ESTADISTICAS_USUARIO`
--

DROP TABLE IF EXISTS `ESTADISTICAS_USUARIO`;
CREATE TABLE `ESTADISTICAS_USUARIO` (
  `P_ESTADISTICAS_USUARIO` int(8) NOT NULL,
  `A_USUARIO` int(8) NOT NULL,
  `A_PREGUNTA` int(8) NOT NULL,
  `FECHA` date NOT NULL,
  `ACIERTO` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `ESTADISTICAS_USUARIO`
--

INSERT INTO `ESTADISTICAS_USUARIO` (`P_ESTADISTICAS_USUARIO`, `A_USUARIO`, `A_PREGUNTA`, `FECHA`, `ACIERTO`) VALUES
(1, 2, 1, '2013-01-01', 0),
(2, 2, 2, '2013-01-02', 0),
(3, 1, 1, '2013-01-01', 1),
(4, 1, 2, '2013-01-02', 1),
(5, 1, 3, '2013-01-01', 0),
(6, 1, 4, '2013-01-02', 1),
(7, 1, 5, '2013-01-02', 0),
(8, 8, 106, '2018-01-13', 1),
(9, 8, 22, '2018-01-13', 1),
(10, 8, 26, '2018-01-13', 0),
(11, 8, 110, '2018-01-13', 1),
(12, 8, 38, '2018-01-13', 0),
(13, 8, 82, '2018-01-13', 0),
(14, 8, 30, '2018-01-13', 1),
(15, 8, 66, '2018-01-13', 1),
(16, 8, 114, '2018-01-13', 1),
(17, 8, 90, '2018-01-13', 0),
(18, 1, 53, '2018-01-16', 1),
(19, 1, 5, '2018-01-16', 0),
(20, 1, 33, '2018-01-16', 0),
(21, 1, 45, '2018-01-16', 1),
(22, 1, 93, '2018-01-16', 1),
(23, 1, 37, '2018-01-16', 1),
(24, 1, 113, '2018-01-16', 1),
(25, 1, 77, '2018-01-16', 1),
(26, 1, 29, '2018-01-16', 0),
(27, 1, 70, '2018-01-16', 0),
(28, 1, 110, '2019-02-21', 1),
(29, 1, 65, '2019-02-21', 0),
(30, 1, 50, '2019-02-21', 1),
(31, 1, 21, '2019-02-21', 1),
(32, 1, 69, '2019-02-21', 1),
(33, 1, 9, '2019-02-21', 1),
(34, 1, 42, '2019-02-21', 1),
(35, 1, 74, '2019-02-21', 1),
(36, 1, 25, '2019-02-21', 1),
(37, 1, 33, '2019-02-21', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `INSTCURS`
--

DROP TABLE IF EXISTS `INSTCURS`;
CREATE TABLE `INSTCURS` (
  `P_INSTCURS` int(8) NOT NULL,
  `A_INSTITUTO` int(8) NOT NULL,
  `A_CURSO` int(8) NOT NULL,
  `BONOS` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `INSTCURS`
--

INSERT INTO `INSTCURS` (`P_INSTCURS`, `A_INSTITUTO`, `A_CURSO`, `BONOS`) VALUES
(1, 1, 1, 0),
(2, 1, 2, 0),
(3, 1, 3, 0),
(4, 1, 4, 0),
(5, 2, 1, 0),
(6, 2, 2, 0),
(7, 2, 3, 0),
(8, 2, 4, 0),
(9, 3, 1, 0),
(10, 3, 2, 0),
(11, 3, 3, 0),
(12, 3, 4, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `INSTITUTOS`
--

DROP TABLE IF EXISTS `INSTITUTOS`;
CREATE TABLE `INSTITUTOS` (
  `P_INSTITUTO` int(8) NOT NULL,
  `NOMBRE` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `CIUDAD` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `INSTITUTOS`
--

INSERT INTO `INSTITUTOS` (`P_INSTITUTO`, `NOMBRE`, `CIUDAD`) VALUES
(1, 'Augusto Linares', 'Santander'),
(2, 'Miguel Herrero', 'Torrelavega'),
(3, 'Montesclaros', 'Reinosa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `NOTAS`
--

DROP TABLE IF EXISTS `NOTAS`;
CREATE TABLE `NOTAS` (
  `P_NOTA` int(2) NOT NULL,
  `A_USUARIO` int(8) NOT NULL,
  `A_ASIGNATURA` int(8) NOT NULL,
  `NOTA` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `NOTAS`
--

INSERT INTO `NOTAS` (`P_NOTA`, `A_USUARIO`, `A_ASIGNATURA`, `NOTA`) VALUES
(1, 1, 2, 9),
(2, 8, 6, 5),
(3, 8, 7, 5),
(4, 8, 8, 5),
(5, 8, 9, 5),
(6, 8, 10, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PREGUNTAS`
--

DROP TABLE IF EXISTS `PREGUNTAS`;
CREATE TABLE `PREGUNTAS` (
  `P_PREGUNTA` int(8) NOT NULL,
  `TEXTO` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `A` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `B` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `C` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `CORRECTA` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `A_TEMATICA` int(8) NOT NULL,
  `DIFICULTAD` int(1) NOT NULL,
  `WIKI` varchar(250) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `PREGUNTAS`
--

INSERT INTO `PREGUNTAS` (`P_PREGUNTA`, `TEXTO`, `A`, `B`, `C`, `CORRECTA`, `A_TEMATICA`, `DIFICULTAD`, `WIKI`) VALUES
(1, '1ESO - ¿De qué color es el caballo blanco de Santiago?', 'Blanco', 'Azul', 'Rojo', 'A', 1, 2, 'Es Blanco'),
(2, '2ESO - ¿De qué color es el caballo blanco de Santiago?', 'Blanco', 'Azul', 'Rojo', 'A', 1, 4, 'Es Blanco'),
(3, '3ESO - ¿De qué color es el caballo blanco de Santiago?', 'Blanco', 'Azul', 'Rojo', 'A', 1, 6, 'Es Blanco'),
(4, '4ESO - ¿De qué color es el caballo blanco de Santiago?', 'Blanco', 'Azul', 'Rojo', 'A', 1, 8, 'Es Blanco'),
(5, '1ESO - ¿Qué metal es el mejor conductor de la elctricidad?', 'Cobre', 'Oro', 'Plata', 'C', 1, 2, 'Conductividad (S-M) Plata (6.8) - Cobre (6.0) - Oro (4.3) '),
(6, '2ESO - ¿Qué metal es el mejor conductor de la elctricidad?', 'Cobre', 'Oro', 'Plata', 'C', 1, 4, 'Conductividad (S-M) Plata (6.8) - Cobre (6.0) - Oro (4.3) '),
(7, '3ESO - ¿Qué metal es el mejor conductor de la elctricidad?', 'Cobre', 'Oro', 'Plata', 'C', 1, 6, 'Conductividad (S-M) Plata (6.8) - Cobre (6.0) - Oro (4.3) '),
(8, '4ESO - ¿Qué metal es el mejor conductor de la elctricidad?', 'Cobre', 'Oro', 'Plata', 'C', 1, 8, 'Conductividad (S-M) Plata (6.8) - Cobre (6.0) - Oro (4.3) '),
(9, '1ESO - ¿Quién ganó la primera edición de Operacion Triunfo?', 'Rosa', 'Bisbal', 'Bustamante', 'A', 1, 2, 'Además, Rosa fue a Eurovisión'),
(10, '2ESO - ¿Quién ganó la primera edición de Operacion Triunfo?', 'Rosa', 'Bisbal', 'Bustamante', 'A', 1, 4, 'Además, Rosa fue a Eurovisión'),
(11, '3ESO - ¿Quién ganó la primera edición de Operacion Triunfo?', 'Rosa', 'Bisbal', 'Bustamante', 'A', 1, 6, 'Además, Rosa fue a Eurovisión'),
(12, '4ESO - ¿Quién ganó la primera edición de Operacion Triunfo?', 'Rosa', 'Bisbal', 'Bustamante', 'A', 1, 8, 'Además, Rosa fue a Eurovisión'),
(13, '1ESO - ¿Quién fue el ganador de Roland Garros en 2014?', 'Novak Djokovic', 'Roger Federer', 'Rafael Nadal', 'C', 2, 2, 'Hasta el momento sólo ha perdido 2 partidos en el mítico torneo'),
(14, '2ESO - ¿Quién fue el ganador de Roland Garros en 2014?', 'Novak Djokovic', 'Roger Federer', 'Rafael Nadal', 'C', 2, 4, 'Hasta el momento sólo ha perdido 2 partidos en el mítico torneo'),
(15, '3ESO - ¿Quién fue el ganador de Roland Garros en 2014?', 'Novak Djokovic', 'Roger Federer', 'Rafael Nadal', 'C', 2, 6, 'Hasta el momento sólo ha perdido 2 partidos en el mítico torneo'),
(16, '4ESO - ¿Quién fue el ganador de Roland Garros en 2014?', 'Novak Djokovic', 'Roger Federer', 'Rafael Nadal', 'C', 2, 8, 'Hasta el momento sólo ha perdido 2 partidos en el mítico torneo'),
(17, '1ESO - ¿Qué número de dorsal llevaba el mítico jugador del Real Madrid Raúl González?', '7', '8', '9', 'A', 2, 2, 'Raúl ha marcado 404 goles a lo largo de su carrera'),
(18, '2ESO - ¿Qué número de dorsal llevaba el mítico jugador del Real Madrid Raúl González?', '7', '8', '9', 'A', 2, 4, 'Raúl ha marcado 404 goles a lo largo de su carrera'),
(19, '3ESO - ¿Qué número de dorsal llevaba el mítico jugador del Real Madrid Raúl González?', '7', '8', '9', 'A', 2, 6, 'Raúl ha marcado 404 goles a lo largo de su carrera'),
(20, '4ESO - ¿Qué número de dorsal llevaba el mítico jugador del Real Madrid Raúl González?', '7', '8', '9', 'A', 2, 8, 'Raúl ha marcado 404 goles a lo largo de su carrera'),
(21, '1ESO - ¿Cuántas Copas de Europa ha ganado el Real Madrid?', '12', '10', '11', 'A', 2, 2, '¿Logrará la decimotercera?'),
(22, '2ESO - ¿Cuántas Copas de Europa ha ganado el Real Madrid?', '12', '10', '11', 'A', 2, 4, '¿Logrará la decimotercera?'),
(23, '3ESO - ¿Cuántas Copas de Europa ha ganado el Real Madrid?', '12', '10', '11', 'A', 2, 6, '¿Logrará la decimotercera?'),
(24, '4ESO - ¿Cuántas Copas de Europa ha ganado el Real Madrid?', '12', '10', '11', 'A', 2, 8, '¿Logrará la decimotercera?'),
(25, '1ESO - ¿Cuál es la capital de España?', 'Lisboa', 'Madrid', 'Reinosa', 'B', 3, 2, 'Hasta 1931 no se oficializó constitucionalmente la capitalidad de Madrid'),
(26, '2ESO - ¿Cuál es la capital de España?', 'Lisboa', 'Madrid', 'Reinosa', 'B', 3, 4, 'Hasta 1931 no se oficializó constitucionalmente la capitalidad de Madrid'),
(27, '3ESO - ¿Cuál es la capital de España?', 'Lisboa', 'Madrid', 'Reinosa', 'B', 3, 6, 'Hasta 1931 no se oficializó constitucionalmente la capitalidad de Madrid'),
(28, '4ESO - ¿Cuál es la capital de España?', 'Lisboa', 'Madrid', 'Reinosa', 'B', 3, 8, 'Hasta 1931 no se oficializó constitucionalmente la capitalidad de Madrid'),
(29, '1ESO - ¿Cuál es el río más largo de la península Ibérica?', 'Ebro', 'Tajo', 'Hijar', 'B', 3, 2, 'El Ebro es el más largo de España'),
(30, '2ESO - ¿Cuál es el río más largo de la península Ibérica?', 'Ebro', 'Tajo', 'Hijar', 'B', 3, 4, 'El Ebro es el más largo de España'),
(31, '3ESO - ¿Cuál es el río más largo de la península Ibérica?', 'Ebro', 'Tajo', 'Hijar', 'B', 3, 6, 'El Ebro es el más largo de España'),
(32, '4ESO - ¿Cuál es el río más largo de la península Ibérica?', 'Ebro', 'Tajo', 'Hijar', 'B', 3, 8, 'El Ebro es el más largo de España'),
(33, '1ESO - ¿Cuántas provincias tiene Andalucía?', '4', '6', '8', 'C', 3, 2, 'Almería, Cádiz, Córdoba, Granada, Huelva, Jaén, Málaga y Sevilla'),
(34, '2ESO - ¿Cuántas provincias tiene Andalucía?', '4', '6', '8', 'C', 3, 4, 'Almería, Cádiz, Córdoba, Granada, Huelva, Jaén, Málaga y Sevilla'),
(35, '3ESO - ¿Cuántas provincias tiene Andalucía?', '4', '6', '8', 'C', 3, 6, 'Almería, Cádiz, Córdoba, Granada, Huelva, Jaén, Málaga y Sevilla'),
(36, '4ESO - ¿Cuántas provincias tiene Andalucía?', '4', '6', '8', 'C', 3, 8, 'Almería, Cádiz, Córdoba, Granada, Huelva, Jaén, Málaga y Sevilla'),
(37, '1ESO - ¿Durante qué años trancurrió la Guerra Civil?', '1933-1936', '1936-1939', '1939-1942', 'B', 4, 2, 'DeL 17 de Julio de 1936 al 1 de abril de 1939 '),
(38, '2ESO - ¿Durante qué años trancurrió la Guerra Civil?', '1933-1936', '1936-1939', '1939-1942', 'B', 4, 4, 'DeL 17 de Julio de 1936 al 1 de abril de 1939 '),
(39, '3ESO - ¿Durante qué años trancurrió la Guerra Civil?', '1933-1936', '1936-1939', '1939-1942', 'B', 4, 6, 'DeL 17 de Julio de 1936 al 1 de abril de 1939 '),
(40, '4ESO - ¿Durante qué años trancurrió la Guerra Civil?', '1933-1936', '1936-1939', '1939-1942', 'B', 4, 8, 'DeL 17 de Julio de 1936 al 1 de abril de 1939 '),
(41, '1ESO - ¿Cuál es el nombre del actual rey de España?', 'Juan Carlos', 'Felipe', 'Froilán', 'B', 4, 2, 'Juan Carlos I abdicó en 2014'),
(42, '2ESO - ¿Cuál es el nombre del actual rey de España?', 'Juan Carlos', 'Felipe', 'Froilán', 'B', 4, 4, 'Juan Carlos I abdicó en 2014'),
(43, '3ESO - ¿Cuál es el nombre del actual rey de España?', 'Juan Carlos', 'Felipe', 'Froilán', 'B', 4, 6, 'Juan Carlos I abdicó en 2014'),
(44, '4ESO - ¿Cuál es el nombre del actual rey de España?', 'Juan Carlos', 'Felipe', 'Froilán', 'B', 4, 8, 'Juan Carlos I abdicó en 2014'),
(45, '1ESO - ¿En qué año se produjo el famoso golpe de Estado del 23F?', '1981', '1982', '1983', 'A', 4, 2, 'Fue llevado a cabo por el coronel Tejero'),
(46, '2ESO - ¿En qué año se produjo el famoso golpe de Estado del 23F?', '1981', '1982', '1983', 'A', 4, 4, 'Fue llevado a cabo por el coronel Tejero'),
(47, '3ESO - ¿En qué año se produjo el famoso golpe de Estado del 23F?', '1981', '1982', '1983', 'A', 4, 6, 'Fue llevado a cabo por el coronel Tejero'),
(48, '4ESO - ¿En qué año se produjo el famoso golpe de Estado del 23F?', '1981', '1982', '1983', 'A', 4, 8, 'Fue llevado a cabo por el coronel Tejero'),
(49, '1ESO - ¿Qué es un diptongo?', 'Es la secuencia de dos consonantes', ' Es la rima característica de los sonetos', ' 2 vocales distintas dentro de la misma sílaba', 'C', 5, 2, 'Es la secuencia de dos vocales distintas que se pronuncian dentro de la misma sílaba'),
(50, '2ESO - ¿Qué es un diptongo?', 'Es la secuencia de dos consonantes', ' Es la rima característica de los sonetos', ' 2 vocales distintas dentro de la misma sílaba', 'C', 5, 4, 'Es la secuencia de dos vocales distintas que se pronuncian dentro de la misma sílaba'),
(51, '3ESO - ¿Qué es un diptongo?', 'Es la secuencia de dos consonantes', ' Es la rima característica de los sonetos', ' 2 vocales distintas dentro de la misma sílaba', 'C', 5, 6, 'Es la secuencia de dos vocales distintas que se pronuncian dentro de la misma sílaba'),
(52, '4ESO - ¿Qué es un diptongo?', 'Es la secuencia de dos consonantes', ' Es la rima característica de los sonetos', ' 2 vocales distintas dentro de la misma sílaba', 'C', 5, 8, 'Es la secuencia de dos vocales distintas que se pronuncian dentro de la misma sílaba'),
(53, '1ESO - ¿Cuál de estas obras son de F. García Lorca?', 'La casa de Bernarda Alba.', ' El alquimista.', ' El árbol de la ciencia.', 'A', 5, 2, 'La casa de Bernarda Alba es la respuesta correcta'),
(54, '2ESO - ¿Cuál de estas obras son de F. García Lorca?', 'La casa de Bernarda Alba.', ' El alquimista.', ' El árbol de la ciencia.', 'A', 5, 4, 'La casa de Bernarda Alba es la respuesta correcta'),
(55, '3ESO - ¿Cuál de estas obras son de F. García Lorca?', 'La casa de Bernarda Alba.', ' El alquimista.', ' El árbol de la ciencia.', 'A', 5, 6, 'La casa de Bernarda Alba es la respuesta correcta'),
(56, '4ESO - ¿Cuál de estas obras son de F. García Lorca?', 'La casa de Bernarda Alba.', ' El alquimista.', ' El árbol de la ciencia.', 'A', 5, 8, 'La casa de Bernarda Alba es la respuesta correcta'),
(57, '1ESO - ¿En qué parte de la Edad Media se registra el Cantar del Mío Cid?', 'Alta', 'Baja', ' No fue en la Edad Media.', 'A', 5, 2, 'Fue en la Alta Edad Media'),
(58, '2ESO - ¿En qué parte de la Edad Media se registra el Cantar del Mío Cid?', 'Alta', 'Baja', ' No fue en la Edad Media.', 'A', 5, 4, 'Fue en la Alta Edad Media'),
(59, '3ESO - ¿En qué parte de la Edad Media se registra el Cantar del Mío Cid?', 'Alta', 'Baja', ' No fue en la Edad Media.', 'A', 5, 6, 'Fue en la Alta Edad Media'),
(60, '4ESO - ¿En qué parte de la Edad Media se registra el Cantar del Mío Cid?', 'Alta', 'Baja', ' No fue en la Edad Media.', 'A', 5, 8, 'Fue en la Alta Edad Media'),
(61, '1ESO _ 2x5-2/4', '9', '9,5', '9,75', 'B', 6, 2, 'Con un orden correcto de las operaciones es fácil llegar al resultado'),
(62, '2ESO _ 2x5-2/4', '9', '9,5', '9,75', 'B', 6, 4, 'Con un orden correcto de las operaciones es fácil llegar al resultado'),
(63, '3ESO _ 2x5-2/4', '9', '9,5', '9,75', 'B', 6, 6, 'Con un orden correcto de las operaciones es fácil llegar al resultado'),
(64, '4ESO _ 2x5-2/4', '9', '9,5', '9,75', 'B', 6, 8, 'Con un orden correcto de las operaciones es fácil llegar al resultado'),
(65, '1ESO _ 23-9/3+12/4', '21,5', '23', '23,5', 'B', 6, 2, 'Con un orden correcto de las operaciones es fácil llegar al resultado'),
(66, '2ESO _ 23-9/3+12/4', '21,5', '23', '23,5', 'B', 6, 4, 'Con un orden correcto de las operaciones es fácil llegar al resultado'),
(67, '3ESO _ 23-9/3+12/4', '21,5', '23', '23,5', 'B', 6, 6, 'Con un orden correcto de las operaciones es fácil llegar al resultado'),
(68, '4ESO _ 23-9/3+12/4', '21,5', '23', '23,5', 'B', 6, 8, 'Con un orden correcto de las operaciones es fácil llegar al resultado'),
(69, '1ESO - 2-2x9+80/4', '-2,5', '0', '4', 'C', 6, 2, 'Con un orden correcto de las operaciones es fácil llegar al resultado'),
(70, '2ESO - 2-2x9+80/4', '-2,5', '0', '4', 'C', 6, 4, 'Con un orden correcto de las operaciones es fácil llegar al resultado'),
(71, '3ESO - 2-2x9+80/4', '-2,5', '0', '4', 'C', 6, 6, 'Con un orden correcto de las operaciones es fácil llegar al resultado'),
(72, '4ESO - 2-2x9+80/4', '-2,5', '0', '4', 'C', 6, 8, 'Con un orden correcto de las operaciones es fácil llegar al resultado'),
(73, '1ESO - ¿Cómo se dice gato en inglés?', 'Dog', 'Cat', 'Mouse', 'B', 7, 2, 'Gato = cat'),
(74, '2ESO - ¿Cómo se dice gato en inglés?', 'Dog', 'Cat', 'Mouse', 'B', 7, 4, 'Gato = cat'),
(75, '3ESO - ¿Cómo se dice gato en inglés?', 'Dog', 'Cat', 'Mouse', 'B', 7, 6, 'Gato = cat'),
(76, '4ESO - ¿Cómo se dice gato en inglés?', 'Dog', 'Cat', 'Mouse', 'B', 7, 8, 'Gato = cat'),
(77, '1ESO - ¿Cómo se dice perro en inglés?', 'Dog', 'Cat', 'Mouse', 'A', 7, 2, 'Perro = dog'),
(78, '2ESO - ¿Cómo se dice perro en inglés?', 'Dog', 'Cat', 'Mouse', 'A', 7, 4, 'Perro = dog'),
(79, '3ESO - ¿Cómo se dice perro en inglés?', 'Dog', 'Cat', 'Mouse', 'A', 7, 6, 'Perro = dog'),
(80, '4ESO - ¿Cómo se dice perro en inglés?', 'Dog', 'Cat', 'Mouse', 'A', 7, 8, 'Perro = dog'),
(81, '1ESO - ¿Cómo se dice ratón en inglés?', 'Dog', 'Cat', 'Mouse', 'C', 7, 2, 'Raton = mouse'),
(82, '2ESO - ¿Cómo se dice ratón en inglés?', 'Dog', 'Cat', 'Mouse', 'C', 7, 4, 'Raton = mouse'),
(83, '3ESO - ¿Cómo se dice ratón en inglés?', 'Dog', 'Cat', 'Mouse', 'C', 7, 6, 'Raton = mouse'),
(84, '4ESO - ¿Cómo se dice ratón en inglés?', 'Dog', 'Cat', 'Mouse', 'C', 7, 8, 'Raton = mouse'),
(85, '1ESO - ¿Quién fue el primero en decir que la Tierra orbita alrededor del Sol?', 'Copernico', 'Galileo', 'Kepler', 'C', 8, 2, 'Kepler'),
(86, '2ESO - ¿Quién fue el primero en decir que la Tierra orbita alrededor del Sol?', 'Copernico', 'Galileo', 'Kepler', 'C', 8, 4, 'Kepler'),
(87, '3ESO - ¿Quién fue el primero en decir que la Tierra orbita alrededor del Sol?', 'Copernico', 'Galileo', 'Kepler', 'C', 8, 6, 'Kepler'),
(88, '4ESO - ¿Quién fue el primero en decir que la Tierra orbita alrededor del Sol?', 'Copernico', 'Galileo', 'Kepler', 'C', 8, 8, 'Kepler'),
(89, '1ESO - ¿Quién descubrió el ADN?', 'Alfred Jarry', 'James Watson', 'Friedrich Miescher', 'C', 8, 2, 'Friedrich Miescher'),
(90, '2ESO - ¿Quién descubrió el ADN?', 'Alfred Jarry', 'James Watson', 'Friedrich Miescher', 'C', 8, 4, 'Friedrich Miescher'),
(91, '3ESO - ¿Quién descubrió el ADN?', 'Alfred Jarry', 'James Watson', 'Friedrich Miescher', 'C', 8, 6, 'Friedrich Miescher'),
(92, '4ESO - ¿Quién descubrió el ADN?', 'Alfred Jarry', 'James Watson', 'Friedrich Miescher', 'C', 8, 8, 'Friedrich Miescher'),
(93, '1ESO - ¿Qué es el ITER?', 'Impuesto para científicos', 'Reactor de fusión nuclear', 'Acelerador de partículas', 'B', 8, 2, 'Reactor de fusión nuclear'),
(94, '2ESO - ¿Qué es el ITER?', 'Impuesto para científicos', 'Reactor de fusión nuclear', 'Acelerador de partículas', 'B', 8, 4, 'Reactor de fusión nuclear'),
(95, '3ESO - ¿Qué es el ITER?', 'Impuesto para científicos', 'Reactor de fusión nuclear', 'Acelerador de partículas', 'B', 8, 6, 'Reactor de fusión nuclear'),
(96, '4ESO - ¿Qué es el ITER?', 'Impuesto para científicos', 'Reactor de fusión nuclear', 'Acelerador de partículas', 'B', 8, 8, 'Reactor de fusión nuclear'),
(97, '1ESO - ¿Dónde realizan las plantas la fotosíntesis?', 'En las hojas', 'En el tallo', 'En la raiz', 'A', 9, 2, 'En las hojas'),
(98, '2ESO - ¿Dónde realizan las plantas la fotosíntesis?', 'En las hojas', 'En el tallo', 'En la raiz', 'A', 9, 4, 'En las hojas'),
(99, '3ESO - ¿Dónde realizan las plantas la fotosíntesis?', 'En las hojas', 'En el tallo', 'En la raiz', 'A', 9, 6, 'En las hojas'),
(100, '4ESO - ¿Dónde realizan las plantas la fotosíntesis?', 'En las hojas', 'En el tallo', 'En la raiz', 'A', 9, 8, 'En las hojas'),
(101, '1ESO - ¿Qué necesitan las células para dividirse?', 'Nada', 'Energía', 'Otra célula', 'B', 9, 2, 'En las hojas'),
(102, '2ESO - ¿Qué necesitan las células para dividirse?', 'Nada', 'Energía', 'Otra célula', 'B', 9, 4, 'En las hojas'),
(103, '3ESO - ¿Qué necesitan las células para dividirse?', 'Nada', 'Energía', 'Otra célula', 'B', 9, 6, 'En las hojas'),
(104, '4ESO - ¿Qué necesitan las células para dividirse?', 'Nada', 'Energía', 'Otra célula', 'B', 9, 8, 'En las hojas'),
(105, '1ESO - Las células reproductoras se dividen por...', 'Meiosis', 'Mitosis', 'Metamorfosis', 'A', 9, 2, 'Meiosis'),
(106, '2ESO - Las células reproductoras se dividen por...', 'Meiosis', 'Mitosis', 'Metamorfosis', 'A', 9, 4, 'Meiosis'),
(107, '3ESO - Las células reproductoras se dividen por...', 'Meiosis', 'Mitosis', 'Metamorfosis', 'A', 9, 6, 'Meiosis'),
(108, '4ESO - Las células reproductoras se dividen por...', 'Meiosis', 'Mitosis', 'Metamorfosis', 'A', 9, 8, 'Meiosis'),
(109, '1ESO - ¿En qué unidad se mide la presión?', 'Pascales', 'Kg', 'Newton', 'A', 10, 2, 'Se mide en Pascales'),
(110, '2ESO - ¿En qué unidad se mide la presión?', 'Pascales', 'Kg', 'Newton', 'A', 10, 4, 'Se mide en Pascales'),
(111, '3ESO - ¿En qué unidad se mide la presión?', 'Pascales', 'Kg', 'Newton', 'A', 10, 6, 'Se mide en Pascales'),
(112, '4ESO - ¿En qué unidad se mide la presión?', 'Pascales', 'Kg', 'Newton', 'A', 10, 8, 'Se mide en Pascales'),
(113, '1ESO - ¿Quién originó esta frase?: Dadme un punto de apoyo y moveré el mundo', 'Arquímedes', 'Aristóteles', 'Demócrito', 'A', 10, 2, 'Arquímedes'),
(114, '2ESO - ¿Quién originó esta frase?: Dadme un punto de apoyo y moveré el mundo', 'Arquímedes', 'Aristóteles', 'Demócrito', 'A', 10, 4, 'Arquímedes'),
(115, '3ESO - ¿Quién originó esta frase?: Dadme un punto de apoyo y moveré el mundo', 'Arquímedes', 'Aristóteles', 'Demócrito', 'A', 10, 6, 'Arquímedes'),
(116, '4ESO - ¿Quién originó esta frase?: Dadme un punto de apoyo y moveré el mundo', 'Arquímedes', 'Aristóteles', 'Demócrito', 'A', 10, 8, 'Arquímedes'),
(117, '1ESO - ¿En qué unidad se mide la velocidad angular?', 'Rad/seg', 'm/seg', 'Km/h', 'A', 10, 2, 'Rad seg'),
(118, '2ESO - ¿En qué unidad se mide la velocidad angular?', 'Rad/seg', 'm/seg', 'Km/h', 'A', 10, 4, 'Rad seg'),
(119, '3ESO - ¿En qué unidad se mide la velocidad angular?', 'Rad/seg', 'm/seg', 'Km/h', 'A', 10, 6, 'Rad seg'),
(120, '4ESO - ¿En qué unidad se mide la velocidad angular?', 'Rad/seg', 'm/seg', 'Km/h', 'A', 10, 8, 'Rad seg'),
(121, 'aaaa', 'a', 'b', 'c', 'A', 6, 4, 'assadsa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `TEMATICA`
--

DROP TABLE IF EXISTS `TEMATICA`;
CREATE TABLE `TEMATICA` (
  `P_TEMATICA` int(8) NOT NULL,
  `NOMBRE` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `TEMATICA`
--

INSERT INTO `TEMATICA` (`P_TEMATICA`, `NOMBRE`) VALUES
(9, 'BIOLOGIA'),
(8, 'CIENCIAS'),
(2, 'DEPORTES'),
(10, 'FISICA Y QUIMICA'),
(1, 'GENERAL'),
(3, 'GEOGRAFIA'),
(4, 'HISTORIA'),
(7, 'INGLES'),
(5, 'LENGUA'),
(6, 'MATEMATICAS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USUARIOS`
--

DROP TABLE IF EXISTS `USUARIOS`;
CREATE TABLE `USUARIOS` (
  `P_USUARIO` int(8) NOT NULL,
  `A_INSTCURS` int(8) NOT NULL,
  `NOMBRE` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `NOMBREREAL` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `APELLIDOS` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `CONTRASENA` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `TIPO_USUARIO` int(1) NOT NULL,
  `EDAD` int(3) NOT NULL,
  `BONOS` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `USUARIOS`
--

INSERT INTO `USUARIOS` (`P_USUARIO`, `A_INSTCURS`, `NOMBRE`, `NOMBREREAL`, `APELLIDOS`, `CONTRASENA`, `TIPO_USUARIO`, `EDAD`, `BONOS`) VALUES
(1, 1, 'Ivan', 'Ivan', 'Moreno Alonso', 'Ivan', 2, 31, 2),
(2, 2, 'Paz', 'Paz', 'Saiz Gutierrez', 'Paz', 2, 31, 0),
(3, 3, 'Martin', 'Martin', 'Moreno Saiz', 'Martin', 0, 1, 0),
(4, 1, 'Jorge', 'Jorge', 'PerezMartinez', 'Jorge', 0, 12, 0),
(5, 1, 'Raul', 'Raul', 'Gutierrez Mantilla', 'Raul', 0, 13, 0),
(6, 1, 'Roberto', 'Roberto', 'Gutierrez Gonzalez', 'Roberto', 0, 12, 0),
(7, 1, 'Marcos', 'Marcos', 'Fernandez Alvarez', 'Marcos', 0, 12, 0),
(8, 10, 'testHosting', 'nomb', 'app', 'testHost', 1, 33, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ASIGNATURAS`
--
ALTER TABLE `ASIGNATURAS`
  ADD PRIMARY KEY (`P_ASIGNATURA`),
  ADD UNIQUE KEY `NOMBRE` (`NOMBRE`),
  ADD KEY `A_CURSO` (`A_CURSO`),
  ADD KEY `A_TEMATICA` (`A_TEMATICA`);

--
-- Indices de la tabla `CURSOS`
--
ALTER TABLE `CURSOS`
  ADD PRIMARY KEY (`P_CURSO`),
  ADD UNIQUE KEY `NOMBRE` (`NOMBRE`);

--
-- Indices de la tabla `ESTADISTICAS_GENERAL`
--
ALTER TABLE `ESTADISTICAS_GENERAL`
  ADD PRIMARY KEY (`P_ESTADISTICAS_GENERAL`),
  ADD KEY `A_TEMATICA` (`A_TEMATICA`);

--
-- Indices de la tabla `ESTADISTICAS_USUARIO`
--
ALTER TABLE `ESTADISTICAS_USUARIO`
  ADD PRIMARY KEY (`P_ESTADISTICAS_USUARIO`),
  ADD KEY `A_USUARIO` (`A_USUARIO`),
  ADD KEY `A_PREGUNTA` (`A_PREGUNTA`);

--
-- Indices de la tabla `INSTCURS`
--
ALTER TABLE `INSTCURS`
  ADD PRIMARY KEY (`P_INSTCURS`),
  ADD KEY `A_INSTITUTO` (`A_INSTITUTO`),
  ADD KEY `A_CURSO` (`A_CURSO`);

--
-- Indices de la tabla `INSTITUTOS`
--
ALTER TABLE `INSTITUTOS`
  ADD PRIMARY KEY (`P_INSTITUTO`),
  ADD UNIQUE KEY `NOMBRE` (`NOMBRE`),
  ADD UNIQUE KEY `CIUDAD` (`CIUDAD`);

--
-- Indices de la tabla `NOTAS`
--
ALTER TABLE `NOTAS`
  ADD PRIMARY KEY (`P_NOTA`),
  ADD KEY `A_USUARIO` (`A_USUARIO`),
  ADD KEY `A_ASIGNATURA` (`A_ASIGNATURA`);

--
-- Indices de la tabla `PREGUNTAS`
--
ALTER TABLE `PREGUNTAS`
  ADD PRIMARY KEY (`P_PREGUNTA`),
  ADD KEY `A_TEMATICA` (`A_TEMATICA`);

--
-- Indices de la tabla `TEMATICA`
--
ALTER TABLE `TEMATICA`
  ADD PRIMARY KEY (`P_TEMATICA`),
  ADD UNIQUE KEY `NOMBRE` (`NOMBRE`);

--
-- Indices de la tabla `USUARIOS`
--
ALTER TABLE `USUARIOS`
  ADD PRIMARY KEY (`P_USUARIO`),
  ADD UNIQUE KEY `NOMBRE` (`NOMBRE`),
  ADD KEY `A_INSTCURS` (`A_INSTCURS`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ESTADISTICAS_GENERAL`
--
ALTER TABLE `ESTADISTICAS_GENERAL`
  MODIFY `P_ESTADISTICAS_GENERAL` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT de la tabla `ESTADISTICAS_USUARIO`
--
ALTER TABLE `ESTADISTICAS_USUARIO`
  MODIFY `P_ESTADISTICAS_USUARIO` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `NOTAS`
--
ALTER TABLE `NOTAS`
  MODIFY `P_NOTA` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `PREGUNTAS`
--
ALTER TABLE `PREGUNTAS`
  MODIFY `P_PREGUNTA` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT de la tabla `USUARIOS`
--
ALTER TABLE `USUARIOS`
  MODIFY `P_USUARIO` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ASIGNATURAS`
--
ALTER TABLE `ASIGNATURAS`
  ADD CONSTRAINT `ASIGNATURAS_ibfk_1` FOREIGN KEY (`A_CURSO`) REFERENCES `CURSOS` (`P_CURSO`) ON DELETE CASCADE,
  ADD CONSTRAINT `ASIGNATURAS_ibfk_2` FOREIGN KEY (`A_TEMATICA`) REFERENCES `TEMATICA` (`P_TEMATICA`) ON DELETE CASCADE;

--
-- Filtros para la tabla `ESTADISTICAS_GENERAL`
--
ALTER TABLE `ESTADISTICAS_GENERAL`
  ADD CONSTRAINT `ESTADISTICAS_GENERAL_ibfk_1` FOREIGN KEY (`A_TEMATICA`) REFERENCES `TEMATICA` (`P_TEMATICA`) ON DELETE CASCADE;

--
-- Filtros para la tabla `ESTADISTICAS_USUARIO`
--
ALTER TABLE `ESTADISTICAS_USUARIO`
  ADD CONSTRAINT `ESTADISTICAS_USUARIO_ibfk_1` FOREIGN KEY (`A_USUARIO`) REFERENCES `USUARIOS` (`P_USUARIO`) ON DELETE CASCADE,
  ADD CONSTRAINT `ESTADISTICAS_USUARIO_ibfk_2` FOREIGN KEY (`A_PREGUNTA`) REFERENCES `PREGUNTAS` (`P_PREGUNTA`) ON DELETE CASCADE;

--
-- Filtros para la tabla `INSTCURS`
--
ALTER TABLE `INSTCURS`
  ADD CONSTRAINT `INSTCURS_ibfk_1` FOREIGN KEY (`A_INSTITUTO`) REFERENCES `INSTITUTOS` (`P_INSTITUTO`) ON DELETE CASCADE,
  ADD CONSTRAINT `INSTCURS_ibfk_2` FOREIGN KEY (`A_CURSO`) REFERENCES `CURSOS` (`P_CURSO`) ON DELETE CASCADE;

--
-- Filtros para la tabla `NOTAS`
--
ALTER TABLE `NOTAS`
  ADD CONSTRAINT `NOTAS_ibfk_1` FOREIGN KEY (`A_USUARIO`) REFERENCES `USUARIOS` (`P_USUARIO`) ON DELETE CASCADE,
  ADD CONSTRAINT `NOTAS_ibfk_2` FOREIGN KEY (`A_ASIGNATURA`) REFERENCES `ASIGNATURAS` (`P_ASIGNATURA`) ON DELETE CASCADE;

--
-- Filtros para la tabla `PREGUNTAS`
--
ALTER TABLE `PREGUNTAS`
  ADD CONSTRAINT `PREGUNTAS_ibfk_1` FOREIGN KEY (`A_TEMATICA`) REFERENCES `TEMATICA` (`P_TEMATICA`) ON DELETE CASCADE;

--
-- Filtros para la tabla `USUARIOS`
--
ALTER TABLE `USUARIOS`
  ADD CONSTRAINT `USUARIOS_ibfk_1` FOREIGN KEY (`A_INSTCURS`) REFERENCES `INSTCURS` (`P_INSTCURS`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
