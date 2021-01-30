import {MigrationInterface, QueryRunner} from "typeorm";

export class createAdminUser1611962374767 implements MigrationInterface {
    name = 'createAdminUser1611962374767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `adminUser` (`id` varchar(36) NOT NULL, `username` varchar(50) NOT NULL, `password` varchar(128) NOT NULL, UNIQUE INDEX `IDX_58bd2b086488ba1ba90847a192` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `blacklist` (`id` varchar(36) NOT NULL, `token` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `comment` (`id` varchar(36) NOT NULL, `text` varchar(255) NOT NULL, `reaction` varchar(255) NOT NULL, `disable` tinyint NOT NULL, `hasParentComment` tinyint NOT NULL DEFAULT '0', `idParentComment` varchar(255) NOT NULL DEFAULT '', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `userId` varchar(36) NULL, `topicId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `userDescription` varchar(255) NOT NULL DEFAULT '', `role` varchar(255) NOT NULL DEFAULT 'usuario', `avatar` varchar(255) NOT NULL DEFAULT '', `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `isActive` tinyint NOT NULL DEFAULT '0', `quarantineNum` int NOT NULL DEFAULT '0', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `isAdmin` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `topic` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `textBody` varchar(255) NOT NULL, `imageStorage` varchar(255) NOT NULL, `reaction` int NOT NULL DEFAULT '0', `isActive` tinyint NOT NULL DEFAULT 1, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `userId` varchar(36) NULL, `categoryId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `categories` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `author` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `imageStorage` varchar(255) NOT NULL DEFAULT '---------', `isActive` tinyint NOT NULL DEFAULT 1, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_c0354a9a009d3bb45a08655ce3b` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_b57a5333a16e092c662bd8ff5fe` FOREIGN KEY (`topicId`) REFERENCES `topic`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `topic` ADD CONSTRAINT `FK_106101142fbf646320c4d7ae231` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `topic` ADD CONSTRAINT `FK_f8bf220112570b5c2be647f0942` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `topic` DROP FOREIGN KEY `FK_f8bf220112570b5c2be647f0942`");
        await queryRunner.query("ALTER TABLE `topic` DROP FOREIGN KEY `FK_106101142fbf646320c4d7ae231`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_b57a5333a16e092c662bd8ff5fe`");
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_c0354a9a009d3bb45a08655ce3b`");
        await queryRunner.query("DROP TABLE `categories`");
        await queryRunner.query("DROP TABLE `topic`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `comment`");
        await queryRunner.query("DROP TABLE `blacklist`");
        await queryRunner.query("DROP INDEX `IDX_58bd2b086488ba1ba90847a192` ON `adminUser`");
        await queryRunner.query("DROP TABLE `adminUser`");
    }

}
