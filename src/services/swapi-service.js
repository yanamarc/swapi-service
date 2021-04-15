
export  default class SwapiService {

    _apiBase = 'http://swapi.dev/api';

    async getResource(url) {
        const response = await fetch(`${this._apiBase}${url}`);
        if(!response.ok){
            throw new Error(`Could not fetch ${url}` + `, received ${response.status}`)
        }
        return  await response.json();
    }

    async getAllPeople(){
        const response = await this.getResource(`/people/`);
        return response.results.map(this._transformPerson);
    }

    async getPerson(id) {
        const person = await this.getResource(`/people/${id}/`);
        return this._transformPerson(person);
    }

    async getAllPlanets() {
        const response = await this.getResource(`/planets/`);
        return response.results.map(this._transformPlanet);
    }

    async getPlanet(id) {
        const planet = await this.getResource(`/planets/${id}/`)
        return this._transformPlanet(planet);
    }

    async getAllStarships(){
        const response = await this.getResource(`/starships/`);
        return response.results.map(this._transformStarship);
    }

    async getStarship(id){
        const starship = await this.getResource(`/starships/${id}/`);
        return this._transformStarship(starship)
    }

    _extractId(item) {
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _transformPlanet(planet){
       return {
           id: this._extractId(planet),
           name: planet.name,
           population: planet.population,
           rotationPeriod: planet.rotation_period,
           diameter: planet.diameter,
       };
    }

    _transformStarship(starship) {
        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity,
        }
    }

    _transformPerson(person){
        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor,

        }
    }
}


const swapi = new SwapiService();


