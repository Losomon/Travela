package models

import (
	"database/sql"
	"log"
)

// Tour model
type Tour struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Price       float64 `json:"price"`
	Image       string `json:"image"`
}

// Booking model
type Booking struct {
	ID         int    `json:"id"`
	Name       string `json:"name"`
	Email      string `json:"email"`
	Date       string `json:"date"`
	Destination string `json:"destination"`
	Persons    int    `json:"persons"`
	Category   string `json:"category"`
	Message    string `json:"message"`
}

func InitDB(db *sql.DB) {
	// Tours table
	_, err := db.Exec(`
		CREATE TABLE IF NOT EXISTS tours (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			description TEXT,
			price REAL,
			image TEXT
		)
	`)
	if err != nil {
		log.Printf("Error creating tours table: %v", err)
	}

	// Insert sample tours
	_, err = db.Exec(`INSERT OR IGNORE INTO tours (id, name, description, price, image) VALUES 
		(1, 'Bali Beach Escape', 'Relax on pristine beaches', 799.0, '/static/img/destination-6.jpg'),
		(2, 'Paris Romantic', 'City of love adventure', 999.0, '/static/img/destination-8.jpg'),
		(3, 'New York City Lights', 'Urban exploration', 899.0, '/static/img/destination-1.jpg')`)
	if err != nil {
		log.Printf("Error inserting sample tours: %v", err)
	}

	// Bookings table
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS bookings (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			email TEXT NOT NULL,
			date TEXT,
			destination TEXT,
			persons INTEGER,
			category TEXT,
			message TEXT,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		log.Printf("Error creating bookings table: %v", err)
	}
}

func GetTours(db *sql.DB) ([]Tour, error) {
	rows, err := db.Query("SELECT id, name, description, price, image FROM tours")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tours []Tour
	for rows.Next() {
		var t Tour
		err := rows.Scan(&t.ID, &t.Name, &t.Description, &t.Price, &t.Image)
		if err != nil {
			return nil, err
		}
		tours = append(tours, t)
	}
	return tours, nil
}

func CreateBooking(db *sql.DB, b *Booking) error {
	result, err := db.Exec(
		"INSERT INTO bookings (name, email, date, destination, persons, category, message) VALUES (?, ?, ?, ?, ?, ?, ?)",
		b.Name, b.Email, b.Date, b.Destination, b.Persons, b.Category, b.Message,
	)
	if err != nil {
		return err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return err
	}
	b.ID = int(id)
	return nil
}

