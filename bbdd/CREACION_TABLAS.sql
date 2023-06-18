--
-- Estructura de tabla para la tabla `asuntos_citas`
--

CREATE TABLE `asuntos_citas` (
     `id_asunto` int(11) NOT NULL,
     `asunto` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Estructura de tabla para la tabla `asuntos_formulario_contacto`
--

CREATE TABLE `asuntos_formulario_contacto` (
   `id_asunto_formulario_contacto` int(11) NOT NULL,
   `asunto_formulario_contacto` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
 `id_cita` int(11) NOT NULL,
 `id_cliente` int(11) NOT NULL,
 `fecha_cita` varchar(10) NOT NULL,
 `hora_cita` time NOT NULL,
 `estado` int(11) NOT NULL,
 `direccion_cita` varchar(200) NOT NULL,
 `productos` int(11) NOT NULL,
 `asunto` int(11) NOT NULL,
 `anotaciones` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
    `id_cliente` int(11) NOT NULL,
    `id_usuario` int(11) NOT NULL,
    `nombre` varchar(30) NOT NULL,
    `apellidos` varchar(30) NOT NULL,
    `email` varchar(30) NOT NULL,
    `direccion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Estructura de tabla para la tabla `consultas`
--

CREATE TABLE `consultas` (
     `id_consulta` int(11) NOT NULL,
     `id_usuario` int(11) NOT NULL,
     `estado_consulta` int(30) NOT NULL,
     `asunto` int(11) NOT NULL,
     `email` varchar(30) NOT NULL,
     `mensaje` text NOT NULL,
     `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Estructura de tabla para la tabla `estados_cita`
--

CREATE TABLE `estados_cita` (
        `id_estado_cita` int(11) NOT NULL,
        `estado_cita` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Estructura de tabla para la tabla `estado_consulta`
--

CREATE TABLE `estado_consulta` (
           `id_estado_consulta` int(11) NOT NULL,
           `estado_consulta` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Estructura de tabla para la tabla `huertos`
--

CREATE TABLE `huertos` (
   `id_huerto` int(11) NOT NULL,
   `id_cliente` int(11) NOT NULL,
   `nombre_huerto` varchar(30) NOT NULL,
   `ubicacion` varchar(100) NOT NULL,
   `imagen` longblob NOT NULL,
   `fecha_instalacion` date NOT NULL,
   `notas` varchar(1000) NOT NULL,
   `ancho` int(11) NOT NULL,
   `largo` int(11) NOT NULL,
   `alto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Estructura de tabla para la tabla `mediciones`
--

CREATE TABLE `mediciones` (
      `id_medicion` int(11) NOT NULL,
      `id_huerto` int(11) NOT NULL,
      `fecha_medicion` date NOT NULL,
      `hora_medicion` time(6) NOT NULL,
      `medicion_salinidad` int(11) NOT NULL,
      `medicion_humedad` int(11) NOT NULL,
      `medicion_luminosidad` int(11) NOT NULL,
      `medicion_ph` int(11) NOT NULL,
      `medicion_temperatura` float(50,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
          `id_notificaciones` int(11) NOT NULL,
          `id_huerto` int(10) NOT NULL,
          `notificaciones` tinyint(1) NOT NULL,
          `medicion_min_salinidad` int(11) NOT NULL,
          `medicion_max_salinidad` int(11) NOT NULL,
          `medicion_min_humedad` int(11) NOT NULL,
          `medicion_max_humedad` int(11) NOT NULL,
          `medicion_min_luminosidad` int(11) NOT NULL,
          `mediciones_continuas_minimos` int(11) NOT NULL DEFAULT '4',
          `medicion_max_luminosidad` int(11) NOT NULL,
          `mediciones_continuas_maximos` int(11) NOT NULL DEFAULT '4',
          `medicion_min_ph` int(11) NOT NULL,
          `medicion_max_ph` int(11) NOT NULL,
          `medicion_min_temperatura` int(11) NOT NULL,
          `medicion_max_temperatura` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Estructura de tabla para la tabla `opiniones`
--

CREATE TABLE `opiniones` (
     `id_opinion` int(11) NOT NULL,
     `id_cliente` int(11) NOT NULL,
     `id_personal` int(11) NOT NULL,
     `clasificacion_opinion` int(11) NOT NULL,
     `mensaje_opinion` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
     `id_producto` int(11) NOT NULL,
     `nombre_producto` varchar(50) NOT NULL,
     `descripcion_producto` varchar(250) NOT NULL,
     `precio` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
 `id` int(11) NOT NULL,
 `rol` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
    `id_usuario` int(11) NOT NULL,
    `nombre` varchar(20) NOT NULL,
    `password` varchar(30) NOT NULL,
    `rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `productos` int(11) NOT NULL,
  `fecha` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asuntos_citas`
--
ALTER TABLE `asuntos_citas`
ADD PRIMARY KEY (`id_asunto`),
ADD KEY `fk_asunto` (`asunto`);

--
-- Indices de la tabla `asuntos_formulario_contacto`
--
ALTER TABLE `asuntos_formulario_contacto`
ADD PRIMARY KEY (`id_asunto_formulario_contacto`),
ADD KEY `fk_asunto_consulta` (`asunto_formulario_contacto`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
ADD PRIMARY KEY (`id_cita`),
ADD KEY `fk_productos` (`productos`),
ADD KEY `fk_estado_cita` (`estado`),
ADD KEY `fk_asunto_cita` (`asunto`),
ADD KEY `fk_id_cliente_consulta` (`id_cliente`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
ADD PRIMARY KEY (`id_cliente`),
ADD UNIQUE KEY `fk_email` (`email`),
ADD KEY `fk_id_usuario_a_id_usuario` (`id_usuario`);

--
-- Indices de la tabla `consultas`
--
ALTER TABLE `consultas`
ADD PRIMARY KEY (`id_consulta`),
ADD KEY `fk_id_usuario_consulta` (`id_usuario`),
ADD KEY `fk_estado_consulta` (`estado_consulta`),
ADD KEY `fk_asunto_consulta` (`asunto`);

--
-- Indices de la tabla `estados_cita`
--
ALTER TABLE `estados_cita`
ADD PRIMARY KEY (`id_estado_cita`);

--
-- Indices de la tabla `estado_consulta`
--
ALTER TABLE `estado_consulta`
ADD PRIMARY KEY (`id_estado_consulta`);

--
-- Indices de la tabla `huertos`
--
ALTER TABLE `huertos`
ADD PRIMARY KEY (`id_huerto`),
ADD KEY `fk_id_cliente_a_id_cliente` (`id_cliente`),
ADD KEY `fk_ubicacion` (`ubicacion`);

--
-- Indices de la tabla `mediciones`
--
ALTER TABLE `mediciones`
ADD PRIMARY KEY (`id_medicion`),
ADD KEY `fk_huerto_mediciones` (`id_huerto`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
ADD UNIQUE KEY `id_sonda` (`id_notificaciones`) USING BTREE,
ADD KEY `fk_huerto_notificaciones` (`id_huerto`);

--
-- Indices de la tabla `opiniones`
--
ALTER TABLE `opiniones`
ADD PRIMARY KEY (`id_opinion`),
ADD KEY `fk_id_usuario_tecnico` (`id_personal`),
ADD KEY `fk_id_cliente` (`id_cliente`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
ADD PRIMARY KEY (`id_producto`),
ADD UNIQUE KEY `fk_nombre_producto` (`nombre_producto`),
ADD UNIQUE KEY `fk_descripcion_producto` (`descripcion_producto`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
ADD PRIMARY KEY (`id_usuario`),
ADD KEY `fk_usuarios_rol` (`rol`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
ADD PRIMARY KEY (`id_venta`),
ADD KEY `fk_id_cliente_ventas` (`id_cliente`),
ADD KEY `fk_producto` (`productos`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asuntos_citas`
--
ALTER TABLE `asuntos_citas`
MODIFY `id_asunto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `asuntos_formulario_contacto`
--
ALTER TABLE `asuntos_formulario_contacto`
MODIFY `id_asunto_formulario_contacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
MODIFY `id_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT de la tabla `consultas`
--
ALTER TABLE `consultas`
MODIFY `id_consulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `estado_consulta`
--
ALTER TABLE `estado_consulta`
MODIFY `id_estado_consulta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `mediciones`
--
ALTER TABLE `mediciones`
MODIFY `id_medicion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4051;

--
-- AUTO_INCREMENT de la tabla `opiniones`
--
ALTER TABLE `opiniones`
MODIFY `id_opinion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
ADD CONSTRAINT `fk_asunto_cita` FOREIGN KEY (`asunto`) REFERENCES `asuntos_citas` (`id_asunto`),
ADD CONSTRAINT `fk_estado_cita` FOREIGN KEY (`estado`) REFERENCES `estados_cita` (`id_estado_cita`),
ADD CONSTRAINT `fk_id_cliente_consulta` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
ADD CONSTRAINT `fk_productos` FOREIGN KEY (`productos`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
ADD CONSTRAINT `fk_id_usuario_a_id_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `consultas`
--
ALTER TABLE `consultas`
ADD CONSTRAINT `fk_asunto_consulta` FOREIGN KEY (`asunto`) REFERENCES `asuntos_formulario_contacto` (`id_asunto_formulario_contacto`),
ADD CONSTRAINT `fk_estado_consulta` FOREIGN KEY (`estado_consulta`) REFERENCES `estado_consulta` (`id_estado_consulta`),
ADD CONSTRAINT `fk_id_usuario_consulta` FOREIGN KEY (`id_usuario`) REFERENCES `clientes` (`id_cliente`);

--
-- Filtros para la tabla `huertos`
--
ALTER TABLE `huertos`
ADD CONSTRAINT `fk_id_cliente_a_id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`);

--
-- Filtros para la tabla `mediciones`
--
ALTER TABLE `mediciones`
ADD CONSTRAINT `fk_huerto_mediciones` FOREIGN KEY (`id_huerto`) REFERENCES `huertos` (`id_huerto`);

--
-- Filtros para la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
ADD CONSTRAINT `fk_huerto_notificaciones` FOREIGN KEY (`id_huerto`) REFERENCES `huertos` (`id_huerto`);

--
-- Filtros para la tabla `opiniones`
--
ALTER TABLE `opiniones`
ADD CONSTRAINT `fk_id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `usuarios` (`id_usuario`),
ADD CONSTRAINT `fk_id_usuario_tecnico` FOREIGN KEY (`id_personal`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
ADD CONSTRAINT `fk_id_cliente_ventas` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
ADD CONSTRAINT `fk_producto` FOREIGN KEY (`productos`) REFERENCES `productos` (`id_producto`);
COMMIT;
