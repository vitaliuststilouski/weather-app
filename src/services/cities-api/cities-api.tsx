import { ClientApiResponseData } from './client-api.interface';
class APICities {
    private apiCities = '/cities.json';

    async getCities(): Promise<ClientApiResponseData> {
        const response = await fetch(this.apiCities);
        if (!response.ok) {
            throw new Error(`Could not fetch, received ${response.status}`);
        }
        const citiesData = response.json();
        return citiesData;
    }
}

export default new APICities();
