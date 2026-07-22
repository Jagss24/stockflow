-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,
    "businessName" TEXT NOT NULL,
    "contactPersonName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "billingAddress" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "gstNumber" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);
