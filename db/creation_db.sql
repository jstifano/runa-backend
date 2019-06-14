/****** Creacion de la base de datos *******/
CREATE DATABASE runadb
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

COMMENT ON DATABASE runadb
    IS 'Base de datos para prueba técnica de Runa.';
/****** Creacion de la base de datos *******/

/****** Creacion de la tabla de Usuarios *******/
CREATE TABLE public."user"
(
    id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    first_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    role character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT unique_id UNIQUE (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."user"
    OWNER to postgres;
COMMENT ON TABLE public."user"
    IS 'Tabla para manejar los usuario del sistema.';
/****** Creacion de la tabla de Usuarios *******/

/****** Creación de la tabla de Entradas y Salidas ********/
CREATE TABLE public.entry
(
    id integer NOT NULL DEFAULT nextval('entry_id_seq'::regclass),
    arrival_date character varying(50) COLLATE pg_catalog."default" NOT NULL,
    departure_date character varying(50) COLLATE pg_catalog."default" NOT NULL,
    id_user integer NOT NULL,
    CONSTRAINT entry_pkey PRIMARY KEY (id),
    CONSTRAINT entry_id_user_fkey FOREIGN KEY (id_user)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.entry
    OWNER to postgres;
/****** Creación de la tabla de Entradas y Salidas ********/

/* lA CONTRASEÑA DEL ADMIN ES admin123*/
/* LA CONTRASEÑA DEL EMPLEADO ES empleado123 */
INSERT INTO public."user" (id, first_name, last_name, email, password, role) VALUES (DEFAULT, 'Admin', 'Uno', 'admin@test.com', '$2b$10$x.C3asgcgYvUjuQaI540l.TLrmbVmCIv4LBvoxz7yn1qfRtc48zfK', 'admin');
INSERT INTO public."user" (id, first_name, last_name, email, password, role) VALUES (DEFAULT, 'Empleado', 'Uno', 'empleado@test.com', '$2b$10$ba/A9anYmOm69BUsgaKcSepJD4pmb5tKE4vVGS2CsLovT.ZolyzE.', 'employee');
