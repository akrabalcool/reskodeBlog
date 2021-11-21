/*
  Warnings:

  - Added the required column `contenu` to the `Commentaire` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` ADD COLUMN `titre` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `commentaire` ADD COLUMN `contenu` TEXT NOT NULL;
