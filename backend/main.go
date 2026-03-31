package main

import (
	"database/sql"
	"log"
	"net/http"
	"path/filepath"

	"travela-backend/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	r := gin.Default()

	// CORS for frontend
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:8080", "http://127.0.0.1:8080"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

// DB - using models.ConnectDB in future, but direct for now
	db, err := sql.Open("sqlite3", "./travela.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	
	// Init DB
	models.InitDB(db)

	// API Routes
	api := r.Group("/api")
	{
		api.GET("/tours", func(c *gin.Context) {
			tours, err := models.GetTours(db)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, tours)
		})

		api.POST("/bookings", func(c *gin.Context) {
			var booking models.Booking
			if err := c.ShouldBindJSON(&booking); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			if err := models.CreateBooking(db, &booking); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusCreated, gin.H{"message": "Booking created", "booking": booking})
		})
	}

	// Serve frontend static files
	r.Static("/static", "./frontend")
	r.StaticFile("/", "./frontend/index.html")
	r.StaticFile("/about.html", "./frontend/about.html")
	// Add more static routes as needed

	r.Run(":8080")
}

