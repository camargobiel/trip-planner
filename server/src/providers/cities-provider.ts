type City = {
  name: string
  regionCode: string
  countryCode: string
}

export class CitiesProvider {
  async getCities({ city }: { city: string }) {
    const fetchedCities = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${city}`,
      {
        headers: {
          'x-rapidapi-host': process.env.CITIES_API_HOST!,
          'x-rapidapi-key': process.env.CITIES_API_KEY!,
        },
        method: 'GET',
      },
    )
    const cities = await fetchedCities.json().then((data) => data.data)
    const uniqueCities = Array.from(
      new Set(cities.map((city: City) => city.name)),
    ).map((name) => cities.find((city: City) => city.name === name))
    return uniqueCities
  }
}
