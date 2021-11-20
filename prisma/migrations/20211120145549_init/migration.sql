-- CreateTable
CREATE TABLE `Utilisateur` (
    `idUtilisateur` VARCHAR(191) NOT NULL,
    `loginUtilisateur` VARCHAR(100) NOT NULL,
    `passwordUtilisateur` TEXT NOT NULL,

    PRIMARY KEY (`idUtilisateur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article` (
    `idArticle` VARCHAR(191) NOT NULL,
    `imageArticle` TEXT NOT NULL,
    `descriptionArticle` TEXT NOT NULL,
    `liensArticle` VARCHAR(191) NULL,
    `idUtilisateur` VARCHAR(191) NOT NULL,
    `idTypeArticle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idArticle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Commentaire` (
    `idCommentaire` VARCHAR(191) NOT NULL,
    `nomOuEmail` VARCHAR(191) NULL,
    `idArticle` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idCommentaire`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeArticle` (
    `idTypeArticle` VARCHAR(191) NOT NULL,
    `libelleTypeAticle` VARCHAR(191) NULL,

    PRIMARY KEY (`idTypeArticle`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Publicite` (
    `idPublicite` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPublicite`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_idUtilisateur_fkey` FOREIGN KEY (`idUtilisateur`) REFERENCES `Utilisateur`(`idUtilisateur`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_idTypeArticle_fkey` FOREIGN KEY (`idTypeArticle`) REFERENCES `TypeArticle`(`idTypeArticle`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commentaire` ADD CONSTRAINT `Commentaire_idArticle_fkey` FOREIGN KEY (`idArticle`) REFERENCES `Article`(`idArticle`) ON DELETE RESTRICT ON UPDATE CASCADE;
