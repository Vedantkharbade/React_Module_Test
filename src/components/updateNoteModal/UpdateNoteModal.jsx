import styles from "./updateNoteModal.module.css";
import { useState } from "react";
import { Modal } from "@mantine/core";
import { useDispatch } from "react-redux";
import { editNote } from "../../redux/noteSlice";

export const UpdateNoteModal = ({ openModal, setOpenModal, note, groupId }) => {
  const dispatch = useDispatch();

  const [content, setContent] = useState(note.content);
  const [error, setError] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();
    setError("");

    if (!content) {
      setError("Content is required!");
      return;
    }

    dispatch(editNote({ noteId: note.id, groupId, content }));
    setOpenModal(false);
  };

  return (
    <Modal
      opened={openModal}
      onClose={() => setOpenModal(false)}
      closeOnClickOutside
      withCloseButton={false}
      centered
    >
      <p className={styles.createNewGroup}>Edit note content</p>
      <form className={styles.modal} onSubmit={handleUpdate}>
        <div className={styles.modal_input}>
          <textarea
            type="text"
            rows={5}
            name="content"
            defaultValue={note.content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textContent}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.modal_btn_div}>
          <button
            onClick={() => setOpenModal(false)}
            type="button"
            className={styles.modalBtnCancel}
          >
            Cancel
          </button>
          <button type="submit" className={styles.modalBtn}>
            Update
          </button>
        </div>
      </form>
    </Modal>
  );
};
