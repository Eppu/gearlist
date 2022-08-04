/*
  Warnings:

  - Made the column `title` on table `Collection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "description" TEXT,
ALTER COLUMN "title" SET NOT NULL;
