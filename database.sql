CREATE DATABASE IF NOT EXISTS fuel_company;
use fuel_company;

CREATE TABLE IF NOT EXISTS user_credentials (
	id varchar(50) not null primary key,
	password blob not null
);
	
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
	cost numeric not null
);

Drop table if exists price;
CREATE TABLE IF NOT EXISTS price (
	out_of_state_price decimal(4,2) not null,
	in_state_price decimal(4,2) not null
    );
insert into price(out_of_state_price, in_state_price) values(2.49, 2.65);
