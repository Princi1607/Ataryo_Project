# Ataryo - Sustainable Textiles Website with CMS

A modern, full-stack web application for Ataryo, a sustainable textiles company. Features a comprehensive Content Management System (CMS) that allows real-time editing of all website content and images.

## 🚀 Features

### Frontend

- **Modern React + TypeScript** application
- **Responsive Design** with Tailwind CSS
- **Dynamic Content** loaded from MongoDB
- **Real-time Updates** when content is changed
- **Image Optimization** with Cloudinary integration
- **Smooth Animations** and transitions
- **SEO-friendly** structure

### Backend & CMS

- **RESTful API** built with Node.js and Express
- **MongoDB** database for content storage
- **JWT Authentication** for admin access
- **Image Upload** with Cloudinary
- **Real-time Content Management**
- **Comprehensive Admin Panel**

### Admin Panel Features

- ✅ **Hero Section** - Title, subtitle, description, background image, CTA buttons
- ✅ **About Section** - Company info, mission, vision, statistics, images
- ✅ **Products Section** - Applications, descriptions, icons, CTA content
- ✅ **Contact Section** - Contact details, social links
- 🔄 **Additional Sections** - More sections coming in future updates
- 📸 **Image Management** - Upload, replace, and organize images
- 💾 **Real-time Saving** - Changes reflect immediately on the website
- 🔐 **Secure Access** - JWT-based authentication

## 🛠️ Technology Stack

### Frontend

- React 18.3.1
- TypeScript
- Tailwind CSS 3.4.1
- Zustand (State Management)
- Axios (API Client)
- Lucide React (Icons)
- Vite (Build Tool)

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary (Image Storage)
- Multer (File Upload)
- CORS enabled

## 📋 Quick Start

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ataryo-project
   ```

2. **Install dependencies**

   ```bash
   # Frontend dependencies
   npm install

   # Backend dependencies
   cd backend
   npm install
   ```

3. **Set up environment variables**

   Backend `.env`:

   ```env
   MONGODB_URI=mongodb://localhost:27017/ataryo
   JWT_SECRET=your_jwt_secret_here
   ADMIN_EMAIL=admin@ataryo.com
   ADMIN_PASSWORD=admin123
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=5000
   ```

   Frontend `.env`:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the servers**

   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   npm run dev
   ```

5. **Create admin user**

   ```bash
   curl -X POST http://localhost:5000/api/auth/create-admin
   ```

6. **Access the application**
   - Website: http://localhost:5173
   - Admin Login: Click "Admin" button (admin@ataryo.com / admin123)

## 📚 Detailed Setup

For comprehensive setup instructions, deployment guides, and troubleshooting, see [SETUP.md](./SETUP.md).

## 🎯 Admin Panel Usage

1. **Login**: Click "Admin" in the top-right corner
2. **Navigate**: Use the sidebar to switch between content sections
3. **Edit Content**: Modify text fields, upload images, manage lists
4. **Save Changes**: Click "Save Changes" to persist updates
5. **Preview**: Changes appear immediately on the main website

### Editable Content Sections

| Section            | Content Types                                               | Features        |
| ------------------ | ----------------------------------------------------------- | --------------- |
| **Hero**           | Title, subtitle, description, background image, CTA buttons | ✅ Full editing |
| **About**          | Company info, mission, vision, statistics, section image    | ✅ Full editing |
| **Products**       | Applications list, descriptions, icons, CTA content         | ✅ Full editing |
| **Contact**        | Email, phone, address, social media links                   | ✅ Full editing |
| **Other Sections** | Partnerships, Research, Team, etc.                          | 🔄 Coming soon  |

## 🔧 API Documentation

### Authentication Endpoints

- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/create-admin` - Create admin user

### Content Management

- `GET /api/content` - Fetch all content (public)
- `PUT /api/content/:section` - Update specific section (admin only)

### File Upload

- `POST /api/upload/image` - Upload image to Cloudinary (admin only)

## 🏗️ Project Structure

```
ataryo-project/
├── backend/                 # Node.js API server
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   └── server.js           # Express server
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── store/             # Zustand state management
│   └── App.tsx            # Main app component
├── public/                # Static assets
└── README.md              # This file
```

## 🚀 Deployment

### Backend Deployment

1. Set up MongoDB Atlas or dedicated MongoDB server
2. Configure environment variables for production
3. Deploy to services like Railway, Heroku, or DigitalOcean
4. Set up proper CORS origins

### Frontend Deployment

1. Update `VITE_API_BASE_URL` to production backend URL
2. Build: `npm run build`
3. Deploy `dist/` folder to Netlify, Vercel, or similar

## 🔒 Security Features

- JWT-based authentication
- Protected admin routes
- Input validation and sanitization
- Secure file upload with type checking
- CORS configuration
- Environment variable protection

## 🎨 Design System

The website follows Ataryo's brand guidelines:

- **Primary Colors**: Green palette (#0A5737, #067141, #00A651)
- **Accent Colors**: Light greens (#85B642, #A6CE39)
- **Typography**: Clean, modern fonts with proper hierarchy
- **Layout**: Responsive grid system with mobile-first approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for Ataryo. All rights reserved.

## 🆘 Support

For technical support or questions:

- Check the [SETUP.md](./SETUP.md) guide
- Review API documentation above
- Check browser developer tools for frontend issues
- Review server logs for backend issues

---

**Built with ❤️ for sustainable textiles and a better future.**
