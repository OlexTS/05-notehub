import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";
import NoteList from "./NoteList/NoteList";
import { fetchNotes } from "../services/noteService";

function App() {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(),
  });
  
  
  useEffect(() => {
    if (data && data.notes.length === 0) {
      toast.error("No notes found for your request");
    }
  }, [data]);
  const notes = data?.notes ?? [];


  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {<button className={css.button}>Create note +</button>}
      </header>
      <NoteList notes={notes} />
      <Toaster />
    </div>
  );
}

export default App;
