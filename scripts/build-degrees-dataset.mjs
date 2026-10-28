import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const source = resolve(root, 'local-data/harvard_ai/0-search/degrees/large');
const destination = resolve(root, 'demos/degrees/degrees-data.js');
const maxMovies = 120;

const seeds = [
  ['Kevin Bacon', '1958'], ['Tom Hanks', '1956'], ['Tom Cruise', '1962'], ['Meryl Streep', '1949'],
  ['Robert De Niro', '1943'], ['Al Pacino', '1940'], ['Leonardo DiCaprio', '1974'], ['Brad Pitt', '1963'],
  ['George Clooney', '1961'], ['Matt Damon', '1970'], ['Ben Affleck', '1972'], ['Morgan Freeman', '1937'],
  ['Denzel Washington', '1954'], ['Samuel L. Jackson', '1948'], ['Harrison Ford', '1942'], ['Mark Hamill', '1951'],
  ['Carrie Fisher', '1956'], ['Sigourney Weaver', '1949'], ['Arnold Schwarzenegger', '1947'], ['Sylvester Stallone', '1946'],
  ['Bruce Willis', '1955'], ['Keanu Reeves', '1964'], ['Laurence Fishburne', '1961'], ['Johnny Depp', '1963'],
  ['Helena Bonham Carter', '1966'], ['Emma Watson', '1990'], ['Daniel Radcliffe', '1989'], ['Rupert Grint', '1988'],
  ['Alan Rickman', '1946'], ['Ian McKellen', '1939'], ['Patrick Stewart', '1940'], ['Hugh Jackman', '1968'],
  ['Nicole Kidman', '1967'], ['Cate Blanchett', '1969'], ['Kate Winslet', '1975'], ['Natalie Portman', '1981'],
  ['Scarlett Johansson', '1984'], ['Jennifer Lawrence', '1990'], ['Anne Hathaway', '1982'], ['Amy Adams', '1974'],
  ['Julia Roberts', '1967'], ['Sandra Bullock', '1964'], ['Robin Williams', '1951'], ['Jim Carrey', '1962'],
  ['Steve Carell', '1962'], ['Bill Murray', '1950'], ['Eddie Murphy', '1961'], ['Will Smith', '1968'],
  ['Joaquin Phoenix', '1974'], ['Christian Bale', '1974'], ['Michael Caine', '1933'], ['Christopher Walken', '1943'],
  ['Christopher Lee', '1922'], ['Gary Oldman', '1958'], ['Anthony Hopkins', '1937'], ['Judi Dench', '1934'],
  ['Helen Mirren', '1945'], ['Emma Thompson', '1959'], ['Colin Firth', '1960'], ['Ralph Fiennes', '1962'],
  ['Tilda Swinton', '1960'], ['Benedict Cumberbatch', '1976'], ['Tom Hardy', '1977'], ['Ryan Gosling', '1980'],
  ['Ryan Reynolds', '1976'], ['Margot Robbie', '1990'], ['Charlize Theron', '1975'], ['Viola Davis', '1965'],
  ['Octavia Spencer', '1970'], ['Lupita Nyong\'o', '1983'], ['Michelle Yeoh', '1962'], ['Jackie Chan', '1954'],
  ['Jet Li', '1963'], ['Chow Yun-Fat', '1955'], ['Penélope Cruz', '1974'], ['Javier Bardem', '1969'],
  ['Antonio Banderas', '1960'], ['Pedro Pascal', '1975'], ['Salma Hayek', '1966'], ['Gael García Bernal', '1978'],
  ['Diego Luna', '1979'], ['Ricardo Darín', '1957'], ['Guillermo Francella', '1955'], ['Cecilia Roth', '1956'],
  ['Maribel Verdú', '1970'], ['Luis Tosar', '1971'], ['Eduard Fernández', '1964'], ['Carmen Maura', '1945'],
  ['Juliette Binoche', '1964'], ['Marion Cotillard', '1975'], ['Jean Reno', '1948'], ['Gérard Depardieu', '1948'],
  ['Toni Collette', '1972'], ['Frances McDormand', '1957'], ['Mahershala Ali', '1974'], ['Daniel Day-Lewis', '1957'],
  ['John Travolta', '1954'], ['Uma Thurman', '1970'], ['Jamie Foxx', '1967'], ['Christoph Waltz', '1956'],
  ['Josh Brolin', '1968'], ['Chris Evans', '1981'], ['Chris Hemsworth', '1983'], ['Robert Downey Jr.', '1965'],
  ['Mark Ruffalo', '1967'], ['Jeremy Renner', '1971'], ['Zoe Saldaña', '1978'], ['Chris Pratt', '1979'],
  ['Vin Diesel', '1967'], ['Dwayne Johnson', '1972'], ['Jason Statham', '1967'], ['Idris Elba', '1972'],
  ['Emily Blunt', '1983'], ['Rachel Weisz', '1970'], ['Rachel McAdams', '1978'], ['Saoirse Ronan', '1994']
];

