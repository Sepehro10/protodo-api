-- CreateTable
CREATE TABLE "lists" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "list_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "list_id" INTEGER NOT NULL,
    "todo_name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "password" VARCHAR(40) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lists_id_key" ON "lists"("id");

-- CreateIndex
CREATE UNIQUE INDEX "lists_owner_id_key" ON "lists"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "todos_id_key" ON "todos"("id");

-- CreateIndex
CREATE UNIQUE INDEX "todos_list_id_key" ON "todos"("list_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "lists" ADD CONSTRAINT "lists_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
