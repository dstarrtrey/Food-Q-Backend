-- Create the database --
CREATE DATABASE owner_db;
USE owner_db;

-- Create a Owner table with the required fields --
CREATE TABLE OwnerLogin
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(128) NOT NULL,
	password varchar(255) NOT NULL,
  	PRIMARY KEY(id)
);


-- Idea for UserWaitList
-- CREATE TABLE Waitlist
-- (
-- 	id int NOT NULL AUTO_INCREMENT,
-- 	username varchar(128) NOT NULL,
-- 	partynum INT(12),
-- 	checkedin TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--  	PRIMARY KEY(id)
-- );