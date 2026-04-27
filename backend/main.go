package main

import (
	"database/sql"
	"log"
	"net/http"
	"strconv"

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
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// DB
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
		// Tours
		api.GET("/tours", func(c *gin.Context) {
			tours, err := models.GetTours(db)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, tours)
		})

		// Bookings
		api.GET("/bookings", func(c *gin.Context) {
			bookings, err := models.GetAllBookings(db)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, bookings)
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

		api.PUT("/bookings/:id/status", func(c *gin.Context) {
			id, err := strconv.Atoi(c.Param("id"))
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid booking ID"})
				return
			}
			var req struct {
				Status string `json:"status"`
			}
			if err := c.ShouldBindJSON(&req); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			if err := models.UpdateBookingStatus(db, id, req.Status); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"message": "Booking status updated"})
		})

		api.DELETE("/bookings/:id", func(c *gin.Context) {
			id, err := strconv.Atoi(c.Param("id"))
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid booking ID"})
				return
			}
			if err := models.DeleteBooking(db, id); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"message": "Booking deleted"})
		})

		// Packages
		api.GET("/packages", func(c *gin.Context) {
			packages, err := models.GetAllPackages(db)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, packages)
		})

		// Destinations
		api.GET("/destinations", func(c *gin.Context) {
			destinations, err := models.GetAllDestinations(db)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, destinations)
		})

		// Guides
		api.GET("/guides", func(c *gin.Context) {
			guides, err := models.GetAllGuides(db)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, guides)
		})

		// Reviews
		api.GET("/reviews", func(c *gin.Context) {
			reviews, err := models.GetAllReviews(db)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, reviews)
		})

		api.PUT("/reviews/:id/status", func(c *gin.Context) {
			id, err := strconv.Atoi(c.Param("id"))
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid review ID"})
				return
			}
			var req struct {
				Status string `json:"status"`
			}
			if err := c.ShouldBindJSON(&req); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			if err := models.UpdateReviewStatus(db, id, req.Status); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"message": "Review status updated"})
		})

		api.DELETE("/reviews/:id", func(c *gin.Context) {
			id, err := strconv.Atoi(c.Param("id"))
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid review ID"})
				return
			}
			if err := models.DeleteReview(db, id); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			c.JSON(http.StatusOK, gin.H{"message": "Review deleted"})
		})
	}

	// Serve frontend static files
	r.Static("/static", "./frontend")
	r.Static("/admin", "./frontend/admin")
	r.StaticFile("/", "./frontend/index.html")
	r.StaticFile("/about.html", "./frontend/about.html")

	// Admin panel routes
	adminRoutes := []string{
		"/admin", "/admin/index.html", "/admin/bookings.html",
		"/admin/packages.html", "/admin/destinations.html",
		"/admin/guides.html", "/admin/reviews.html",
	}
	for _, route := range adminRoutes {
		r.StaticFile(route, "./frontend/admin/index.html")
	}

	r.Run(":8080")
}
