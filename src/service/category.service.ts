import { CategoryType } from "../types/category.type";


const API_URL = import.meta.env.VITE_API_URL;

export const findAllCategory = async () => {
  const response = await fetch(`${API_URL}/category`);
  const data = await response.json();
  return data;
};

export const findOneByIdCategory = async (id: string) => {
  const response = await fetch(`${API_URL}/category/${id}`);
  const data = await response.json();
  return data;
};

export const createCategory = async (travel: CategoryType) => {
  const response = await fetch(`${API_URL}/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(travel),
  });
  const data = await response.json();
  return data;
};

export const updateCategory = async (id: string, travel: CategoryType) => {
  const response = await fetch(`${API_URL}/category/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(travel),
  });
  const data = await response.json();
  return data;
};

export const removeCategory = async (id: string) => {
  return await fetch(`${API_URL}/category/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};