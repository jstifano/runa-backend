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
    email character varying(200) COLLATE pg_catalog."default" NOT NULL,
    password character varying(30) COLLATE pg_catalog."default" NOT NULL,
    role character varying(30) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp(6) with time zone,
    "updatedAt" timestamp(6) with time zone,
    CONSTRAINT user_pkey PRIMARY KEY (id)
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
    id integer NOT NULL,
    "arrivalDate" timestamp(6) without time zone NOT NULL,
    "departureDate" timestamp(6) without time zone NOT NULL,
    "createdAt" timestamp(6) without time zone NOT NULL,
    "updatedAt" timestamp(6) without time zone,
    CONSTRAINT entry_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.entry
    OWNER to postgres;
/****** Creación de la tabla de Entradas y Salidas ********/

INSERT INTO user(id, email, password, role, createdAt, updatedAt) VALUES(DEFAULT, 'admin@test.com', 'admin123', 'admin', null, null);
INSERT INTO user(id, username, password, role, createdAt, updatedAt) VALUES(DEFAULT, 'empleado@test.com', 'empleado123', 'empleado', null, null);
