// Live Weather-driven layout system using Open-Meteo API
class LiveWeatherLayout {
    constructor() {
        // Eindhoven coordinates
        this.latitude = 1.4408;
        this.longitude = 5.4778;
        // this.latitude = -72.9575;
        // this.longitude = -18.3212;
        
        // Weather data
        this.windDir = 0;
        this.windSpeed = 0;
        this.temp = 12;
        this.clouds = 50;
        this.rain = 0;
        
        this.init();
    }
    
    async init() {
        // Fetch weather on load
        await this.fetchWeather();
        
        // Optional: Refresh every 10 minutes
        setInterval(() => this.fetchWeather(), 10 * 60 * 1000);
    }
    
    async fetchWeather() {
        try {
            // Open-Meteo API call for Eindhoven
            // Current weather + hourly for precipitation
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${this.latitude}&longitude=${this.longitude}&current=temperature_2m,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=precipitation&timezone=auto`;
            
            const response = await fetch(url);
            const data = await response.json();
            
            // Extract current weather data
            this.temp = data.current.temperature_2m;
            this.clouds = data.current.cloud_cover;
            this.windSpeed = data.current.wind_speed_10m;
            this.windDir = data.current.wind_direction_10m;
            
            // Get precipitation from current hour
            const currentHour = new Date().getHours();
            this.rain = data.hourly.precipitation[currentHour] || 0;
            
            console.log('Weather fetched:', {
                temp: this.temp,
                clouds: this.clouds,
                windSpeed: this.windSpeed,
                windDir: this.windDir,
                rain: this.rain
            });
            
            // Apply weather to layout
            this.applyWeather();
            
            // Hide loading overlay
            document.getElementById('loadingOverlay').style.display = 'none';
            
        } catch (error) {
            console.error('Error fetching weather:', error);
            
            // Fallback to default values if API fails
            this.temp = 12;
            this.clouds = 50;
            this.windSpeed = 10;
            this.windDir = 180;
            this.rain = 0;
            
            this.applyWeather();
            document.getElementById('loadingOverlay').style.display = 'none';
        }
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
        let desc = `${Math.round(this.temp)}°C`;
        
        if (this.rain > 5) {
            icon = '⛈️';
            desc = `${Math.round(this.temp)}°C · Stormy`;
        } else if (this.rain > 1) {
            icon = '🌧️';
            desc = `${Math.round(this.temp)}°C · Rainy`;
        } else if (this.clouds > 80) {
            icon = '☁️';
            desc = `${Math.round(this.temp)}°C · Cloudy`;
        } else if (this.clouds < 20 && this.temp > 18) {
            icon = '☀️';
            desc = `${Math.round(this.temp)}°C · Sunny`;
        } else if (this.temp < 0) {
            icon = '❄️';
            desc = `${Math.round(this.temp)}°C · Cold`;
        } else if (this.windSpeed > 30) {
            icon = '💨';
            desc = `${Math.round(this.temp)}°C · Windy`;
        }
        
        // Add wind info if significant
        if (this.windSpeed > 20) {
            desc += ` · ${Math.round(this.windSpeed)} km/h wind`;
        }
        
        weatherIcon.textContent = icon;
        weatherDesc.textContent = desc;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const layout = new LiveWeatherLayout();
});
