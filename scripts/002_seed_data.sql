-- Insert sample categories
INSERT INTO categories (name, description, image_url) VALUES
('Electronics', 'Electronic devices and gadgets', '/placeholder.svg?height=200&width=200'),
('Clothing', 'Fashion and apparel', '/placeholder.svg?height=200&width=200'),
('Home & Garden', 'Home improvement and garden supplies', '/placeholder.svg?height=200&width=200'),
('Sports', 'Sports equipment and accessories', '/placeholder.svg?height=200&width=200'),
('Books', 'Books and educational materials', '/placeholder.svg?height=200&width=200');

-- Insert sample brands
INSERT INTO brands (name, description, logo_url) VALUES
('TechPro', 'Premium technology brand', '/placeholder.svg?height=100&width=100'),
('StyleMax', 'Fashion forward clothing', '/placeholder.svg?height=100&width=100'),
('HomeComfort', 'Quality home products', '/placeholder.svg?height=100&width=100'),
('SportElite', 'Professional sports equipment', '/placeholder.svg?height=100&width=100'),
('BookWise', 'Educational publishing', '/placeholder.svg?height=100&width=100');

-- Insert sample products
INSERT INTO products (name, description, price, stock_quantity, category_id, brand_id, image_url, images) VALUES
('Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 199.99, 50, 
  (SELECT id FROM categories WHERE name = 'Electronics'), 
  (SELECT id FROM brands WHERE name = 'TechPro'),
  '/placeholder.svg?height=400&width=400',
  ARRAY['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400']),

('Smart Watch', 'Fitness tracking smartwatch with heart rate monitor', 299.99, 30,
  (SELECT id FROM categories WHERE name = 'Electronics'), 
  (SELECT id FROM brands WHERE name = 'TechPro'),
  '/placeholder.svg?height=400&width=400',
  ARRAY['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400']),

('Cotton T-Shirt', 'Comfortable 100% cotton t-shirt', 29.99, 100,
  (SELECT id FROM categories WHERE name = 'Clothing'), 
  (SELECT id FROM brands WHERE name = 'StyleMax'),
  '/placeholder.svg?height=400&width=400',
  ARRAY['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400']),

('Running Shoes', 'Professional running shoes with advanced cushioning', 149.99, 75,
  (SELECT id FROM categories WHERE name = 'Sports'), 
  (SELECT id FROM brands WHERE name = 'SportElite'),
  '/placeholder.svg?height=400&width=400',
  ARRAY['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400']),

('Coffee Maker', 'Automatic drip coffee maker with programmable timer', 89.99, 25,
  (SELECT id FROM categories WHERE name = 'Home & Garden'), 
  (SELECT id FROM brands WHERE name = 'HomeComfort'),
  '/placeholder.svg?height=400&width=400',
  ARRAY['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400']),

('Programming Guide', 'Complete guide to modern web development', 49.99, 200,
  (SELECT id FROM categories WHERE name = 'Books'), 
  (SELECT id FROM brands WHERE name = 'BookWise'),
  '/placeholder.svg?height=400&width=400',
  ARRAY['/placeholder.svg?height=400&width=400', '/placeholder.svg?height=400&width=400']);
