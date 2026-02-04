// Time + Scroll Uncertainty System
class UncertaintyLayout {
    constructor() {
        // Uncertainty metrics
        this.timeUncertainty = 0;      // 0-100 based on time of day
        this.scrollVolatility = 0;      // 0-100 based on scroll behavior
        this.combinedUncertainty = 0;   // Combined score
        
        // Scroll tracking
        this.scrollHistory = [];
        this.lastScrollTime = Date.now();
        this.lastScrollY = 0;
        
        this.init();
    }
    
    init() {
        // Calculate time-based uncertainty immediately
        this.calculateTimeUncertainty();
        
        // Apply initial layout
        this.applyUncertainty();
        
        // Hide loading overlay
        document.getElementById('loadingOverlay').style.display = 'none';
        
        // Start tracking scroll behavior
        this.setupScrollTracking();
    }
    
    calculateTimeUncertainty() {
        const now = new Date();
        const hour = now.getHours();
        const day = now.getDay(); // 0 = Sunday, 6 = Saturday
        const isWeekend = (day === 0 || day === 6);
        
        // Base uncertainty on hour
        let uncertainty = 50; // Neutral
        let message = "";
        let icon = "⏰";
        
        // Deep night (2am-6am) - Maximum uncertainty
        if (hour >= 2 && hour < 6) {
            uncertainty = 270;
            message = "You are here when the world is asleep";
            icon = "🌙";
        }
        // Late night (11pm-2am) - High uncertainty
        else if (hour >= 23 || hour < 2) {
            uncertainty = 130;
            message = "Late night exploration";
            icon = "🌃";
        }
        // Early morning (6am-9am) - Moderate-high
        else if (hour >= 6 && hour < 9) {
            uncertainty = 90;
            message = "Early riser";
            icon = "🌅";
        }
        // Standard work hours weekday (9am-5pm) - Low uncertainty
        else if (hour >= 9 && hour < 17 && !isWeekend) {
            uncertainty = 30;
            message = "Standard browsing hours";
            icon = "💼";
        }
        // Standard work hours weekend - Moderate
        else if (hour >= 9 && hour < 17 && isWeekend) {
            uncertainty = 70;
            message = "Weekend browsing";
            icon = "☀️";
        }
        // Evening (5pm-11pm) weekday - Moderate
        else if (hour >= 17 && hour < 23 && !isWeekend) {
            uncertainty = 70;
            message = "After work exploration";
            icon = "🌆";
        }
        // Evening weekend - Moderate-low
        else if (hour >= 17 && hour < 23 && isWeekend) {
            uncertainty = 60;
            message = "Weekend evening";
            icon = "🌆";
        }
        
        this.timeUncertainty = uncertainty;
        this.updateDisplay(icon, message);
    }
    
