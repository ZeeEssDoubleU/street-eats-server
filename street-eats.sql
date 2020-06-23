--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: core_store; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_store (
    id integer NOT NULL,
    key character varying(255),
    value text,
    type character varying(255),
    environment character varying(255),
    tag character varying(255)
);


--
-- Name: core_store_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.core_store_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: core_store_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.core_store_id_seq OWNED BY public.core_store.id;


--
-- Name: dishes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.dishes (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    price integer,
    restaurant integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: dishes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.dishes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: dishes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.dishes_id_seq OWNED BY public.dishes.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    address character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    dishes jsonb,
    amount numeric(10,2),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: restaurants; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.restaurants (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    slug character varying(255)
);


--
-- Name: restaurants_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.restaurants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: restaurants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.restaurants_id_seq OWNED BY public.restaurants.id;


--
-- Name: strapi_administrator; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.strapi_administrator (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "resetPasswordToken" character varying(255),
    blocked boolean
);


--
-- Name: strapi_administrator_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.strapi_administrator_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: strapi_administrator_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.strapi_administrator_id_seq OWNED BY public.strapi_administrator.id;


--
-- Name: strapi_webhooks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.strapi_webhooks (
    id integer NOT NULL,
    name character varying(255),
    url text,
    headers jsonb,
    events jsonb,
    enabled boolean
);


--
-- Name: strapi_webhooks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.strapi_webhooks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: strapi_webhooks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.strapi_webhooks_id_seq OWNED BY public.strapi_webhooks.id;


--
-- Name: upload_file; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.upload_file (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "alternativeText" character varying(255),
    caption character varying(255),
    width integer,
    height integer,
    formats jsonb,
    hash character varying(255) NOT NULL,
    ext character varying(255),
    mime character varying(255) NOT NULL,
    size numeric(10,2) NOT NULL,
    url character varying(255) NOT NULL,
    "previewUrl" character varying(255),
    provider character varying(255) NOT NULL,
    provider_metadata jsonb,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: upload_file_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.upload_file_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: upload_file_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.upload_file_id_seq OWNED BY public.upload_file.id;


--
-- Name: upload_file_morph; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.upload_file_morph (
    id integer NOT NULL,
    upload_file_id integer,
    related_id integer,
    related_type text,
    field text,
    "order" integer
);


--
-- Name: upload_file_morph_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.upload_file_morph_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: upload_file_morph_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.upload_file_morph_id_seq OWNED BY public.upload_file_morph.id;


--
-- Name: users-permissions_permission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."users-permissions_permission" (
    id integer NOT NULL,
    type character varying(255) NOT NULL,
    controller character varying(255) NOT NULL,
    action character varying(255) NOT NULL,
    enabled boolean NOT NULL,
    policy character varying(255),
    role integer
);


--
-- Name: users-permissions_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users-permissions_permission_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users-permissions_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users-permissions_permission_id_seq" OWNED BY public."users-permissions_permission".id;


--
-- Name: users-permissions_role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."users-permissions_role" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    type character varying(255)
);


--
-- Name: users-permissions_role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users-permissions_role_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users-permissions_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users-permissions_role_id_seq" OWNED BY public."users-permissions_role".id;


--
-- Name: users-permissions_user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."users-permissions_user" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    provider character varying(255),
    password character varying(255),
    "resetPasswordToken" character varying(255),
    confirmed boolean,
    blocked boolean,
    role integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    first_name character varying(255),
    last_name character varying(255)
);


--
-- Name: users-permissions_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users-permissions_user_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users-permissions_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users-permissions_user_id_seq" OWNED BY public."users-permissions_user".id;


--
-- Name: core_store id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_store ALTER COLUMN id SET DEFAULT nextval('public.core_store_id_seq'::regclass);


