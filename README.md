# ✈️ Travela - Travel Agency Website

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/yourusername/travela)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple.svg)](https://getbootstrap.com)
[![Status](https://img.shields.io/badge/status-Production-success.svg)]()

> **Your Journey Begins Here** - Discover Your Dream Destination with Travela's exclusive tours. From tropical beaches to vibrant cities, your perfect getaway is just a click away.

![Travela Hero Banner](https://via.placeholder.com/1200x400/0f2b4d/ffffff?text=Travela+-+Discover+Your+Dream+Destination)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Pages & Sections](#pages--sections)
- [Admin Dashboard](#admin-dashboard)
- [Design System](#design-system)
- [Browser Support](#browser-support)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Travela is a modern, fully responsive travel agency website designed to provide an exceptional user experience for travelers looking to explore the world. The platform showcases tour packages, destinations, and travel services while offering a seamless booking experience.

### Key Statistics (as of 2025)
- ✅ **1,284+** Total Bookings
- ✅ **$342K+** Total Revenue
- ✅ **2,456+** Happy Customers
- ✅ **128+** Active Tours Worldwide

## ✨ Features

### Frontend Features
- 🏠 **Hero Carousel** - Dynamic sliding banner with destination highlights
- 🔍 **Destination Search** - Find your perfect trip instantly
- 📦 **Tour Packages** - Curated travel experiences with pricing
- 🏨 **Service Showcase** - Luxury flights, hotels, 24/7 support
- 📝 **Booking System** - Online reservation form
- 🌍 **Destinations Grid** - Popular locations with image gallery
- 👥 **Team Section** - Expert travel guides showcase
- 📰 **Travel Blog** - Latest travel stories and tips
- ⭐ **Testimonials** - Customer reviews and ratings
- 📧 **Newsletter** - Email subscription for offers
- 📱 **Fully Responsive** - Works on all devices

### Admin Dashboard Features
- 📊 **Analytics Dashboard** - Revenue charts and statistics
- 📅 **Booking Management** - View and manage reservations
- 👤 **Customer Management** - User database
- 🎫 **Tour Package CRUD** - Add/Edit/Delete packages
- 💬 **Message Inbox** - Customer inquiries
- 📈 **Performance Reports** - Export data
- ⚙️ **Site Settings** - Configure website options

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | HTML5, CSS3, JavaScript (ES6) |
| **CSS Framework** | Bootstrap 5.3 |
| **Icons** | Font Awesome 6, Bootstrap Icons |
| **Charts** | Chart.js |
| **Carousel** | Owl Carousel 2 |
| **Lightbox** | Lightbox2 |
| **Animations** | CSS3 Transitions, Waypoints |
| **Fonts** | Google Fonts (Jost, Roboto, Inter) |

## 📁 Project Structure
travela/
│
├── index.html # Main landing page
├── about.html # About us page
├── services.html # Services listing
├── packages.html # Tour packages
├── blog.html # Travel blog
├── contact.html # Contact page
├── destination.html # Destinations
├── tour.html # Individual tours
├── booking.html # Booking form
├── gallery.html # Photo gallery
├── guides.html # Travel guides
├── testimonial.html # Reviews page
├── profile.html # User profile
├── login.html # Login page
├── register.html # Registration page
├── 404.html # Error page
│
├── admin/ # Admin Dashboard
│ └── dashboard.html
│
├── css/
│ ├── bootstrap.min.css
│ ├── style.css # Main custom styles
│ └── responsive.css
│
├── js/
│ ├── main.js # Core functionality
│ ├── booking.js
│ └── admin.js
│
├── lib/ # Third-party libraries
│ ├── owlcarousel/
│ ├── lightbox/
│ ├── easing/
│ └── waypoints/
│
├── img/ # Images
│ ├── carousel-1.jpg
│ ├── carousel-2.jpg
│ ├── carousel-3.jpg
│ ├── destination-.jpg
│ ├── packages-.jpg
│ ├── gallery-.jpg
│ ├── testimonial-.jpg
│ ├── guide-.jpg
│ └── blog-.jpg
│
└── docs/ # Documentation
├── design-system/
└── ui-guidelines/

## 🚀 Installation

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/travela.git
cd travela
No build steps required - This is a static HTML/CSS/JS project

Open in browser

bash
# Using Python (recommended)
python -m http.server 8000

# Using Live Server (VS Code)
# Right-click index.html → Open with Live Server

# Or simply double-click index.html
View Admin Dashboard

text
http://localhost:8000/admin/dashboard.html
Requirements
Any modern web browser

Internet connection (for CDN resources)

Optional: Local server for best experience

📄 Pages & Sections
Landing Page Sections
html
<!-- 1. Topbar -->
- Social media links
- Join Now / Sign In
- My Account dropdown

<!-- 2. Navigation -->
- Logo (Travela)
- Home, About, Services, Packages
- Blog, Explore (dropdown), Contact
- Plan Your Trip CTA

<!-- 3. Hero Carousel -->
- "Your Journey Begins"
- "Discover Your Dream Destination"
- Up to 50% savings offer
- Explore Now button

<!-- 4. Search Bar -->
- Destination search input
- "Find My Trip" button

<!-- 5. Why Choose Us -->
- Adventure starts with Travela
- Feature list (Luxury Flights, Top Hotels, etc.)

<!-- 6. Services -->
- Global Adventures
- Luxury Stops
- Travel Protection
- Expert Guides
- Seamless Transfers
- Culinary Journeys
- Family Adventures
- Wellness Retreats

<!-- 7. Destinations -->
- Tabbed interface (All, USA, Canada, Europe, Asia, Australia)
- Destination cards with images

<!-- 8. Explore Tours -->
- Local Escapes / Global Journeys tabs
- Tour cards with discounts

<!-- 9. Packages -->
- Hot deals carousel
- Package details with pricing

<!-- 10. Gallery -->
- Photo grid with lightbox
- Category filters

<!-- 11. Booking Form -->
- Name, Email, Date, Destination
- Persons, Category, Special Request

<!-- 12. Travel Guides -->
- Team member profiles
- Social links

<!-- 13. Blog -->
- Latest articles
- Read more links

<!-- 14. Testimonials -->
- Customer reviews
- Star ratings

<!-- 15. Newsletter -->
- Email subscription

<!-- 16. Footer -->
- Contact info, links, payments
🛡️ Admin Dashboard
Access the admin panel at /admin/dashboard.html

Dashboard Features
Section	Description
Statistics Cards	Total bookings, revenue, customers, active tours
Revenue Chart	Monthly revenue trends (line chart)
Recent Bookings	Latest reservations with status
Tour Packages	Manage featured packages (Edit/Delete)
Messages	Customer inquiries inbox
Booking Stats	Distribution by status (doughnut chart)
Default Admin Credentials
text
Email: admin@travela.com
Password: admin123
Note: Update credentials before production deployment

🎨 Design System
Color Palette
Role	Color	Hex	Usage
Primary	Ocean Blue	#0d6efd	Buttons, links, accents
Secondary	Teal	#00b4d8	Hover states, icons
Dark	Navy	#0f2b4d	Headers, footer
Light	Soft Gray	#f4f7fc	Backgrounds
Success	Green	#2a9d8f	Confirmed status
Warning	Yellow	#e9c46a	Pending status
Danger	Coral	#e76f51	Cancelled status
Text	Dark Slate	#1a2a3a	Body text
Text Light	Gray	#6c757d	Secondary text
Typography
Element	Font	Weight	Size
Headings	Jost	600-700	1.2rem - 3rem
Body	Roboto / Inter	400	1rem
Buttons	Jost	500	0.9rem
Small Text	Roboto	400	0.8rem
Spacing System
Base unit: 4px

Common spacing: 8px, 12px, 16px, 20px, 24px, 32px, 48px, 64px

Border Radius
Buttons: 50px (pill-shaped)

Cards: 16px - 20px

Inputs: 12px

Icons: 50% (circular)

🌐 Browser Support
Browser	Version	Status
Chrome	90+	✅ Full Support
Firefox	88+	✅ Full Support
Safari	14+	✅ Full Support
Edge	90+	✅ Full Support
Opera	76+	✅ Full Support
Mobile Safari	iOS 14+	✅ Full Support
Chrome Android	90+	✅ Full Support
🔧 Customization
Changing Colors
Edit the CSS variables in css/style.css:

css
:root {
    --primary: #0d6efd;
    --secondary: #00b4d8;
    --dark: #0f2b4d;
    --light: #f4f7fc;
}
Adding a New Destination
Add image to /img/destination-X.jpg

Add HTML block in destinations section

Update the destination count

Modifying Tour Packages
Navigate to admin dashboard

Click "Add New Tour"

Fill package details

Save changes

🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a Pull Request

Coding Standards
Use semantic HTML5

Follow BEM naming for custom CSS

Ensure responsive design (mobile-first)

Comment complex JavaScript functions

📞 Contact & Support
Website: www.travela.com

Email: support@travela.com

Phone: +012 345 67890

Twitter: @travela

Instagram: @travela

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Bootstrap team for the amazing framework

Font Awesome for comprehensive icons

Owl Carousel for smooth sliders

Chart.js for beautiful analytics

All contributors and testers

Made with ❤️ by Travela Team | Your Journey Begins Here