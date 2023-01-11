const API_KEY = '147496517330474213429x4620';

export async function getAddress(lat, lng) {
    const url = `https://geocode.xyz/${lat},${lng}?json=1&auth=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch address!');
    }

    const data = await response.json();
    return {city: data.city, country: data.country};
}