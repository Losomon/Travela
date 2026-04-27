package models

import (
	"database/sql"
	"log"
)

// Tour model
type Tour struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Image       string  `json:"image"`
}

// Booking model
type Booking struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Email       string `json:"email"`
	Date        string `json:"date"`
	Destination string `json:"destination"`
	Persons     int    `json:"persons"`
	Category    string `json:"category"`
	Message     string `json:"message"`
	Status      string `json:"status"`
	Amount      int    `json:"amount"`
	CreatedAt   string `json:"created_at"`
}

// Package model
type Package struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float64 `json:"price"`
	Duration    string  `json:"duration"`
	Image       string  `json:"image"`
	Rating      float64 `json:"rating"`
	Reviews     int     `json:"reviews"`
}

// Destination model
type Destination struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Country     string  `json:"country"`
	Description string  `json:"description"`
	Image       string  `json:"image"`
	Popular     bool    `json:"popular"`
	Rating      float64 `json:"rating"`
}

// Guide model
type Guide struct {
	ID         int     `json:"id"`
	Name       string  `json:"name"`
	Specialty  string  `json:"specialty"`
	Experience int     `json:"experience"`
	Image      string  `json:"image"`
	Rating     float64 `json:"rating"`
	Languages  string  `json:"languages"`
	Email      string  `json:"email"`
}

