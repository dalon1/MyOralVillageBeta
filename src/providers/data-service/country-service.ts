import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { ICountry } from '../../models/ICountry';

@Injectable()
export class CountryManager {
    private baseUrl: string = 'https://restcountries.eu/rest/v2/all';

    constructor(
        private http: Http
    ) {

    }

    getAllCountries(): Observable<ICountry[]> {
        let countries = this.http.get(this.baseUrl, {headers: this.getHeaders()})
        .map(response => response.json().map(this.toCountry));
        return countries;
    }

    private getHeaders() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        return headers;
    }

    private toCountry(element : any) : ICountry {
        let country = <ICountry>({
            name: element.name
        });
        return country;
    }
}