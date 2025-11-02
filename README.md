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
- Multer (File Upload)
- CORS configuration

## 📋 Quick Start

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Ataryo_Project
   ```

2. **Install dependencies**

   ```bash
   # Frontend dependencies (repo root)
   npm install

   # Backend dependencies
   cd backend
   npm install
   ```

3. **Set up environment variables**

   Backend env (copy `backend/env.example` to `backend/.env`):

   ```env
   MONGO_URI=mongodb://localhost:27017/ataryo
   JWT_SECRET=change-this-secret
   CORS_ORIGIN=http://localhost:5173
   SEED_ADMIN=true
   ADMIN_EMAIL=admin@ataryo.com
   ADMIN_PASSWORD=admin123
   PORT=5000
   # set to true in production if serving frontend from backend
   SERVE_CLIENT=false
   ```

   Frontend env (copy `frontend.env.example` to `.env` at repo root):

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the servers**

   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend (repo root)
   npm run dev
   ```

5. **Access the application**
   - Website: http://localhost:5173
   - Admin Login: Use the seeded admin (admin@ataryo.com / admin123)

## 📚 Detailed Setup

For comprehensive setup instructions, deployment guides, and troubleshooting, see SETUP section below.

## 🎯 Admin Panel Usage

1. **Login**: Navigate to /admin after logging in via your UI
2. **Navigate**: Use the admin navbar to switch between sections
3. **Edit Content**: Modify text fields, upload images, manage lists
4. **Save Changes**: Click save to persist updates
5. **Preview**: Changes appear immediately on the site

### Editable Content Sections

| Section            | Content Types                                               | Features        |
| ------------------ | ----------------------------------------------------------- | --------------- |
| **Hero**           | Title, subtitle, description, background image, CTA buttons | ✅ Full editing |
| **About**          | Company info, mission, vision, statistics, section image    | ✅ Full editing |
| **Products**       | Applications list, descriptions, icons, CTA content         | ✅ Full editing |
| **Contact**        | Email, phone, address, social media links                   | ✅ Full editing |
| **Other Sections** | Partnerships, Research, Team, etc.                          | 🔄 Coming soon  |

## 🔧 API Documentation

### Authentication
- `POST /api/auth/login` - Admin login

### Content
- `GET /api/content/:section` - Fetch a specific section
- `PUT /api/content/:section` - Update a specific section (requires Bearer token)

### File Upload
- `POST /api/upload/image` - Upload image (requires Bearer token)

## 🏗️ Project Structure

```
Ataryo_Project/
├── backend/                 # Node.js API server
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   └── server.js           # Express server
├── src/                    # React frontend
│   ├── components/         # React components
│   ├── store/              # Zustand state management
│   └── App.tsx             # Main app component
├── public/                 # Static assets
└── README.md               # This file
```

## 🚀 Deployment

### Option A: Frontend and Backend on separate hosts
1. Deploy backend (Railway/Render/DigitalOcean). Set env vars and `CORS_ORIGIN` to your frontend URL.
2. Deploy frontend (Netlify/Vercel). Set `VITE_API_BASE_URL` to your backend URL + `/api`.

### Option B: Serve frontend from backend
1. Build frontend at repo root: `npm run build` (generates `dist/`)
2. Move or ensure `dist/` is at repo root (as Vite does)
3. In backend `.env`, set `SERVE_CLIENT=true`
4. Start backend: `npm start` (it will serve `../dist/index.html` for all non-API routes)

## 🔒 Security
- JWT-based authentication
- Protected admin routes
- Basic input validation
- CORS configuration via `CORS_ORIGIN`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary software for Ataryo. All rights reserved.

## 🆘 Support

- Review API documentation above
- Check browser devtools for frontend issues
- Review server logs for backend issues
