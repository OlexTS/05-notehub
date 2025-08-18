import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NotesListProps {
  notes: Note[];
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

const NoteList = ({ notes, onDelete, isDeleting }: NotesListProps) => {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button} onClick={() => onDelete(note.id)}>
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
