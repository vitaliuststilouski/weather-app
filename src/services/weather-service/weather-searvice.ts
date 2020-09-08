export class WeatherService {
    _apiWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';

    async getWeather(cityName: string) {
        const response = await fetch(`${this._apiWeather}${cityName}&units=metric&appid=71dbdfddc08bdc78f7a38812a049b3cb`);

        if (!response.ok) {
            throw new Error(`Could not fetch, received ${response.status} `)
        }
        
        return await response.json();
    }

    getCity(cityName: string) {
        return this.getWeather(cityName)
    }
}


