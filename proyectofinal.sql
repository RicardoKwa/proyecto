-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-06-2022 a las 18:34:15
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectofinal`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caracteristicas_piso`
--

CREATE TABLE `caracteristicas_piso` (
  `id_car` bigint(20) NOT NULL,
  `num_banos` int(11) NOT NULL,
  `num_hab` int(11) NOT NULL,
  `television` bit(1) NOT NULL,
  `amueblado` bit(1) NOT NULL,
  `llave_dormitorio` bit(1) NOT NULL,
  `calefaccion` bit(1) NOT NULL,
  `ascensor` bit(1) NOT NULL,
  `aire_acond` bit(1) NOT NULL,
  `exterior` bit(1) NOT NULL,
  `garaje` bit(1) NOT NULL,
  `lavadora` bit(1) NOT NULL,
  `internet` bit(1) NOT NULL,
  `playa` bit(1) NOT NULL,
  `cocina_equipada` bit(1) NOT NULL,
  `luminoso` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `caracteristicas_piso`
--

INSERT INTO `caracteristicas_piso` (`id_car`, `num_banos`, `num_hab`, `television`, `amueblado`, `llave_dormitorio`, `calefaccion`, `ascensor`, `aire_acond`, `exterior`, `garaje`, `lavadora`, `internet`, `playa`, `cocina_equipada`, `luminoso`) VALUES
(1, 2, 4, b'1', b'1', b'1', b'1', b'1', b'1', b'1', b'1', b'1', b'1', b'0', b'1', b'1'),
(2, 1, 2, b'1', b'0', b'1', b'0', b'0', b'1', b'0', b'1', b'0', b'1', b'0', b'1', b'1'),
(3, 2, 4, b'1', b'1', b'1', b'1', b'1', b'1', b'1', b'1', b'1', b'1', b'1', b'1', b'1'),
(4, 1, 2, b'1', b'0', b'1', b'0', b'0', b'1', b'1', b'1', b'0', b'1', b'1', b'1', b'1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad`
--

CREATE TABLE `ciudad` (
  `id_ciudad` bigint(20) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ciudad`
--

INSERT INTO `ciudad` (`id_ciudad`, `nombre`) VALUES
(1, 'Madrid'),
(2, 'Barcelona'),
(3, 'Valencia'),
(4, 'Sevilla'),
(5, 'Bilbao'),
(6, 'Mallorca');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conjunto_reglas`
--

CREATE TABLE `conjunto_reglas` (
  `id_reg` bigint(20) NOT NULL,
  `parejas` bit(1) DEFAULT b'0',
  `mascotas` bit(1) DEFAULT b'0',
  `fiestas` bit(1) DEFAULT b'0',
  `fumar` bit(1) DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `conjunto_reglas`
--

INSERT INTO `conjunto_reglas` (`id_reg`, `parejas`, `mascotas`, `fiestas`, `fumar`) VALUES
(1, b'1', b'1', b'1', b'1'),
(2, b'0', b'0', b'0', b'0'),
(3, b'1', b'1', b'0', b'0'),
(4, b'0', b'0', b'1', b'1'),
(5, b'0', b'1', b'0', b'0'),
(6, b'1', b'0', b'0', b'0'),
(7, b'0', b'1', b'1', b'0'),
(8, b'1', b'0', b'0', b'1'),
(9, b'1', b'0', b'1', b'0'),
(10, b'0', b'1', b'0', b'1'),
(11, b'0', b'0', b'1', b'0'),
(12, b'0', b'0', b'0', b'1'),
(13, b'1', b'1', b'1', b'0'),
(14, b'0', b'1', b'1', b'1'),
(15, b'1', b'0', b'1', b'1'),
(16, b'1', b'1', b'0', b'1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estancia`
--

CREATE TABLE `estancia` (
  `id_est` bigint(20) NOT NULL,
  `tipo_est` enum('piso','habitacion') NOT NULL,
  `precio_mes` float NOT NULL,
  `fianza` float NOT NULL,
  `id_ciudad` bigint(20) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `id_reg` bigint(20) DEFAULT 1,
  `id_img` bigint(20) NOT NULL,
  `id_car` bigint(20) DEFAULT 1,
  `longitud` double DEFAULT NULL,
  `latitud` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estancia`
--

INSERT INTO `estancia` (`id_est`, `tipo_est`, `precio_mes`, `fianza`, `id_ciudad`, `direccion`, `id_reg`, `id_img`, `id_car`, `longitud`, `latitud`) VALUES
(1, 'piso', 1000, 1200, 1, 'C/Abanca,Las Rozas', 10, 1, 1, -3.87371, 40.49292),
(29, 'piso', 800, 850, 1, 'C/Santander,Las Rozas', 2, 2, 1, -3.87371, 40.49292),
(30, 'habitacion', 450, 550, 1, 'C/Real,Las Rozas', 5, 3, 1, -3.87371, 40.49292),
(31, 'habitacion', 750, 700, 1, 'C/Pinos,Somosaguas', 5, 9, 1, -3.87371, 40.4221),
(32, 'piso', 600, 650, 1, 'C/Pinos,Somosaguas', 5, 4, 2, -3.87371, 40.4221),
(33, 'piso', 690, 650, 1, 'C/Goya,Madrid', 8, 6, 1, -4.012115, 40.6294252),
(35, 'piso', 1000, 1200, 2, 'C/Ulises', 10, 1, 1, -3.87371, 40.49292),
(36, 'habitacion', 600, 600, 2, 'C/Granollers', 10, 10, 1, 2.16992, 41.3879),
(37, 'habitacion', 600, 600, 2, 'C/Palau', 10, 2, 1, 2.16992, 41.3879),
(38, 'piso', 600, 600, 2, 'C/Domingo', 14, 6, 4, 2.16992, 41.3879),
(39, 'piso', 800, 800, 2, 'C/Lluis', 3, 7, 4, 2.16992, 41.3879),
(40, 'piso', 400, 400, 2, 'C/Sant Jordi', 3, 3, 3, 2.16992, 41.3879),
(41, 'piso', 400, 400, 3, 'C/Sant Palau', 3, 3, 3, -0.376805, 39.4702),
(42, 'habitacion', 600, 600, 3, 'C/Turia', 10, 10, 1, -0.376805, 39.4702),
(43, 'habitacion', 300, 300, 3, 'C/Jordi', 10, 11, 1, -0.376805, 39.4702),
(44, 'piso', 400, 400, 4, 'C/Morena', 3, 7, 2, -5.99629, 37.3826),
(45, 'piso', 600, 600, 4, 'C/Clara', 2, 2, 1, -5.99629, 37.3826),
(46, 'habitacion', 600, 600, 4, 'C/Juana', 3, 7, 2, -5.99629, 37.3826),
(47, 'piso', 500, 500, 5, 'C/Extxebarria', 3, 4, 2, -2.92344, 43.257),
(48, 'piso', 500, 500, 5, 'C/Patxi', 3, 6, 2, -2.92344, 43.257),
(50, 'piso', 800, 800, 6, 'C/Canut', 3, 7, 4, 2.16992, 39.5695),
(51, 'piso', 900, 900, 6, 'C/Alemania', 9, 6, 4, 2.16992, 39.5695);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `principal` varchar(100) NOT NULL,
  `swip1` varchar(100) NOT NULL,
  `swip2` varchar(100) NOT NULL,
  `swip3` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `nombre`, `principal`, `swip1`, `swip2`, `swip3`) VALUES
(1, 'piso1', 'images/proyecto/pisos/MADRID/LASROZAS/ROZAS3.png', 'images/proyecto/pisos/MADRID/LASROZAS/ROZAS1.png', 'images/proyecto/pisos/MADRID/LASROZAS/ROZAS2.png', 'images/proyecto/pisos/MADRID/LASROZAS/ROZAS4.png'),
(2, 'piso2', 'images/proyecto/pisos/MADRID/LASROZAS/ROZAS8.png', 'images/proyecto/pisos/MADRID/LASROZAS/ROZAS9.png', 'images/proyecto/pisos/MADRID/LASROZAS/ROZAS10.png', 'images/proyecto/pisos/MADRID/LASROZAS/ROZAS11.png'),
(3, 'piso3', 'images/proyecto/pisos/MADRID/LASROZAS/ROZAS5.png', 'images/proyecto/pisos/MADRID/LASROZAS/ROZAS6.png', 'images/proyecto/pisos/MADRID/LASROZAS/ROZAS7.png', 'images/proyecto/pisos/MADRID/LASROZAS/ROZAS8.png'),
(4, 'piso4', 'images/proyecto/pisos/MADRID/LASROZAS/ROZASPORTADA.png', 'images/proyecto/pisos/MADRID/LASROZAS/ROZAS10.png', 'images/proyecto/pisos/MADRID/LASROZAS/ROZAS11.png', 'images/proyecto/pisos/MADRID/LASROZAS/ROZAS5.png'),
(6, 'piso5', 'images/proyecto/pisos/MADRID/CENTROMADRID/CENTROMADRID1.png', 'images/proyecto/pisos/MADRID/CENTROMADRID/CENTROMADRID2.png', 'images/proyecto/pisos/MADRID/CENTROMADRID/CENTROMADRID3.png', 'images/proyecto/pisos/MADRID/CENTROMADRID/CENTROMADRID4.png'),
(7, 'piso6', 'images/proyecto/pisos/MADRID/BarrioSalamanca.jpg', 'images/proyecto/pisos/MADRID/CENTROMADRID/CENTROMADRID2.png', 'images/proyecto/pisos/MADRID/CENTROMADRID/CENTROMADRID3.png', 'images/proyecto/pisos/MADRID/CENTROMADRID/CENTROMADRID4.png'),
(9, 'piso7', 'images/proyecto/pisos/MADRID/SOMOSAGUAS/SOMOSAGUAS4.png', 'images/proyecto/pisos/MADRID/SOMOSAGUAS/SOMOSAGUAS5.png', 'images/proyecto/pisos/MADRID/SOMOSAGUAS/SOMOSAGUAS6.png', 'images/proyecto/pisos/MADRID/SOMOSAGUAS/SOMOSAGUAS7.png'),
(10, 'piso8', 'images/proyecto/pisos/MADRID/SOMOSAGUAS/SOMOSAGUAS3.png', 'images/proyecto/pisos/MADRID/SOMOSAGUAS/SOMOSAGUAS2.png', 'images/proyecto/pisos/MADRID/SOMOSAGUAS/SOMOSAGUAS5.png', 'images/proyecto/pisos/MADRID/SOMOSAGUAS/SOMOSAGUAS7.png'),
(11, 'piso9', 'images/proyecto/pisos/MADRID/JacintoBenavente.jpg', 'images/proyecto/pisos/MADRID/LASROZAS/ROZAS6.png', 'images/proyecto/pisos/MADRID/LASROZAS/ROZAS7.png', 'images/proyecto/pisos/MADRID/LASROZAS/ROZAS8.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id_res` bigint(20) NOT NULL,
  `precio_alquiler` float NOT NULL,
  `id_cliente` bigint(20) NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_final` date DEFAULT NULL,
  `numero_cuenta` varchar(20) NOT NULL,
  `id_est` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`id_res`, `precio_alquiler`, `id_cliente`, `fecha_inicio`, `fecha_final`, `numero_cuenta`, `id_est`) VALUES
(12, 200, 9, '2022-06-08', '2022-08-26', '6573-4543-3423-4243', 29),
(13, 200, 9, '2022-06-08', '2022-08-26', '6573-4543-3423-4243', 32);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `p_apellido` varchar(100) NOT NULL,
  `s_apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'ROLE_USER' CHECK (json_valid(`roles`)),
  `Telefono` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `nombre`, `p_apellido`, `s_apellido`, `email`, `password`, `roles`, `Telefono`) VALUES
(8, 'Admin', 'Domus', 'Student', 'administrador@Domus.com', '$2y$13$f5UqTRZIMdTEUcKP3aF9oOxK2LOQtOUejideZPnDPDGaOvSmsVvwC', '[\"ROLE_ADMIN\"]', NULL),
(9, 'Ricardo', 'Kwpisz', 'Parejo', 'ric1@gmail.com', '$2y$13$hvGVatGFihOBqEJcFnqLT.lnOrx2vHl5azA3nL0zYnBcKdsRj38mS', '[\"ROLE_USER\"]', '(657) 566 5756'),
(10, 'Paco', 'Gomez', 'Alonso', 'paco@gmail.com', '$2y$13$oIcU2B/iNWZk1E6smLjuGeXPmBriorCr4XHnZV9ummljQspAsYHNi', '[\"ROLE_USER\"]', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `caracteristicas_piso`
--
ALTER TABLE `caracteristicas_piso`
  ADD PRIMARY KEY (`id_car`);

--
-- Indices de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD PRIMARY KEY (`id_ciudad`);

--
-- Indices de la tabla `conjunto_reglas`
--
ALTER TABLE `conjunto_reglas`
  ADD PRIMARY KEY (`id_reg`);

--
-- Indices de la tabla `estancia`
--
ALTER TABLE `estancia`
  ADD PRIMARY KEY (`id_est`),
  ADD KEY `id_ciudad` (`id_ciudad`),
  ADD KEY `id_reg` (`id_reg`),
  ADD KEY `id_img` (`id_img`),
  ADD KEY `id_car` (`id_car`);

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id_res`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_est` (`id_est`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `caracteristicas_piso`
--
ALTER TABLE `caracteristicas_piso`
  MODIFY `id_car` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  MODIFY `id_ciudad` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `conjunto_reglas`
--
ALTER TABLE `conjunto_reglas`
  MODIFY `id_reg` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `estancia`
--
ALTER TABLE `estancia`
  MODIFY `id_est` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id_res` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `estancia`
--
ALTER TABLE `estancia`
  ADD CONSTRAINT `id_car` FOREIGN KEY (`id_car`) REFERENCES `caracteristicas_piso` (`id_car`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_ciudad` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad` (`id_ciudad`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_img` FOREIGN KEY (`id_img`) REFERENCES `imagenes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `id_reg` FOREIGN KEY (`id_reg`) REFERENCES `conjunto_reglas` (`id_reg`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `id_est` FOREIGN KEY (`id_est`) REFERENCES `estancia` (`id_est`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
