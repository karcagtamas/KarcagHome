ALTER TABLE expense_category_types
    ADD COLUMN color VARCHAR(20) NOT NULL DEFAULT '#FFFFFF';

UPDATE expense_category_types SET color = '#3FAC00'
WHERE name = 'Income';
UPDATE expense_category_types SET color = '#AC0000'
WHERE name = 'Expense';
UPDATE expense_category_types SET color = '#0098AC'
WHERE name = 'Transfer';
