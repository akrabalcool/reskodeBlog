/*
  Warnings:

  - You are about to drop the column `titre` on the `article` table. All the data in the column will be lost.
  - You are about to drop the column `contenu` on the `commentaire` table. All the data in the column will be lost.
  - Added the required column `contenuCommentaire` to the `Commentaire` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `article` DROP COLUMN `titre`,
    ADD COLUMN `titreArticle` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `commentaire` DROP COLUMN `contenu`,
    ADD COLUMN `contenuCommentaire` TEXT NOT NULL;
