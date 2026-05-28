-- Create cloudinary_media table
CREATE TABLE IF NOT EXISTS cloudinary_media (
  id UUID PRIMARY KEY,
  public_id TEXT NOT NULL,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  bytes INTEGER NOT NULL,
  format TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create page_images table
CREATE TABLE IF NOT EXISTS page_images (
  id SERIAL PRIMARY KEY,
  slot_id TEXT NOT NULL UNIQUE,
  url TEXT NOT NULL,
  public_id TEXT
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE cloudinary_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_images ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for now (you can restrict this later)
CREATE POLICY "Enable all access" ON cloudinary_media
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all access" ON page_images
  FOR ALL USING (true) WITH CHECK (true);
