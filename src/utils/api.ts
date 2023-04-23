export async function getData(id?: string) {
  const URL = "https://api.coincap.io/v2/assets";
  const response = await fetch(`${URL}${id ? `/${id}` : ""}`);

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  const data = await response.json();

  return data;
}
