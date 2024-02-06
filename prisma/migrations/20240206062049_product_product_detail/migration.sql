/*
  Warnings:

  - You are about to drop the `create_product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `create_product`;

-- CreateTable
CREATE TABLE `products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Product_Name` VARCHAR(150) NULL,
    `Images` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vendor_id` INTEGER NULL,
    `product_id` INTEGER NULL,
    `quantity` INTEGER NULL,
    `price` DECIMAL(10, 2) NULL,
    `available` INTEGER NULL,

    INDEX `product_id`(`product_id`),
    INDEX `vendor_id`(`vendor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `product_detail` ADD CONSTRAINT `product_detail_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product_detail` ADD CONSTRAINT `product_detail_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
