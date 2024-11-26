import { TravelType } from "../types/travel.type";


const API_URL = import.meta.env.VITE_API_URL;

export const findAllTravel = async () => {
  const response = await fetch(`${API_URL}/travel`);
  const data = await response.json();
  return data;
};

export const findOneByIdTravel = async (id: string) => {
  const response = await fetch(`${API_URL}/travel/${id}`);
  const data = await response.json();
  return data;
};

export const createTravel = async (travel: TravelType) => {
  const response = await fetch(`${API_URL}/travel`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(travel),
  });
  const data = await response.json();
  return data;
};

export const updateTravel = async (id: string, travel: TravelType) => {
  const response = await fetch(`${API_URL}/travels/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(travel),
  });
  const data = await response.json();
  return data;
};

export const removeTravel = async (id: string) => {
  return await fetch(`${API_URL}/travels/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};