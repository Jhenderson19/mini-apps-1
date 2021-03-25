CREATE DATABASE IF NOT EXISTS miniapps1_challenge3_transactions;
USE miniapps1_challenge3_transactions;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'transactions'
--
-- ---

DROP TABLE IF EXISTS `transactions`;

CREATE TABLE `transactions` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `id_users` INTEGER NULL DEFAULT NULL,
  `id_addresses` INTEGER NULL DEFAULT NULL,
  `id_payment` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users'
--
-- ---

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(60) NULL DEFAULT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `password` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'addresses'
--
-- ---

DROP TABLE IF EXISTS `addresses`;

CREATE TABLE `addresses` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `line1` VARCHAR(100) NULL DEFAULT NULL,
  `line2` VARCHAR(100) NULL DEFAULT NULL,
  `city` VARCHAR(100) NULL DEFAULT NULL,
  `state` VARCHAR(100) NULL DEFAULT NULL,
  `zipCode` INTEGER NULL DEFAULT NULL,
  `phoneNum` VARCHAR(16) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'payment'
--
-- ---

DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `cardNum` VARCHAR(24) NULL DEFAULT NULL,
  `exp` VARCHAR(6) NULL DEFAULT NULL,
  `sercurityCode` INTEGER NULL DEFAULT NULL,
  `zipCode` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `transactions` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);
ALTER TABLE `transactions` ADD FOREIGN KEY (id_addresses) REFERENCES `addresses` (`id`);
ALTER TABLE `transactions` ADD FOREIGN KEY (id_payment) REFERENCES `payment` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `transactions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `addresses` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `payment` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `transactions` (`id`,`id_users`,`id_addresses`,`id_payment`) VALUES
-- ('','','','');
-- INSERT INTO `users` (`id`,`name`,`email`,`password`) VALUES
-- ('','','','');
-- INSERT INTO `addresses` (`id`,`line1`,`line2`,`city`,`state`,`zipCode`,`phoneNum`) VALUES
-- ('','','','','','','');
-- INSERT INTO `payment` (`id`,`cardNum`,`exp`,`sercurityCode`,`zipCode`) VALUES
-- ('','','','','');