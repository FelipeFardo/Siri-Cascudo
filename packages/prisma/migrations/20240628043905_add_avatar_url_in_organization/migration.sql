/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `organization` table. All the data in the column will be lost.
  - Added the required column `avatarUrl` to the `organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organization" DROP COLUMN "avatar_url",
ADD COLUMN     "avatarUrl" TEXT NOT NULL;
