import { axiosRequest } from "../utils/axiosRequest";
const API_URL = process.env.REACT_APP_API_URL;

export const getUserNotes = async () => {
  return axiosRequest({
    method: "GET",
    url: `${API_URL}/api/v1/notes`,
  });
};

export const getNote = async (id) => {
  return axiosRequest({
    method: "GET",
    url: `${API_URL}/api/v1/notes/${id}`,
  });
};

export const createNote = async (data) => {
  return axiosRequest({
    method: "POST",
    url: `${API_URL}/api/v1/notes`,
    data,
  });
};

export const editNote = async ({ data, noteId }) => {
  return axiosRequest({
    method: "PATCH",
    data,
    url: `${API_URL}/api/v1/notes/${noteId}`,
  });
};

export const deleteNote = async (noteId) => {
  return axiosRequest({
    method: "DELETE",
    url: `${API_URL}/api/v1/notes/${noteId}`,
  });
};
