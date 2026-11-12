/*
# Add travel_date and consent columns to enquiries

1. Modified Tables
- `enquiries`
  - `travel_date` (date, optional) — the applicant's intended travel date, if provided.
  - `consent` (boolean, required, default false) — the applicant's agreement to the Privacy Policy. Must be true for a submission to be stored.

2. Security
- No policy changes. The table already allows INSERT only for anon + authenticated. Length and consent limits are enforced at the database layer.

3. Important notes
- Adds columns only; no existing data is lost.
- `consent` defaults to false so submissions that pre-date this migration are not treated as having consented.
*/

ALTER TABLE enquiries
  ADD COLUMN IF NOT EXISTS travel_date date,
  ADD COLUMN IF NOT EXISTS consent boolean NOT NULL DEFAULT false;

ALTER TABLE enquiries
  ADD CONSTRAINT enquiries_consent_true CHECK (consent = true);