--
-- Name: dishes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dishes ALTER COLUMN id SET DEFAULT nextval('public.dishes_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: restaurants id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurants ALTER COLUMN id SET DEFAULT nextval('public.restaurants_id_seq'::regclass);


--
-- Name: strapi_administrator id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.strapi_administrator ALTER COLUMN id SET DEFAULT nextval('public.strapi_administrator_id_seq'::regclass);


--
-- Name: strapi_webhooks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.strapi_webhooks ALTER COLUMN id SET DEFAULT nextval('public.strapi_webhooks_id_seq'::regclass);


--
-- Name: upload_file id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.upload_file ALTER COLUMN id SET DEFAULT nextval('public.upload_file_id_seq'::regclass);


--
-- Name: upload_file_morph id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.upload_file_morph ALTER COLUMN id SET DEFAULT nextval('public.upload_file_morph_id_seq'::regclass);


--
-- Name: users-permissions_permission id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."users-permissions_permission" ALTER COLUMN id SET DEFAULT nextval('public."users-permissions_permission_id_seq"'::regclass);


--
-- Name: users-permissions_role id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."users-permissions_role" ALTER COLUMN id SET DEFAULT nextval('public."users-permissions_role_id_seq"'::regclass);


--
-- Name: users-permissions_user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."users-permissions_user" ALTER COLUMN id SET DEFAULT nextval('public."users-permissions_user_id_seq"'::regclass);


--
-- Data for Name: core_store; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.core_store (id, key, value, type, environment, tag) FROM stdin;
1	db_model_users-permissions_permission	{"type":{"type":"string","required":true,"configurable":false},"controller":{"type":"string","required":true,"configurable":false},"action":{"type":"string","required":true,"configurable":false},"enabled":{"type":"boolean","required":true,"configurable":false},"policy":{"type":"string","configurable":false},"role":{"model":"role","via":"permissions","plugin":"users-permissions","configurable":false}}	object	\N	\N
15	plugin_content_manager_configuration_content_types::strapi::administrator	{"uid":"strapi::administrator","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"username","defaultSortBy":"username","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"username":{"edit":{"label":"Username","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Username","searchable":true,"sortable":true}},"email":{"edit":{"label":"Email","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Email","searchable":true,"sortable":true}},"password":{"edit":{"label":"Password","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Password","searchable":true,"sortable":true}},"resetPasswordToken":{"edit":{"label":"ResetPasswordToken","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"ResetPasswordToken","searchable":true,"sortable":true}},"blocked":{"edit":{"label":"Blocked","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Blocked","searchable":true,"sortable":true}}},"layouts":{"list":["id","username","email","blocked"],"editRelations":[],"edit":[[{"name":"username","size":6},{"name":"email","size":6}],[{"name":"password","size":6},{"name":"blocked","size":4}]]}}	object		
3	db_model_core_store	{"key":{"type":"string"},"value":{"type":"text"},"type":{"type":"string"},"environment":{"type":"string"},"tag":{"type":"string"}}	object	\N	\N
14	plugin_content_manager_configuration_content_types::plugins::upload.file	{"uid":"plugins::upload.file","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"name":{"edit":{"label":"Name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Name","searchable":true,"sortable":true}},"alternativeText":{"edit":{"label":"AlternativeText","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"AlternativeText","searchable":true,"sortable":true}},"caption":{"edit":{"label":"Caption","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Caption","searchable":true,"sortable":true}},"width":{"edit":{"label":"Width","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Width","searchable":true,"sortable":true}},"height":{"edit":{"label":"Height","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Height","searchable":true,"sortable":true}},"formats":{"edit":{"label":"Formats","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Formats","searchable":false,"sortable":false}},"hash":{"edit":{"label":"Hash","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Hash","searchable":true,"sortable":true}},"ext":{"edit":{"label":"Ext","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Ext","searchable":true,"sortable":true}},"mime":{"edit":{"label":"Mime","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Mime","searchable":true,"sortable":true}},"size":{"edit":{"label":"Size","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Size","searchable":true,"sortable":true}},"url":{"edit":{"label":"Url","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Url","searchable":true,"sortable":true}},"previewUrl":{"edit":{"label":"PreviewUrl","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"PreviewUrl","searchable":true,"sortable":true}},"provider":{"edit":{"label":"Provider","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Provider","searchable":true,"sortable":true}},"provider_metadata":{"edit":{"label":"Provider_metadata","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Provider_metadata","searchable":false,"sortable":false}},"related":{"edit":{"label":"Related","description":"","placeholder":"","visible":true,"editable":true,"mainField":"id"},"list":{"label":"Related","searchable":false,"sortable":false}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","alternativeText","caption"],"editRelations":["related"],"edit":[[{"name":"name","size":6},{"name":"alternativeText","size":6}],[{"name":"caption","size":6},{"name":"width","size":4}],[{"name":"height","size":4}],[{"name":"formats","size":12}],[{"name":"hash","size":6},{"name":"ext","size":6}],[{"name":"mime","size":6},{"name":"size","size":4}],[{"name":"url","size":6},{"name":"previewUrl","size":6}],[{"name":"provider","size":6}],[{"name":"provider_metadata","size":12}]]}}	object		
4	db_model_upload_file	{"name":{"type":"string","configurable":false,"required":true},"alternativeText":{"type":"string","configurable":false},"caption":{"type":"string","configurable":false},"width":{"type":"integer","configurable":false},"height":{"type":"integer","configurable":false},"formats":{"type":"json","configurable":false},"hash":{"type":"string","configurable":false,"required":true},"ext":{"type":"string","configurable":false},"mime":{"type":"string","configurable":false,"required":true},"size":{"type":"decimal","configurable":false,"required":true},"url":{"type":"string","configurable":false,"required":true},"previewUrl":{"type":"string","configurable":false},"provider":{"type":"string","configurable":false,"required":true},"provider_metadata":{"type":"json","configurable":false},"related":{"collection":"*","filter":"field","configurable":false},"created_at":{"type":"currentTimestamp"},"updated_at":{"type":"currentTimestamp"}}	object	\N	\N
9	plugin_email_provider	{"provider":"sendmail","name":"Sendmail","auth":{"sendmail_default_from":{"label":"Sendmail Default From","type":"text"},"sendmail_default_replyto":{"label":"Sendmail Default Reply-To","type":"text"}}}	object	development	
5	db_model_strapi_administrator	{"username":{"type":"string","minLength":3,"unique":true,"configurable":false,"required":true},"email":{"type":"email","minLength":6,"configurable":false,"required":true},"password":{"type":"password","minLength":6,"configurable":false,"private":true,"required":true},"resetPasswordToken":{"type":"string","configurable":false,"private":true},"blocked":{"type":"boolean","default":false,"configurable":false}}	object	\N	\N
12	plugin_content_manager_configuration_content_types::plugins::users-permissions.permission	{"uid":"plugins::users-permissions.permission","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"type","defaultSortBy":"type","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"type":{"edit":{"label":"Type","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Type","searchable":true,"sortable":true}},"controller":{"edit":{"label":"Controller","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Controller","searchable":true,"sortable":true}},"action":{"edit":{"label":"Action","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Action","searchable":true,"sortable":true}},"enabled":{"edit":{"label":"Enabled","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Enabled","searchable":true,"sortable":true}},"policy":{"edit":{"label":"Policy","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Policy","searchable":true,"sortable":true}},"role":{"edit":{"label":"Role","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"Role","searchable":false,"sortable":false}}},"layouts":{"list":["id","type","controller","action"],"editRelations":["role"],"edit":[[{"name":"type","size":6},{"name":"controller","size":6}],[{"name":"action","size":6},{"name":"enabled","size":4}],[{"name":"policy","size":6}]]}}	object		
8	db_model_upload_file_morph	{"upload_file_id":{"type":"integer"},"related_id":{"type":"integer"},"related_type":{"type":"text"},"field":{"type":"text"},"order":{"type":"integer"}}	object	\N	\N
13	plugin_content_manager_configuration_content_types::plugins::users-permissions.role	{"uid":"plugins::users-permissions.role","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"name":{"edit":{"label":"Name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Name","searchable":true,"sortable":true}},"description":{"edit":{"label":"Description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Description","searchable":true,"sortable":true}},"type":{"edit":{"label":"Type","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Type","searchable":true,"sortable":true}},"permissions":{"edit":{"label":"Permissions","description":"","placeholder":"","visible":true,"editable":true,"mainField":"type"},"list":{"label":"Permissions","searchable":false,"sortable":false}},"users":{"edit":{"label":"Users","description":"","placeholder":"","visible":true,"editable":true,"mainField":"username"},"list":{"label":"Users","searchable":false,"sortable":false}}},"layouts":{"list":["id","name","description","type"],"editRelations":["permissions","users"],"edit":[[{"name":"name","size":6},{"name":"description","size":6}],[{"name":"type","size":6}]]}}	object		
17	plugin_users-permissions_email	{"reset_password":{"display":"Email.template.reset_password","icon":"sync","options":{"from":{"name":"Administration Panel","email":"no-reply@strapi.io"},"response_email":"","object":"Reset password","message":"<p>We heard that you lost your password. Sorry about that!</p>\\n\\n<p>But don’t worry! You can use the following link to reset your password:</p>\\n\\n<p><%= URL %>?code=<%= TOKEN %></p>\\n\\n<p>Thanks.</p>"}},"email_confirmation":{"display":"Email.template.email_confirmation","icon":"check-square","options":{"from":{"name":"Administration Panel","email":"no-reply@strapi.io"},"response_email":"","object":"Account confirmation","message":"<p>Thank you for registering!</p>\\n\\n<p>You have to confirm your email address. Please click on the link below.</p>\\n\\n<p><%= URL %>?confirmation=<%= CODE %></p>\\n\\n<p>Thanks.</p>"}}}	object		
18	plugin_users-permissions_advanced	{"unique_email":true,"allow_register":true,"email_confirmation":false,"email_confirmation_redirection":"http://localhost:3000/restaurants","email_reset_password":"http://0.0.0.0:1337/admin","default_role":"authenticated"}	object		
6	db_model_users-permissions_user	{"username":{"type":"string","minLength":3,"unique":true,"configurable":false,"required":true},"email":{"type":"email","minLength":6,"configurable":false,"required":true},"provider":{"type":"string","configurable":false},"password":{"type":"password","minLength":6,"configurable":false,"private":true},"resetPasswordToken":{"type":"string","configurable":false,"private":true},"confirmed":{"type":"boolean","default":false,"configurable":false},"blocked":{"type":"boolean","default":false,"configurable":false},"role":{"model":"role","via":"users","plugin":"users-permissions","configurable":false},"first_name":{"type":"string"},"last_name":{"type":"string"},"created_at":{"type":"currentTimestamp"},"updated_at":{"type":"currentTimestamp"}}	object	\N	\N
11	plugin_upload_settings	{"sizeOptimization":true,"responsiveDimensions":true}	object	development	
16	plugin_content_manager_configuration_content_types::plugins::users-permissions.user	{"uid":"plugins::users-permissions.user","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"username","defaultSortBy":"username","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"username":{"edit":{"label":"Username","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Username","searchable":true,"sortable":true}},"email":{"edit":{"label":"Email","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Email","searchable":true,"sortable":true}},"provider":{"edit":{"label":"Provider","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Provider","searchable":true,"sortable":true}},"password":{"edit":{"label":"Password","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Password","searchable":true,"sortable":true}},"resetPasswordToken":{"edit":{"label":"ResetPasswordToken","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"ResetPasswordToken","searchable":true,"sortable":true}},"confirmed":{"edit":{"label":"Confirmed","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Confirmed","searchable":true,"sortable":true}},"blocked":{"edit":{"label":"Blocked","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Blocked","searchable":true,"sortable":true}},"role":{"edit":{"label":"Role","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"Role","searchable":false,"sortable":false}},"first_name":{"edit":{"label":"First_name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"First_name","searchable":true,"sortable":true}},"last_name":{"edit":{"label":"Last_name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Last_name","searchable":true,"sortable":true}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","username","email","confirmed"],"edit":[[{"name":"username","size":6},{"name":"email","size":6}],[{"name":"password","size":6}],[{"name":"confirmed","size":4},{"name":"blocked","size":4}],[{"name":"first_name","size":6},{"name":"last_name","size":6}]],"editRelations":["role"]}}	object		
23	db_model_orders	{"address":{"type":"string","required":true},"city":{"type":"string","required":true},"dishes":{"type":"json"},"amount":{"type":"decimal"},"created_at":{"type":"currentTimestamp"},"updated_at":{"type":"currentTimestamp"}}	object	\N	\N
25	plugin_content_manager_configuration_content_types::application::dish.dish	{"uid":"application::dish.dish","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"name":{"edit":{"label":"Name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Name","searchable":true,"sortable":true}},"description":{"edit":{"label":"Description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Description","searchable":false,"sortable":false}},"image":{"edit":{"label":"Image","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Image","searchable":false,"sortable":false}},"price":{"edit":{"label":"Price","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Price","searchable":true,"sortable":true}},"restaurant":{"edit":{"label":"Restaurant","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"Restaurant","searchable":false,"sortable":false}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","image","price"],"editRelations":["restaurant"],"edit":[[{"name":"name","size":6}],[{"name":"description","size":12}],[{"name":"image","size":6},{"name":"price","size":4}]]}}	object		
19	db_model_restaurants	{"name":{"type":"string","required":true},"description":{"type":"richtext","required":true},"image":{"collection":"file","via":"related","allowedTypes":["images"],"plugin":"upload","required":false},"dishes":{"collection":"dish","via":"restaurant","isVirtual":true},"slug":{"type":"string"},"created_at":{"type":"currentTimestamp"},"updated_at":{"type":"currentTimestamp"}}	object	\N	\N
21	db_model_dishes	{"name":{"type":"string","required":true,"unique":true},"description":{"type":"richtext","required":true},"image":{"model":"file","via":"related","allowedTypes":["images"],"plugin":"upload","required":false},"price":{"type":"integer"},"restaurant":{"via":"dishes","model":"restaurant"},"created_at":{"type":"currentTimestamp"},"updated_at":{"type":"currentTimestamp"}}	object	\N	\N
26	plugin_content_manager_configuration_content_types::application::order.order	{"uid":"application::order.order","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"address","defaultSortBy":"address","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"address":{"edit":{"label":"Address","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Address","searchable":true,"sortable":true}},"city":{"edit":{"label":"City","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"City","searchable":true,"sortable":true}},"dishes":{"edit":{"label":"Dishes","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Dishes","searchable":false,"sortable":false}},"amount":{"edit":{"label":"Amount","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Amount","searchable":true,"sortable":true}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","address","city","amount"],"editRelations":[],"edit":[[{"name":"address","size":6},{"name":"city","size":6}],[{"name":"dishes","size":12}],[{"name":"amount","size":4}]]}}	object		
27	plugin_content_manager_configuration_content_types::application::restaurant.restaurant	{"uid":"application::restaurant.restaurant","settings":{"bulkable":true,"filterable":true,"searchable":true,"pageSize":10,"mainField":"name","defaultSortBy":"name","defaultSortOrder":"ASC"},"metadatas":{"id":{"edit":{},"list":{"label":"Id","searchable":true,"sortable":true}},"name":{"edit":{"label":"Name","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Name","searchable":true,"sortable":true}},"description":{"edit":{"label":"Description","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Description","searchable":false,"sortable":false}},"image":{"edit":{"label":"Image","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Image","searchable":false,"sortable":false}},"dishes":{"edit":{"label":"Dishes","description":"","placeholder":"","visible":true,"editable":true,"mainField":"name"},"list":{"label":"Dishes","searchable":false,"sortable":false}},"slug":{"edit":{"label":"Slug","description":"","placeholder":"","visible":true,"editable":true},"list":{"label":"Slug","searchable":true,"sortable":true}},"created_at":{"edit":{"label":"Created_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Created_at","searchable":true,"sortable":true}},"updated_at":{"edit":{"label":"Updated_at","description":"","placeholder":"","visible":false,"editable":true},"list":{"label":"Updated_at","searchable":true,"sortable":true}}},"layouts":{"list":["id","name","image","slug"],"editRelations":["dishes"],"edit":[[{"name":"name","size":6}],[{"name":"description","size":12}],[{"name":"image","size":6},{"name":"slug","size":6}]]}}	object		
28	plugin_upload_settings	{"sizeOptimization":true,"responsiveDimensions":true}	object	production	
2	db_model_strapi_webhooks	{"name":{"type":"string"},"url":{"type":"text"},"headers":{"type":"json"},"events":{"type":"json"},"enabled":{"type":"boolean"}}	object	\N	\N
7	db_model_users-permissions_role	{"name":{"type":"string","minLength":3,"required":true,"configurable":false},"description":{"type":"string","configurable":false},"type":{"type":"string","unique":true,"configurable":false},"permissions":{"collection":"permission","via":"role","plugin":"users-permissions","configurable":false,"isVirtual":true},"users":{"collection":"user","via":"role","configurable":false,"plugin":"users-permissions","isVirtual":true}}	object	\N	\N
10	plugin_users-permissions_grant	{"email":{"enabled":true,"icon":"envelope"},"discord":{"enabled":false,"icon":"discord","key":"","secret":"","callback":"/auth/discord/callback","scope":["identify","email"]},"facebook":{"enabled":false,"icon":"facebook-square","key":"2908860622534469","secret":"03c6ab519d62318d71f8df7333eff711","callback":"/auth/facebook/callback","scope":["email"]},"google":{"enabled":false,"icon":"google","key":"959616933243-g61rmeqrl48ugbk0dlif09df28kc049a.apps.googleusercontent.com","secret":"tFIl2rTqN1KRdoPUTqkqJREH","callback":"/auth/google/callback","scope":["email"]},"github":{"enabled":false,"icon":"github","key":"","secret":"","callback":"/auth/github/callback","scope":["user","user:email"],"redirect_uri":"/auth/github/callback"},"microsoft":{"enabled":false,"icon":"windows","key":"","secret":"","callback":"/auth/microsoft/callback","scope":["user.read"]},"twitter":{"enabled":false,"icon":"twitter","key":"","secret":"","callback":"/auth/twitter/callback"},"instagram":{"enabled":false,"icon":"instagram","key":"","secret":"","callback":"/auth/instagram/callback"},"vk":{"enabled":false,"icon":"vk","key":"","secret":"","callback":"/auth/vk/callback","scope":["email"]},"twitch":{"enabled":false,"icon":"twitch","key":"","secret":"","callback":"/auth/twitch/callback","scope":["user:read:email"]}}	object		
\.


--
-- Data for Name: dishes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.dishes (id, name, description, price, restaurant, created_at, updated_at) FROM stdin;
12	Buttermilk Fried Chicken on Brioche	This is better than good.  It's fantastic!  Juicy buttermilk chicken served on a delicious, buttery bun.  Served with a side of sweet potato waffle fries.	12	4	2020-05-27 22:05:16.025-04	2020-06-23 12:56:58.347-04
5	Spaghetti and Meatballs	Good food.  Spaghetti and meatballs.  Good food.  Oh yea.  So good.	11	4	2020-05-27 21:49:45.936-04	2020-06-23 12:56:58.347-04
7	Gouda Mushroom Onion Grilled Cheese	This is what makes us the Best Bar Ever, besides our drinks of course.  Just look at this legendary grilled cheese.  You know you want it.\n\nServed with a side of tomato soup.	10	5	2020-05-27 21:54:03.206-04	2020-06-23 12:55:16.533-04
8	Rosemary Garlic Pork Roast	Well... it's not shrimp.  But it's damn good.	14	6	2020-05-27 21:54:57.544-04	2020-06-23 12:55:48.671-04
6	Garlic Pork Chops in Creamy Mushroom Sauce	Our delicious pork chops slathered in the creamest and mushroomiest of sauces.  Order it, and be a Fungi!	14	6	2020-05-27 21:52:11.31-04	2020-06-23 12:55:48.671-04
9	Chicken and Fries Combo	Again... not shrimp, but who doesn't like chicken and fries!?  \n\nServed with side of your choice of dipping sauce.  We suggest our home made buttermilk ranch.	12	6	2020-05-27 21:57:04.715-04	2020-06-23 12:55:48.671-04
3	Hawaiian Chicken Pizza	Pineapples and chicken on a pizza.  Trust us.  It's good.	14	3	2020-05-27 21:45:25.872-04	2020-06-23 12:56:18.385-04
14	Peppercorn Steak and Garlic Mashed Potatoes	What goes better with wine than a juicy steak?  Well, maybe cheese, but that's up for debate.  This is a premium cut of New York Strip served with fluffy and delicate garlic mashed potatoes.	20	3	2020-05-27 22:12:34.926-04	2020-06-23 12:56:18.385-04
11	Chorizo Mozzarella Gnocci Bake	It kind of looks like a liquid pizza.  Definitely tastes as delicious.  This spicy chorizo dish will surely have you coming back for more.	11	3	2020-05-27 22:02:54.547-04	2020-06-23 12:56:18.385-04
1	La Espera Malbec 2016	A smooth, full bodied Malbec from Argentina.	12	3	2020-05-27 21:43:09.384-04	2020-06-23 12:56:18.385-04
2	Delle Venezie Pinot Grigio 2018	Pinot Grigio's finest year and smoothest wine!	8	3	2020-05-27 21:44:23.952-04	2020-06-23 12:56:18.385-04
10	Big Bada Boom Bibimbap	It's close to a poké bowl, but not quite.  This is an fresh mixture of meats, vegatables and other stuff fried hot in a bowl shaped skillet.  	12	2	2020-05-27 21:59:53.536-04	2020-06-23 12:56:28.249-04
13	Fluffy Buttermilk Biscuits, Chicken and Gravy	We serve breakfast too!  Buttermilk biscuits AND chicken!?  And gravy too!?  What a combo.  This is the MVP of breakfast.	8	1	2020-05-27 22:09:14.279-04	2020-06-23 12:56:40.91-04
4	Dry Aged Mushroom and Swiss Burger	Mmm.  Mmm.  Mushrooms.  Sweet deliciousness.  Swiss!  Ohh yeeeaaa.\n\nServed with a side of fries.	15	1	2020-05-27 21:47:42.918-04	2020-06-23 12:56:40.91-04
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders (id, address, city, dishes, amount, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.restaurants (id, name, description, created_at, updated_at, slug) FROM stdin;
5	Best Bar Ever	Look at all our seats.  With that many seats around your bar, you're pretty much guaranteed to be the best bar ever.  Once you have a few of our drinks, you're sure to think the same.	2020-05-26 20:54:41.953-04	2020-05-28 14:46:05.018-04	Best-Bar-Ever
6	Going Full Shrimp	Named 'The Best Shrimp Place in the Milky Way' by Shrimp 'N Stuff magazine, Going Full Shrimp delivers a world class, shrimptastic experience. 	2020-05-26 20:59:25.703-04	2020-06-04 06:49:20.287-04	Going-Full-Shrimp
3	Swanky Wine	Like the name suggests.  A swanky wine bar accompanied with indulgent tapas and delicate... uhh... delicacies.  Come feel the style oozing out of our walls and into your soul.	2020-05-26 20:52:00.565-04	2020-05-27 10:23:40.943-04	Swanky-Wine
2	Retrowave Poké	A little retro style delivering that poké bowl goodness.  Enjoy a bowl of raw fish and other random things while blinded by dazzling neon lights!  You don't need eyes to experience deliciousness.	2020-05-26 20:49:47.111-04	2020-05-26 20:49:47.111-04	Retrowave-Poke
1	I Want Burger	The best burgers in all the land!  So good, you'll forget how to speak and all you'll be able to say is... 'I WANT BURGER'.	2020-05-26 02:24:54.883-04	2020-05-28 00:49:15.992-04	I-Want-Burger
4	Good Food Restaurant	How can we say it any better?  Our restaurant serves good food.  The goodest of goods.  You might even say... great! 	2020-05-26 20:53:17.748-04	2020-05-28 00:45:18.926-04	Good-Food-Restaurant
\.


--
-- Data for Name: strapi_administrator; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.strapi_administrator (id, username, email, password, "resetPasswordToken", blocked) FROM stdin;
1	admin	zak.williams2287@gmail.com	$2a$10$MeLBTzDMX2Rvqi/Bw0.pZOYlSZNnAkfRn7DAT.g/u9aK5FM5RlUL.	\N	\N
\.


--
-- Data for Name: strapi_webhooks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.strapi_webhooks (id, name, url, headers, events, enabled) FROM stdin;
\.


--
-- Data for Name: upload_file; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.upload_file (id, name, "alternativeText", caption, width, height, formats, hash, ext, mime, size, url, "previewUrl", provider, provider_metadata, created_at, updated_at) FROM stdin;
23	buttermilk_pancake_tall_stack			259	194	{"thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_buttermilk_pancake_tall_stack_fed11ba857.jpeg", "hash": "thumbnail_buttermilk_pancake_tall_stack_fed11ba857", "mime": "image/jpeg", "path": null, "size": 8.57, "width": 208, "height": 156}}	buttermilk_pancake_tall_stack_fed11ba857	.jpeg	image/jpeg	10.95	https://street-eats-images.s3.us-east-2.amazonaws.com/buttermilk_pancake_tall_stack_fed11ba857.jpeg	\N	aws-s3	\N	2020-06-23 12:49:43.15-04	2020-06-23 12:49:43.15-04
24	buttermilk_fried_chicken_on_brioche			640	640	{"small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_buttermilk_fried_chicken_on_brioche_8208e9e565.jpeg", "hash": "small_buttermilk_fried_chicken_on_brioche_8208e9e565", "mime": "image/jpeg", "path": null, "size": 54.49, "width": 500, "height": 500}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_buttermilk_fried_chicken_on_brioche_8208e9e565.jpeg", "hash": "thumbnail_buttermilk_fried_chicken_on_brioche_8208e9e565", "mime": "image/jpeg", "path": null, "size": 6.98, "width": 156, "height": 156}}	buttermilk_fried_chicken_on_brioche_8208e9e565	.jpeg	image/jpeg	87.62	https://street-eats-images.s3.us-east-2.amazonaws.com/buttermilk_fried_chicken_on_brioche_8208e9e565.jpeg	\N	aws-s3	\N	2020-06-23 12:49:44.276-04	2020-06-23 12:49:44.276-04
25	chorizo_mozzarella_gnocci_bake			700	636	{"small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_chorizo_mozzarella_gnocci_bake_37b3aae980.jpeg", "hash": "small_chorizo_mozzarella_gnocci_bake_37b3aae980", "mime": "image/jpeg", "path": null, "size": 75.89, "width": 500, "height": 454}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_chorizo_mozzarella_gnocci_bake_37b3aae980.jpeg", "hash": "thumbnail_chorizo_mozzarella_gnocci_bake_37b3aae980", "mime": "image/jpeg", "path": null, "size": 9.75, "width": 172, "height": 156}}	chorizo_mozzarella_gnocci_bake_37b3aae980	.jpeg	image/jpeg	150.32	https://street-eats-images.s3.us-east-2.amazonaws.com/chorizo_mozzarella_gnocci_bake_37b3aae980.jpeg	\N	aws-s3	\N	2020-06-23 12:49:44.284-04	2020-06-23 12:49:44.284-04
26	fluffy_buttermilk_biscuits_chicken_and_gravy			870	565	{"small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_fluffy_buttermilk_biscuits_chicken_and_gravy_90d56a7b7e.jpeg", "hash": "small_fluffy_buttermilk_biscuits_chicken_and_gravy_90d56a7b7e", "mime": "image/jpeg", "path": null, "size": 24.67, "width": 500, "height": 325}, "medium": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/medium_fluffy_buttermilk_biscuits_chicken_and_gravy_90d56a7b7e.jpeg", "hash": "medium_fluffy_buttermilk_biscuits_chicken_and_gravy_90d56a7b7e", "mime": "image/jpeg", "path": null, "size": 43.95, "width": 750, "height": 487}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_fluffy_buttermilk_biscuits_chicken_and_gravy_90d56a7b7e.jpeg", "hash": "thumbnail_fluffy_buttermilk_biscuits_chicken_and_gravy_90d56a7b7e", "mime": "image/jpeg", "path": null, "size": 8.38, "width": 240, "height": 156}}	fluffy_buttermilk_biscuits_chicken_and_gravy_90d56a7b7e	.jpeg	image/jpeg	51.16	https://street-eats-images.s3.us-east-2.amazonaws.com/fluffy_buttermilk_biscuits_chicken_and_gravy_90d56a7b7e.jpeg	\N	aws-s3	\N	2020-06-23 12:49:45.398-04	2020-06-23 12:49:45.398-04
27	bibimbap			1000	1500	{"large": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/large_bibimbap_50de40712a.jpeg", "hash": "large_bibimbap_50de40712a", "mime": "image/jpeg", "path": null, "size": 65.76, "width": 667, "height": 1000}, "small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_bibimbap_50de40712a.jpeg", "hash": "small_bibimbap_50de40712a", "mime": "image/jpeg", "path": null, "size": 19.89, "width": 333, "height": 500}, "medium": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/medium_bibimbap_50de40712a.jpeg", "hash": "medium_bibimbap_50de40712a", "mime": "image/jpeg", "path": null, "size": 40.14, "width": 500, "height": 750}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_bibimbap_50de40712a.jpeg", "hash": "thumbnail_bibimbap_50de40712a", "mime": "image/jpeg", "path": null, "size": 2.96, "width": 104, "height": 156}}	bibimbap_50de40712a	.jpeg	image/jpeg	128.15	https://street-eats-images.s3.us-east-2.amazonaws.com/bibimbap_50de40712a.jpeg	\N	aws-s3	\N	2020-06-23 12:49:45.478-04	2020-06-23 12:49:45.478-04
28	gouda_mushroom_onion_grilled_cheese			600	733	{"small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_gouda_mushroom_onion_grilled_cheese_16402828de.jpeg", "hash": "small_gouda_mushroom_onion_grilled_cheese_16402828de", "mime": "image/jpeg", "path": null, "size": 49.72, "width": 409, "height": 500}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_gouda_mushroom_onion_grilled_cheese_16402828de.jpeg", "hash": "thumbnail_gouda_mushroom_onion_grilled_cheese_16402828de", "mime": "image/jpeg", "path": null, "size": 6.31, "width": 128, "height": 156}}	gouda_mushroom_onion_grilled_cheese_16402828de	.jpeg	image/jpeg	92.25	https://street-eats-images.s3.us-east-2.amazonaws.com/gouda_mushroom_onion_grilled_cheese_16402828de.jpeg	\N	aws-s3	\N	2020-06-23 12:49:46.283-04	2020-06-23 12:49:46.283-04
29	chicken_and_fries_combo			1200	1200	{"large": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/large_chicken_and_fries_combo_acede66611.jpeg", "hash": "large_chicken_and_fries_combo_acede66611", "mime": "image/jpeg", "path": null, "size": 168.82, "width": 1000, "height": 1000}, "small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_chicken_and_fries_combo_acede66611.jpeg", "hash": "small_chicken_and_fries_combo_acede66611", "mime": "image/jpeg", "path": null, "size": 50.1, "width": 500, "height": 500}, "medium": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/medium_chicken_and_fries_combo_acede66611.jpeg", "hash": "medium_chicken_and_fries_combo_acede66611", "mime": "image/jpeg", "path": null, "size": 103.96, "width": 750, "height": 750}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_chicken_and_fries_combo_acede66611.jpeg", "hash": "thumbnail_chicken_and_fries_combo_acede66611", "mime": "image/jpeg", "path": null, "size": 7.48, "width": 156, "height": 156}}	chicken_and_fries_combo_acede66611	.jpeg	image/jpeg	220.39	https://street-eats-images.s3.us-east-2.amazonaws.com/chicken_and_fries_combo_acede66611.jpeg	\N	aws-s3	\N	2020-06-23 12:49:47.73-04	2020-06-23 12:49:47.73-04
30	hawaiian_chicken_pizza			1000	1208	{"large": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/large_hawaiian_chicken_pizza_4c64f10895.jpeg", "hash": "large_hawaiian_chicken_pizza_4c64f10895", "mime": "image/jpeg", "path": null, "size": 193.58, "width": 828, "height": 1000}, "small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_hawaiian_chicken_pizza_4c64f10895.jpeg", "hash": "small_hawaiian_chicken_pizza_4c64f10895", "mime": "image/jpeg", "path": null, "size": 58.49, "width": 414, "height": 500}, "medium": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/medium_hawaiian_chicken_pizza_4c64f10895.jpeg", "hash": "medium_hawaiian_chicken_pizza_4c64f10895", "mime": "image/jpeg", "path": null, "size": 119.85, "width": 621, "height": 750}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_hawaiian_chicken_pizza_4c64f10895.jpeg", "hash": "thumbnail_hawaiian_chicken_pizza_4c64f10895", "mime": "image/jpeg", "path": null, "size": 8.05, "width": 129, "height": 156}}	hawaiian_chicken_pizza_4c64f10895	.jpeg	image/jpeg	265.80	https://street-eats-images.s3.us-east-2.amazonaws.com/hawaiian_chicken_pizza_4c64f10895.jpeg	\N	aws-s3	\N	2020-06-23 12:49:48.613-04	2020-06-23 12:49:48.613-04
31	i_want_burger			867	1300	{"large": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/large_i_want_burger_6d294e4f76.jpeg", "hash": "large_i_want_burger_6d294e4f76", "mime": "image/jpeg", "path": null, "size": 76.12, "width": 667, "height": 1000}, "small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_i_want_burger_6d294e4f76.jpeg", "hash": "small_i_want_burger_6d294e4f76", "mime": "image/jpeg", "path": null, "size": 26.6, "width": 333, "height": 500}, "medium": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/medium_i_want_burger_6d294e4f76.jpeg", "hash": "medium_i_want_burger_6d294e4f76", "mime": "image/jpeg", "path": null, "size": 49.76, "width": 500, "height": 750}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_i_want_burger_6d294e4f76.jpeg", "hash": "thumbnail_i_want_burger_6d294e4f76", "mime": "image/jpeg", "path": null, "size": 4.66, "width": 104, "height": 156}}	i_want_burger_6d294e4f76	.jpeg	image/jpeg	100.51	https://street-eats-images.s3.us-east-2.amazonaws.com/i_want_burger_6d294e4f76.jpeg	\N	aws-s3	\N	2020-06-23 12:49:48.812-04	2020-06-23 12:49:48.812-04
32	mmm_mmm_good			1880	1253	{"large": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/large_mmm_mmm_good_f86c018679.jpeg", "hash": "large_mmm_mmm_good_f86c018679", "mime": "image/jpeg", "path": null, "size": 71.26, "width": 1000, "height": 666}, "small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_mmm_mmm_good_f86c018679.jpeg", "hash": "small_mmm_mmm_good_f86c018679", "mime": "image/jpeg", "path": null, "size": 25.89, "width": 500, "height": 333}, "medium": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/medium_mmm_mmm_good_f86c018679.jpeg", "hash": "medium_mmm_mmm_good_f86c018679", "mime": "image/jpeg", "path": null, "size": 46.45, "width": 750, "height": 500}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_mmm_mmm_good_f86c018679.jpeg", "hash": "thumbnail_mmm_mmm_good_f86c018679", "mime": "image/jpeg", "path": null, "size": 8.71, "width": 234, "height": 156}}	mmm_mmm_good_f86c018679	.jpeg	image/jpeg	160.08	https://street-eats-images.s3.us-east-2.amazonaws.com/mmm_mmm_good_f86c018679.jpeg	\N	aws-s3	\N	2020-06-23 12:49:49.467-04	2020-06-23 12:49:49.467-04
33	mushroom_and_swiss_stuffed_burger			800	800	{"small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_mushroom_and_swiss_stuffed_burger_a0ec721e53.jpeg", "hash": "small_mushroom_and_swiss_stuffed_burger_a0ec721e53", "mime": "image/jpeg", "path": null, "size": 66.09, "width": 500, "height": 500}, "medium": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/medium_mushroom_and_swiss_stuffed_burger_a0ec721e53.jpeg", "hash": "medium_mushroom_and_swiss_stuffed_burger_a0ec721e53", "mime": "image/jpeg", "path": null, "size": 131.66, "width": 750, "height": 750}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_mushroom_and_swiss_stuffed_burger_a0ec721e53.jpeg", "hash": "thumbnail_mushroom_and_swiss_stuffed_burger_a0ec721e53", "mime": "image/jpeg", "path": null, "size": 8.34, "width": 156, "height": 156}}	mushroom_and_swiss_stuffed_burger_a0ec721e53	.jpeg	image/jpeg	150.20	https://street-eats-images.s3.us-east-2.amazonaws.com/mushroom_and_swiss_stuffed_burger_a0ec721e53.jpeg	\N	aws-s3	\N	2020-06-23 12:49:50.574-04	2020-06-23 12:49:50.574-04
34	malbec_la_espera_2016			1080	1350	{"large": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/large_malbec_la_espera_2016_7b06890600.jpeg", "hash": "large_malbec_la_espera_2016_7b06890600", "mime": "image/jpeg", "path": null, "size": 121.52, "width": 800, "height": 1000}, "small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_malbec_la_espera_2016_7b06890600.jpeg", "hash": "small_malbec_la_espera_2016_7b06890600", "mime": "image/jpeg", "path": null, "size": 35.51, "width": 400, "height": 500}, "medium": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/medium_malbec_la_espera_2016_7b06890600.jpeg", "hash": "medium_malbec_la_espera_2016_7b06890600", "mime": "image/jpeg", "path": null, "size": 73.03, "width": 600, "height": 750}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_malbec_la_espera_2016_7b06890600.jpeg", "hash": "thumbnail_malbec_la_espera_2016_7b06890600", "mime": "image/jpeg", "path": null, "size": 5.14, "width": 125, "height": 156}}	malbec_la_espera_2016_7b06890600	.jpeg	image/jpeg	207.41	https://street-eats-images.s3.us-east-2.amazonaws.com/malbec_la_espera_2016_7b06890600.jpeg	\N	aws-s3	\N	2020-06-23 12:49:51.161-04	2020-06-23 12:49:51.161-04
35	peppercorn_steak_and_garlic_mashed_potatoes			1600	1067	{"large": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/large_peppercorn_steak_and_garlic_mashed_potatoes_7c18a2f861.jpeg", "hash": "large_peppercorn_steak_and_garlic_mashed_potatoes_7c18a2f861", "mime": "image/jpeg", "path": null, "size": 96.33, "width": 1000, "height": 667}, "small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_peppercorn_steak_and_garlic_mashed_potatoes_7c18a2f861.jpeg", "hash": "small_peppercorn_steak_and_garlic_mashed_potatoes_7c18a2f861", "mime": "image/jpeg", "path": null, "size": 32.28, "width": 500, "height": 333}, "medium": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/medium_peppercorn_steak_and_garlic_mashed_potatoes_7c18a2f861.jpeg", "hash": "medium_peppercorn_steak_and_garlic_mashed_potatoes_7c18a2f861", "mime": "image/jpeg", "path": null, "size": 60.21, "width": 750, "height": 500}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_peppercorn_steak_and_garlic_mashed_potatoes_7c18a2f861.jpeg", "hash": "thumbnail_peppercorn_steak_and_garlic_mashed_potatoes_7c18a2f861", "mime": "image/jpeg", "path": null, "size": 9.85, "width": 234, "height": 156}}	peppercorn_steak_and_garlic_mashed_potatoes_7c18a2f861	.jpeg	image/jpeg	141.65	https://street-eats-images.s3.us-east-2.amazonaws.com/peppercorn_steak_and_garlic_mashed_potatoes_7c18a2f861.jpeg	\N	aws-s3	\N	2020-06-23 12:49:51.61-04	2020-06-23 12:49:51.61-04
36	garlic_pork_chops_in_creamy_mushroom_gravy			1200	800	{"large": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/large_garlic_pork_chops_in_creamy_mushroom_gravy_065f5c4eff.jpeg", "hash": "large_garlic_pork_chops_in_creamy_mushroom_gravy_065f5c4eff", "mime": "image/jpeg", "path": null, "size": 263.96, "width": 1000, "height": 667}, "small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_garlic_pork_chops_in_creamy_mushroom_gravy_065f5c4eff.jpeg", "hash": "small_garlic_pork_chops_in_creamy_mushroom_gravy_065f5c4eff", "mime": "image/jpeg", "path": null, "size": 69.4, "width": 500, "height": 333}, "medium": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/medium_garlic_pork_chops_in_creamy_mushroom_gravy_065f5c4eff.jpeg", "hash": "medium_garlic_pork_chops_in_creamy_mushroom_gravy_065f5c4eff", "mime": "image/jpeg", "path": null, "size": 157.08, "width": 750, "height": 500}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_garlic_pork_chops_in_creamy_mushroom_gravy_065f5c4eff.jpeg", "hash": "thumbnail_garlic_pork_chops_in_creamy_mushroom_gravy_065f5c4eff", "mime": "image/jpeg", "path": null, "size": 16.01, "width": 234, "height": 156}}	garlic_pork_chops_in_creamy_mushroom_gravy_065f5c4eff	.jpeg	image/jpeg	357.06	https://street-eats-images.s3.us-east-2.amazonaws.com/garlic_pork_chops_in_creamy_mushroom_gravy_065f5c4eff.jpeg	\N	aws-s3	\N	2020-06-23 12:49:52.569-04	2020-06-23 12:49:52.569-04
37	pinot_grigio_delle_venezie_2018			1000	1529	{"large": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/large_pinot_grigio_delle_venezie_2018_2292bddc4d.jpeg", "hash": "large_pinot_grigio_delle_venezie_2018_2292bddc4d", "mime": "image/jpeg", "path": null, "size": 79.28, "width": 654, "height": 1000}, "small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_pinot_grigio_delle_venezie_2018_2292bddc4d.jpeg", "hash": "small_pinot_grigio_delle_venezie_2018_2292bddc4d", "mime": "image/jpeg", "path": null, "size": 26.9, "width": 327, "height": 500}, "medium": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/medium_pinot_grigio_delle_venezie_2018_2292bddc4d.jpeg", "hash": "medium_pinot_grigio_delle_venezie_2018_2292bddc4d", "mime": "image/jpeg", "path": null, "size": 49.57, "width": 491, "height": 750}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_pinot_grigio_delle_venezie_2018_2292bddc4d.jpeg", "hash": "thumbnail_pinot_grigio_delle_venezie_2018_2292bddc4d", "mime": "image/jpeg", "path": null, "size": 4.31, "width": 102, "height": 156}}	pinot_grigio_delle_venezie_2018_2292bddc4d	.jpeg	image/jpeg	154.33	https://street-eats-images.s3.us-east-2.amazonaws.com/pinot_grigio_delle_venezie_2018_2292bddc4d.jpeg	\N	aws-s3	\N	2020-06-23 12:49:53.184-04	2020-06-23 12:49:53.184-04
38	best_bar_ever			4478	3208	{"large": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/large_best_bar_ever_cfc9f4d663.jpeg", "hash": "large_best_bar_ever_cfc9f4d663", "mime": "image/jpeg", "path": null, "size": 182.02, "width": 1000, "height": 716}, "small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_best_bar_ever_cfc9f4d663.jpeg", "hash": "small_best_bar_ever_cfc9f4d663", "mime": "image/jpeg", "path": null, "size": 50.52, "width": 500, "height": 358}, "medium": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/medium_best_bar_ever_cfc9f4d663.jpeg", "hash": "medium_best_bar_ever_cfc9f4d663", "mime": "image/jpeg", "path": null, "size": 108.43, "width": 750, "height": 537}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_best_bar_ever_cfc9f4d663.jpeg", "hash": "thumbnail_best_bar_ever_cfc9f4d663", "mime": "image/jpeg", "path": null, "size": 11.63, "width": 218, "height": 156}}	best_bar_ever_cfc9f4d663	.jpeg	image/jpeg	3888.03	https://street-eats-images.s3.us-east-2.amazonaws.com/best_bar_ever_cfc9f4d663.jpeg	\N	aws-s3	\N	2020-06-23 12:49:53.49-04	2020-06-23 12:49:53.49-04
39	spaghetti_with_meatballs			640	640	{"small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_spaghetti_with_meatballs_10df730440.jpeg", "hash": "small_spaghetti_with_meatballs_10df730440", "mime": "image/jpeg", "path": null, "size": 51.64, "width": 500, "height": 500}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_spaghetti_with_meatballs_10df730440.jpeg", "hash": "thumbnail_spaghetti_with_meatballs_10df730440", "mime": "image/jpeg", "path": null, "size": 6.4, "width": 156, "height": 156}}	spaghetti_with_meatballs_10df730440	.jpeg	image/jpeg	79.65	https://street-eats-images.s3.us-east-2.amazonaws.com/spaghetti_with_meatballs_10df730440.jpeg	\N	aws-s3	\N	2020-06-23 12:49:53.943-04	2020-06-23 12:49:53.943-04
40	retrowave			5158	3560	{"large": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/large_retrowave_6b5955f714.jpeg", "hash": "large_retrowave_6b5955f714", "mime": "image/jpeg", "path": null, "size": 119.39, "width": 1000, "height": 690}, "small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_retrowave_6b5955f714.jpeg", "hash": "small_retrowave_6b5955f714", "mime": "image/jpeg", "path": null, "size": 36.07, "width": 500, "height": 345}, "medium": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/medium_retrowave_6b5955f714.jpeg", "hash": "medium_retrowave_6b5955f714", "mime": "image/jpeg", "path": null, "size": 73.39, "width": 750, "height": 518}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_retrowave_6b5955f714.jpeg", "hash": "thumbnail_retrowave_6b5955f714", "mime": "image/jpeg", "path": null, "size": 9.5, "width": 226, "height": 156}}	retrowave_6b5955f714	.jpeg	image/jpeg	1301.96	https://street-eats-images.s3.us-east-2.amazonaws.com/retrowave_6b5955f714.jpeg	\N	aws-s3	\N	2020-06-23 12:49:54.239-04	2020-06-23 12:49:54.239-04
41	rosemary_garlic_pork_roast			640	896	{"small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_rosemary_garlic_pork_roast_922db9fdaf.jpeg", "hash": "small_rosemary_garlic_pork_roast_922db9fdaf", "mime": "image/jpeg", "path": null, "size": 53.2, "width": 357, "height": 500}, "medium": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/medium_rosemary_garlic_pork_roast_922db9fdaf.jpeg", "hash": "medium_rosemary_garlic_pork_roast_922db9fdaf", "mime": "image/jpeg", "path": null, "size": 102.81, "width": 536, "height": 750}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_rosemary_garlic_pork_roast_922db9fdaf.jpeg", "hash": "thumbnail_rosemary_garlic_pork_roast_922db9fdaf", "mime": "image/jpeg", "path": null, "size": 7.33, "width": 111, "height": 156}}	rosemary_garlic_pork_roast_922db9fdaf	.jpeg	image/jpeg	139.95	https://street-eats-images.s3.us-east-2.amazonaws.com/rosemary_garlic_pork_roast_922db9fdaf.jpeg	\N	aws-s3	\N	2020-06-23 12:49:55.002-04	2020-06-23 12:49:55.002-04
42	swanky_wine			5184	3456	{"large": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/large_swanky_wine_7568df9ba2.jpeg", "hash": "large_swanky_wine_7568df9ba2", "mime": "image/jpeg", "path": null, "size": 75.35, "width": 1000, "height": 667}, "small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_swanky_wine_7568df9ba2.jpeg", "hash": "small_swanky_wine_7568df9ba2", "mime": "image/jpeg", "path": null, "size": 28.18, "width": 500, "height": 333}, "medium": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/medium_swanky_wine_7568df9ba2.jpeg", "hash": "medium_swanky_wine_7568df9ba2", "mime": "image/jpeg", "path": null, "size": 50.38, "width": 750, "height": 500}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_swanky_wine_7568df9ba2.jpeg", "hash": "thumbnail_swanky_wine_7568df9ba2", "mime": "image/jpeg", "path": null, "size": 9.55, "width": 234, "height": 156}}	swanky_wine_7568df9ba2	.jpeg	image/jpeg	1790.89	https://street-eats-images.s3.us-east-2.amazonaws.com/swanky_wine_7568df9ba2.jpeg	\N	aws-s3	\N	2020-06-23 12:50:01.88-04	2020-06-23 12:50:01.88-04
43	shrimpolah			4401	6601	{"large": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/large_shrimpolah_6eb6d664c3.jpeg", "hash": "large_shrimpolah_6eb6d664c3", "mime": "image/jpeg", "path": null, "size": 112.25, "width": 667, "height": 1000}, "small": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/small_shrimpolah_6eb6d664c3.jpeg", "hash": "small_shrimpolah_6eb6d664c3", "mime": "image/jpeg", "path": null, "size": 36.42, "width": 333, "height": 500}, "medium": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/medium_shrimpolah_6eb6d664c3.jpeg", "hash": "medium_shrimpolah_6eb6d664c3", "mime": "image/jpeg", "path": null, "size": 68.77, "width": 500, "height": 750}, "thumbnail": {"ext": ".jpeg", "url": "https://street-eats-images.s3.us-east-2.amazonaws.com/thumbnail_shrimpolah_6eb6d664c3.jpeg", "hash": "thumbnail_shrimpolah_6eb6d664c3", "mime": "image/jpeg", "path": null, "size": 5.61, "width": 104, "height": 156}}	shrimpolah_6eb6d664c3	.jpeg	image/jpeg	2746.20	https://street-eats-images.s3.us-east-2.amazonaws.com/shrimpolah_6eb6d664c3.jpeg	\N	aws-s3	\N	2020-06-23 12:50:02.017-04	2020-06-23 12:50:02.017-04
\.


