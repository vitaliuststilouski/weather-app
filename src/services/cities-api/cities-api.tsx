export class APICities {
    _apiCities = 'http://localhost:3000/cities.json';

    async getCities() {
        const response = await fetch(`${this._apiCities}`);

        if (!response.ok) {
            throw new Error(`Could not fetch, received ${response.status} `)
        }
        return await  response.json();
    }

    getItems() {
        return this.getCities()
    }
}


