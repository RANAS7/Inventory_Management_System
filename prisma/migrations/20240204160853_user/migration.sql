-- CreateTable
CREATE TABLE `create_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Product_Name` VARCHAR(150) NULL,
    `Images` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(150) NULL,
    `Email` VARCHAR(150) NULL,
    `Role` VARCHAR(100) NULL,
    `Password` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
