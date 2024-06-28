/*
  Warnings:

  - Added the required column `avatar_url` to the `organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "avatar_url" TEXT NOT NULL;
