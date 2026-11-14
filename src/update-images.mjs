import fs from 'fs';
const path = 'src/data/visas.json';
const raw = JSON.parse(fs.readFileSync(path, 'utf8'));
const list = Array.isArray(raw) ? raw : raw.countries;

const updates = {
    'united states': 'https://images.unsplash.com/photo-1576606970009-7ddc4229ced7?q=80&w=800&auto=format&fit=crop',
    'united arab emirates': 'https://plus.unsplash.com/premium_photo-1697729683785-adfae2f6564b?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
    'singapore': 'https://images.unsplash.com/photo-1775306963755-8897be3967bb?q=80&w=800&auto=format&fit=crop',
};

for (const c of list) {
    const key = c.country.toLowerCase();
    if (updates[key]) {
        c.imageUrl = updates[key];
        console.log('updated', c.country);
    }
}
fs.writeFileSync(path, JSON.stringify(raw, null, 2) + '\n');