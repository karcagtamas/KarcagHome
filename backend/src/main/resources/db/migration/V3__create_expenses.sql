CREATE TABLE expense_categories
(
    id         BIGSERIAL PRIMARY KEY,

    name       VARCHAR(100) NOT NULL,
    color      VARCHAR(20)  NOT NULL,

    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE expense_categories
(
    id         BIGSERIAL PRIMARY KEY,

    name       VARCHAR(100) NOT NULL,
    color      VARCHAR(20)  NOT NULL,

    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_expenses_category_id
    ON expenses (category_id);

CREATE INDEX idx_expenses_date
    ON expenses (date);

CREATE INDEX idx_expenses_category_date
    ON expenses (category_id, date);

CREATE TRIGGER expense_categories_updated_at
    BEFORE UPDATE
    ON expense_categories
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER expenses_updated_at
    BEFORE UPDATE
    ON expenses
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();