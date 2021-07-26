-- AlterTable
ALTER TABLE `contact` MODIFY `message` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `year` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `imageUrl` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
