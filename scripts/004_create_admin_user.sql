-- Update user profile to make them admin
-- Replace with your desired admin email
UPDATE profiles 
SET is_admin = true 
WHERE email = 'dfauzan661@gmail.com;';

-- Or if you want to make the first user admin:
-- UPDATE profiles 
-- SET is_admin = true 
-- WHERE created_at = (SELECT MIN(created_at) FROM profiles);
