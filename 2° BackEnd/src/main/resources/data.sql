DO 
'
BEGIN
	IF NOT EXISTS (SELECT idjanela FROM janela WHERE idjanela = 1) THEN
		insert into janela values (1, ''MySpace'', ''Janela'', 0, null, null, null);
		insert into subarea values (1, 1, ''Main'', ''Subarea'', 0, ''casual'',1);
		insert into ocupacao values (1, ''Gerais'', ''Ocupacao'', 0, 1);
		insert into classe values (1, null, null, ''All'', ''Classe'', null, 0, null, null, null, 1);
		insert into template values (1, ''Default'', ''Template'', 1);
	END IF;
	
	IF NOT EXISTS (SELECT idjanela FROM janela WHERE idjanela = 2) THEN
		insert into janela values (2, ''Planning'', ''Janela'', 0, null, null, null);
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
		insert into janela values (3, ''Execution'', ''Janela'', 0, null, null, null);
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