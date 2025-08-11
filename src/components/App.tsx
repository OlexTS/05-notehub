import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";
import NoteList from "./NoteList/NoteList";
import { fetchNotes } from "../services/noteService";
import Pagination from "./Pagination/Pagination";

function App() {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page],
    queryFn: () => fetchNotes(page),
    placeholderData: keepPreviousData,
  });
  
  
  useEffect(() => {
    if (data && data.notes.length === 0) {
      toast.error("No notes found for your request");
    }
  }, [data]);
  const notes = data?.notes ?? [];
const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {<Pagination totalPages={totalPages} page={page} setPage={setPage}/>}
        {<button className={css.button}>Create note +</button>}
      </header>
      <NoteList notes={notes} />
      <Toaster />
    </div>
  );
}

export default App;
