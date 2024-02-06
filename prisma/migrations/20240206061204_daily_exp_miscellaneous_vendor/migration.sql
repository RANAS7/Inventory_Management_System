-- CreateTable
CREATE TABLE `daily_exp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` INTEGER NULL,
    `amount` DECIMAL(10, 2) NULL,
    `payment_type` VARCHAR(50) NULL,
    `detail` TEXT NULL,

    INDEX `created_by`(`created_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `miscellaneous` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_by` INTEGER NULL,
    `amount` DECIMAL(10, 2) NULL,
    `payment_type` VARCHAR(50) NULL,
    `detail` TEXT NULL,

    INDEX `created_by`(`created_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vendor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NULL,
    `email` VARCHAR(150) NULL,
    `contact` VARCHAR(40) NULL,
    `contact_person` VARCHAR(100) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `daily_exp` ADD CONSTRAINT `daily_exp_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `miscellaneous` ADD CONSTRAINT `miscellaneous_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
