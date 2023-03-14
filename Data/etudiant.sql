create table etudiant ( id int not null , code_apoge varchar(7) not null primary key , nom varchar(30) not null ,prenom varchar(30) not null ,age int not null ,cin varchar(8) not null ,filiere varchar(50) not null ) ;   

create table module ( id int not null , 
nom_md  varchar(40) primary key  not null , 
etat varchar(20) ,nom_sm  varchar(40)  not null );
					
create table note_module ( id int not null , 
code_apoge varchar(7) not null , nom_md  varchar(40) not null 
, note int not null ) ;

create table note_semestre ( id int not null ,
 code_apoge varchar(7) not null , nom_sm  varchar(40) not null
  , note int not null ) ;

/* les contraintes   */
            
ALTER TABLE note_semestre ADD FOREIGN KEY (code_apoge) REFERENCES etudiant(code_apoge);
ALTER TABLE note_semestre ADD FOREIGN KEY (nom_sm) REFERENCES semestre(nom_sm);

ALTER TABLE note_module ADD FOREIGN KEY (code_apoge) REFERENCES etudiant(code_apoge);
ALTER TABLE note_module ADD FOREIGN KEY (nom_md) REFERENCES module(nom_md);

ALTER TABLE module ADD FOREIGN KEY (nom_sm) REFERENCES semestre(nom_sm);

create table rendezvou(id numeric PRIMARY KEY not null,sujet varchar(20),code_apoge varchar(7),date_rv date, FOREIGN KEY (code_apoge) REFERENCES etudiant(code_apoge));



-- INSERTION INTO ETUDIANT
INSERT INTO etudiant (id, code_apoge, nom, prenom, age, cin, filiere, cne, date_naissance) 
VALUES 
(1, '1234567', 'Smith', 'John', 20, '12345678', 'SIR - systemes informatique repartie', 'E123456789', '20020101'),
(2, '2345678', 'Johnson', 'Jane', 21, '23456789', 'deust - mipc ', 'E234567890', '20010202'),
(3, '3456789', 'Davis', 'David', 19, '34567890', 'deust - mipc', 'E345678901', '20030103'),
(4, '4567890', 'Williams', 'Jessica', 22, '4567', 'SIR - systemes informatique repartie', 'E456789012', '20001204'),
(5, '5678901', 'Garcia', 'Maria', 18, '56789012', 'SIR - systemes informatique repartie', 'E567890123', '20050105'),
(6, '6789012', 'Lee', 'Robert', 20, '67890123', 'deust - mipc', 'E678901234', '20040106'),
(7, '7890123', 'Brown', 'Emily', 21, '78901234', 'deust - mipc', 'E789012345', '20030207'),
(8, '8901234', 'Martinez', 'Alex', 19, '89012345', 'SIR - systemes informatique repartie', 'E890123456', '20020108'),
(9, '9012345', 'Gonzalez', 'Daniel', 22, '90123456', 'SIR - systemes informatique repartie', 'E901234567', '20001209'),
(10, '0123456', 'Wilson', 'Olivia', 18, '01234567', 'deust - mipc', 'E012345678', '20050110');


-- add anne to note semestre 
alter table note_semestre add anne varchar(40);

-- add etat to note semestre 
alter table note_semestre add etat varchar(40);

-- delete columns etat and anne from semstre
ALTER TABLE semstre DROP COLUMN etat, DROP COLUMN anne;
-- delete etat from module
alter table module drop etat;
-- insert into semestre
insert into semestre values(1,'s1');
insert into semestre values(2,'s2');
insert into semestre values(3,'s3');
insert into semestre values(4,'s4');
insert into semestre values(5,'s5');
insert into semestre values(6,'s6');

-- insert into module
INSERT INTO module (id, nom_md, nom_sm) VALUES(1, 'analyse 1', 's1','2020','valide'),(2, 'algébre 1', 's1','2020','valide'),(3, 'mecanique de point et optique', 's1','20'),(4, 'thermodynamique', 's1'),(5, 'algorithme et programmation 1', 's1'),(6, 'tec 1', 's1'),(7, 'analyse 2', 's2'),(8, 'algébre 2', 's2'),(9, 'tec 2', 's2'),(10, 'electricte', 's2'),(11, 'electronique', 's2'),(12, 'SEM', 's2'),(13, 'analyse 3', 's3'),(14, 'algorithme et programmation 2', 's3'),(15, 'réacticté chimique', 's3'),(16, 'mecanique de solide', 's3'),(17, 'tec 3', 's3'),(18, 'statstique', 's3'),(19, 'chimie organique', 's4'),(20, 'chimie minerale', 's4'),(21, 'electromagnitesme', 's4'),(22, 'analyse 4', 's4'),(23, 'structure de donnée', 's4'),(24, 'mecanique quantique', 's4'),(25, 'developpement web', 's5'),(26, 'uml', 's5'),(27, 'java', 's5'),(28, 'linux', 's5'),(29, 'réseaux informatique', 's5'),(30, 'base de donnée', 's5'),(31, 'java Jee', 's6'),(32, 'ihm', 's6'),(33, 'BDR', 's6');

