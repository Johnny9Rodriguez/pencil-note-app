CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username varchar(255) NOT NULL,
    hash varchar(255) NOT NULL,
    salt varchar(255) NOT NULL
);