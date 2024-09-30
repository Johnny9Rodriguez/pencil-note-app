CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
    notes (
        user_id UUID PRIMARY KEY NOT NULL,
        notes JSON,
        last_updated BIGINT,
        FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
    );