// Review model
type Review struct {
	ID          int    `json:"id"`
	Customer    string `json:"customer"`
	Email       string `json:"email"`
	Destination string `json:"destination"`
	Rating      int    `json:"rating"`
	Comment     string `json:"comment"`
	Status      string `json:"status"`
	CreatedAt   string `json:"created_at"`
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
			status TEXT DEFAULT 'pending',
			amount INTEGER DEFAULT 0,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		log.Printf("Error creating bookings table: %v", err)
	}

	// Insert sample bookings
	_, err = db.Exec(`INSERT OR IGNORE INTO bookings (id, name, email, date, destination, persons, category, message, status, amount) VALUES 
		(1, 'Emma Richardson', 'emma.r@travela.com', '2026-06-12', 'Santorini, Greece', 2, 'Holiday', 'Honeymoon trip', 'confirmed', 1890),
		(2, 'Liam Chen', 'liam.chen@email.com', '2026-07-05', 'Kyoto, Japan', 1, 'Cultural', 'Solo travel', 'pending', 2750),
		(3, 'Sofia Patel', 'sofia.p@travela.com', '2026-08-20', 'Maldives', 2, 'Beach', 'Anniversary', 'confirmed', 3290),
		(4, 'Oliver Schmidt', 'oliver.s@web.de', '2026-09-02', 'Swiss Alps', 4, 'Adventure', 'Family trip', 'completed', 1450),
		(5, 'Mia Wong', 'mia.wong@outlook.com', '2026-10-15', 'Bali, Indonesia', 2, 'Holiday', 'Relaxation', 'hold', 1125),
		(6, 'James O''Connor', 'jamesoc@travela.com', '2026-11-01', 'New York, USA', 3, 'City', 'Business + leisure', 'pending', 1680)`)
	if err != nil {
		log.Printf("Error inserting sample bookings: %v", err)
	}

	// Packages table
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS packages (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			description TEXT,
			price REAL,
			duration TEXT,
			image TEXT,
			rating REAL DEFAULT 0,
			reviews INTEGER DEFAULT 0
		)
	`)
	if err != nil {
		log.Printf("Error creating packages table: %v", err)
	}

	// Insert sample packages
	_, err = db.Exec(`INSERT OR IGNORE INTO packages (id, name, description, price, duration, image, rating, reviews) VALUES 
		(1, 'Bali Paradise', '7 days of tropical bliss', 1299.0, '7 Days', '/static/img/packages-1.jpg', 4.8, 124),
		(2, 'European Explorer', '14 days across Europe', 2499.0, '14 Days', '/static/img/packages-2.jpg', 4.9, 89),
		(3, 'Safari Adventure', '5 days wildlife experience', 1899.0, '5 Days', '/static/img/packages-3.jpg', 4.7, 56),
		(4, 'Caribbean Cruise', '10 days island hopping', 2199.0, '10 Days', '/static/img/packages-4.jpg', 4.6, 203)`)
	if err != nil {
		log.Printf("Error inserting sample packages: %v", err)
	}

	// Destinations table
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS destinations (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			country TEXT,
			description TEXT,
			image TEXT,
			popular INTEGER DEFAULT 0,
			rating REAL DEFAULT 0
		)
	`)
	if err != nil {
		log.Printf("Error creating destinations table: %v", err)
	}

	// Insert sample destinations
	_, err = db.Exec(`INSERT OR IGNORE INTO destinations (id, name, country, description, image, popular, rating) VALUES 
		(1, 'Santorini', 'Greece', 'Iconic white buildings and blue domes', '/static/img/destination-1.jpg', 1, 4.9),
		(2, 'Kyoto', 'Japan', 'Ancient temples and cherry blossoms', '/static/img/destination-2.jpg', 1, 4.8),
		(3, 'Maldives', 'Maldives', 'Crystal clear waters and overwater villas', '/static/img/destination-3.jpg', 1, 4.9),
		(4, 'Swiss Alps', 'Switzerland', 'Majestic mountains and skiing', '/static/img/destination-4.jpg', 1, 4.7),
		(5, 'Bali', 'Indonesia', 'Tropical paradise with rich culture', '/static/img/destination-5.jpg', 1, 4.6),
		(6, 'New York', 'USA', 'The city that never sleeps', '/static/img/destination-6.jpg', 0, 4.5)`)
	if err != nil {
		log.Printf("Error inserting sample destinations: %v", err)
	}

	// Guides table
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS guides (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			specialty TEXT,
			experience INTEGER,
			image TEXT,
			rating REAL DEFAULT 0,
			languages TEXT,
			email TEXT
		)
	`)
	if err != nil {
		log.Printf("Error creating guides table: %v", err)
	}

	// Insert sample guides
	_, err = db.Exec(`INSERT OR IGNORE INTO guides (id, name, specialty, experience, image, rating, languages, email) VALUES 
		(1, 'Marco Rossi', 'European History', 12, '/static/img/guide-1.jpg', 4.9, 'English, Italian, French', 'marco@travela.com'),
		(2, 'Yuki Tanaka', 'Japanese Culture', 8, '/static/img/guide-2.jpg', 4.8, 'English, Japanese', 'yuki@travela.com'),
		(3, 'Priya Sharma', 'South Asian Heritage', 15, '/static/img/guide-3.jpg', 4.9, 'English, Hindi, Spanish', 'priya@travela.com'),
		(4, 'James Wilson', 'Adventure Tours', 10, '/static/img/guide-4.jpg', 4.7, 'English, German', 'james@travela.com')`)
	if err != nil {
		log.Printf("Error inserting sample guides: %v", err)
	}

	// Reviews table
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS reviews (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			customer TEXT NOT NULL,
			email TEXT,
			destination TEXT,
			rating INTEGER,
			comment TEXT,
			status TEXT DEFAULT 'pending',
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)
	`)
	if err != nil {
		log.Printf("Error creating reviews table: %v", err)
	}

	// Insert sample reviews
	_, err = db.Exec(`INSERT OR IGNORE INTO reviews (id, customer, email, destination, rating, comment, status) VALUES 
		(1, 'Sarah Johnson', 'sarah@email.com', 'Bali, Indonesia', 5, 'Absolutely amazing experience! The guide was fantastic.', 'approved'),
		(2, 'Michael Lee', 'michael@email.com', 'Paris, France', 4, 'Great trip, but hotel could have been better.', 'pending'),
		(3, 'Emma Watson', 'emma@email.com', 'Tokyo, Japan', 5, 'Best vacation ever! Highly recommend.', 'approved'),
		(4, 'Carlos Mendes', 'carlos@email.com', 'New York, USA', 3, 'Good but crowded during peak season.', 'pending'),
		(5, 'Anna Chen', 'anna@email.com', 'Maldives', 5, 'Paradise on earth. Will come back!', 'approved')`)
	if err != nil {
		log.Printf("Error inserting sample reviews: %v", err)
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
		"INSERT INTO bookings (name, email, date, destination, persons, category, message, status, amount) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', 0)",
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
	b.Status = "pending"
	return nil
}