--
-- Data for Name: upload_file_morph; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.upload_file_morph (id, upload_file_id, related_id, related_type, field, "order") FROM stdin;
52	34	1	dishes	image	1
53	37	2	dishes	image	1
54	30	3	dishes	image	1
55	33	4	dishes	image	1
56	39	5	dishes	image	1
58	28	7	dishes	image	1
59	41	8	dishes	image	1
60	36	6	dishes	image	1
61	29	9	dishes	image	1
62	27	10	dishes	image	1
63	25	11	dishes	image	1
65	24	12	dishes	image	1
66	26	13	dishes	image	1
67	35	14	dishes	image	1
68	38	5	restaurants	image	1
69	43	6	restaurants	image	1
70	42	3	restaurants	image	1
71	40	2	restaurants	image	1
72	31	1	restaurants	image	1
73	32	4	restaurants	image	1
\.


--
-- Data for Name: users-permissions_permission; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."users-permissions_permission" (id, type, controller, action, enabled, policy, role) FROM stdin;
1	content-manager	components	findcomponent	f		1
2	content-manager	components	findcomponent	f		2
3	content-manager	components	listcomponents	f		1
4	content-manager	components	listcomponents	f		2
5	content-manager	components	updatecomponent	f		1
6	content-manager	components	updatecomponent	f		2
7	content-manager	contentmanager	checkuidavailability	f		1
8	content-manager	contentmanager	checkuidavailability	f		2
9	content-manager	contentmanager	count	f		1
10	content-manager	contentmanager	count	f		2
12	content-manager	contentmanager	create	f		2
11	content-manager	contentmanager	create	f		1
13	content-manager	contentmanager	delete	f		1
14	content-manager	contentmanager	delete	f		2
15	content-manager	contentmanager	deletemany	f		1
16	content-manager	contentmanager	deletemany	f		2
17	content-manager	contentmanager	find	f		1
18	content-manager	contentmanager	find	f		2
19	content-manager	contentmanager	findone	f		1
20	content-manager	contentmanager	findone	f		2
21	content-manager	contentmanager	generateuid	f		1
22	content-manager	contentmanager	generateuid	f		2
23	content-manager	contentmanager	update	f		1
24	content-manager	contentmanager	update	f		2
25	content-manager	contenttypes	findcontenttype	f		1
26	content-manager	contenttypes	findcontenttype	f		2
27	content-manager	contenttypes	listcontenttypes	f		1
28	content-manager	contenttypes	listcontenttypes	f		2
29	content-manager	contenttypes	updatecontenttype	f		1
30	content-manager	contenttypes	updatecontenttype	f		2
31	content-type-builder	componentcategories	deletecategory	f		1
32	content-type-builder	componentcategories	deletecategory	f		2
33	content-type-builder	componentcategories	editcategory	f		1
34	content-type-builder	componentcategories	editcategory	f		2
35	content-type-builder	components	createcomponent	f		1
36	content-type-builder	components	createcomponent	f		2
37	content-type-builder	components	deletecomponent	f		1
38	content-type-builder	components	deletecomponent	f		2
39	content-type-builder	components	getcomponent	f		1
40	content-type-builder	components	getcomponent	f		2
41	content-type-builder	components	getcomponents	f		1
42	content-type-builder	components	getcomponents	f		2
44	content-type-builder	components	updatecomponent	f		2
43	content-type-builder	components	updatecomponent	f		1
45	content-type-builder	connections	getconnections	f		1
46	content-type-builder	connections	getconnections	f		2
47	content-type-builder	contenttypes	createcontenttype	f		1
207	application	dish	update	f		1
51	content-type-builder	contenttypes	getcontenttype	f		1
52	content-type-builder	contenttypes	getcontenttype	f		2
53	content-type-builder	contenttypes	getcontenttypes	f		1
54	content-type-builder	contenttypes	getcontenttypes	f		2
55	content-type-builder	contenttypes	updatecontenttype	f		1
56	content-type-builder	contenttypes	updatecontenttype	f		2
217	application	order	findone	f		1
61	email	email	send	f		1
62	email	email	send	f		2
65	upload	proxy	uploadproxy	f		1
66	upload	proxy	uploadproxy	f		2
67	upload	upload	count	f		1
71	upload	upload	find	f		1
72	upload	upload	find	f		2
73	upload	upload	findone	f		1
74	upload	upload	findone	f		2
75	upload	upload	getsettings	f		1
76	upload	upload	getsettings	f		2
77	upload	upload	search	f		1
237	application	restaurant	update	f		1
227	application	restaurant	count	t		1
81	upload	upload	upload	f		1
82	upload	upload	upload	f		2
83	users-permissions	auth	callback	f		1
84	users-permissions	auth	callback	t		2
197	application	dish	count	t		1
87	users-permissions	auth	connect	t		1
91	users-permissions	auth	forgotpassword	f		1
92	users-permissions	auth	forgotpassword	t		2
93	users-permissions	auth	register	f		1
94	users-permissions	auth	register	t		2
95	users-permissions	auth	sendemailconfirmation	f		1
96	users-permissions	user	create	f		1
97	users-permissions	auth	sendemailconfirmation	f		2
101	users-permissions	user	destroyall	f		1
102	users-permissions	user	destroyall	f		2
103	users-permissions	user	find	f		1
106	users-permissions	user	findone	f		2
105	users-permissions	user	findone	f		1
104	users-permissions	user	find	f		2
193	users-permissions	auth	resetpassword	f		2
48	content-type-builder	contenttypes	createcontenttype	f		2
68	upload	upload	count	f		2
78	upload	upload	search	f		2
88	users-permissions	auth	connect	t		2
99	users-permissions	user	destroy	f		1
109	users-permissions	user	update	f		1
118	users-permissions	userspermissions	getadvancedsettings	f		2
128	users-permissions	userspermissions	getrole	f		2
139	users-permissions	userspermissions	searchusers	f		2
209	application	order	count	f		1
191	content-type-builder	builder	getreservednames	f		1
229	application	restaurant	create	f		1
219	application	order	paymentintent_create	t		1
198	application	dish	count	t		2
49	content-type-builder	contenttypes	deletecontenttype	f		1
199	application	dish	create	f		1
69	upload	upload	destroy	f		1
79	upload	upload	updatesettings	f		1
89	users-permissions	auth	emailconfirmation	f		1
108	users-permissions	user	me	t		2
119	users-permissions	userspermissions	getemailtemplate	f		1
129	users-permissions	userspermissions	getroles	f		1
138	users-permissions	userspermissions	updateadvancedsettings	f		1
208	application	dish	update	f		2
218	application	order	findone	f		2
194	content-type-builder	builder	getreservednames	f		2
238	application	restaurant	update	f		2
228	application	restaurant	count	t		2
98	users-permissions	user	create	f		2
50	content-type-builder	contenttypes	deletecontenttype	f		2
200	application	dish	create	f		2
70	upload	upload	destroy	f		2
80	upload	upload	updatesettings	f		2
90	users-permissions	auth	emailconfirmation	t		2
100	users-permissions	user	destroy	f		2
120	users-permissions	userspermissions	getemailtemplate	f		2
130	users-permissions	userspermissions	getroles	f		2
140	users-permissions	userspermissions	updateadvancedsettings	f		2
210	application	order	count	f		2
220	application	order	paymentintent_create	f		2
230	application	restaurant	create	f		2
195	users-permissions	user	count	f		1
110	users-permissions	user	update	f		2
107	users-permissions	user	me	t		1
117	users-permissions	userspermissions	getadvancedsettings	f		1
126	users-permissions	userspermissions	getproviders	f		2
136	users-permissions	userspermissions	init	t		2
201	application	dish	delete	f		1
212	application	order	create	f		2
222	application	order	paymentintent_retrieve	f		2
232	application	restaurant	delete	f		2
192	users-permissions	auth	resetpassword	f		1
111	users-permissions	userspermissions	createrole	f		1
121	users-permissions	userspermissions	getpermissions	f		1
131	users-permissions	userspermissions	getroutes	f		1
141	users-permissions	userspermissions	updateemailtemplate	f		1
196	users-permissions	user	count	f		2
202	application	dish	delete	f		2
231	application	restaurant	delete	f		1
221	application	order	paymentintent_retrieve	t		1
211	application	order	create	t		1
112	users-permissions	userspermissions	createrole	f		2
122	users-permissions	userspermissions	getpermissions	f		2
132	users-permissions	userspermissions	getroutes	f		2
142	users-permissions	userspermissions	updateemailtemplate	f		2
213	application	order	delete	f		1
223	application	order	paymentintent_update	t		1
203	application	dish	find	t		1
236	application	restaurant	findone	t		2
113	users-permissions	userspermissions	deleteprovider	f		1
123	users-permissions	userspermissions	getpolicies	f		1
133	users-permissions	userspermissions	index	f		1
143	users-permissions	userspermissions	updateproviders	f		1
214	application	order	delete	f		2
225	application	order	update	f		1
234	application	restaurant	find	t		2
204	application	dish	find	t		2
114	users-permissions	userspermissions	deleteprovider	f		2
124	users-permissions	userspermissions	getpolicies	f		2
134	users-permissions	userspermissions	index	f		2
144	users-permissions	userspermissions	updateproviders	f		2
216	application	order	find	f		2
226	application	order	update	f		2
235	application	restaurant	findone	t		1
205	application	dish	findone	t		1
115	users-permissions	userspermissions	deleterole	f		1
125	users-permissions	userspermissions	getproviders	f		1
135	users-permissions	userspermissions	init	t		1
145	users-permissions	userspermissions	updaterole	f		1
215	application	order	find	f		1
224	application	order	paymentintent_update	f		2
233	application	restaurant	find	t		1
206	application	dish	findone	t		2
116	users-permissions	userspermissions	deleterole	f		2
127	users-permissions	userspermissions	getrole	f		1
137	users-permissions	userspermissions	searchusers	f		1
146	users-permissions	userspermissions	updaterole	f		2
\.


