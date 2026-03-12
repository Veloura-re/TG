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

-- Admins table protection - Fixed to avoid recursion
DROP POLICY IF EXISTS "Admins can view admins" ON public.admins;
DROP POLICY IF EXISTS "Super admins can manage admins" ON public.admins;

-- Allow all authenticated users to see who the admins are (required for is_admin() checks)
CREATE POLICY "Anyone authenticated can view admins" ON public.admins FOR SELECT TO authenticated USING (true);

-- Only super_admins can modify the admins table
CREATE POLICY "Super admins can manage admins" ON public.admins 
FOR ALL TO authenticated 
USING (
  (SELECT role FROM public.admins WHERE id = auth.uid()) = 'super_admin'
)
WITH CHECK (
  (SELECT role FROM public.admins WHERE id = auth.uid()) = 'super_admin'
);

--------------------------------------------------------------------------------
-- 8. COMMENTS TABLE
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    parent_id UUID REFERENCES public.comments ON DELETE CASCADE, -- For nested comments
    content TEXT NOT NULL,
    target_type TEXT NOT NULL CHECK (target_type IN ('news', 'events', 'programs')),
    target_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on comments
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Allow public read access for comments
CREATE POLICY "Allow public read access for comments" ON public.comments FOR SELECT USING (true);

-- Allow authenticated users to insert comments
CREATE POLICY "Authenticated users can insert comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Allow users to update their own comments
CREATE POLICY "Users can update their own comments" ON public.comments FOR UPDATE USING (auth.uid() = user_id);

-- Allow users to delete their own comments
CREATE POLICY "Users can delete their own comments" ON public.comments FOR DELETE USING (auth.uid() = user_id);

-- Admins can manage any comment
CREATE POLICY "Admins can manage any comment" ON public.comments FOR ALL USING (public.is_admin());

--------------------------------------------------------------------------------
-- 9. PROFILES TABLE
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow public read access for profiles
CREATE POLICY "Allow public read access for profiles" ON public.profiles FOR SELECT USING (true);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger for new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
