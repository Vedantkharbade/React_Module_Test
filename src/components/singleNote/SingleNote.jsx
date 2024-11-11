import styles from "./singleNote.module.css";
import { deleteNote } from "../../redux/noteSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { UpdateNoteModal } from "../updateNoteModal/UpdateNoteModal";

export const SingleNote = ({ note, groupId }) => {
  const dispatch = useDispatch();

  const handleDeleteNote = () => {
    dispatch(deleteNote({ noteId: note.id, groupId }));
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.actual_note}>{note.content}</div>
      <div className={styles.date_time_area}>
        <span>{note.date}</span>
        <span>●</span>
        <span>{note.time}</span>
        <span
          onClick={handleDeleteNote}
          className={styles.deleteIcon}
          title="Delete Note"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-trash-2"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
        </span>
        <span
          onClick={() => setOpenModal(true)}
          className={styles.editIcon}
          title="Edit Note"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="green"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-file-pen-line"
          >
            <path d="m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2" />
            <path d="M8 18h1" />
            <path d="M18.4 9.6a2 2 0 1 1 3 3L17 17l-4 1 1-4Z" />
          </svg>
        </span>

        <UpdateNoteModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          note={note}
          groupId={groupId}
        />
      </div>
    </div>
  );
};
