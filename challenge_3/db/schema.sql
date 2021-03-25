CREATE DATABASE IF NOT EXISTS miniapps1_challenge3_transactions;
USE miniapps1_challenge3_transactions;

CREATE TABLE IF NOT EXISTS transactions(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  -- User Data
  name TEXT,
  email TEXT,
  password TEXT,
  -- Address Data
  line1 TEXT,
  line2 TEXT,
  city TEXT,
  state TEXT,
  zipCode TEXT,
  phoneNumber TEXT,
  -- Payment Data
  cardNum TEXT,
  expiration TEXT,
  securityCode TEXT,
  billingZip TEXT
);

CREATE TABLE IF NOT EXISTS currentRecord(
  currentID INT NOT NULL
)