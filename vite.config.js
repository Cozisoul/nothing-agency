// vite.config.js

export default {
  // This tells Vite to treat the 'src' folder as the root of your project.
  // When you run the dev server, it will look for index.html inside 'src'.
  root: 'src',
  build: {
    // This tells Vite to put the final built files in a 'dist' folder
    // at the top level of your project.
    outDir: '../dist',
    emptyOutDir: true, // Clean the dist folder before each build
  }
}