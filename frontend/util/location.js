const API_KEY = '105834088396174e15725187x127025';

export async function getAddress(lat, lng) {
    const url = `https://geocode.xyz/${lat},${lng}?json=1&auth=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to fetch address!');
    }

    const data = await response.json();
    return data.region;
}