const featuredTitles = new Set([
  'Apollo 13', 'Forrest Gump', 'A Few Good Men', 'The Matrix', 'Pulp Fiction', 'Ocean\'s Eleven',
  'The Departed', 'Inception', 'Interstellar', 'The Dark Knight', 'Harry Potter and the Sorcerer\'s Stone',
  'The Lord of the Rings: The Fellowship of the Ring', 'Star Wars', 'The Avengers', 'Avengers: Endgame'
]);

function parseCsv(text) {
  const rows = [];
  for (const line of text.trimEnd().split(/\r?\n/)) {
    const row = [];
    let value = '';
    let quoted = false;
    for (let index = 0; index < line.length; index += 1) {
      const character = line[index];
      if (character === '"' && quoted && line[index + 1] === '"') {
        value += '"';
        index += 1;
      } else if (character === '"') {
        quoted = !quoted;
      } else if (character === ',' && !quoted) {
        row.push(value);
        value = '';
      } else {
        value += character;
      }
    }
    row.push(value);
    rows.push(row);
  }
  return rows;
}

const peopleRows = parseCsv(await readFile(resolve(source, 'people.csv'), 'utf8')).slice(1);
const seedKeys = new Set(seeds.map(([name, birth]) => `${name.toLocaleLowerCase('en')}|${birth}`));
const people = {};
for (const [id, name, birth] of peopleRows) {
  if (seedKeys.has(`${name.toLocaleLowerCase('en')}|${birth}`)) people[id] = { name, birth };
}

const selectedIds = new Set(Object.keys(people));
const movieCasts = new Map();
const starRows = parseCsv(await readFile(resolve(source, 'stars.csv'), 'utf8')).slice(1);
for (const [personId, movieId] of starRows) {
  if (!selectedIds.has(personId)) continue;
  if (!movieCasts.has(movieId)) movieCasts.set(movieId, []);
  movieCasts.get(movieId).push(personId);
}

const eligibleIds = new Set([...movieCasts].filter(([, cast]) => new Set(cast).size > 1).map(([id]) => id));
const movies = [];
const movieRows = parseCsv(await readFile(resolve(source, 'movies.csv'), 'utf8')).slice(1);
for (const [id, title, year] of movieRows) {
  if (!eligibleIds.has(id)) continue;
  movies.push({ id, title, year, cast: [...new Set(movieCasts.get(id))] });
}

movies.sort((a, b) =>
  Number(featuredTitles.has(b.title)) - Number(featuredTitles.has(a.title)) ||
  b.cast.length - a.cast.length ||
  Number(b.year) - Number(a.year) ||
  a.title.localeCompare(b.title)
);

const chosenMovies = movies.slice(0, maxMovies);
const usedPeople = new Set(chosenMovies.flatMap(movie => movie.cast));
const compactPeople = Object.fromEntries(Object.entries(people).filter(([id]) => usedPeople.has(id)));
const compactMovies = Object.fromEntries(chosenMovies.map(({ id, title, year, cast }) => [id, { title, year, cast }]));

function distance(from, to) {
  const queue = [[from, 0]];
  const visited = new Set([from]);
  while (queue.length) {
    const [personId, depth] = queue.shift();
    if (personId === to) return depth;
    for (const movie of chosenMovies.filter(item => item.cast.includes(personId))) {
      for (const neighbor of movie.cast) {
        if (visited.has(neighbor)) continue;
        visited.add(neighbor);
        queue.push([neighbor, depth + 1]);
      }
    }
  }
  return null;
}

const idByName = Object.fromEntries(Object.entries(compactPeople).map(([id, person]) => [person.name, id]));
const presetCandidates = [
  ['Kevin Bacon', 'Emma Watson'], ['Tom Hanks', 'Penélope Cruz'], ['Meryl Streep', 'Jackie Chan'],
  ['Harrison Ford', 'Scarlett Johansson'], ['Antonio Banderas', 'Cate Blanchett'], ['Javier Bardem', 'Michelle Yeoh']
];
const presets = presetCandidates
  .map(([from, to]) => [idByName[from], idByName[to]])
  .filter(([from, to]) => from && to && distance(from, to) >= 2)
  .slice(0, 4);

const payload = {
  people: compactPeople,
  movies: compactMovies,
  presets,
  meta: {
    source: 'Harvard CS50 AI Degrees large dataset',
    seedCount: seeds.length,
    selectedPeople: Object.keys(compactPeople).length,
    selectedMovies: Object.keys(compactMovies).length
  }
};

await writeFile(destination, `window.DEGREES_DATA=${JSON.stringify(payload)};\n`);

const missing = seeds.filter(([name, birth]) => !Object.values(people).some(person => person.name === name && person.birth === birth));
console.log(`Selected ${payload.meta.selectedPeople} people and ${payload.meta.selectedMovies} movies.`);
console.log(`Presets: ${presets.map(([from, to]) => `${compactPeople[from].name} → ${compactPeople[to].name} (${distance(from, to)})`).join(', ')}`);
if (missing.length) console.log(`Missing seeds: ${missing.map(([name]) => name).join(', ')}`);
