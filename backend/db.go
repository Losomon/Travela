package models

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func ConnectDB() {
	var err error
	DB, err = sql.Open("sqlite3", "./travela.db")
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Initialize tables and sample data
	InitDB(DB)

	log.Println("Database connected and initialized")
}

func CloseDB() {
	if DB != nil {
		DB.Close()
	}
}

