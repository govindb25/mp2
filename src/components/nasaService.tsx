import axios from 'axios';

export async function searchNASA(query: string) {
  const res = await axios.get('https://images-api.nasa.gov/search', {
    params: { q: query, media_type: 'image' },
  });

  return res.data.collection.items.map((item: any) => ({
    id: item.data[0].nasa_id,
    title: item.data[0].title,
    description: item.data[0].description,
    photographer: item.data[0].photographer || 'Unknown',
    date_created: item.data[0].date_created,
    image_url: item.links[0].href,
  }));
}
