ALTER TABLE expense_category_types
    ADD COLUMN sign SMALLINT CHECK (sign = 1 OR sign = -1) DEFAULT 1;

UPDATE expense_category_types SET sign = -1
WHERE name = 'Expense';
