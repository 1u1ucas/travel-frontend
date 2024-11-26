import { CommentType } from "../types/comment.type";


const API_URL = 'http://localhost:8000';

export const findAllComment = async () => {
  const response = await fetch(`${API_URL}/comment`);
  const data = await response.json();
  return data;
};

export const findOneByIdComment = async (id: string) => {
  const response = await fetch(`${API_URL}/comment/${id}`);
  const data = await response.json();
  return data;
};

export const findCommentByTravelId = async (id: string) => {
  const response = await fetch(`${API_URL}/comment/travel/${id}`);
  const data = await response.json();
  console.log("findCommentByTravelId data : ", data);
  return data;
}

export const createComment = async (credentials: CommentType) => {
  const response = await fetch(`${API_URL}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return data;
};

export const updateComment = async (id: string, credentials: CommentType) => {
  const response = await fetch(`${API_URL}/comment/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  return data;
};

export const removeComment = async (id: string) => {
  return await fetch(`${API_URL}/comment/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};