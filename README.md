# Personal Portfolio Project

<div align="center">
  <img height="500" src="https://drive.google.com/uc?export=view&id=1T1B6P4xJZgsaY971ythTk9yfRJjIxLX-" />
</div>

A modern, responsive, and visually appealing personal portfolio built with **React**, **Vite**, **Tailwind CSS**, and **DaisyUI**. It highlights your skills, projects, and experiences in a dynamic and interactive format.

## Features

- ⚡ **Blazing Fast** - Built with Vite for optimal performance
- 🎨 **Styling** - Uses Tailwind CSS with DaisyUI components
- ✨ **Animations** - Includes AOS, Framer Motion, and React Awesome Reveal
- 📱 **Responsive** - Works on all device sizes
- 📊 **Data Visualization** - React Google Charts integration
- 📧 **Contact Form** - EmailJS integration for form submissions
- 🔥 **Firebase** - Optional Firebase integration
- 🚀 **Modern React** - Uses React 18 with hooks

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- DaisyUI
- AOS (Animate On Scroll)
- Framer Motion
- React Icons
- React Router DOM
- EmailJS
- Firebase (optional)
- React Google Charts
- SweetAlert2
- React Toastify

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mdashraful24/personal-portfolio.git
   ```

2. Navigate to the project directory:
   ```bash
   cd personal-portfolio
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`

Locally preview the production build.

### `npm run lint`

Runs ESLint to check for code quality issues.

## Configuration

Before running the project, you may need to configure:

1. **EmailJS**: Set up your EmailJS service in `src/components/Contact.jsx`
2. **Firebase**: Configure Firebase in `src/firebase.js` if using Firebase features
3. **Google Analytics**: Add your tracking ID if using analytics

## Folder Structure

```
src/
├── assets/            # Static assets like images
├── components/        # Reusable components
├── pages/             # Page components
├── styles/            # Global styles
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Main CSS file
```

## Customization

To personalize this portfolio:

1. Update the content in `src/data/` or relevant components
2. Replace placeholder images in `src/assets/`
3. Modify the color theme in `tailwind.config.js`
4. Update the meta tags in `src/components/Seo.jsx`

## Deployment

The project can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting