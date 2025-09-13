-- Create an admin user by updating an existing user's profile
-- Replace 'your-email@example.com' with the actual email of the user you want to make admin

UPDATE profiles 
SET is_admin = true 
WHERE email = 'dfauzan661@gmail.com';

-- If you want to check which users exist:
-- SELECT id, email, first_name, last_name, is_admin FROM profiles;

-- To make the first user admin (if you only have one user):
-- UPDATE profiles SET is_admin = true WHERE id = (SELECT id FROM profiles LIMIT 1);
