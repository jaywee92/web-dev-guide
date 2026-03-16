-- ─── Guestbook Entries ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS guestbook_entries (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL CHECK (char_length(name) BETWEEN 1 AND 40),
  emoji       TEXT        NOT NULL DEFAULT '✨' CHECK (char_length(emoji) <= 8),
  message     TEXT        NOT NULL CHECK (char_length(message) BETWEEN 1 AND 280),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Newest first index
CREATE INDEX IF NOT EXISTS guestbook_entries_created_at_idx
  ON guestbook_entries (created_at DESC);

-- Row Level Security
ALTER TABLE guestbook_entries ENABLE ROW LEVEL SECURITY;

-- Anyone can read
CREATE POLICY "public_read_guestbook"
  ON guestbook_entries FOR SELECT
  TO anon
  USING (true);

-- ─── RPC: insert_guestbook_entry ────────────────────────────────────────────
-- SECURITY DEFINER so anon role can write. Validation done in table constraints.
CREATE OR REPLACE FUNCTION insert_guestbook_entry(
  p_name    TEXT,
  p_emoji   TEXT,
  p_message TEXT
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_id UUID;
BEGIN
  INSERT INTO guestbook_entries (name, emoji, message)
  VALUES (p_name, p_emoji, p_message)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;
