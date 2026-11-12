/*
# Create posts table for blog

1. New Tables
- `posts`
  - `id` (uuid, primary key, generated automatically)
  - `created_at` (timestamp, set automatically)
  - `title` (text, required, up to 200 characters)
  - `slug` (text, required, unique, url-friendly identifier)
  - `excerpt` (text, required, up to 300 characters — short summary for cards and SEO)
  - `content` (text, required — markdown body of the article)
  - `cover_image` (text, optional — URL to a cover photo)
  - `category` (text, optional, up to 60 characters — e.g. "Student visas")
  - `published_at` (date, required — the publication date shown to readers)
  - `featured` (boolean, default false — marks the post to highlight at the top of the blog list)

2. Security
- Row level security is enabled on `posts`.
- The `anon` and `authenticated` roles may SELECT published posts only. No role can insert, update or delete through the website. Posts are managed through the database dashboard.
- A grant for SELECT is added for anon + authenticated so the Data API can reach the table.

3. Important notes
- This website has no sign-in, so the public read policy is intentional.
- Only posts with a published_at date are visible to website visitors.
- Seeded with 3 sample posts about Australian visa tips.
*/

CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  title text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 200),
  slug text NOT NULL UNIQUE CHECK (char_length(slug) BETWEEN 1 AND 120),
  excerpt text NOT NULL CHECK (char_length(excerpt) BETWEEN 1 AND 300),
  content text NOT NULL,
  cover_image text CHECK (cover_image IS NULL OR char_length(cover_image) <= 500),
  category text CHECK (category IS NULL OR char_length(category) <= 60),
  published_at date NOT NULL DEFAULT CURRENT_DATE,
  featured boolean NOT NULL DEFAULT false
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON posts TO anon, authenticated;

DROP POLICY IF EXISTS "public_read_published_posts" ON posts;
CREATE POLICY "public_read_published_posts" ON posts FOR SELECT
  TO anon, authenticated
  USING (published_at IS NOT NULL);

-- Seed 3 sample posts (idempotent: uses ON CONFLICT on slug)
INSERT INTO posts (title, slug, excerpt, content, cover_image, category, published_at, featured) VALUES
(
  '5 things to check before you lodge a student visa application',
  '5-things-to-check-before-student-visa',
  'A quick pre-lodgement checklist for Subclass 500 applicants — from enrolment documents to English evidence.',
  '## 1. Confirm your Confirmation of Enrolment

Before you can lodge a student visa application, your education provider must issue a **Confirmation of Enrolment (CoE)**. A letter of offer is not enough — the CoE is the document the Department of Home Affairs checks.

## 2. Gather your financial evidence

You need to show you can cover tuition, travel and living costs for the first year. Bank statements, education loans or financial guarantees all work, as long as they are recent and clearly in your name (or your sponsor''s).

## 3. Meet the English language requirement

Most courses require a minimum English test score. Check the score your course asks for, not just the visa''s minimum — a higher course requirement overrides the base threshold.

## 4. Arrange Overseas Student Health Cover

You must hold **Overseas Student Health Cover (OSHC)** for the full length of your course before you apply. Your provider can arrange this, or you can purchase it directly from an approved insurer.

## 5. Prepare your Genuine Student statement

The Genuine Student (GS) requirement asks you to explain why you want to study in Australia and how the course fits your career plans. Write this in your own words — templated answers are easy to spot and weaken your application.

---

Lodging a student visa is a big step. If you want a second pair of eyes on your application before you submit, get in touch with our team.',
  'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
  'Student visas',
  '2026-10-15',
  true
),
(
  'How the points test works for skilled migration',
  'how-the-points-test-works-for-skilled-migration',
  'An overview of the Australian skilled migration points test — what counts, how much each factor is worth, and the pass mark.',
  '## What is the points test?

Australia''s skilled migration program uses a points-based system to rank applicants. You score points across factors like age, English ability, skilled employment, education and Australian study history.

## The pass mark

For most skilled independent visas (Subclass 189, 190 and 491), you need at least **65 points** to be eligible. Meeting the pass mark does not guarantee an invitation — higher scores are more competitive.

## Factors that score points

- **Age** — applicants between 25 and 32 receive the maximum 30 points.
- **English language** — Superior English (IELTS 8.0 or equivalent) adds 20 points.
- **Skilled employment** — up to 20 points for experience in your nominated occupation.
- **Education** — a doctoral degree scores 20 points; a bachelor''s scores 15.
- **Australian study requirement** — 5 points if you completed eligible study in Australia.
- **Specialist education** — 10 points for certain STEM qualifications.

## How to estimate your score

Start with the Department of Home Affairs points calculator, then map your evidence to each factor. Many applicants are close to the pass mark but miss points for English or employment documentation.

---

Unsure where you stand? Book a consultation and we will walk through your points with you.',
  'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
  'Skilled migration',
  '2026-10-22',
  false
),
(
  'Partner visa evidence: what makes a strong application',
  'partner-visa-evidence-strong-application',
  'A guide to the relationship evidence that strengthens a partner visa application — from shared finances to statutory declarations.',
  '## The two-stage process

Partner visas are usually granted in two stages: a temporary visa first, then a permanent visa. You submit one application and the department assesses each stage as you reach it.

## Show a genuine and continuing relationship

The core of a strong partner visa application is evidence that your relationship is genuine and ongoing. The department looks at four aspects:

1. **Financial aspects** — joint bank accounts, shared bills, property ownership.
2. **Nature of the household** — who lives with you, how chores are shared.
3. **Social aspects** — how you present as a couple to family and friends.
4. **Nature of the commitment** — the degree of mutual commitment and future plans.

## Evidence that helps

- Joint lease or mortgage documents
- Photos together at different times and events
- Statutory declarations from family and friends
- Travel records showing trips together
- Messages and call logs (a sample, not everything)

## What to avoid

Avoid submitting only one type of evidence. A folder of photos with no financial or household evidence can look thin. Aim for at least two items in each of the four aspects above.

---

We help couples prepare partner visa applications every week. Get in touch if you would like help structuring your evidence.',
  'https://images.pexels.com/photos/4506270/pexels-photo-4506270.jpeg',
  'Partner and family visas',
  '2026-11-01',
  false
)
ON CONFLICT (slug) DO NOTHING;