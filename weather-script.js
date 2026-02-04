// Weather-driven layout system
class WeatherLayout {
    constructor() {
        this.windDir = 45;
        this.windSpeed = 15;
        this.temp = 12;
        this.clouds = 60;
        this.rain = 0;
        
        this.init();
    }
    
    init() {
        // Set up controls
        this.setupControls();
        
        // Apply initial weather
        this.applyWeather();
    }
    
    setupControls() {
        // Sliders
        const windDirSlider = document.getElementById('windDir');
        const windSpeedSlider = document.getElementById('windSpeed');
        const tempSlider = document.getElementById('temp');
        const cloudsSlider = document.getElementById('clouds');
        const rainSlider = document.getElementById('rain');
        
        // Update displays
        windDirSlider.addEventListener('input', (e) => {
            document.getElementById('windDirVal').textContent = e.target.value;
            this.windDir = parseFloat(e.target.value);
        });
        
        windSpeedSlider.addEventListener('input', (e) => {
            document.getElementById('windSpeedVal').textContent = e.target.value;
            this.windSpeed = parseFloat(e.target.value);
        });
        
        tempSlider.addEventListener('input', (e) => {
            document.getElementById('tempVal').textContent = e.target.value;
            this.temp = parseFloat(e.target.value);
        });
        
        cloudsSlider.addEventListener('input', (e) => {
            document.getElementById('cloudsVal').textContent = e.target.value;
            this.clouds = parseFloat(e.target.value);
        });
        
        rainSlider.addEventListener('input', (e) => {
            document.getElementById('rainVal').textContent = e.target.value;
            this.rain = parseFloat(e.target.value);
        });
        
        // Apply button
        document.getElementById('applyWeather').addEventListener('click', () => {
            this.applyWeather();
        });
        
        // Presets
        document.querySelectorAll('.preset').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const preset = e.target.dataset.preset;
                this.loadPreset(preset);
            });
        });
    }
    
    loadPreset(preset) {
        const presets = {
            sunny: { windDir: 90, windSpeed: 8, temp: 22, clouds: 10, rain: 0 },
            cloudy: { windDir: 180, windSpeed: 12, temp: 15, clouds: 85, rain: 0 },
            rainy: { windDir: 270, windSpeed: 20, temp: 10, clouds: 95, rain: 8 },
            stormy: { windDir: 315, windSpeed: 45, temp: 8, clouds: 100, rain: 15 },
            cold: { windDir: 0, windSpeed: 25, temp: -5, clouds: 50, rain: 0 }
        };
        
        const p = presets[preset];
        this.windDir = p.windDir;
        this.windSpeed = p.windSpeed;
        this.temp = p.temp;
        this.clouds = p.clouds;
        this.rain = p.rain;
        
        // Update sliders
        document.getElementById('windDir').value = p.windDir;
        document.getElementById('windSpeed').value = p.windSpeed;
        document.getElementById('temp').value = p.temp;
        document.getElementById('clouds').value = p.clouds;
        document.getElementById('rain').value = p.rain;
        
        // Update displays
        document.getElementById('windDirVal').textContent = p.windDir;
        document.getElementById('windSpeedVal').textContent = p.windSpeed;
        document.getElementById('tempVal').textContent = p.temp;
        document.getElementById('cloudsVal').textContent = p.clouds;
        document.getElementById('rainVal').textContent = p.rain;
        
        this.applyWeather();
    }
    
    applyWeather() {
        // 1. Position projects based on wind
        this.positionByWind();
        
        // 2. Apply temperature color shifts
        this.applyTemperature();
        
        // 3. Adjust opacity/visibility based on clouds
        this.applyClouds();
        
        // 4. Add "weight" from rain
        this.applyRain();
        
        // 5. Update weather display
        this.updateWeatherDisplay();
    }
    
    positionByWind() {
        const items = document.querySelectorAll('.project-item, .photo-item');
        const container = document.querySelector('.chaos-container');
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        
        items.forEach((item, index) => {
            // Get base position from data attributes (percentage)
            const baseX = parseFloat(item.dataset.baseX);
            const baseY = parseFloat(item.dataset.baseY);
            const size = parseFloat(item.dataset.size);
            
            // Calculate scatter based on wind speed
            // Higher wind = more scatter from base position
            const scatterAmount = this.windSpeed * 2; // 0-100 pixels of scatter
            
            // Wind direction influences the scatter direction
            const windRadians = (this.windDir * Math.PI) / 180;
            
            // Add some chaos per item (based on index)
            const itemChaos = (index * 73) % 100; // Pseudo-random but consistent
            const chaosX = Math.cos(windRadians + itemChaos) * scatterAmount;
            const chaosY = Math.sin(windRadians + itemChaos) * scatterAmount;
            
            // Calculate final position
            const finalX = baseX + (chaosX / containerWidth * 100);
            const finalY = baseY + (chaosY / containerHeight * 100);
            
            // Base rotation from wind direction
            const baseRotation = (this.windDir / 360) * 30 - 15; // -15 to +15 range
            
            // Item-specific rotation variation
            const rotationVariation = ((itemChaos % 20) - 10) * (this.windSpeed / 50);
            const finalRotation = baseRotation + rotationVariation;
            
            // Apply positioning
            item.style.left = `${finalX}%`;
            item.style.top = `${finalY}%`;
            item.style.width = `${size}px`;
            
            // Photo gets less rotation (eye of storm)
            if (item.classList.contains('photo-item')) {
                item.style.transform = `rotate(${finalRotation * 0.3}deg)`;
            } else {
                item.style.transform = `rotate(${finalRotation}deg)`;
            }
            
            // Set z-index based on distance from center (closer = higher)
            const centerDistance = Math.sqrt(
                Math.pow(finalX - 50, 2) + Math.pow(finalY - 50, 2)
            );
            const zIndex = Math.floor(100 - centerDistance);
            item.style.zIndex = zIndex;
        });
    }
    
    applyTemperature() {
        const body = document.body;
        body.classList.remove('temp-cold', 'temp-warm', 'temp-hot');
        
        if (this.temp < 5) {
            body.classList.add('temp-cold');
        } else if (this.temp > 20) {
            body.classList.add('temp-warm');
        }
        if (this.temp > 28) {
            body.classList.add('temp-hot');
        }
        
        // Also affect the floating name box
        const nameBox = document.getElementById('floatingName');
        const tempRotation = (this.temp - 12) / 20; // -1 to 1 range
        nameBox.style.transform = `translate(-50%, -50%) rotate(${tempRotation * 3}deg)`;
    }
    
    applyClouds() {
        // Cloud cover affects overall contrast and background elements
        const body = document.body;
        const cloudOpacity = this.clouds / 100;
        
        // Darker background with more clouds
        const bgLightness = 250 - (this.clouds * 0.5);
        body.style.backgroundColor = `rgb(${bgLightness}, ${bgLightness}, ${bgLightness})`;
        
        // Reduce contrast of images slightly in heavy clouds
        const items = document.querySelectorAll('.project-item img, .photo-item img');
        items.forEach(img => {
            const contrast = 100 - (cloudOpacity * 15);
            const brightness = 100 - (cloudOpacity * 10);
            img.style.filter = `contrast(${contrast}%) brightness(${brightness}%)`;
        });
    }
    
    applyRain() {
        // Rain adds "weight" - projects sit lower on page
        const items = document.querySelectorAll('.project-item, .photo-item');
        
        items.forEach(item => {
            const currentTop = parseFloat(item.style.top);
            const rainWeight = this.rain * 0.5; // 0-10% shift down
            
            // Add rain weight to top position
            item.style.top = `${currentTop + rainWeight}%`;
        });
    }
    
    updateWeatherDisplay() {
        const weatherIcon = document.getElementById('weatherIcon');
        const weatherDesc = document.getElementById('weatherDesc');
        
        // Determine weather icon and description
        let icon = '🌤️';
        let desc = 'Current weather in Eindhoven';
        
        if (this.rain > 10) {
            icon = '⛈️';
            desc = 'Stormy conditions';
        } else if (this.rain > 3) {
            icon = '🌧️';
            desc = 'Rainy weather';
        } else if (this.clouds > 80) {
            icon = '☁️';
            desc = 'Cloudy skies';
        } else if (this.clouds < 20 && this.temp > 18) {
            icon = '☀️';
            desc = 'Sunny and clear';
        } else if (this.temp < 0) {
            icon = '❄️';
            desc = 'Cold and crisp';
        } else if (this.windSpeed > 30) {
            icon = '💨';
            desc = 'Very windy';
        }
        
        weatherIcon.textContent = icon;
        weatherDesc.textContent = desc;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const layout = new WeatherLayout();
});