--
-- Data for Name: users-permissions_role; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."users-permissions_role" (id, name, description, type) FROM stdin;
1	Authenticated	Default role given to authenticated user.	authenticated
2	Public	Default role given to unauthenticated user.	public
\.


--
-- Data for Name: users-permissions_user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."users-permissions_user" (id, username, email, provider, password, "resetPasswordToken", confirmed, blocked, role, created_at, updated_at, first_name, last_name) FROM stdin;
22	zwillia	zak.williams2287@gmail.com	local	$2a$10$aLn6tks7oMpUeb1/Qt2IHunLA.1aLjxwHizjvXoBoreVjbxvl8FmG	\N	t	\N	1	2020-06-18 03:42:48.731-04	2020-06-18 03:42:48.739-04	Zachary	Williams
\.


--
-- Name: core_store_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.core_store_id_seq', 28, true);


--
-- Name: dishes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.dishes_id_seq', 14, true);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: restaurants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.restaurants_id_seq', 6, true);


--
-- Name: strapi_administrator_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.strapi_administrator_id_seq', 1, true);


--
-- Name: strapi_webhooks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.strapi_webhooks_id_seq', 1, false);


--
-- Name: upload_file_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.upload_file_id_seq', 43, true);


--
-- Name: upload_file_morph_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.upload_file_morph_id_seq', 73, true);


