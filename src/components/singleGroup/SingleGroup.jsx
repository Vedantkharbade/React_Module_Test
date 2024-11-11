import styles from "./singleGroup.module.css";
import sendIcon from "../../assets/icons/send-icon.svg";
import sendColorIcon from "../../assets/icons/send-colorful-icon.svg";
import backIcon from "../../assets/icons/back-arrow.svg";
import { SingleNote } from "../singleNote/SingleNote";
import { useSelector, useDispatch } from "react-redux";
import {
  changeCurrentActiveGroup,
  createNote,
  deleteGroup,
} from "../../redux/noteSlice";
import { useState } from "react";

export const SingleGroup = () => {
  const { currentActiveGroup, groups } = useSelector((note) => note.note);
  const dispatch = useDispatch();

  const newGrp = groups.filter((grp) => grp.id === currentActiveGroup);

  const [content, setContent] = useState("");

  const handleCreateNote = (e) => {
    e.preventDefault();
    if (!content) {
      return;
    }

    dispatch(createNote({ content, groupId: newGrp[0].id }));
    setContent("");
  };

  const handleDeleteGroup = () => {
    dispatch(deleteGroup({ groupId: newGrp[0].id }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.groupName}>
        <div className={styles.groupContent}>
          <div
            className={styles.backArrow}
            onClick={() => {
              dispatch(changeCurrentActiveGroup(null));
            }}
          >
            <img src={backIcon} alt="" />
          </div>
          <div
            className={styles.img_circle}
            style={{ backgroundColor: newGrp[0].groupColor }}
          >
            <p>{newGrp[0].groupShortName}</p>
          </div>

          <h4>{newGrp[0].groupName}</h4>
        </div>
        <span
          onClick={handleDeleteGroup}
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
      </div>

      <div className={styles.allNotes}>
        {newGrp[0].notes?.length === 0 && <p>No Notes to display!</p>}

        {newGrp[0].notes?.map((note) => (
          <SingleNote key={note.id} note={note} groupId={newGrp[0].id} />
        ))}
      </div>

      <form className={styles.message_container} onSubmit={handleCreateNote}>
        <textarea
          className={styles.message}
          rows="6"
          placeholder="Enter your text here..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleCreateNote(e);
            }
          }}
        />

        {content ? (
          <img
            onClick={handleCreateNote}
            src={sendColorIcon}
            alt="Send"
            className={styles.sendIcon}
            title="Send"
          />
        ) : (
          <img src={sendIcon} alt="Send" className={styles.sendIcon} />
        )}
      </form>
    </div>
  );
};
