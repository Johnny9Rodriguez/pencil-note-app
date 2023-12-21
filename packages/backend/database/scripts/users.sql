CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username varchar(255) NOT NULL,
    pw_hash varchar(255) NOT NULL,
    pw_salt varchar(255) NOT NULL
);