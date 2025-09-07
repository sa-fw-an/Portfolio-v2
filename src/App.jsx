import React, { Suspense } from "react";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import ThemeToggle from "./components/ui/ThemeToggle";
import Preloader from "./components/ui/Preloader";
import PreloaderAnimations from "./components/ui/PreloaderAnimations";
import Footer from "./components/ui/Footer";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThreeProvider } from "./contexts/ThreeContext";
const LazyThreeJSExperience = React.lazy(
  () => import("./components/three/ThreeJSExperience"),
);
const LazyProjects = React.lazy(() => import("./components/sections/Projects"));
const LazyExperience = React.lazy(
  () => import("./components/sections/Experience"),
);
const LazyContact = React.lazy(() => import("./components/sections/Contact"));

function App() {
  return (
    <ThreeProvider>
      <ThemeProvider>
        <div className="App relative min-h-screen">
          <Preloader />
          <PreloaderAnimations />

          {/* Fixed 3D Scene Background */}
          <div className="experience fixed w-full h-full">
            <ErrorBoundary>
              <Suspense fallback={null}>
                <LazyThreeJSExperience />
              </Suspense>
            </ErrorBoundary>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Main Content */}
          <div className="page">
            <div className="page-wrapper">
              <section className="hero">
                <Hero />
              </section>
              <About />
              <Suspense
                fallback={
                  <div className="loading-placeholder h-screen flex items-center justify-center">
                    Loading...
                  </div>
                }
              >
                <LazyProjects />
                <LazyExperience />
                <LazyContact />
              </Suspense>
              <Footer />
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ThreeProvider>
  );
}

export default App;
