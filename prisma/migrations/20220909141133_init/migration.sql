/*
  Warnings:

  - You are about to drop the column `list_name` on the `lists` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `lists` table. All the data in the column will be lost.
  - You are about to drop the column `list_id` on the `todos` table. All the data in the column will be lost.
  - You are about to drop the column `todo_name` on the `todos` table. All the data in the column will be lost.
  - Added the required column `listName` to the `lists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `lists` table without a default value. This is not possible if the table is not empty.
  - Added the required column `listId` to the `todos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `todoName` to the `todos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "lists" DROP CONSTRAINT "lists_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "todos" DROP CONSTRAINT "todos_list_id_fkey";

-- AlterTable
ALTER TABLE "lists" DROP COLUMN "list_name",
DROP COLUMN "owner_id",
ADD COLUMN     "listName" VARCHAR(50) NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "todos" DROP COLUMN "list_id",
DROP COLUMN "todo_name",
ADD COLUMN     "listId" INTEGER NOT NULL,
ADD COLUMN     "todoName" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "lists" ADD CONSTRAINT "lists_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
