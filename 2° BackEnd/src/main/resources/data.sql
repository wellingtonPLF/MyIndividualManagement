DO 
'
BEGIN
	IF NOT EXISTS (SELECT idjanela FROM janela WHERE idjanela = 1) THEN
		insert into janela values (1, null, ''MySpace'', ''Janela'', 0, null, null);
		insert into subarea values (1, 1, ''Main'', ''Subarea'', 0, ''casual'',1);
		insert into ocupacao values (1, ''Gerais'', ''Ocupacao'', 0, 1);
		insert into classe values (1, null, null, ''All'', ''Classe'', null, 0, null, null, null, 1);
		insert into template values (1, ''Default'', ''Template'', 1);
	END IF;
	
	IF NOT EXISTS (SELECT idjanela FROM janela WHERE idjanela = 2) THEN
		insert into janela values (2, null, ''Planning'', ''Janela'', 0, null, null);
		insert into subarea values (2, 1, ''Main'', ''Subarea'', 0, ''casual'',2);
		insert into ocupacao values (2, ''Ocupation'', ''Ocupacao'', 0, 2);
		insert into classe values (2, null, null,''Anything'', ''Classe'', null, 0, null, null, null, 2);
		
		insert into subarea values (3, 2, ''Diarias'', ''Subarea'', 0, ''casual'',2);
		insert into ocupacao values (3, ''Ocupation'', ''Ocupacao'', 0, 3);
		insert into classe values (3, null, null,''Tarefas Diárias'', ''Classe'', null, 0, ''easy'', null, null, 3);
		
		insert into subarea values (4, 2, ''Lengthy'', ''Subarea'', 0, ''projeto'', 2);
		insert into ocupacao values (4, ''Ocupation'', ''Ocupacao'', 0, 4);
		insert into classe values (4, null, null,''Tarefas Extremas'', ''Classe'', null, 0, ''extreme'', null, null, 4);
		
		insert into subarea values (5, 2, ''Gerais'', ''Subarea'', 0, ''casual'', 2);
		insert into ocupacao values (5, ''Ocupation'', ''Ocupacao'', 0, 5);
		insert into classe values (5, null, null,''Tarefas Gerais'', ''Classe'', null, 0, ''easy'', null, null, 5);
		insert into template values (2, ''To Do List'', ''Template'', 2);
	END IF;
	
	IF NOT EXISTS (SELECT idjanela FROM janela WHERE idjanela = 3) THEN
		insert into janela values (3, null, ''Execution'', ''Janela'', 0, null, null);
		insert into subarea values (6, 3, ''Result'', ''Subarea'', 0, ''show'', 3);
		insert into ocupacao values (6, ''Ocupation'', ''Ocupacao'', 0, 6);
		insert into classe values (6, null, null, ''Minhas Tarefas'', ''Classe'', null, 0, null, null, null, 6);
		
		insert into ocupacao values (7, ''Ocupation'', ''Ocupacao'', 1, 6);
		insert into classe values (7, null, null, ''Pendentes'', ''Classe'', null, 0, null, null, null, 7);
		
		insert into ocupacao values (8, ''Ocupation'', ''Ocupacao'', 2, 6);
		insert into classe values (8, null, null, ''Indefinidos'', ''Classe'', null, 0, null, null, null, 8);
		insert into template values (3, ''Do List'', ''Template'', 3);
	END IF;
END
'  LANGUAGE PLPGSQL;