--
-- Name: users-permissions_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users-permissions_permission_id_seq"', 238, true);


--
-- Name: users-permissions_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users-permissions_role_id_seq"', 2, true);


--
-- Name: users-permissions_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users-permissions_user_id_seq"', 22, true);


--
-- Name: core_store core_store_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_store
    ADD CONSTRAINT core_store_pkey PRIMARY KEY (id);


--
-- Name: dishes dishes_name_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dishes
    ADD CONSTRAINT dishes_name_unique UNIQUE (name);


--
-- Name: dishes dishes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.dishes
    ADD CONSTRAINT dishes_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: restaurants restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (id);


--
-- Name: strapi_administrator strapi_administrator_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.strapi_administrator
    ADD CONSTRAINT strapi_administrator_pkey PRIMARY KEY (id);


--
-- Name: strapi_administrator strapi_administrator_username_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.strapi_administrator
    ADD CONSTRAINT strapi_administrator_username_unique UNIQUE (username);


--
-- Name: strapi_webhooks strapi_webhooks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.strapi_webhooks
    ADD CONSTRAINT strapi_webhooks_pkey PRIMARY KEY (id);


--
-- Name: upload_file_morph upload_file_morph_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.upload_file_morph
    ADD CONSTRAINT upload_file_morph_pkey PRIMARY KEY (id);


--
-- Name: upload_file upload_file_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.upload_file
    ADD CONSTRAINT upload_file_pkey PRIMARY KEY (id);


--
-- Name: users-permissions_permission users-permissions_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."users-permissions_permission"
    ADD CONSTRAINT "users-permissions_permission_pkey" PRIMARY KEY (id);


--
-- Name: users-permissions_role users-permissions_role_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."users-permissions_role"
    ADD CONSTRAINT "users-permissions_role_pkey" PRIMARY KEY (id);


--
-- Name: users-permissions_role users-permissions_role_type_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."users-permissions_role"
    ADD CONSTRAINT "users-permissions_role_type_unique" UNIQUE (type);


--
-- Name: users-permissions_user users-permissions_user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."users-permissions_user"
    ADD CONSTRAINT "users-permissions_user_pkey" PRIMARY KEY (id);


--
-- Name: users-permissions_user users-permissions_user_username_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."users-permissions_user"
    ADD CONSTRAINT "users-permissions_user_username_unique" UNIQUE (username);


--
-- PostgreSQL database dump complete
--

