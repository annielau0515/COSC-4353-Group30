CREATE DATABASE IF NOT EXISTS fuel_company;
use fuel_company;

DROP TABLE IF EXISTS user_credentials;
CREATE TABLE IF NOT EXISTS user_credentials (
	id varchar(50) not null primary key,
	password blob not null
);
	
DROP TABLE IF EXISTS client_information;
CREATE TABLE IF NOT EXISTS client_information (
	id varchar(50) not null primary key,
	full_name varchar(50) not null,
	address1 varchar(100) not null,
	address2 varchar(100),
	city varchar(100) not null,
	state char(2) not null,
	zip_code varchar(10) not null
);

DROP TABLE IF EXISTS fuel_quote;
CREATE TABLE IF NOT EXISTS fuel_quote (
	full_name varchar(50) not null,
	gallons int not null,
	delivery_date date,
	address1 varchar(100) not null,
	price decimal(4,2) not null,
	cost float not null
);

