const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");

const pokemonNameElement = document.getElementById("pokemon-name");
const pokemonIdElement = document.getElementById("pokemon-id");
const weightElement = document.getElementById("weight");
const heightElement = document.getElementById("height");
const typesElement = document.getElementById("types");
const spriteElement = document.getElementById("sprite");

const displayPokemonData = ({
  id,
  name,
  height,
  weight,
  types,
  stats,
  sprites,
}) => {
  pokemonIdElement.innerText = id;
  pokemonNameElement.innerText = name.toUpperCase();
  heightElement.innerText = height;
  weightElement.innerText = weight;

  const typesArrElements = types.map(({ type }) => {
    return `<span class="type ${type.name}">${type.name.toUpperCase()}</span>`;
  });
  typesElement.innerHTML = typesArrElements.join("");

  spriteElement.src = sprites["front_default"];
  spriteElement.alt = `${name}-img`;

  stats.forEach((currStat) => {
    document.getElementById(currStat.stat.name).textContent =
      currStat["base_stat"];
  });

  document.querySelector("main section").style.display = "flex";
};

const cleanTheInputValue = (input) => {
  return input.value.toLowerCase().replace(/\s/g, "-");
};

const fetchData = async (idOrName) => {
  try {
    const res = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${idOrName}`
    );
    const data = await res.json();
    displayPokemonData(data);
  } catch {
    alert(`Pokémon not found`);
  }
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = cleanTheInputValue(searchInput);
  fetchData(searchValue);
});
