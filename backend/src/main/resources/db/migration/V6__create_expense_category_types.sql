CREATE TABLE expense_category_types
(
    id         BIGSERIAL PRIMARY KEY,

    name       VARCHAR(100) NOT NULL,

    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

ALTER TABLE expense_categories
    ADD COLUMN type_id BIGINT NOT NULL REFERENCES expense_category_types (id);

INSERT INTO expense_category_types (name)
VALUES ('Income');
INSERT INTO expense_category_types (name)
VALUES ('Expense');
INSERT INTO expense_category_types (name)
VALUES ('Transfer');

CREATE TRIGGER expense_category_types_updated_at
    BEFORE UPDATE
    ON expense_category_types
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();