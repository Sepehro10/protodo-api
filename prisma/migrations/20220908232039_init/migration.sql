/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "lists" DROP CONSTRAINT "lists_owner_id_fkey";

-- AlterTable
ALTER TABLE "lists" ALTER COLUMN "owner_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AddForeignKey
ALTER TABLE "lists" ADD CONSTRAINT "lists_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
