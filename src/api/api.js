import axios from "axios";

const urlSpaceships = `${process.env.REACT_APP_API_URL}:4567/spaceships`;
const urlSpaceObjects = `${process.env.REACT_APP_API_URL}:4567/spaceobjects`;

export async function getSpaceships() {
  try {
    const result = await axios.get(urlSpaceships);
    return result.data;
  } catch (error) {
    handle(error);
  }
}

export async function getSpaceship(spaceshipId) {
  try {
    const result = await axios.get(`${urlSpaceships}/${spaceshipId}`);
    return result.data;
  } catch (error) {
    handle(error);
  }
}

export async function getDefaultSpaceships() {
  const spaceships = await getSpaceships();
  const defaultSpaceships = spaceships.filter(spaceship => spaceship.isDefault);

  return defaultSpaceships;
}

export async function getSpaceObjects() {
  try {
    const result = await axios.get(urlSpaceObjects);
    const sorted = [...result.data].sort((a, b) => b.name - a.name);
    return sorted;
  } catch (error) {
    handle(error);
  }
}

function handle(error) {
  console.log(error);

  if (error.response) {
    console.log(error.response.status, error.response.data.Message);
  }

  if (error.config) {
    console.log(error.config.url, error.config.method);
  }

  throw error;
}
