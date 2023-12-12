CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    title VARCHAR(128),
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE INDEX idx_notes_user_id ON notes (user_id);

CREATE INDEX idx_notes_created_at ON notes (created_at);