func GetAllBookings(db *sql.DB) ([]Booking, error) {
	rows, err := db.Query("SELECT id, name, email, date, destination, persons, category, message, status, amount, created_at FROM bookings ORDER BY created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var bookings []Booking
	for rows.Next() {
		var b Booking
		err := rows.Scan(&b.ID, &b.Name, &b.Email, &b.Date, &b.Destination, &b.Persons, &b.Category, &b.Message, &b.Status, &b.Amount, &b.CreatedAt)
		if err != nil {
			return nil, err
		}
		bookings = append(bookings, b)
	}
	return bookings, nil
}

func UpdateBookingStatus(db *sql.DB, id int, status string) error {
	_, err := db.Exec("UPDATE bookings SET status = ? WHERE id = ?", status, id)
	return err
}

func DeleteBooking(db *sql.DB, id int) error {
	_, err := db.Exec("DELETE FROM bookings WHERE id = ?", id)
	return err
}

func GetAllPackages(db *sql.DB) ([]Package, error) {
	rows, err := db.Query("SELECT id, name, description, price, duration, image, rating, reviews FROM packages")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var packages []Package
	for rows.Next() {
		var p Package
		err := rows.Scan(&p.ID, &p.Name, &p.Description, &p.Price, &p.Duration, &p.Image, &p.Rating, &p.Reviews)
		if err != nil {
			return nil, err
		}
		packages = append(packages, p)
	}
	return packages, nil
}

func GetAllDestinations(db *sql.DB) ([]Destination, error) {
	rows, err := db.Query("SELECT id, name, country, description, image, popular, rating FROM destinations")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var destinations []Destination
	for rows.Next() {
		var d Destination
		var popular int
		err := rows.Scan(&d.ID, &d.Name, &d.Country, &d.Description, &d.Image, &popular, &d.Rating)
		if err != nil {
			return nil, err
		}
		d.Popular = popular == 1
		destinations = append(destinations, d)
	}
	return destinations, nil
}

func GetAllGuides(db *sql.DB) ([]Guide, error) {
	rows, err := db.Query("SELECT id, name, specialty, experience, image, rating, languages, email FROM guides")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var guides []Guide
	for rows.Next() {
		var g Guide
		err := rows.Scan(&g.ID, &g.Name, &g.Specialty, &g.Experience, &g.Image, &g.Rating, &g.Languages, &g.Email)
		if err != nil {
			return nil, err
		}
		guides = append(guides, g)
	}
	return guides, nil
}

func GetAllReviews(db *sql.DB) ([]Review, error) {
	rows, err := db.Query("SELECT id, customer, email, destination, rating, comment, status, created_at FROM reviews ORDER BY created_at DESC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var reviews []Review
	for rows.Next() {
		var r Review
		err := rows.Scan(&r.ID, &r.Customer, &r.Email, &r.Destination, &r.Rating, &r.Comment, &r.Status, &r.CreatedAt)
		if err != nil {
			return nil, err
		}
		reviews = append(reviews, r)
	}
	return reviews, nil
}

func UpdateReviewStatus(db *sql.DB, id int, status string) error {
	_, err := db.Exec("UPDATE reviews SET status = ? WHERE id = ?", status, id)
	return err
}

func DeleteReview(db *sql.DB, id int) error {
	_, err := db.Exec("DELETE FROM reviews WHERE id = ?", id)
	return err
}
