/*
  Warnings:

  - You are about to drop the column `avatarUrl` on the `organization` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organization" DROP COLUMN "avatarUrl",
ADD COLUMN     "avatar_url" TEXT;
