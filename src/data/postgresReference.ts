import type { ReferenceCategory } from '@/types'

export const POSTGRES_REFERENCE: ReferenceCategory[] = [
  {
    id: 'querying',
    title: 'Querying',
    color: '#4ade80',
    entries: [
      {
        name: 'SELECT',
        description: 'Retrieves rows from a table. SELECT * returns all columns; list specific columns for better performance and clarity.',
        example: '-- All columns:\nSELECT * FROM users;\n\n-- Specific columns:\nSELECT id, name, email FROM users;\n\n-- With alias:\nSELECT\n  first_name || \' \' || last_name AS full_name,\n  email,\n  created_at::date AS joined_date\nFROM users;',
        link: 'https://www.postgresql.org/docs/current/sql-select.html',
      },
      {
        name: 'WHERE',
        description: 'Filters rows based on a condition. Supports =, !=, <, >, LIKE, IN, BETWEEN, IS NULL, and logical operators AND/OR/NOT.',
        example: 'SELECT * FROM users WHERE active = true;\n\n-- Multiple conditions:\nSELECT * FROM orders\nWHERE status = \'pending\'\n  AND created_at > NOW() - INTERVAL \'7 days\';\n\n-- IN list:\nSELECT * FROM products WHERE id IN (1, 2, 3);\n\n-- LIKE pattern matching:\nSELECT * FROM users WHERE email LIKE \'%@gmail.com\';\nSELECT * FROM users WHERE name ILIKE \'alice%\'; -- case-insensitive\n\n-- NULL check:\nSELECT * FROM orders WHERE shipped_at IS NULL;',
        link: 'https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-WHERE',
      },
      {
        name: 'ORDER BY / LIMIT / OFFSET',
        description: 'ORDER BY sorts results; LIMIT restricts the number of rows returned; OFFSET skips rows — useful for pagination.',
        example: '-- Sort descending:\nSELECT * FROM posts ORDER BY created_at DESC;\n\n-- Multiple sort columns:\nSELECT * FROM products\nORDER BY category ASC, price DESC;\n\n-- Top 10:\nSELECT * FROM products ORDER BY views DESC LIMIT 10;\n\n-- Pagination (page 3, 20 items per page):\nSELECT * FROM posts\nORDER BY created_at DESC\nLIMIT 20 OFFSET 40;  -- skip first 40\n\n-- NULLS LAST:\nSELECT * FROM users ORDER BY last_login DESC NULLS LAST;',
        link: 'https://www.postgresql.org/docs/current/queries-order.html',
      },
      {
        name: 'GROUP BY / HAVING',
        description: 'GROUP BY groups rows sharing the same value, enabling aggregate functions. HAVING filters groups (like WHERE but for aggregates).',
        example: '-- Count per category:\nSELECT category, COUNT(*) AS total\nFROM products\nGROUP BY category;\n\n-- With aggregate:\nSELECT\n  user_id,\n  COUNT(*) AS order_count,\n  SUM(amount) AS total_spent,\n  AVG(amount) AS avg_order\nFROM orders\nGROUP BY user_id;\n\n-- HAVING: filter groups (not individual rows):\nSELECT user_id, COUNT(*) AS orders\nFROM orders\nGROUP BY user_id\nHAVING COUNT(*) > 5;  -- users with more than 5 orders',
        link: 'https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-GROUP',
      },
      {
        name: 'Aggregate functions',
        description: 'Compute values across multiple rows: COUNT, SUM, AVG, MIN, MAX, STRING_AGG, ARRAY_AGG.',
        example: 'SELECT\n  COUNT(*) AS total_rows,\n  COUNT(email) AS with_email,     -- excludes NULLs\n  COUNT(DISTINCT country) AS countries,\n  SUM(amount) AS total_revenue,\n  AVG(amount) AS avg_order,\n  MIN(created_at) AS first_order,\n  MAX(created_at) AS last_order,\n  STRING_AGG(tag, \', \') AS tags, -- concatenate strings\n  ARRAY_AGG(id) AS id_list       -- collect into array\nFROM orders;',
        link: 'https://www.postgresql.org/docs/current/functions-aggregate.html',
      },
    ],
  },
  {
    id: 'joins',
    title: 'Joins',
    color: '#5b9cf5',
    entries: [
      {
        name: 'INNER JOIN',
        description: 'Returns rows where there is a match in both tables. The most common join type.',
        example: '-- Orders with their user info:\nSELECT\n  orders.id,\n  orders.amount,\n  users.name AS customer,\n  users.email\nFROM orders\nINNER JOIN users ON orders.user_id = users.id;\n\n-- Shorthand (JOIN = INNER JOIN):\nSELECT o.id, u.name, p.title\nFROM orders o\nJOIN users u ON u.id = o.user_id\nJOIN products p ON p.id = o.product_id\nWHERE o.status = \'completed\';',
        link: 'https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN',
      },
      {
        name: 'LEFT JOIN',
        description: 'Returns all rows from the left table, with NULLs for unmatched rows from the right. Use when the relationship is optional.',
        example: '-- All users, with order count (0 if no orders):\nSELECT\n  users.name,\n  COUNT(orders.id) AS order_count\nFROM users\nLEFT JOIN orders ON orders.user_id = users.id\nGROUP BY users.id, users.name;\n\n-- Find users with no orders:\nSELECT users.*\nFROM users\nLEFT JOIN orders ON orders.user_id = users.id\nWHERE orders.id IS NULL;',
        link: 'https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN',
      },
      {
        name: 'Subqueries',
        description: 'A query nested inside another query. Can appear in SELECT, FROM, WHERE, or HAVING clauses. Use CTEs (WITH) for readability.',
        example: '-- WHERE subquery:\nSELECT * FROM products\nWHERE price > (SELECT AVG(price) FROM products);\n\n-- IN subquery:\nSELECT * FROM users\nWHERE id IN (\n  SELECT DISTINCT user_id FROM orders WHERE status = \'vip\'\n);\n\n-- CTE (Common Table Expression) — more readable:\nWITH active_users AS (\n  SELECT id, name FROM users WHERE active = true\n),\nhigh_spenders AS (\n  SELECT user_id, SUM(amount) AS total\n  FROM orders\n  GROUP BY user_id\n  HAVING SUM(amount) > 1000\n)\nSELECT u.name, h.total\nFROM active_users u\nJOIN high_spenders h ON h.user_id = u.id;',
        link: 'https://www.postgresql.org/docs/current/queries-with.html',
      },
    ],
  },
  {
    id: 'mutations',
    title: 'Inserting & Modifying',
    color: '#f59e0b',
    entries: [
      {
        name: 'INSERT',
        description: 'Adds new rows to a table. INSERT INTO ... VALUES for single rows; INSERT INTO ... SELECT for bulk inserts from another query.',
        example: '-- Single row:\nINSERT INTO users (name, email, role)\nVALUES (\'Alice\', \'alice@example.com\', \'admin\');\n\n-- Multiple rows:\nINSERT INTO tags (name) VALUES (\'html\'), (\'css\'), (\'js\');\n\n-- RETURNING — get the inserted row back:\nINSERT INTO posts (title, body)\nVALUES (\'Hello World\', \'My first post\')\nRETURNING id, created_at;\n\n-- Upsert (insert or update on conflict):\nINSERT INTO user_prefs (user_id, theme)\nVALUES (1, \'dark\')\nON CONFLICT (user_id) DO UPDATE\n  SET theme = EXCLUDED.theme;',
        link: 'https://www.postgresql.org/docs/current/sql-insert.html',
      },
      {
        name: 'UPDATE',
        description: 'Modifies existing rows. Always use a WHERE clause — an UPDATE without WHERE modifies every row in the table.',
        example: '-- Always specify WHERE:\nUPDATE users\nSET active = false, updated_at = NOW()\nWHERE last_login < NOW() - INTERVAL \'1 year\';\n\n-- Update from another table (JOIN):\nUPDATE orders o\nSET status = \'shipped\'\nFROM shipments s\nWHERE s.order_id = o.id\n  AND s.shipped_at IS NOT NULL;\n\n-- RETURNING:\nUPDATE posts SET views = views + 1\nWHERE id = 42\nRETURNING views;',
        link: 'https://www.postgresql.org/docs/current/sql-update.html',
      },
      {
        name: 'DELETE',
        description: 'Removes rows from a table. Always use a WHERE clause. TRUNCATE is faster for removing all rows.',
        example: '-- Delete specific rows:\nDELETE FROM sessions WHERE expires_at < NOW();\n\n-- Delete with RETURNING:\nDELETE FROM notifications\nWHERE user_id = 42\nRETURNING id;\n\n-- Delete using subquery:\nDELETE FROM orders\nWHERE user_id IN (\n  SELECT id FROM users WHERE deleted_at IS NOT NULL\n);\n\n-- Remove all rows fast (no transaction log per row):\nTRUNCATE TABLE temp_data;',
        link: 'https://www.postgresql.org/docs/current/sql-delete.html',
      },
    ],
  },
  {
    id: 'schema',
    title: 'Schema & Tables',
    color: '#a78bfa',
    entries: [
      {
        name: 'CREATE TABLE',
        description: 'Defines a new table with columns, data types, and constraints. Use IF NOT EXISTS to avoid errors in migration scripts.',
        example: 'CREATE TABLE users (\n  id          SERIAL PRIMARY KEY,\n  email       TEXT NOT NULL UNIQUE,\n  name        TEXT NOT NULL,\n  role        TEXT NOT NULL DEFAULT \'user\',\n  active      BOOLEAN NOT NULL DEFAULT true,\n  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n  deleted_at  TIMESTAMPTZ\n);\n\n-- With foreign key:\nCREATE TABLE posts (\n  id          SERIAL PRIMARY KEY,\n  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,\n  title       TEXT NOT NULL,\n  body        TEXT,\n  published   BOOLEAN DEFAULT false,\n  created_at  TIMESTAMPTZ DEFAULT NOW()\n);',
        link: 'https://www.postgresql.org/docs/current/sql-createtable.html',
      },
      {
        name: 'Data types',
        description: 'PostgreSQL has rich built-in types: integers, text, timestamps, booleans, JSON, arrays, UUIDs, and more.',
        example: '-- Common types:\nid          SERIAL / BIGSERIAL  -- auto-increment integer\nid          UUID DEFAULT gen_random_uuid()  -- UUID primary key\nname        TEXT                -- variable-length string\nprice       NUMERIC(10, 2)      -- exact decimal\nratio       FLOAT               -- approximate decimal\nflag        BOOLEAN             -- true/false\ncreated_at  TIMESTAMPTZ         -- timestamp with timezone\nbirth_date  DATE                -- date only\nmetadata    JSONB               -- binary JSON (indexed)\ntags        TEXT[]              -- array of text\nstatus      VARCHAR(20)         -- limited string',
        link: 'https://www.postgresql.org/docs/current/datatype.html',
      },
      {
        name: 'Indexes',
        description: 'Speed up queries on columns used in WHERE, JOIN, or ORDER BY. B-tree is the default; GIN is better for JSONB and arrays.',
        example: '-- Basic index:\nCREATE INDEX idx_users_email ON users(email);\n\n-- Unique index (like UNIQUE constraint):\nCREATE UNIQUE INDEX idx_users_email_unique ON users(email);\n\n-- Composite index:\nCREATE INDEX idx_orders_user_status\n  ON orders(user_id, status);\n\n-- Partial index (only active users):\nCREATE INDEX idx_active_users\n  ON users(email) WHERE active = true;\n\n-- GIN index for JSONB:\nCREATE INDEX idx_meta ON products USING GIN(metadata);\n\n-- Check index usage:\nEXPLAIN ANALYZE SELECT * FROM users WHERE email = \'test@test.com\';',
        link: 'https://www.postgresql.org/docs/current/indexes.html',
      },
      {
        name: 'Transactions',
        description: 'Group multiple statements into an atomic unit — all succeed or all fail. ACID properties guarantee data integrity.',
        example: 'BEGIN;\n\n-- Transfer money between accounts:\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n\n-- If anything fails, rollback:\n-- ROLLBACK;\n\n-- All good — commit:\nCOMMIT;\n\n-- Savepoints (partial rollback):\nBEGIN;\nINSERT INTO orders ...;\nSAVEPOINT after_order;\nINSERT INTO payments ...;\n-- ROLLBACK TO after_order;  -- undo payment only\nCOMMIT;',
        link: 'https://www.postgresql.org/docs/current/tutorial-transactions.html',
      },
    ],
  },
  {
    id: 'advanced-pg',
    title: 'Advanced',
    color: '#fb923c',
    entries: [
      {
        name: 'JSONB',
        description: 'Store and query JSON data natively. JSONB is binary-stored and supports indexing. Use -> for JSON key, ->> for text value.',
        example: 'CREATE TABLE events (\n  id       SERIAL PRIMARY KEY,\n  payload  JSONB NOT NULL\n);\n\nINSERT INTO events (payload)\nVALUES (\'{"user_id": 42, "action": "login", "tags": ["web"]}\');\n\n-- Query JSONB:\nSELECT payload->\'user_id\' AS user_id          -- JSON value\nSELECT payload->>\'action\' AS action           -- text value\nSELECT payload->\'tags\'->0 AS first_tag        -- array element\n\n-- WHERE on JSONB:\nSELECT * FROM events WHERE payload->>\'action\' = \'login\';\nSELECT * FROM events WHERE payload @> \'{"action": "login"}\';',
        link: 'https://www.postgresql.org/docs/current/datatype-json.html',
      },
      {
        name: 'Window functions',
        description: 'Perform calculations across related rows without collapsing them. OVER() defines the window; PARTITION BY groups; ORDER BY sets order within the window.',
        example: '-- Rank products within each category:\nSELECT\n  name,\n  category,\n  price,\n  RANK() OVER (PARTITION BY category ORDER BY price DESC) AS rank,\n  ROW_NUMBER() OVER (ORDER BY price DESC) AS row_num,\n  SUM(price) OVER (PARTITION BY category) AS category_total,\n  AVG(price) OVER () AS global_avg\nFROM products;\n\n-- Running total:\nSELECT\n  date, amount,\n  SUM(amount) OVER (ORDER BY date) AS running_total\nFROM orders;',
        link: 'https://www.postgresql.org/docs/current/tutorial-window.html',
      },
      {
        name: 'Full-text search',
        description: 'PostgreSQL has built-in full-text search: tsvector stores indexed document representation, tsquery is the search expression.',
        example: '-- Search without index:\nSELECT title, body\nFROM posts\nWHERE to_tsvector(\'english\', title || \' \' || body)\n      @@ to_tsquery(\'english\', \'javascript & async\');\n\n-- With tsvector column + GIN index (production):\nALTER TABLE posts ADD COLUMN search_vec tsvector;\nUPDATE posts SET search_vec = to_tsvector(\'english\', title || \' \' || body);\nCREATE INDEX idx_posts_search ON posts USING GIN(search_vec);\n\n-- Ranked results:\nSELECT title, ts_rank(search_vec, query) AS rank\nFROM posts, to_tsquery(\'english\', \'next.js\') query\nWHERE search_vec @@ query\nORDER BY rank DESC;',
        link: 'https://www.postgresql.org/docs/current/textsearch.html',
      },
    ],
  },
]
