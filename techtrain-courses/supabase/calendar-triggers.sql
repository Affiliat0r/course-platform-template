-- Calendar Integration Triggers
-- Automatically update available_spots when enrollments change

-- Function to update available spots
CREATE OR REPLACE FUNCTION update_available_spots()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the available_spots for the schedule
  UPDATE course_schedules
  SET available_spots = max_participants - (
    SELECT COUNT(*)
    FROM enrollments
    WHERE schedule_id = COALESCE(NEW.schedule_id, OLD.schedule_id)
    AND status = 'active'
  )
  WHERE id = COALESCE(NEW.schedule_id, OLD.schedule_id);

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if it exists
DROP TRIGGER IF EXISTS enrollment_availability_trigger ON enrollments;

-- Create trigger for INSERT, UPDATE, DELETE on enrollments
CREATE TRIGGER enrollment_availability_trigger
AFTER INSERT OR UPDATE OR DELETE ON enrollments
FOR EACH ROW
EXECUTE FUNCTION update_available_spots();

-- Comments
COMMENT ON FUNCTION update_available_spots() IS 'Automatically updates available_spots in course_schedules when enrollments change';
COMMENT ON TRIGGER enrollment_availability_trigger ON enrollments IS 'Triggers available_spots recalculation on enrollment changes';

-- Test the trigger (optional - uncomment to test)
-- SELECT
--   cs.id,
--   cs.max_participants,
--   cs.available_spots,
--   COUNT(e.id) as active_enrollments
-- FROM course_schedules cs
-- LEFT JOIN enrollments e ON e.schedule_id = cs.id AND e.status = 'active'
-- GROUP BY cs.id
-- LIMIT 10;
