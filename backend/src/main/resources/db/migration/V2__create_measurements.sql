CREATE TABLE measurement_categories
(
    id         BIGSERIAL PRIMARY KEY,

    name       VARCHAR(100) NOT NULL,
    color      VARCHAR(20)  NOT NULL,
    unit       VARCHAR(20)  NOT NULL,

    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE measurements
(
    id          BIGSERIAL PRIMARY KEY,

    value       DOUBLE PRECISION NOT NULL,

    category_id BIGINT           NOT NULL
        REFERENCES measurement_categories (id)
            ON DELETE CASCADE,

    date        DATE             NOT NULL,

    created_at  TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ      NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_measurements_category_id
    ON measurements (category_id);

CREATE INDEX idx_measurements_date
    ON measurements (date);

CREATE TRIGGER measurement_categories_updated_at
    BEFORE UPDATE
    ON measurement_categories
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER measurements_updated_at
    BEFORE UPDATE
    ON measurements
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();