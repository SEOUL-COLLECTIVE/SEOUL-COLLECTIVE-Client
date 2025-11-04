-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "country" INTEGER,
    "gender" INTEGER,
    "age" INTEGER,
    "termsOfUse" BOOLEAN NOT NULL DEFAULT false,
    "personalInfoRequired" BOOLEAN NOT NULL DEFAULT false,
    "personalInfoOptional" BOOLEAN NOT NULL DEFAULT false,
    "marketingOptional" BOOLEAN NOT NULL DEFAULT false,
    "emailMarketing" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
