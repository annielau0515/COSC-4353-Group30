CREATE DATABASE IF NOT EXISTS fuel_company;
use fuel_company;

CREATE TABLE IF NOT EXISTS customers (
	username varchar(50) not null primary key,
    pwd varchar(50) not null,
    lastname varchar(50) not null,
    firstname varchar(50) not null,
    address varchar(100) not null,
    city varchar(50) not null,
    state char(2) not null,
    zip_code varchar(10)
);

insert into customers(username, pwd, lastname, firstname, address, city, state) 
values('theloudmute', 'liltresky', 'Walters', 'LeDontre', '20906 Neelie Ct', 'Houston', 'TX');

CREATE TABLE IF NOT EXISTS fuel_quote_history (
	username varchar(50),
	gallons int,
    price decimal(4,2),
    delivery_date date
);

DROP TABLE IF EXISTS fuel_quote;
CREATE TABLE IF NOT EXISTS fuel_quote (
	gallons int not null,
    delivery_date date,
    address varchar(50) not null,
    price decimal(4,2) not null,
    cost numeric not null
);

CREATE TABLE IF NOT EXISTS price (
	out_of_state_price decimal(4,2) not null,
    in_state_price decimal(4,2) not null
    );
insert into price(out_of_state_price, in_state_price) values(2.49, 2.65);
    
    