-- insert semestre notes for etudiant with code_apoge 1234567
INSERT INTO note_semestre (id, code_apoge, nom_sm, note, anne, etat) VALUES(1, '1234567', 's1', 16, '2020-2021', 'Valide'),(2, '1234567', 's2', 12, '2020-2021', 'Valide'),(3, '1234567', 's3', 18, '2021-2022', 'Valide'),(4, '1234567', 's4', 15, '2021-2022', 'Valide'),(5, '1234567', 's5', 10, '2022-2023', 'Valide'),(6, '1234567', 's6', 13, '2022-2023', 'Valide');

-- insert into note_module for etudiant with code_apoge 1234567
INSERT INTO note_module (id, code_apoge, nom_md, note,etat,anne) VALUES(1, '1234567', 'algébre 1', 14,'2020','valide');

INSERT INTO note_module (id, code_apoge, nom_md, note,etat,anne) VALUES(2, '1234567', ' algébre 2', 17,'2021','valide') ;
INSERT INTO note_module (id, code_apoge, nom_md, note,etat,anne) VALUES(3, '1234567', 'algorithme et programmation 1', 12,'2020','valide');

INSERT INTO note_module (id, code_apoge, nom_md, note,etat,anne) VALUES(4, '1234567', 'algorithme et programmation 2', 16,'2021','valide') ;
INSERT INTO note_module (id, code_apoge, nom_md, note,etat,anne) VALUES(5, '1234567', 'analyse 1', 19,'2020','valide'); 
INSERT INTO note_module (id, code_apoge, nom_md, note,etat,anne) VALUES(6, '1234567', 'analyse 2', 15,'2021','valide'); 
INSERT INTO note_module (id, code_apoge, nom_md, note,etat,anne) VALUES(7, '1234567', 'analyse 3', 13,'2021','valide'); 
INSERT INTO note_module (id, code_apoge, nom_md, note),etat,anne VALUES(8, '1234567', 'analyse 4', 11,'2022','valide');

INSERT INTO note_module (id, code_apoge, nom_md, note,etat,anne) VALUES(9, '1234567', 'base de donnée', 18,'2022','valide'),(10, '1234567', 'BDR', 10,'2023','valide'),(11, '1234567', 'chimie minerale', 14,'2022','valide'), (12, '1234567', 'chimie organique', 13,'2022','valide'), (13, '1234567', 'developpement web', 15,'2022','valide'), (14, '1234567', 'electricte', 11,'2021','valide');

INSERT INTO note_module (id, code_apoge, nom_md, note,etat,anne) VALUES(15, '1234567', 'electromagnitesme', 14,'2022','valide'), (16, '1234567', 'electronique', 16,'2021','valide'), (17, '1234567', 'ihm', 12,'2023','valide'), (18, '1234567', 'java', 10,'2022','valide'), (19, '1234567', 'java Jee', 17,'2023','valide'), (20, '1234567', 'linux', 11,'2022','valide');

INSERT INTO note_module (id, code_apoge, nom_md, note,etat,anne) VALUES(21, '1234567', 'mecanique de point et optique', 13,'2020','valide'), (22, '1234567', 'mecanique de solide', 15,'2021','valide'), (23, '1234567', 'mecanique quantique', 16,'2022','valide'), (24, '1234567', 'réacticté chimique', 17,'2021','valide'), (25, '1234567', 'réseaux informatique', 18,'2022','valide'), (26, '1234567', 'SEM', 19,'2021','valide');

INSERT INTO note_module (id, code_apoge, nom_md, note,etat,anne) VALUES(27, '1234567', 'statstique', 20,'2021','valide'), (28, '1234567', 'structure de donnée', 10,'2022','valide'), (29, '1234567', 'tec 1', 11,'2020','valide'), (30, '1234567', 'tec 2', 12,'2021','valide'), (31, '1234567', 'tec 3', 13,'2021','valide'), (32, '1234567', 'thermodynamique', 14,'2020','valide'), (33, '1234567', 'uml', 15,'2022','valide');


'2020','valide' s1
'2021','valide' s2 s3
'2022','valide' s4 s5
,'2023','valide'
