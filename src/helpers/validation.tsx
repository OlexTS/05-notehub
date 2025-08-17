import * as Yup from "yup";

export const noteSchema = Yup.object({
  title: Yup.string().min(3).max(50).required("Title is a required field"),
  content: Yup.string().max(500),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is a required field"),
});
