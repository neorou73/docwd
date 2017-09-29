--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.8
-- Dumped by pg_dump version 9.5.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: accesstoken; Type: TABLE; Schema: public; Owner: docwd
--

CREATE TABLE accesstoken (
    id integer NOT NULL,
    userid integer,
    created timestamp without time zone DEFAULT now()
);


ALTER TABLE accesstoken OWNER TO docwd;

--
-- Name: accesstoken_id_seq; Type: SEQUENCE; Schema: public; Owner: docwd
--

CREATE SEQUENCE accesstoken_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE accesstoken_id_seq OWNER TO docwd;

--
-- Name: accesstoken_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docwd
--

ALTER SEQUENCE accesstoken_id_seq OWNED BY accesstoken.id;


--
-- Name: documentmd; Type: TABLE; Schema: public; Owner: docwd
--

CREATE TABLE documentmd (
    id integer NOT NULL,
    ownerid integer,
    mddata text,
    title text,
    published boolean,
    created timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE documentmd OWNER TO docwd;

--
-- Name: documentmd_id_seq; Type: SEQUENCE; Schema: public; Owner: docwd
--

CREATE SEQUENCE documentmd_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE documentmd_id_seq OWNER TO docwd;

--
-- Name: documentmd_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docwd
--

ALTER SEQUENCE documentmd_id_seq OWNED BY documentmd.id;


--
-- Name: userprofile; Type: TABLE; Schema: public; Owner: docwd
--

CREATE TABLE userprofile (
    id integer NOT NULL,
    email text NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    created timestamp without time zone DEFAULT now(),
    password text NOT NULL
);


ALTER TABLE userprofile OWNER TO docwd;

--
-- Name: userprofile_id_seq; Type: SEQUENCE; Schema: public; Owner: docwd
--

CREATE SEQUENCE userprofile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE userprofile_id_seq OWNER TO docwd;

--
-- Name: userprofile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: docwd
--

ALTER SEQUENCE userprofile_id_seq OWNED BY userprofile.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: docwd
--

ALTER TABLE ONLY accesstoken ALTER COLUMN id SET DEFAULT nextval('accesstoken_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: docwd
--

ALTER TABLE ONLY documentmd ALTER COLUMN id SET DEFAULT nextval('documentmd_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: docwd
--

ALTER TABLE ONLY userprofile ALTER COLUMN id SET DEFAULT nextval('userprofile_id_seq'::regclass);


--
-- Data for Name: accesstoken; Type: TABLE DATA; Schema: public; Owner: docwd
--

COPY accesstoken (id, userid, created) FROM stdin;
\.


--
-- Name: accesstoken_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docwd
--

SELECT pg_catalog.setval('accesstoken_id_seq', 1, false);


--
-- Data for Name: documentmd; Type: TABLE DATA; Schema: public; Owner: docwd
--

COPY documentmd (id, ownerid, mddata, title, created) FROM stdin;
\.


--
-- Name: documentmd_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docwd
--

SELECT pg_catalog.setval('documentmd_id_seq', 1, false);


--
-- Data for Name: userprofile; Type: TABLE DATA; Schema: public; Owner: docwd
--

COPY userprofile (id, email, firstname, lastname, created, password) FROM stdin;
\.


--
-- Name: userprofile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: docwd
--

SELECT pg_catalog.setval('userprofile_id_seq', 1, false);


--
-- Name: accesstoken_pkey; Type: CONSTRAINT; Schema: public; Owner: docwd
--

ALTER TABLE ONLY accesstoken
    ADD CONSTRAINT accesstoken_pkey PRIMARY KEY (id);


--
-- Name: documentmd_pkey; Type: CONSTRAINT; Schema: public; Owner: docwd
--

ALTER TABLE ONLY documentmd
    ADD CONSTRAINT documentmd_pkey PRIMARY KEY (id);


--
-- Name: userprofile_pkey; Type: CONSTRAINT; Schema: public; Owner: docwd
--

ALTER TABLE ONLY userprofile
    ADD CONSTRAINT userprofile_pkey PRIMARY KEY (id);


--
-- Name: accesstoken_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docwd
--

ALTER TABLE ONLY accesstoken
    ADD CONSTRAINT accesstoken_userid_fkey FOREIGN KEY (userid) REFERENCES userprofile(id);


--
-- Name: documentmd_ownerid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: docwd
--

ALTER TABLE ONLY documentmd
    ADD CONSTRAINT documentmd_ownerid_fkey FOREIGN KEY (ownerid) REFERENCES userprofile(id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

