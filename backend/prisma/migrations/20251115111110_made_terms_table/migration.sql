/*
  Warnings:

  - You are about to drop the column `emailMarketing` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `marketingOptional` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `personalInfoOptional` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `personalInfoRequired` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `termsOfUse` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailMarketing",
DROP COLUMN "marketingOptional",
DROP COLUMN "personalInfoOptional",
DROP COLUMN "personalInfoRequired",
DROP COLUMN "termsOfUse";

-- CreateTable
CREATE TABLE "Terms" (
    "id" TEXT NOT NULL,
    "termsOfUse" BOOLEAN NOT NULL DEFAULT true,
    "personalInfoRequired" BOOLEAN NOT NULL DEFAULT true,
    "personalInfoOptional" BOOLEAN NOT NULL DEFAULT false,
    "marketingOptional" BOOLEAN NOT NULL DEFAULT false,
    "emailMarketing" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Terms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Terms_userId_key" ON "Terms"("userId");

-- AddForeignKey
ALTER TABLE "Terms" ADD CONSTRAINT "Terms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
