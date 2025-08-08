import React, { useEffect, useState } from 'react';
import { useAuthActions } from "@convex-dev/auth/react";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";

export default function App() {
    const { signOut } = useAuthActions();
    const user = useQuery(api.auth.loggedInUser);
    const [currentSection, setCurrentSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [typingText, setTypingText] = useState('');
    const [showModal, setShowModal] = useState(false);

    const fullText = "Computer Engineering Student & Code Architect";

    useEffect(() => {
        // Initialize background effects
        createStarfield();
        createParticles();
        animateStats();

        // Typing animation
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < fullText.length) {
                setTypingText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);

        return () => clearInterval(typeInterval);
    }, []);

    const createStarfield = () => {
        const starfield = document.getElementById('starfield');
        if (!starfield) return;

        // Clear existing stars
        starfield.innerHTML = '';

        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: ${getRandomStarColor()};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite alternate;
        animation-delay: ${Math.random() * 2}s;
      `;
            starfield.appendChild(star);
        }
    };

    const getRandomStarColor = () => {
        const colors = ['#00ff88', '#00d4ff', '#ffd23f', '#ff0080', '#ffffff'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const createParticles = () => {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        // Clear existing particles
        particlesContainer.innerHTML = '';

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #00ff88;
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.7;
      `;

            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';

            particlesContainer.appendChild(particle);
            animateParticle(particle);
        }
    };

    const animateParticle = (particle: HTMLElement) => {
        const duration = Math.random() * 10000 + 5000;
        const startX = parseFloat(particle.style.left);
        const startY = parseFloat(particle.style.top);
        const endX = Math.random() * window.innerWidth;
        const endY = Math.random() * window.innerHeight;

        particle.animate([
            { transform: `translate(0, 0)`, opacity: 0.7 },
            { transform: `translate(${endX - startX}px, ${endY - startY}px)`, opacity: 0 }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => {
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = Math.random() * window.innerHeight + 'px';
            animateParticle(particle);
        };
    };

    const animateStats = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach((stat) => {
            const target = parseInt(stat.getAttribute('data-target') || '0');
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current).toString();
            }, 20);
        });
    };

    const scrollToSection = (sectionId: string) => {
        setCurrentSection(sectionId);
        setIsMenuOpen(false);
    };

    const downloadResume = () => {
        // Create a simple resume download
        const resumeContent = `
DIGITAL REBEL - Computer Engineering Student

CONTACT:
Email: rebel@universe.com
GitHub: github.com/digitalrebel
LinkedIn: linkedin.com/in/digitalrebel

SKILLS:
- Python (90%)
- JavaScript (85%)
- C++ (80%)
- Java (75%)
- React (88%)
- Node.js (82%)

PROJECTS:
- Retro Arcade Hub
- AI Vision Assistant
- Smart Home Controller
- Space Explorer VR

EDUCATION:
Computer Engineering Student
Years of Study: 3+

STATS:
- 50+ Projects Built
- 1337 Cups of Coffee
- 999+ Bugs Squashed
    `;

        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'DigitalRebel_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const triggerEasterEgg = () => {
        setShowModal(true);
        // Add some fun particles
        for (let i = 0; i < 20; i++) {
            createClickParticle(document.querySelector('.hero-title'));
        }
    };

    const createClickParticle = (element: Element | null) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const particle = document.createElement('div');

        particle.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width/2}px;
      top: ${rect.top + rect.height/2}px;
      width: 6px;
      height: 6px;
      background: #00ff88;
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000;
    `;

        document.body.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const velocity = 100 + Math.random() * 100;

        particle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            {
                transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => particle.remove();
    };

    if (user === undefined) {
        return <div className="loading">Loading...</div>;
    }

    if (user === null) {
        return <SignInForm />;
    }

    return (
        <div className="app">
            {/* Starfield Background */}
            <div id="starfield"></div>

            {/* Floating Particles */}
            <div id="particles"></div>

            {/* Navigation */}
            <nav className="nav-container">
                <div className="nav-brand">
                    <span className="pixel-text">DIGITAL_REBEL.exe</span>
                </div>
                <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <a href="#home" className={`nav-link ${currentSection === 'home' ? 'active' : ''}`} onClick={() => scrollToSection('home')}>
                        <span className="nav-icon">🏠</span>
                        <span>Home</span>
                    </a>
                    <a href="#about" className={`nav-link ${currentSection === 'about' ? 'active' : ''}`} onClick={() => scrollToSection('about')}>
                        <span className="nav-icon">👨‍💻</span>
                        <span>About</span>
                    </a>
                    <a href="#projects" className={`nav-link ${currentSection === 'projects' ? 'active' : ''}`} onClick={() => scrollToSection('projects')}>
                        <span className="nav-icon">⚡</span>
                        <span>Projects</span>
                    </a>
                    <a href="#skills" className={`nav-link ${currentSection === 'skills' ? 'active' : ''}`} onClick={() => scrollToSection('skills')}>
                        <span className="nav-icon">🛠️</span>
                        <span>Skills</span>
                    </a>
                    <a href="#blog" className={`nav-link ${currentSection === 'blog' ? 'active' : ''}`} onClick={() => scrollToSection('blog')}>
                        <span className="nav-icon">📝</span>
                        <span>Blog</span>
                    </a>
                    <a href="#contact" className={`nav-link ${currentSection === 'contact' ? 'active' : ''}`} onClick={() => scrollToSection('contact')}>
                        <span className="nav-icon">📡</span>
                        <span>Contact</span>
                    </a>
                </div>
                <div className="nav-actions">
                    <SignOutButton />
                    <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main>
                {/* Home Section */}
                {currentSection === 'home' && (
                    <section id="home" className="section active">
                        <div className="hero-container">
                            <div className="hero-content">
                                <div className="glitch-wrapper">
                                    <h1 className="hero-title glitch" data-text="DIGITAL REBEL" onClick={triggerEasterEgg}>
                                        DIGITAL REBEL
                                    </h1>
                                </div>
                                <div className="hero-subtitle">
                                    <span className="typing-text">{typingText}</span>
                                    <span className="cursor">|</span>
                                </div>
                                <div className="hero-description">
                                    <p>Building the future one pixel at a time 🚀</p>
                                    <p className="subtitle">Where creativity meets code in a galaxy far, far away...</p>
                                </div>
                                <div className="hero-buttons">
                                    <button className="btn btn-primary" onClick={() => scrollToSection('projects')}>
                                        <span>View Projects</span>
                                        <div className="btn-particles"></div>
                                    </button>
                                    <button className="btn btn-secondary" onClick={downloadResume}>
                                        <span>Download Resume</span>
                                        <div className="btn-particles"></div>
                                    </button>
                                </div>
                            </div>
                            <div className="hero-visual">
                                <div className="minecraft-character">
                                    <div className="character-head"></div>
                                    <div className="character-body"></div>
                                    <div className="character-arms">
                                        <div className="arm left"></div>
                                        <div className="arm right"></div>
                                    </div>
                                    <div className="character-legs">
                                        <div className="leg left"></div>
                                        <div className="leg right"></div>
                                    </div>
                                </div>
                                <div className="floating-elements">
                                    <div className="floating-block" style={{'--delay': '0s'} as React.CSSProperties}>⚡</div>
                                    <div className="floating-block" style={{'--delay': '1s'} as React.CSSProperties}>🔧</div>
                                    <div className="floating-block" style={{'--delay': '2s'} as React.CSSProperties}>💻</div>
                                    <div className="floating-block" style={{'--delay': '3s'} as React.CSSProperties}>🚀</div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* About Section */}
                {currentSection === 'about' && (
                    <section id="about" className="section active">
                        <div className="container">
                            <h2 className="section-title">
                                <span className="title-text">About the Rebel</span>
                                <div className="title-underline"></div>
                            </h2>
                            <div className="about-content">
                                <div className="about-text">
                                    <div className="terminal-window">
                                        <div className="terminal-header">
                                            <div className="terminal-buttons">
                                                <span className="btn-close"></span>
                                                <span className="btn-minimize"></span>
                                                <span className="btn-maximize"></span>
                                            </div>
                                            <span className="terminal-title">about_me.exe</span>
                                        </div>
                                        <div className="terminal-body">
                                            <p className="terminal-line">
                                                <span className="prompt">rebel@universe:~$</span>
                                                <span className="command">whoami</span>
                                            </p>
                                            <p className="terminal-output">
                                                A passionate Computer Engineering student who believes that the best code
                                                is written with a touch of rebellion and a lot of creativity. I'm the type
                                                who stays up until 3 AM debugging code just because "it's almost working!"
                                            </p>
                                            <p className="terminal-line">
                                                <span className="prompt">rebel@universe:~$</span>
                                                <span className="command">cat interests.txt</span>
                                            </p>
                                            <p className="terminal-output">
                                                🎮 Building games that make people smile<br/>
                                                🤖 Creating AI that doesn't want to take over the world<br/>
                                                🔧 Hardware hacking and IoT adventures<br/>
                                                🌟 Open source contributions<br/>
                                                🎨 Digital art and creative coding
                                            </p>
                                            <p className="terminal-line">
                                                <span className="prompt">rebel@universe:~$</span>
                                                <span className="command">echo $MOTTO</span>
                                            </p>
                                            <p className="terminal-output">
                                                "Code like nobody's watching, debug like everybody is!"
                                            </p>
                                            <span className="cursor-blink">_</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="about-stats">
                                    <div className="stat-card">
                                        <div className="stat-icon">📚</div>
                                        <div className="stat-number" data-target="3">0</div>
                                        <div className="stat-label">Years of Study</div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="stat-icon">💻</div>
                                        <div className="stat-number" data-target="50">0</div>
                                        <div className="stat-label">Projects Built</div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="stat-icon">☕</div>
                                        <div className="stat-number" data-target="1337">0</div>
                                        <div className="stat-label">Cups of Coffee</div>
                                    </div>
                                    <div className="stat-card">
                                        <div className="stat-icon">🐛</div>
                                        <div className="stat-number" data-target="999">0</div>
                                        <div className="stat-label">Bugs Squashed</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Projects Section */}
                {currentSection === 'projects' && (
                    <section id="projects" className="section active">
                        <div className="container">
                            <h2 className="section-title">
                                <span className="title-text">Epic Builds</span>
                                <div className="title-underline"></div>
                            </h2>
                            <div className="projects-grid">
                                <div className="project-card" data-tech="React, Node.js, MongoDB">
                                    <div className="project-image">
                                        <div className="project-placeholder">
                                            <span className="project-icon">🎮</span>
                                        </div>
                                        <div className="project-overlay">
                                            <button className="btn btn-small">View Live</button>
                                            <button className="btn btn-small btn-outline">GitHub</button>
                                        </div>
                                    </div>
                                    <div className="project-content">
                                        <h3 className="project-title">Retro Arcade Hub</h3>
                                        <p className="project-description">
                                            A nostalgic gaming platform featuring classic arcade games built with modern web technologies.
                                            Includes multiplayer support and leaderboards.
                                        </p>
                                        <div className="project-tech">
                                            <span className="tech-tag">React</span>
                                            <span className="tech-tag">Node.js</span>
                                            <span className="tech-tag">Socket.io</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="project-card" data-tech="Python, TensorFlow, OpenCV">
                                    <div className="project-image">
                                        <div className="project-placeholder">
                                            <span className="project-icon">🤖</span>
                                        </div>
                                        <div className="project-overlay">
                                            <button className="btn btn-small">View Live</button>
                                            <button className="btn btn-small btn-outline">GitHub</button>
                                        </div>
                                    </div>
                                    <div className="project-content">
                                        <h3 className="project-title">AI Vision Assistant</h3>
                                        <p className="project-description">
                                            Computer vision application that helps identify objects and provides real-time assistance.
                                            Built with machine learning and optimized for mobile devices.
                                        </p>
                                        <div className="project-tech">
                                            <span className="tech-tag">Python</span>
                                            <span className="tech-tag">TensorFlow</span>
                                            <span className="tech-tag">OpenCV</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="project-card" data-tech="Arduino, C++, IoT">
                                    <div className="project-image">
                                        <div className="project-placeholder">
                                            <span className="project-icon">🏠</span>
                                        </div>
                                        <div className="project-overlay">
                                            <button className="btn btn-small">View Demo</button>
                                            <button className="btn btn-small btn-outline">GitHub</button>
                                        </div>
                                    </div>
                                    <div className="project-content">
                                        <h3 className="project-title">Smart Home Controller</h3>
                                        <p className="project-description">
                                            IoT-based home automation system with voice control, mobile app integration,
                                            and energy monitoring capabilities.
                                        </p>
                                        <div className="project-tech">
                                            <span className="tech-tag">Arduino</span>
                                            <span className="tech-tag">C++</span>
                                            <span className="tech-tag">IoT</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="project-card" data-tech="Unity, C#, Blender">
                                    <div className="project-image">
                                        <div className="project-placeholder">
                                            <span className="project-icon">🌌</span>
                                        </div>
                                        <div className="project-overlay">
                                            <button className="btn btn-small">Play Game</button>
                                            <button className="btn btn-small btn-outline">GitHub</button>
                                        </div>
                                    </div>
                                    <div className="project-content">
                                        <h3 className="project-title">Space Explorer VR</h3>
                                        <p className="project-description">
                                            Immersive VR experience that lets users explore distant galaxies and learn about space.
                                            Features realistic physics and stunning visuals.
                                        </p>
                                        <div className="project-tech">
                                            <span className="tech-tag">Unity</span>
                                            <span className="tech-tag">C#</span>
                                            <span className="tech-tag">VR</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Skills Section */}
                {currentSection === 'skills' && (
                    <section id="skills" className="section active">
                        <div className="container">
                            <h2 className="section-title">
                                <span className="title-text">Power-Ups & Abilities</span>
                                <div className="title-underline"></div>
                            </h2>
                            <div className="skills-container">
                                <div className="skills-category">
                                    <h3 className="category-title">
                                        <span className="category-icon">💻</span>
                                        Programming Languages
                                    </h3>
                                    <div className="skills-grid">
                                        <div className="skill-item" data-level="90">
                                            <div className="skill-icon">🐍</div>
                                            <div className="skill-info">
                                                <span className="skill-name">Python</span>
                                                <div className="skill-bar">
                                                    <div className="skill-progress" style={{'--width': '90%'} as React.CSSProperties}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="skill-item" data-level="85">
                                            <div className="skill-icon">⚡</div>
                                            <div className="skill-info">
                                                <span className="skill-name">JavaScript</span>
                                                <div className="skill-bar">
                                                    <div className="skill-progress" style={{'--width': '85%'} as React.CSSProperties}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="skill-item" data-level="80">
                                            <div className="skill-icon">🔧</div>
                                            <div className="skill-info">
                                                <span className="skill-name">C++</span>
                                                <div className="skill-bar">
                                                    <div className="skill-progress" style={{'--width': '80%'} as React.CSSProperties}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="skill-item" data-level="75">
                                            <div className="skill-icon">☕</div>
                                            <div className="skill-info">
                                                <span className="skill-name">Java</span>
                                                <div className="skill-bar">
                                                    <div className="skill-progress" style={{'--width': '75%'} as React.CSSProperties}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="skills-category">
                                    <h3 className="category-title">
                                        <span className="category-icon">🌐</span>
                                        Web Technologies
                                    </h3>
                                    <div className="skills-grid">
                                        <div className="skill-item" data-level="88">
                                            <div className="skill-icon">⚛️</div>
                                            <div className="skill-info">
                                                <span className="skill-name">React</span>
                                                <div className="skill-bar">
                                                    <div className="skill-progress" style={{'--width': '88%'} as React.CSSProperties}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="skill-item" data-level="82">
                                            <div className="skill-icon">🟢</div>
                                            <div className="skill-info">
                                                <span className="skill-name">Node.js</span>
                                                <div className="skill-bar">
                                                    <div className="skill-progress" style={{'--width': '82%'} as React.CSSProperties}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="skill-item" data-level="85">
                                            <div className="skill-icon">🎨</div>
                                            <div className="skill-info">
                                                <span className="skill-name">CSS/SASS</span>
                                                <div className="skill-bar">
                                                    <div className="skill-progress" style={{'--width': '85%'} as React.CSSProperties}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="skill-item" data-level="78">
                                            <div className="skill-icon">🔥</div>
                                            <div className="skill-info">
                                                <span className="skill-name">Firebase</span>
                                                <div className="skill-bar">
                                                    <div className="skill-progress" style={{'--width': '78%'} as React.CSSProperties}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="skills-category">
                                    <h3 className="category-title">
                                        <span className="category-icon">🛠️</span>
                                        Tools & Hardware
                                    </h3>
                                    <div className="skills-grid">
                                        <div className="skill-item" data-level="85">
                                            <div className="skill-icon">🐙</div>
                                            <div className="skill-info">
                                                <span className="skill-name">Git/GitHub</span>
                                                <div className="skill-bar">
                                                    <div className="skill-progress" style={{'--width': '85%'} as React.CSSProperties}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="skill-item" data-level="75">
                                            <div className="skill-icon">🔌</div>
                                            <div className="skill-info">
                                                <span className="skill-name">Arduino</span>
                                                <div className="skill-bar">
                                                    <div className="skill-progress" style={{'--width': '75%'} as React.CSSProperties}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="skill-item" data-level="70">
                                            <div className="skill-icon">🐧</div>
                                            <div className="skill-info">
                                                <span className="skill-name">Linux</span>
                                                <div className="skill-bar">
                                                    <div className="skill-progress" style={{'--width': '70%'} as React.CSSProperties}></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="skill-item" data-level="80">
                                            <div className="skill-icon">🎮</div>
                                            <div className="skill-info">
                                                <span className="skill-name">Unity</span>
                                                <div className="skill-bar">
                                                    <div className="skill-progress" style={{'--width': '80%'} as React.CSSProperties}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Blog Section */}
                {currentSection === 'blog' && (
                    <section id="blog" className="section active">
                        <div className="container">
                            <h2 className="section-title">
                                <span className="title-text">Digital Chronicles</span>
                                <div className="title-underline"></div>
                            </h2>
                            <div className="blog-grid">
                                <article className="blog-card">
                                    <div className="blog-image">
                                        <div className="blog-placeholder">
                                            <span className="blog-icon">🚀</span>
                                        </div>
                                        <div className="blog-date">Dec 15, 2024</div>
                                    </div>
                                    <div className="blog-content">
                                        <h3 className="blog-title">Building My First Neural Network</h3>
                                        <p className="blog-excerpt">
                                            Journey into the world of AI and machine learning, starting with a simple neural network
                                            that can recognize handwritten digits...
                                        </p>
                                        <div className="blog-tags">
                                            <span className="blog-tag">AI</span>
                                            <span className="blog-tag">Python</span>
                                            <span className="blog-tag">TensorFlow</span>
                                        </div>
                                        <button className="btn btn-small btn-outline">Read More</button>
                                    </div>
                                </article>

                                <article className="blog-card">
                                    <div className="blog-image">
                                        <div className="blog-placeholder">
                                            <span className="blog-icon">🎮</span>
                                        </div>
                                        <div className="blog-date">Dec 10, 2024</div>
                                    </div>
                                    <div className="blog-content">
                                        <h3 className="blog-title">Creating Retro Games with Modern Tools</h3>
                                        <p className="blog-excerpt">
                                            How I combined nostalgic 8-bit aesthetics with contemporary web technologies to create
                                            engaging browser-based games...
                                        </p>
                                        <div className="blog-tags">
                                            <span className="blog-tag">GameDev</span>
                                            <span className="blog-tag">JavaScript</span>
                                            <span className="blog-tag">Canvas</span>
                                        </div>
                                        <button className="btn btn-small btn-outline">Read More</button>
                                    </div>
                                </article>

                                <article className="blog-card">
                                    <div className="blog-image">
                                        <div className="blog-placeholder">
                                            <span className="blog-icon">🔧</span>
                                        </div>
                                        <div className="blog-date">Dec 5, 2024</div>
                                    </div>
                                    <div className="blog-content">
                                        <h3 className="blog-title">IoT Adventures: Smart Home on a Budget</h3>
                                        <p className="blog-excerpt">
                                            Building a comprehensive home automation system using Arduino, Raspberry Pi, and a lot of
                                            creativity (and coffee)...
                                        </p>
                                        <div className="blog-tags">
                                            <span className="blog-tag">IoT</span>
                                            <span className="blog-tag">Arduino</span>
                                            <span className="blog-tag">Hardware</span>
                                        </div>
                                        <button className="btn btn-small btn-outline">Read More</button>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </section>
                )}

                {/* Contact Section */}
                {currentSection === 'contact' && (
                    <section id="contact" className="section active">
                        <div className="container">
                            <h2 className="section-title">
                                <span className="title-text">Establish Connection</span>
                                <div className="title-underline"></div>
                            </h2>
                            <div className="contact-content">
                                <div className="contact-info">
                                    <div className="contact-card">
                                        <div className="contact-icon">📧</div>
                                        <h3>Send a Message</h3>
                                        <p>Ready to collaborate on something awesome? Drop me a line!</p>
                                    </div>
                                    <div className="contact-card">
                                        <div className="contact-icon">🌐</div>
                                        <h3>Connect Online</h3>
                                        <div className="social-links">
                                            <a href="#" className="social-link" title="GitHub">
                                                <span className="social-icon">🐙</span>
                                            </a>
                                            <a href="#" className="social-link" title="LinkedIn">
                                                <span className="social-icon">💼</span>
                                            </a>
                                            <a href="#" className="social-link" title="Twitter">
                                                <span className="social-icon">🐦</span>
                                            </a>
                                            <a href="#" className="social-link" title="Discord">
                                                <span className="social-icon">🎮</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="contact-card">
                                        <div className="contact-icon">⚡</div>
                                        <h3>Quick Response</h3>
                                        <p>I usually respond within 24 hours. Let's build something amazing together!</p>
                                    </div>
                                </div>
                                <div className="contact-form-container">
                                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" id="name" name="name" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" id="email" name="email" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="subject">Subject</label>
                                            <input type="text" id="subject" name="subject" required />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message">Message</label>
                                            <textarea id="message" name="message" rows={5} required></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-full">
                                            <span>Send Message</span>
                                            <div className="btn-particles"></div>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-text">
                            <p>&copy; 2024 Digital Rebel. Crafted with ❤️ and lots of ☕</p>
                            <p className="footer-subtitle">May the code be with you, always.</p>
                        </div>
                        <div className="footer-links">
                            <a href="#" onClick={downloadResume}>Resume</a>
                            <a href="#blog" onClick={() => scrollToSection('blog')}>Blog</a>
                            <a href="#projects" onClick={() => scrollToSection('projects')}>Projects</a>
                            <a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Easter Egg Modal */}
            {showModal && (
                <div className="modal" style={{display: 'block'}}>
                    <div className="modal-content">
                        <span className="modal-close" onClick={() => setShowModal(false)}>&times;</span>
                        <h3>🎉 You found an Easter Egg! 🎉</h3>
                        <p>Congratulations, fellow code explorer! You've discovered one of my hidden secrets.</p>
                        <p>Here's a fun fact: This portfolio was built with React, Convex, and zero templates!</p>
                        <button className="btn btn-primary" onClick={() => setShowModal(false)}>Awesome!</button>
                    </div>
                </div>
            )}
        </div>
    );
}
