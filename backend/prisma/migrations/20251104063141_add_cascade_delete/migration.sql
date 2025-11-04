-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_initiativeId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_initiativeId_fkey" FOREIGN KEY ("initiativeId") REFERENCES "Initiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;
