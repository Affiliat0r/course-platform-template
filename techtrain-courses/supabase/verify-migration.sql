-- Verification Script for Production Migration
-- Run this in Supabase SQL Editor after migration to verify data integrity

-- ============================================================
-- 1. TABLE COUNTS
-- ============================================================

-- Expected: 79 courses
SELECT 'Total Courses' as metric, COUNT(*) as count FROM courses;

-- Expected: 237 schedules (3 per course)
SELECT 'Total Schedules' as metric, COUNT(*) as count FROM course_schedules;

-- Expected: 0 (no enrollments yet)
SELECT 'Total Enrollments' as metric, COUNT(*) as count FROM enrollments;

-- Expected: 0 (no users registered yet)
SELECT 'Total Profiles' as metric, COUNT(*) as count FROM profiles;

-- ============================================================
-- 2. COURSES BY CATEGORY
-- ============================================================

SELECT
  category,
  COUNT(*) as course_count,
  ROUND(AVG(price), 2) as avg_price,
  MIN(price) as min_price,
  MAX(price) as max_price
FROM courses
WHERE is_published = true
GROUP BY category
ORDER BY course_count DESC;

-- ============================================================
-- 3. COURSES BY LEVEL
-- ============================================================

SELECT
  level,
  COUNT(*) as course_count
FROM courses
GROUP BY level
ORDER BY
  CASE level
    WHEN 'beginner' THEN 1
    WHEN 'intermediate' THEN 2
    WHEN 'advanced' THEN 3
    ELSE 4
  END;

-- ============================================================
-- 4. VERIFY ALL COURSES HAVE SCHEDULES
-- ============================================================

-- This should return 0 rows (all courses should have at least 1 schedule)
SELECT
  c.id,
  c.title,
  COUNT(cs.id) as schedule_count
FROM courses c
LEFT JOIN course_schedules cs ON c.id = cs.course_id
GROUP BY c.id, c.title
HAVING COUNT(cs.id) = 0;

-- ============================================================
-- 5. VERIFY EXPECTED SCHEDULE COUNT (3 per course)
-- ============================================================

-- This should return 79 rows (one per course, all with 3 schedules)
SELECT
  c.title,
  COUNT(cs.id) as schedule_count
FROM courses c
LEFT JOIN course_schedules cs ON c.id = cs.course_id
GROUP BY c.id, c.title
HAVING COUNT(cs.id) = 3
ORDER BY c.title;

-- ============================================================
-- 6. CHECK FOR DUPLICATE SLUGS
-- ============================================================

-- This should return 0 rows (all slugs must be unique)
SELECT
  slug,
  COUNT(*) as duplicate_count,
  STRING_AGG(title, ', ') as affected_courses
FROM courses
GROUP BY slug
HAVING COUNT(*) > 1;

-- ============================================================
-- 7. CHECK FOR NULL VALUES IN REQUIRED FIELDS
-- ============================================================

-- Courses with missing required data
SELECT
  'Missing Data' as issue,
  COUNT(*) as affected_courses
FROM courses
WHERE
  slug IS NULL OR
  title IS NULL OR
  description IS NULL OR
  price IS NULL OR
  category IS NULL OR
  level IS NULL OR
  duration_hours IS NULL;

-- ============================================================
-- 8. VERIFY PRICE RANGES
-- ============================================================

SELECT
  'Price Statistics' as metric,
  MIN(price) as min_price,
  MAX(price) as max_price,
  ROUND(AVG(price), 2) as avg_price,
  COUNT(*) as total_courses
FROM courses
WHERE is_published = true;

-- Courses with unusual prices (price = 0 or very high)
SELECT
  title,
  price,
  category
FROM courses
WHERE price = 0 OR price > 5000
ORDER BY price DESC;

-- ============================================================
-- 9. VERIFY SCHEDULE DATE RANGES
-- ============================================================

-- Schedules in the past (warning, not error)
SELECT
  'Past Schedules' as metric,
  COUNT(*) as count
FROM course_schedules
WHERE start_date < CURRENT_DATE;

-- Schedules in the future (expected)
SELECT
  'Future Schedules' as metric,
  COUNT(*) as count
FROM course_schedules
WHERE start_date >= CURRENT_DATE;

-- Upcoming schedules (next 30 days)
SELECT
  c.title,
  cs.start_date,
  cs.format,
  cs.location,
  cs.available_seats
FROM course_schedules cs
JOIN courses c ON c.id = cs.course_id
WHERE cs.start_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '30 days'
ORDER BY cs.start_date;

-- ============================================================
-- 10. VERIFY SCHEDULE END DATES
-- ============================================================

-- Schedules where end_date is before start_date (should be 0)
SELECT
  c.title,
  cs.start_date,
  cs.end_date,
  cs.end_date - cs.start_date as duration_days
FROM course_schedules cs
JOIN courses c ON c.id = cs.course_id
WHERE cs.end_date < cs.start_date;

-- ============================================================
-- 11. CHECK RLS POLICIES
-- ============================================================

-- List all RLS policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ============================================================
-- 12. VERIFY TABLE STRUCTURES
-- ============================================================

-- Verify all expected tables exist
SELECT table_name, table_type
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Expected tables:
-- - courses
-- - course_schedules
-- - enrollments
-- - payments
-- - profiles
-- - reviews
-- - wishlists

-- ============================================================
-- 13. CHECK INDEXES
-- ============================================================

-- List all indexes (for performance optimization)
SELECT
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- ============================================================
-- 14. SAMPLE COURSE DATA
-- ============================================================

-- Show sample of migrated courses (first 5)
SELECT
  id,
  slug,
  title,
  category,
  level,
  price,
  duration_hours,
  is_published,
  created_at
FROM courses
ORDER BY created_at DESC
LIMIT 5;

-- ============================================================
-- 15. FULL DATA INTEGRITY REPORT
-- ============================================================

SELECT
  'MIGRATION INTEGRITY REPORT' as report_name,
  (SELECT COUNT(*) FROM courses) as total_courses,
  (SELECT COUNT(*) FROM course_schedules) as total_schedules,
  (SELECT COUNT(*) FROM courses WHERE is_published = false) as unpublished_courses,
  (SELECT COUNT(DISTINCT category) FROM courses) as unique_categories,
  (SELECT COUNT(DISTINCT level) FROM courses) as unique_levels,
  (SELECT COUNT(*) FROM courses WHERE slug IS NULL OR title IS NULL) as courses_with_null_data,
  (SELECT COUNT(*) FROM (
    SELECT slug FROM courses GROUP BY slug HAVING COUNT(*) > 1
  ) dupes) as duplicate_slugs;

-- ============================================================
-- EXPECTED RESULTS SUMMARY
-- ============================================================

/*
✅ Expected Results:

1. Total Courses: 79
2. Total Schedules: 237
3. Courses by Category: Should show 7-8 different categories
4. All courses have schedules: 0 rows (all courses have at least 1 schedule)
5. Courses with 3 schedules: 79 rows
6. Duplicate slugs: 0 rows
7. Missing required data: 0 affected courses
8. Price range: Min ~495, Max ~2495, Avg ~1200
9. RLS Policies: Multiple policies for each table
10. Tables: 7 tables (courses, course_schedules, enrollments, payments, profiles, reviews, wishlists)
11. Null data: 0 courses
12. Duplicate slugs: 0

If all checks pass ✅, migration is successful!

If any checks fail ❌:
1. Document the issue
2. Check migration logs for errors
3. Consider truncating and re-running migration
4. Contact Supabase support if issue persists
*/
