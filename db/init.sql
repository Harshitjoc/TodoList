-- psql -U postgres -d todo_db -f db/init.sql

-- Create the tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Data (Optional)
INSERT INTO tasks (title, completed) VALUES
('Buy groceries', FALSE),
('Complete project report', TRUE),
('Schedule meeting', FALSE),
('Call client', FALSE),
('Prepare presentation', FALSE),
('Clean up room', TRUE),
('Pay bills', FALSE),
('Organize closet', TRUE),
('Do laundry', FALSE),
('Walk dog', TRUE);

