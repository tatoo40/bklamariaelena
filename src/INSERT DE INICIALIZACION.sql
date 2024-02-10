INSERT INTO numeradores VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','nro_trans',1);
INSERT INTO departamentos    
VALUES (1,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','Montevideo'),
		(2,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','Rivera'),
        (3,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','Canelones'),
		(4,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','Soriano'),
        (5,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','Lavalleja'),
		(6,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','Tacuarembo'),
        (7,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','Artigas'),
		(8,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','Salto'),
        (9,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','Paysandu'),
		(10,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','Rio Negro'),
        (11,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','Colonia'),
		(12,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','Maldonado'),
        (13,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','Rocha'),
		(14,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','Flores'),
        (15,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','Florida'),
		(16,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','Cerro Largo'),
        (17,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','Durazno'),
		(18,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','San Jose'),
        (19,'2023-06-01T19:20:30.451Z', 
		'2023-06-01T19:20:30.451Z','S','Treinta y Tres');

INSERT INTO empresas VALUES (0,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','No asignado',
'No asignado',11111111,'-','-','-','-'),
(1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','La Maria Elena SRL',
'La Maria Elena SRL',23232321312312,'Km28','nacho@gmail.com','09587288','Ninguna observacion');

INSERT INTO roles VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','Super-admin'),
(2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','Administrador'),
 (3,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','Reporte'),
  (4,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','Operario');

/*FaLTA insert de usuarios*/

INSERT INTO depositos VALUES (0,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','No asignado',
0,0,0,0,0,2,1,1),
(1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','Estancia la Maria Elena',
2000,2323232,-56,-32,1800,2,1,1),
(2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','Isabelita',
2000,2323232,-56,-32,1800,2,1,1),
(3,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','Pradera',
2000,2323232,-56,-32,1800,2,1,1);

INSERT INTO dicoses VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',3123123213,'La Maria Elena SRL');

INSERT INTO estados_ganado VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Propio'),
 (2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Ajeno');

INSERT INTO estados_stock VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Existencias','S'),
 (2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Muerto','S');

INSERT INTO tipos_ganado VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Vacuno'),
 (2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Ovino'),
(3,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Equino');

INSERT INTO marcas_ganado VALUES (0,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Cruza',1),
(1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Hereford',1),
 (2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Bradford',1),
(3,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Jersey',1);

INSERT INTO tipos_mov_stock VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Entrada', 1),
 (2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Salida', -1);
 
INSERT INTO motivos_mov_stock VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Compra de ganado','cmpGanado',1),
 (2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Venta de ganado','vtaGanado',2),
(3,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Ajuste de stock en alta','ajustkA',1),
(4,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Nacimiento','ajustkA',1);


INSERT INTO motivos_sanitarios VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Vacuna aftosa'),
 (2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Vacuna otro');

INSERT INTO propiedad_ganado VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Propio'),
 (2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Ajeno');


INSERT INTO categorias_ganado VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Novillo 1-2 anios', 1),
 (2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Novillos 2-3 aniios',1);

INSERT INTO tipos_toma_peso VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Real'),
 (2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Promedio total kg'),
  (3,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Promedio por muestra');


INSERT INTO unidades_stock VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Unidad','Un.'),
 (2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Kilogramo','Kg.');



INSERT INTO tipo_articulo VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Producto termninado'),
 (2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Insumos'),
(3,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Servicios');

INSERT INTO articulos VALUES 
(1, 'NOVHER12A', '2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S', 'Novillo de 1-2 anios Hereford',1,1,1,1,1),
(2, 'SERCOMIS1', '2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S', 'Servicio comision 1%',1,1,1,1,3);


INSERT INTO monedas VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','Peso uruguayo', '$'),
 (2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','Dolares americanos', 'U$S');

INSERT INTO tipo_cambio_diario VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S',40,'2023-06-28T19:20:30.451Z',1);


INSERT INTO tipos_costeo VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','Ultima compra');


INSERT INTO tipos_titulares VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','Cliente'),
(2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','Proveedor'),
(3,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','Cliente y proveedor');

INSERT INTO categorias_cliente VALUES (0,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','No asignado'),
(1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','Frigorifico'),
(2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','Particular');


INSERT INTO categorias_prov VALUES (0,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','No asignado'),
(1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','Consignatario'),
(2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S','Transportista');


INSERT INTO titulares VALUES (1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z',1,'S',
'Zambrano','Zambrano SA','23232323232','Gral Narino 2322', 'info@zambrano.com.uy','','Agustin Zambrano','59895872288',1,1,0);

INSERT INTO articulos_x_titular VALUES (1,'SERCOMIS1', '2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',2, 1);


INSERT INTO acciones VALUES (0,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',1,'No asignado'),
(1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',1,'Alta'),
(2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',1,'Baja'),
(3,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',1,'Editar'),
(4,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',1,'Visualizar');

INSERT INTO secciones VALUES (0,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',1,'No asignado','No asignado','No asignado',0, false);


INSERT INTO control_trans VALUES (0,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',1,'No asignado','No asignado',false,'No asignado',1),
(1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',1,'NoRegIgualFecha',
'No se permite en la misma seccion 2 registros con la misma fecha',false,'Se ha encontrado un error. Usted ya tiene un registro para la fecha de hoy',1),
(2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',1,'RegYaUtilizadoContabilidad','Registro ya utilizado en otras secciones',false
,'Se ha encontrado un error. Este registro ya se ha utilizado en transacciones posteriores',1);


INSERT INTO controles_x_seccion_accion VALUES (0,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',1,68,0,0,'No asignado',1,''),
(1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',1,68,1,1,'',1,''),
(2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',1,68,2,2,'',1,''),
(3,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',1,68,3,2,'',1,''),
(4,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',1,68,3,2,'',3,'fecha');





///////USUARIO//////////

INSERT INTO usuarios_x_empresas VALUES (1,1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S'),
INSERT INTO usuarios_x_empresas VALUES (2,1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S');


//id_usuario, id_seccion, id_accion, id_mod
INSERT INTO permisos_x_usuario_seccion VALUES (0,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',1,1,1,1),
(1,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',1,68,2,1),
(2,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',1,68,3,1),
(3,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',1,68,4,1),
(4,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',2,68,1,1),
(5,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',2,68,2,1),
(6,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',2,68,3,1),
(7,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S',2,68,4,1);




////OPERATIVAS

INSERT INTO cpf_log VALUES (0,'2023-06-01T19:20:30.451Z', '2023-06-01T19:20:30.451Z','S','Alta de tipo de cambio', '2023-06-01T19:20:30.451Z',1,0,1,1);


///INSERCCIONES MASIVAS
INSERT INTO secciones 
SELECT  nextval('secciones_id_seq'::regclass) ,'2023-06-01 19:20:30.451','2023-06-01 19:20:30.451','S',1,INITCAP(pg_catalog.pg_tables.tablename), tablename,INITCAP(pg_catalog.pg_tables.tablename),0,false
FROM pg_catalog.pg_tables, tipo_cambio_diario
WHERE schemaname != 'pg_catalog' AND 
    schemaname != 'information_schema' AND tablename != '_prisma_migrations' AND tablename != 'bookmarks'



//PERMISOS PARA EL USUARIO ADMIN
INSERT INTO permisos_x_usuario_seccion 
SELECT  nextval('permisos_x_usuario_seccion_id_seq'::regclass) ,'2023-06-01 19:20:30.451','2023-06-01 19:20:30.451','S',
usuarios.id id_usuario,secciones.id id_seccion, acciones.id id_accion ,usuarios.id id_mod
FROM secciones, usuarios, acciones
WHERE acciones.id!=0



// Estan definidos los permisos para los disttintos roles.
// Se hizo un producto cartesiano por lo que ahora todo los roles pueden ver y hacer todo
insert into permisos_x_rol_seccion
SELECT  nextval('permisos_x_usuario_seccion_id_seq'::regclass) ,'2023-06-01 19:20:30.451','2023-06-01 19:20:30.451','S',
1 id_mod,secciones.id id_seccion, acciones.id id_accion, roles.id id_rol 
FROM secciones, roles, acciones
WHERE acciones.id!=0	




////////////CONSULTAS PARA REPORTES
//consulta de bichos por identidad
SELECT f.cod_articulo, a.nombre, f.nro_lote, f.cod_identidad, SUM(f.cantidad*f.signo) Un, 
SUM(f.cantidad2*f.signo) Kilos 
FROM cpf_stockaux f, articulos a
WHERE f.cod_articulo = a.cod_articulo
AND f.id_empresa=1 AND f.id_deposito=1
AND f.id_estado_stock=1
GROUP BY f.cod_articulo, f.nro_lote, f.cod_identidad, a.nombre


//consulta de bichos por articulo
SELECT f.cod_articulo, a.nombre, f.nro_lote, SUM(f.cantidad*f.signo) Un, 
SUM(f.cantidad2*f.signo) Kilos 
FROM cpf_stockaux f, articulos a
WHERE f.cod_articulo = a.cod_articulo
AND f.id_empresa=1 AND f.id_deposito=1
AND f.id_estado_stock=1
GROUP BY f.cod_articulo, f.nro_lote, a.nombre


//consulta cantidad total de bichos y kilos total
SELECT f.nro_lote, SUM(f.cantidad*f.signo) Un, 
SUM(f.cantidad2*f.signo) Kilos 
FROM cpf_stockaux f, articulos a
WHERE f.cod_articulo = a.cod_articulo
AND f.id_empresa=1 AND f.id_deposito=1
AND f.id_estado_stock=1
GROUP BY f.nro_lote




INSERT INTO articulos
SELECT  nextval('articulos_id_seq'::regclass) , CONCAT(cc.abreviacion, m.abreviacion), '2023-08-25 00:00:00.555','2023-08-25 00:00:00.555','S',
CONCAT(cc.descripcion,' ',m.descripcion), 1, cc.id,m.id,1,1,0,0,2,2,1
FROM categorias_ganado cc, marcas_ganado m
WHERE cc.id<>0 

	
	delete  from cpt_movimiento_stock;	
	delete from cpp_movimiento_stock;
	delete from cpf_contaux;
	delete from cpf_costos;
	delete from cpf_log;
	delete from cpp_fact_prov;
	delete from cpt_fact_prov;
	delete from cpt_facturas;
	delete from cpp_registro_sanitario;
	delete from cpt_registro_sanitario;