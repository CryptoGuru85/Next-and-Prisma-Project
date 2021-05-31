/*
  Warnings:

  - You are about to drop the column `Club` on the `event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `Club`,
    ADD COLUMN `club` VARCHAR(191);
