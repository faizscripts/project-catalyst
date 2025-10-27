-- Ensure Initiative.endDate > startDate
ALTER TABLE "Initiative"
    ADD CONSTRAINT initiative_dates_check
        CHECK ("endDate" > "startDate");

-- Create trigger function to enforce Task dueDate within Initiative range
CREATE OR REPLACE FUNCTION check_task_due_within_initiative()
RETURNS TRIGGER AS $$
DECLARE
initiative_start DATE;
  initiative_end DATE;
BEGIN
SELECT "startDate", "endDate"
INTO initiative_start, initiative_end
FROM "Initiative"
WHERE "id" = NEW."initiativeId";

IF NEW."dueDate" < initiative_start OR NEW."dueDate" > initiative_end THEN
    RAISE EXCEPTION 'Task dueDate (%) must be between initiative startDate (%) and endDate (%)',
      NEW."dueDate", initiative_start, initiative_end;
END IF;

RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to Task table
CREATE TRIGGER task_due_date_check
    BEFORE INSERT OR UPDATE ON "Task"
                         FOR EACH ROW EXECUTE FUNCTION check_task_due_within_initiative();
