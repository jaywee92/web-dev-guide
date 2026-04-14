-- ─── Resource Votes ────────────────────────────────────────────────────────
-- Table: stores one row per resource with a running vote count

CREATE TABLE IF NOT EXISTS resource_votes (
  resource_id  TEXT    PRIMARY KEY,
  vote_count   INTEGER NOT NULL DEFAULT 0
);

-- Row Level Security
ALTER TABLE resource_votes ENABLE ROW LEVEL SECURITY;

-- Anyone can read vote counts
CREATE POLICY "public_read_votes"
  ON resource_votes FOR SELECT
  TO anon
  USING (true);

-- ─── RPC: increment_vote ────────────────────────────────────────────────────
-- Called client-side; SECURITY DEFINER so anon role can write

CREATE OR REPLACE FUNCTION increment_vote(rid TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO resource_votes (resource_id, vote_count)
  VALUES (rid, 1)
  ON CONFLICT (resource_id)
  DO UPDATE SET vote_count = resource_votes.vote_count + 1;
END;
$$;
