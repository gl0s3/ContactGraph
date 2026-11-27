/*
  Warnings:

  - You are about to drop the column `created_at` on the `emails` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `emails` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `phone_numbers` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `phone_numbers` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `social_networks` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `social_networks` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_emails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contact_id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    CONSTRAINT "emails_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_emails" ("contact_id", "email", "id") SELECT "contact_id", "email", "id" FROM "emails";
DROP TABLE "emails";
ALTER TABLE "new_emails" RENAME TO "emails";
CREATE TABLE "new_phone_numbers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contact_id" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    CONSTRAINT "phone_numbers_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_phone_numbers" ("contact_id", "id", "phone") SELECT "contact_id", "id", "phone" FROM "phone_numbers";
DROP TABLE "phone_numbers";
ALTER TABLE "new_phone_numbers" RENAME TO "phone_numbers";
CREATE TABLE "new_social_networks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contact_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    CONSTRAINT "social_networks_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "social_networks_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "social_network_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_social_networks" ("contact_id", "id", "type_id", "value") SELECT "contact_id", "id", "type_id", "value" FROM "social_networks";
DROP TABLE "social_networks";
ALTER TABLE "new_social_networks" RENAME TO "social_networks";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
