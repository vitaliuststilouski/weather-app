import { IWeatherItem } from './weather-service.interface'

class WeatherService {
    private apiWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
    
    async getWeather(city: string): Promise<IWeatherItem> {
        const response = await fetch(`${this.apiWeather}${city}&units=metric&appid=71dbdfddc08bdc78f7a38812a049b3cb`);
        
        if (!response.ok) {
            throw new Error(`Could not fetch, received ${response.status} `)
        }

        const weatherData = response.json()

        return weatherData;
    }

}

export default new WeatherService();