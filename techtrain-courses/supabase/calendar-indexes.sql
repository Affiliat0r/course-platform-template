-- Calendar Integration Performance Indexes
-- Run these in Supabase SQL Editor to optimize schedule queries

-- Optimize schedule queries by course_id and start_date
CREATE INDEX IF NOT EXISTS idx_schedules_course_start
ON course_schedules(course_id, start_date);

-- Optimize queries for future schedules only
CREATE INDEX IF NOT EXISTS idx_schedules_future
ON course_schedules(start_date)
WHERE start_date >= NOW();

-- Optimize queries by date range (for calendar view)
CREATE INDEX IF NOT EXISTS idx_schedules_date_range
ON course_schedules(start_date, end_date);

-- Optimize availability checks
CREATE INDEX IF NOT EXISTS idx_schedules_availability
ON course_schedules(id, available_spots, max_participants);

-- Comments for documentation
COMMENT ON INDEX idx_schedules_course_start IS 'Optimizes getCourseSchedules() - filters by course_id and orders by start_date';
COMMENT ON INDEX idx_schedules_future IS 'Optimizes getUpcomingSchedules() - partial index for future dates only';
COMMENT ON INDEX idx_schedules_date_range IS 'Optimizes getSchedulesByDateRange() - calendar view queries';
COMMENT ON INDEX idx_schedules_availability IS 'Optimizes checkScheduleAvailability() - quick availability checks';

-- Verify indexes were created
SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'course_schedules'
ORDER BY indexname;
