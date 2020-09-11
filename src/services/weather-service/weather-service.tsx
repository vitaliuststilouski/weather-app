export class WeatherService {
    _apiWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';

    async getWeather(city: string) {
        const response = await fetch(`${this._apiWeather}${city}&units=metric&appid=71dbdfddc08bdc78f7a38812a049b3cb`);
        if (!response.ok) {
            throw new Error(`Could not fetch, received ${response.status} `)
        }
        return await response.json();
    }

    getCity(city: string) {
        return this.getWeather(city)
    }
}