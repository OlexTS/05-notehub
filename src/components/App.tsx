import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";
import NoteList from "./NoteList/NoteList";
import { fetchNotes } from "../services/noteService";
import Pagination from "./Pagination/Pagination";
import Modal from "./Modal/Modal";
import NoteForm from "./NoteForm/NoteForm";

function App() {
  const [page, setPage] = useState<number>(1);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

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

const handleModalOpen = () =>{
  setIsOpenModal(true)
}

const handleModalClose = () =>{
  setIsOpenModal(false)
}

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        )}
        {<button className={css.button} onClick={handleModalOpen}>Create note +</button>}
      </header>
      {isOpenModal && <Modal><NoteForm onClose={handleModalClose}/></Modal>}
      {isLoading && "Loading..."}
      {isError ? (
        toast.error("Something went wrong, please try again!")
      ) : (
        <NoteList notes={notes} />
      )}
      <Toaster />
    </div>
  );
}

export default App;
