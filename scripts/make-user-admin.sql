-- Replace 'your-email@example.com' with the actual email of the user you want to make admin
UPDATE profiles 
SET is_admin = true 
WHERE email = 'dfauzan661@gmail.com';

-- Verify the update
SELECT email, is_admin FROM profiles WHERE email = 'dfauzan661@gmail.com';
