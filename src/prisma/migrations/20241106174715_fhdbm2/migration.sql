/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "accountType" TEXT NOT NULL DEFAULT 'adopter',
ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'password';
