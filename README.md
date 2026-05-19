# Travela - Travel Booking Platform

A comprehensive travel booking platform with admin dashboard and customer-facing interface.

![Travela Application Screenshot](screenshot.png "Travela Application Dashboard")
*Note: Replace `screenshot.png` with your actual project screenshot.*

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Overview
Travela is a full-stack travel booking application that allows users to browse destinations, book tours, and manage their travel plans. The platform includes an admin dashboard for managing tours, bookings, customers, and system settings.

## Features
- **User Features**:
  - Browse and search travel destinations
  - View detailed tour packages
  - Book tours with secure payment processing
  - Manage user profiles and booking history
  - Reviews and ratings system

- **Admin Features**:
  - Dashboard with analytics and overview
  - Tour management (create, update, delete)
  - Destination management
  - Booking management and tracking
  - Customer management
  - Tour guide management
  - Settings and configuration
  - Reports and analytics

- **Technical Features**:
  - Responsive design for all devices
  - Role-based access control (RBAC)
  - RESTful API architecture
  - Secure authentication and authorization
  - Database optimization and caching
  - Comprehensive error handling
  - Unit and integration testing

## Project Structure
```
travela-1/
├── backend/                 # Go-based backend services
│   ├── cmd/                 # Application entry points
│   ├── internal/            # Private application code
│   ├── api/                 # API handlers and routes
│   ├── models/              # Data models
│   ├── services/            # Business logic
│   ├── middleware/          # Custom middleware
│   └── config/              # Configuration files
├── frontend/                # Frontend application
│   ├── admin/               # Admin dashboard interface
│   │   ├── assets/          # Static assets (CSS, JS, images)
│   │   ├── components/      # Reusable UI components
│   │   └── pages/           # Admin pages
│   ├── customer/            # Customer-facing interface
│   │   ├── components/      # Reusable UI components
│   │   └── pages/           # Customer pages
│   ├── assets/              # Shared static assets
│   └── scss/                # Sass stylesheets
├── docs/                    # Documentation
├── scripts/                 # Build and deployment scripts
└── README.md                # This file
```

## Technology Stack
- **Backend**: Go (Golang) with Gin/GORM
- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5
- **Database**: PostgreSQL
- **Authentication**: JWT-based authentication
- **Payment Processing**: Stripe integration (planned)
- **Deployment**: Docker containers
- **Development Tools**: 
  - Sass (SCSS) for styling
  - PostCSS for CSS processing
  - ESLint for JavaScript linting
  - GoLint/GolangCI-Lint for Go code quality

## Installation
1. **Prerequisites**:
   - Go 1.19+
   - Node.js 16+ and npm
   - PostgreSQL 13+
   - Git

2. **Backend Setup**:
   ```bash
   # Clone the repository
   git clone https://github.com/yourusername/travela-1.git
   cd travela-1/backend
   
   # Install Go dependencies
   go mod download
   
   # Copy environment template
   cp .env.example .env
   # Edit .env with your database and service configurations
   
   # Run database migrations
   go run cmd/migrate/main.go
   
   # Start the server
   go run cmd/api/main.go
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   
   # Install npm dependencies
   npm install
   
   # Build CSS from SCSS
   npm run build:css
   
   # Start development server
   npm start
   ```

## Usage
1. Access the admin dashboard at: `http://localhost:3000/admin`
2. Access the customer portal at: `http://localhost:3000`
3. Default admin credentials (change after first login):
   - Email: admin@travela.com
   - Password: admin123

## API Documentation
API documentation is available at `http://localhost:8080/swagger/index.html` when the backend is running.
Alternatively, view the [API docs](./docs/api.md) in the repository.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and submission process.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments
- Bootstrap team for the excellent UI framework
- Go community for robust backend libraries
- All contributors who have helped shape this project