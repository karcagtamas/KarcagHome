CREATE TABLE currencies
(
    id           BIGSERIAL PRIMARY KEY,

    name         VARCHAR(240) NOT NULL,
    abbreviation VARCHAR(12)  NOT NULL,

    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE currency_monthly_exchanges
(
    currency_from_id BIGINT           NOT NULL
        REFERENCES currencies (id)
            ON DELETE CASCADE,
    currency_to_id   BIGINT           NOT NULL
        REFERENCES currencies (id)
            ON DELETE CASCADE,
    year             INTEGER          NOT NULL,
    month            INTEGER          NOT NULL,
    value            DOUBLE PRECISION NOT NULL,

    PRIMARY KEY (currency_from_id, currency_to_id, year, month)
);

CREATE TABLE accounts
(
    id          BIGSERIAL PRIMARY KEY,

    name        VARCHAR(120)     NOT NULL,
    currency_id BIGINT           NOT NULL
        REFERENCES currencies (id)
            ON DELETE RESTRICT,
    base_value  DOUBLE PRECISION NOT NULL,

    created_at  TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ      NOT NULL DEFAULT NOW()
);

CREATE TRIGGER currencies_updated_at
    BEFORE UPDATE
    ON currencies
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER accounts_updated_at
    BEFORE UPDATE
    ON accounts
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

ALTER TABLE expenses
    ADD COLUMN account_id BIGINT REFERENCES accounts (id);