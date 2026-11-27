/*
  Warnings:

  - You are about to drop the `relatoins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `adress` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `contacts` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "relatoins";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "category_types" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "important_date_types" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "important_dates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contact_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "value" DATETIME NOT NULL,
    "notes" TEXT,
    CONSTRAINT "important_dates_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "important_dates_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "important_date_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "relations" (
    "id1" INTEGER NOT NULL,
    "id2" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,

    PRIMARY KEY ("id1", "id2", "type_id"),
    CONSTRAINT "relations_id1_fkey" FOREIGN KEY ("id1") REFERENCES "contacts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "relations_id2_fkey" FOREIGN KEY ("id2") REFERENCES "contacts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "relations_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "relation_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contacts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "second_name" TEXT,
    "last_name" TEXT,
    "categoryTypeId" INTEGER,
    "address" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "contacts_categoryTypeId_fkey" FOREIGN KEY ("categoryTypeId") REFERENCES "category_types" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_contacts" ("created_at", "id", "name", "notes", "updated_at") SELECT "created_at", "id", "name", "notes", "updated_at" FROM "contacts";
DROP TABLE "contacts";
ALTER TABLE "new_contacts" RENAME TO "contacts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "category_types_name_key" ON "category_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "important_date_types_name_key" ON "important_date_types"("name");

-- CreateIndex
CREATE INDEX "important_dates_contact_id_idx" ON "important_dates"("contact_id");

-- CreateIndex
CREATE INDEX "relations_id1_idx" ON "relations"("id1");

-- CreateIndex
CREATE INDEX "relations_id2_idx" ON "relations"("id2");

-- CreateIndex
CREATE INDEX "emails_contact_id_idx" ON "emails"("contact_id");

-- CreateIndex
CREATE INDEX "phone_numbers_contact_id_idx" ON "phone_numbers"("contact_id");

-- CreateIndex
CREATE INDEX "social_networks_contact_id_idx" ON "social_networks"("contact_id");
