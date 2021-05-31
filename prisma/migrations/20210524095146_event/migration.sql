/*
  Warnings:

  - Made the column `image` on table `event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `event` MODIFY `image` VARCHAR(191) NOT NULL,
    MODIFY `ticketprice` DOUBLE;
