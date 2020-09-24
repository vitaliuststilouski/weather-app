export interface IWeatherItem {
    base: string;
    clouds: { all: number };
    cod: number;
    coord: { lon: number; lat: number };
    dt: number;
    id: number;
    main: { temp: number };
    name: string;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: string;
        sunset: string;
    };
    timezone: number;
    visibility: number;
    weather: string[];
    wind: { speed: number; deg: number };
}
