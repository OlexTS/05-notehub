import axios from "axios";
import type { Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api/";
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const noteHubApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api/",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number
): Promise<{
  notes: Note[];
  totalPages: number;
}> => {
  const response = await noteHubApi.get<NotesHttpResponse>(
    `notes?page=${page}&perPage=12`
  );
  return { notes: response.data.notes, totalPages: response.data.totalPages };
};

export const createNote = async (note: Note): Promise<Note> => {
  const response = await noteHubApi.post(`notes`, note);
  return response.data;
};
