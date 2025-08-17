import { Field, Form, Formik } from "formik";
import css from "./NoteForm.module.css";
import type { Values } from "../../types/note";

const initialValues: Values = {
  title: "",
  content: "",
  tag: "",
};

interface NoteFormProps {
  onClose: () => void;
  onSubmit: (values: Values) => void;
  isPending: boolean;
}

const NoteForm = ({ onClose, onSubmit, isPending }: NoteFormProps) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <span data-name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field as='textarea'
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <span data-name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as='select' id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <span data-name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create note"}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;
