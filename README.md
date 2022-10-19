# Adding Tailwind to the project
https://tailwindcss.com/docs/guides/nextjs

## Installations in terminal
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

## Add to tailwind.config.js
content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

## Add to globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

## Remove the CSS in globals.css
We only want the @tailwind stuff there

## then delete the Home.module.css

# Now you can run the project
npm run dev

# Once the project is done you can run 
npm run build

This will show you based on the different dymbols which pages are Server, Static and SSG

# Lazy load image
npm i --save react-lazy-load-image-component