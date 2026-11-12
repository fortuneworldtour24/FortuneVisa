/*
# Create enquiries table

Plain-English summary
Stores visa enquiries sent from the website's enquiry form so the Fortune team can follow up.

1. New Tables
- `enquiries`
  - `id` (uuid, primary key, generated automatically)
  - `created_at` (timestamp, set automatically)
  - `full_name` (text, required, up to 120 characters)
  - `email` (text, required, up to 254 characters)
  - `phone` (text, optional, up to 30 characters)
  - `passport_country` (text, optional, two-letter country code)
  - `destination` (text, optional, destination name or slug)
  - `visa_type` (text, optional, visa type identifier)
  - `message` (text, optional, up to 2000 characters)

2. Security
- Row level security is enabled on `enquiries`.
- Website visitors (the `anon` and `authenticated` roles) may only INSERT new enquiries.
- No role can read, update or delete enquiries through the website. Staff read enquiries through the database dashboard.
- Length limits are enforced by the database so oversized submissions are rejected.

3. Important notes
- This website has no sign-in, so the public insert policy is intentional and limited to creating new rows.
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 30),
  passport_country text CHECK (passport_country IS NULL OR char_length(passport_country) <= 2),
  destination text CHECK (destination IS NULL OR char_length(destination) <= 80),
  visa_type text CHECK (visa_type IS NULL OR char_length(visa_type) <= 40),
  message text CHECK (message IS NULL OR char_length(message) <= 2000)
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON enquiries TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_enquiries" ON enquiries;
CREATE POLICY "anon_insert_enquiries" ON enquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
