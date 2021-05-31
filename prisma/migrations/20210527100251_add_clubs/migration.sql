/*
  Warnings:

  - You are about to drop the column `phone` on the `country` table. All the data in the column will be lost.
  - Added the required column `code` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dial_code` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `country` DROP COLUMN `phone`,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `dial_code` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Club` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
