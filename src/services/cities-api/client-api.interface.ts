export interface CityInfo {
    country: string;
    lat: string
    lng: string
    name: string
}

export type ClientApiResponseData = CityInfo[][]; // ???