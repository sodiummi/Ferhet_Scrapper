-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "legal_form" VARCHAR,
    "industry" VARCHAR,
    "address" JSON,
    "phones" JSON,
    "emails" JSON,
    "website" VARCHAR,
    "founding_year" INTEGER,
    "size" VARCHAR,
    "revenue" VARCHAR,
    "country" VARCHAR,
    "management" JSON,
    "patents" JSON,
    "certifications" JSON,
    "source_url" VARCHAR,
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR NOT NULL,
    "role" VARCHAR,
    "department" VARCHAR,
    "email" VARCHAR,
    "phone" VARCHAR,
    "linkedin" VARCHAR,
    "xing" VARCHAR,
    "experience" JSON,
    "education" JSON,
    "company_id" INTEGER NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ix_companies_name" ON "companies"("name");

-- CreateIndex
CREATE INDEX "employees_company_id_idx" ON "employees"("company_id");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