    setupScrollTracking() {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            const currentTime = Date.now();
            const currentY = window.scrollY;
            
            // Calculate scroll metrics
            const timeDelta = currentTime - this.lastScrollTime;
            const scrollDelta = Math.abs(currentY - this.lastScrollY);
            const scrollSpeed = scrollDelta / timeDelta;
            
            // Track scroll direction changes
            const direction = currentY > this.lastScrollY ? 'down' : 'up';
            this.scrollHistory.push({
                speed: scrollSpeed,
                direction: direction,
                time: currentTime
            });
            
            // Keep only last 10 scroll events
            if (this.scrollHistory.length > 10) {
                this.scrollHistory.shift();
            }
            
            this.lastScrollTime = currentTime;
            this.lastScrollY = currentY;
            
            // Clear existing timeout
            clearTimeout(scrollTimeout);
            
            // Recalculate volatility after scroll settles
            scrollTimeout = setTimeout(() => {
                this.calculateScrollVolatility();
                this.applyUncertainty();
            }, 150);
        });
    }
    
    calculateScrollVolatility() {
        if (this.scrollHistory.length < 3) {
            this.scrollVolatility = 0;
            return;
        }
        
        // Calculate speed variance (how erratic is scrolling)
        const speeds = this.scrollHistory.map(s => s.speed);
        const avgSpeed = speeds.reduce((a, b) => a + b, 0) / speeds.length;
        const variance = speeds.reduce((sum, speed) => {
            return sum + Math.pow(speed - avgSpeed, 2);
        }, 0) / speeds.length;
        
        // Count direction changes (nervous scrolling)
        let directionChanges = 0;
        for (let i = 1; i < this.scrollHistory.length; i++) {
            if (this.scrollHistory[i].direction !== this.scrollHistory[i-1].direction) {
                directionChanges++;
            }
        }
        
        // Combine metrics into volatility score (0-100)
        const speedVolatility = Math.min(variance * 10, 50);
        const directionVolatility = (directionChanges / this.scrollHistory.length) * 50;
        
        this.scrollVolatility = Math.min(speedVolatility + directionVolatility, 100);
    }
    
    applyUncertainty() {
    // Combine time (70%) and scroll (30%) uncertainty
    this.combinedUncertainty = (this.timeUncertainty * 0.7) + (this.scrollVolatility * 0.3);
    
    // Apply to layout
    this.positionProjects();
    
    // Apply color shifts based on uncertainty
    this.applyColorShifts();
    
    // Update uncertainty display number
    this.updateUncertaintyNumber();
}
    
    positionProjects() {
        const items = document.querySelectorAll('.project-item, .photo-item');
        const container = document.querySelector('.chaos-container');
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        
        items.forEach((item, index) => {
            // Get base position from data attributes
            const baseX = parseFloat(item.dataset.baseX);
            const baseY = parseFloat(item.dataset.baseY);
            const size = parseFloat(item.dataset.size);
            
            // Calculate scatter based on combined uncertainty
            // Higher uncertainty = more scatter
            const scatterAmount = (this.combinedUncertainty / 100) * 150; // 0-150 pixels
            
            // Create pseudo-random but consistent scatter per item
            const itemSeed = (index * 73) % 100;
            const angle = (itemSeed / 100) * Math.PI * 2;
            
            const chaosX = Math.cos(angle) * scatterAmount;
            const chaosY = Math.sin(angle) * scatterAmount;
            
            // Calculate final position
            const finalX = baseX + (chaosX / containerWidth * 100);
            const finalY = baseY + (chaosY / containerHeight * 100);
            
            // Rotation based on uncertainty
            const baseRotation = ((this.combinedUncertainty / 100) * 30) - 15; // -15 to +15
            const itemRotation = baseRotation + ((itemSeed % 20) - 10) * 0.3;
            
            // Apply positioning
            item.style.left = `${finalX}%`;
            item.style.top = `${finalY}%`;
            item.style.width = `${size}px`;
            
            // Photo gets less rotation (stable center)
            if (item.classList.contains('photo-item')) {
                item.style.transform = `rotate(${itemRotation * 0.3}deg)`;
            } else {
                item.style.transform = `rotate(${itemRotation}deg)`;
            }
            
            // Set z-index based on distance from center
            const centerDistance = Math.sqrt(
                Math.pow(finalX - 50, 2) + Math.pow(finalY - 50, 2)
            );
            const zIndex = Math.floor(100 - centerDistance);
            item.style.zIndex = zIndex;
        });
    }

    applyColorShifts() {
    const body = document.body;
    const uncertainty = this.combinedUncertainty;
    
    // Remove all uncertainty classes
    body.classList.remove('uncertainty-low', 'uncertainty-medium', 'uncertainty-high', 'uncertainty-extreme');
    
    // Apply class based on uncertainty level
    if (uncertainty < 40) {
        body.classList.add('uncertainty-low');
    } else if (uncertainty < 70) {
        body.classList.add('uncertainty-medium');
    } else if (uncertainty < 100) {
        body.classList.add('uncertainty-high');
    } else {
        body.classList.add('uncertainty-extreme');
    }
    
    // Apply dynamic hue rotation based on exact uncertainty value
    // Higher uncertainty = more color distortion
    const hueRotation = (uncertainty / 270) * 180; // 0-180 degree rotation
    const saturation = 1 + (uncertainty / 270) * 0.5; // 1.0 to 1.5 saturation
    
    body.style.filter = `hue-rotate(${hueRotation}deg) saturate(${saturation})`;
}

updateUncertaintyNumber() {
    const uncertaintyDisplay = document.getElementById('uncertaintyValue');
    if (uncertaintyDisplay) {
        uncertaintyDisplay.textContent = Math.round(this.combinedUncertainty);
    }
}
    
    updateDisplay(icon, message) {
        const weatherIcon = document.getElementById('weatherIcon');
        const weatherDesc = document.getElementById('weatherDesc');
        
        weatherIcon.textContent = icon;
        weatherDesc.textContent = message;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const layout = new UncertaintyLayout();
});