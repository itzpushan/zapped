/*
  Warnings:

  - Made the column `metadata` on table `ZapRun` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Trigger" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "ZapRun" ALTER COLUMN "metadata" SET NOT NULL,
ALTER COLUMN "metadata" SET DEFAULT '{}';
