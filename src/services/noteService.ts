import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api/";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (page: number): Promise<{
  notes: Note[];
  totalPages: number;
}> => {
  const response = await axios.get<NotesHttpResponse>(`notes?page=${page}&perPage=12`, options);
  return { notes: response.data.notes, totalPages: response.data.totalPages };
};