DO 
'
BEGIN
	IF NOT EXISTS (SELECT role_id FROM roles WHERE role_id = 1) THEN
		INSERT INTO roles(role_id, role_name)
		VALUES (1, ''ROLE_ADMIN'');
	END IF;
	
	IF NOT EXISTS (SELECT role_id FROM roles WHERE role_id = 2) THEN
		INSERT INTO roles(role_id, role_name)
		VALUES (2, ''ROLE_USER'');	
	END IF;
	
	IF NOT EXISTS (SELECT user_id FROM usuario WHERE user_id = 1) THEN
		INSERT INTO usuario(user_id, nome, email, borndate)
		VALUES (1, ''Wellington'', ''well@gmail.com'', ''2023-01-01'');	
	END IF;
		
	IF NOT EXISTS (SELECT user_id FROM usuario WHERE user_id = 2) THEN
		INSERT INTO usuario(user_id, nome, email, borndate)
		VALUES (2, ''Larissa'', ''lara@gmail.com'', ''2022-03-18'');	
	END IF;
	
	IF NOT EXISTS (SELECT user_id FROM usuario WHERE user_id = 3) THEN
		INSERT INTO usuario(user_id, nome, email, borndate)
		VALUES (3, ''John Wick'', ''john@gmail.com'', ''2020-06-25'');	
	END IF;
	
	IF NOT EXISTS (SELECT auth_id FROM auth WHERE auth_id = 1) THEN
		INSERT INTO auth(auth_id, username, password, user_id)
		VALUES (1, ''wellington'', 
		''{bcrypt}$2a$10$dQWjpRaxiORPCqh4hEQVW.Ka.FkRLdzEvoSPJ26pQ6I7Fqo4wrDzG'', 1);	
	END IF;
	
	IF NOT EXISTS (SELECT auth_id FROM auth WHERE auth_id = 2) THEN
		INSERT INTO auth(auth_id, username, password, user_id)
		VALUES (2, ''larissa'', 
		''{bcrypt}$2a$10$dQWjpRaxiORPCqh4hEQVW.Ka.FkRLdzEvoSPJ26pQ6I7Fqo4wrDzG'', 2);	
	END IF;
	
	IF NOT EXISTS (SELECT auth_id FROM auth WHERE auth_id = 3) THEN
		INSERT INTO auth(auth_id, username, password, user_id)
		VALUES (3, ''john'', 
		''{bcrypt}$2a$10$dQWjpRaxiORPCqh4hEQVW.Ka.FkRLdzEvoSPJ26pQ6I7Fqo4wrDzG'', 3);	
	END IF;

	IF NOT EXISTS (SELECT * FROM auth_roles WHERE auth_id = 1 and role_id = 1) THEN
		INSERT INTO auth_roles(auth_id, role_id)
		VALUES (1, 1);
	END IF;

	IF NOT EXISTS (SELECT * FROM auth_roles WHERE auth_id = 2 and role_id = 2) THEN
		INSERT INTO auth_roles(auth_id, role_id)
		VALUES (2, 2);
	END IF;

	IF NOT EXISTS (SELECT * FROM auth_roles WHERE auth_id = 3 and role_id = 2) THEN
		INSERT INTO auth_roles(auth_id, role_id)
		VALUES (3, 2);
	END IF;
END
'  LANGUAGE PLPGSQL;


DO 
'
BEGIN

	IF NOT EXISTS (SELECT * FROM atividade WHERE idatividade = 1) THEN
		INSERT INTO atividade(idatividade, nome, object_type, ordem, idusuario)
		VALUES (1, ''Lets Work'', ''Atividade'', 0, 1);
		
		INSERT INTO janela values (4, null, ''MySpace'', ''Janela'', 0, 1, 1);
		INSERT INTO subarea values (7, 1, ''Main'', ''Subarea'', 0, ''casual'',4);
		INSERT INTO ocupacao values (9, ''Gerais'', ''Ocupacao'', 0, 7);
		INSERT INTO classe values (9, null, null, ''All'', ''Classe'', null, 0, null, null, null, 9);
	END IF;
	
	IF NOT EXISTS (SELECT * FROM atividade WHERE idatividade = 2) THEN
		INSERT INTO atividade(idatividade, nome, object_type, ordem, idusuario)
		VALUES (2, ''Lets Work'', ''Atividade'', 0, 2);
		
		INSERT INTO janela values (5, null, ''MySpace'', ''Janela'', 0, 2, 1);
		INSERT INTO subarea values (8, 1, ''Main'', ''Subarea'', 0, ''casual'',5);
		INSERT INTO ocupacao values (10, ''Gerais'', ''Ocupacao'', 0, 8);
		INSERT INTO classe values (10, null, null, ''All'', ''Classe'', null, 0, null, null, null, 10);
	END IF;
	
	IF NOT EXISTS (SELECT * FROM atividade WHERE idatividade = 3) THEN
		INSERT INTO atividade(idatividade, nome, object_type, ordem, idusuario)
		VALUES (3, ''Lets Work'', ''Atividade'', 0, 3);
		
		INSERT INTO janela values (6, null, ''MySpace'', ''Janela'', 0, 3, 1);
		INSERT INTO subarea values (9, 1, ''Main'', ''Subarea'', 0, ''casual'',6);
		INSERT INTO ocupacao values (11, ''Gerais'', ''Ocupacao'', 0, 9);
		INSERT INTO classe values (11, null, null, ''All'', ''Classe'', null, 0, null, null, null, 11);
	END IF;
END
'  LANGUAGE PLPGSQL;

