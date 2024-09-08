import { api } from ".";

export const fetchCities = async (searchTerm: string) => {
  if (searchTerm.length < 3) return [];
  const response = await api.get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios');
  return response.data.filter((city: any) =>
    city.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
// Fetch states from IBGE API
export const getStates = async () => {
  const response = await api.get(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
  );
  return response.data;
};

// Fetch cities by state from IBGE API
export const getCitiesByState = async (stateId: number) => {
  const response = await api.get(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`
  );
  return response.data;
};
