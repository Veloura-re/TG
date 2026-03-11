-- Create custom types if needed
-- CREATE TYPE admin_role AS ENUM ('super_admin', 'content_manager', 'editor');

-- 1. ADMlNS TABLE
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT CHECK (role IN ('super_admin', 'content_manager', 'editor')) DEFAULT 'editor',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on admins
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- 2. NEWS TABLE
CREATE TABLE IF NOT EXISTS public.news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL, -- Will store HTML or Markdown
    cover_image TEXT,
    category TEXT,
    publish_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on news
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- 3. EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    banner_image TEXT,
    event_date TIMESTAMPTZ NOT NULL,
    location TEXT,
    online_link TEXT,
    registration_link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 4. PROGRAMS TABLE
CREATE TABLE IF NOT EXISTS public.programs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    program_image TEXT,
    eligibility TEXT,
    deadline DATE,
    application_link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on programs
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- 5. OPPORTUNITIES TABLE
CREATE TABLE IF NOT EXISTS public.opportunities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    organization TEXT,
    description TEXT,
    deadline DATE,
    apply_link TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on opportunities
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;

-- 6. RESOURCES TABLE
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on resources
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- 7. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    image_url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on gallery
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;

--------------------------------------------------------------------------------
-- RLS POLICIES (Public Read Access)
--------------------------------------------------------------------------------

CREATE POLICY "Allow public read access for news" ON public.news FOR SELECT USING (true);
CREATE POLICY "Allow public read access for events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow public read access for programs" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Allow public read access for opportunities" ON public.opportunities FOR SELECT USING (true);
CREATE POLICY "Allow public read access for resources" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Allow public read access for gallery" ON public.gallery FOR SELECT USING (true);

--------------------------------------------------------------------------------
-- ADMIN RLS POLICIES (Write access)
--------------------------------------------------------------------------------

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admins
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies for News (Admin)
CREATE POLICY "Admins can insert news" ON public.news FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update news" ON public.news FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete news" ON public.news FOR DELETE USING (public.is_admin());

-- Repeat for others...
CREATE POLICY "Admins can insert events" ON public.events FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update events" ON public.events FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete events" ON public.events FOR DELETE USING (public.is_admin());

CREATE POLICY "Admins can insert programs" ON public.programs FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update programs" ON public.programs FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete programs" ON public.programs FOR DELETE USING (public.is_admin());

CREATE POLICY "Admins can insert opportunities" ON public.opportunities FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update opportunities" ON public.opportunities FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete opportunities" ON public.opportunities FOR DELETE USING (public.is_admin());

CREATE POLICY "Admins can insert resources" ON public.resources FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update resources" ON public.resources FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete resources" ON public.resources FOR DELETE USING (public.is_admin());

CREATE POLICY "Admins can insert gallery" ON public.gallery FOR INSERT WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update gallery" ON public.gallery FOR UPDATE USING (public.is_admin());
CREATE POLICY "Admins can delete gallery" ON public.gallery FOR DELETE USING (public.is_admin());

-- Admins table protection
CREATE POLICY "Admins can view admins" ON public.admins FOR SELECT USING (public.is_admin());
CREATE POLICY "Super admins can manage admins" ON public.admins FOR ALL USING (
  EXISTS (SELECT 1 FROM public.admins WHERE id = auth.uid() AND role = 'super_admin')
);

--------------------------------------------------------------------------------
-- STORAGE BUCKETS SETUP (Instructions for SQL Editor)
--------------------------------------------------------------------------------
/*
-- Make sure to create these buckets in the Supabase Dashboard:
-- 1. news-images
-- 2. event-banners
-- 3. program-images
-- 4. gallery-images
-- 5. documents

-- Storage Policies (Run after creating buckets):

CREATE POLICY "Public Read for news-images" ON storage.objects FOR SELECT USING (bucket_id = 'news-images');
CREATE POLICY "Admin CRUD for news-images" ON storage.objects FOR ALL USING (bucket_id = 'news-images' AND public.is_admin());

CREATE POLICY "Public Read for event-banners" ON storage.objects FOR SELECT USING (bucket_id = 'event-banners');
CREATE POLICY "Admin CRUD for event-banners" ON storage.objects FOR ALL USING (bucket_id = 'event-banners' AND public.is_admin());

CREATE POLICY "Public Read for program-images" ON storage.objects FOR SELECT USING (bucket_id = 'program-images');
CREATE POLICY "Admin CRUD for program-images" ON storage.objects FOR ALL USING (bucket_id = 'program-images' AND public.is_admin());

CREATE POLICY "Public Read for gallery-images" ON storage.objects FOR SELECT USING (bucket_id = 'gallery-images');
CREATE POLICY "Admin CRUD for gallery-images" ON storage.objects FOR ALL USING (bucket_id = 'gallery-images' AND public.is_admin());

CREATE POLICY "Public Read for documents" ON storage.objects FOR SELECT USING (bucket_id = 'documents');
CREATE POLICY "Admin CRUD for documents" ON storage.objects FOR ALL USING (bucket_id = 'documents' AND public.is_admin());
*/
