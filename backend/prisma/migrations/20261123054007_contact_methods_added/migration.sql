/*
  Warnings:

  - You are about to drop the `emails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `phone_numbers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `social_network_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `social_networks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "emails";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "phone_numbers";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "social_network_types";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "social_networks";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "contact_method_types" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "contact_methods" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contact_id" INTEGER NOT NULL,
    "type_id" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    CONSTRAINT "contact_methods_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "contact_methods_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "contact_method_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "contact_method_types_name_key" ON "contact_method_types"("name");

-- CreateIndex
CREATE INDEX "contact_methods_contact_id_idx" ON "contact_methods"("contact_id");
