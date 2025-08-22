import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import ThreeJSExperience from './components/three/ThreeJSExperience';
import ThemeToggle from './components/ui/ThemeToggle';
import Preloader from './components/ui/Preloader';
import PreloaderAnimations from './components/ui/PreloaderAnimations';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThreeProvider } from './contexts/ThreeContext';

function App() {
  return (
    <ThreeProvider>
      <ThemeProvider>
        <div className="App relative min-h-screen">
          <Preloader />
          <PreloaderAnimations />
          
          {/* Fixed Three.js Experience */}
          <div className="experience fixed w-full h-full">
            <ThreeJSExperience />
          </div>
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Page Content */}
          <div className="page">
            <div className="page-wrapper">
              
              {/* Hero Section */}
              <section className="hero">
                <Hero />
              </section>
              
              {/* First Move Section Margin */}
              <div className="first-move section-margin"></div>
              
              {/* About Section */}
              <section className="section first-section left">
                <div className="progress-wrapper progress-bar-wrapper-left">
                  <div className="progress-bar"></div>
                </div>
                <About />
              </section>
              
              {/* Second Move Section Margin */}
              <div className="second-move section-margin"></div>
              
              {/* Projects Section */}
              <section className="section second-section right">
                <div className="progress-wrapper progress-bar-wrapper-right">
                  <div className="progress-bar blue-background"></div>
                </div>
                <Projects />
              </section>
              
              {/* Third Move Section Margin */}
              <div className="third-move section-margin"></div>
              
              {/* Experience Section */}
              <section className="section third-section left">
                <div className="progress-wrapper progress-bar-wrapper-left">
                  <div className="progress-bar green-background"></div>
                </div>
                <Experience />
              </section>
              
              {/* Fourth Move Section Margin */}
              <div className="fourth-move section-margin"></div>
              
              {/* Contact Section */}
              <section className="section fourth-section right">
                <div className="progress-wrapper progress-bar-wrapper-right">
                  <div className="progress-bar blue-background"></div>
                </div>
                <Contact />
              </section>
              
              {/* Footer */}
              <footer className="footer">
                <span className="footer__copyright">
                  Copyright © 2025 - Safwan Sayeed
                </span>
              </footer>
              
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ThreeProvider>
  );
}

export default App;
