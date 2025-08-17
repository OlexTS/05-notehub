import { useEffect, useState } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import css from "./App.module.css";
import NoteList from "./NoteList/NoteList";
import { createNote, deleteNote, fetchNotes } from "../services/noteService";
import Pagination from "./Pagination/Pagination";
import Modal from "./Modal/Modal";
import NoteForm from "./NoteForm/NoteForm";
import type { Note, Values } from "../types/note";

function App() {
  const [page, setPage] = useState<number>(1);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page],
    queryFn: () => fetchNotes(page),
    placeholderData: keepPreviousData,
  });

  const { mutate: createMutation, isPending: isCreating } = useMutation<
    Note,
    Error,
    Values,
    unknown
  >({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setIsOpenModal(false);
      toast.success("Note created successfully!");
    },
    onError: () => {
      toast.error("Failed to create note. Please try again.");
    },
  });

  const { mutate: deleteMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted successfully!");
    },
    onError: () => {
      toast.error("Failed to delete note. Please try again.");
    },
  });

const handleDelete = (id: number)=>{
  deleteMutation(id)
} 

  useEffect(() => {
    if (data && data.notes.length === 0) {
      toast.error("No notes found for your request");
    }
  }, [data]);
  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleModalOpen = () => {
    setIsOpenModal(true);
  };

  const handleModalClose = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        )}
        {
          <button className={css.button} onClick={handleModalOpen}>
            Create note +
          </button>
        }
      </header>
      {isOpenModal && (
        <Modal onClose={handleModalClose}>
          <NoteForm
            onClose={handleModalClose}
            onSubmit={createMutation}
            isPending={isCreating}
          />
        </Modal>
      )}
      {isLoading && "Loading..."}
      {isError ? (
        toast.error("Something went wrong, please try again!")
      ) : (
        <NoteList notes={notes} onDelete={handleDelete} isDeleting={isDeleting}/>
      )}
      <Toaster />
    </div>
  );
}

export default App;
