import { useState } from "react";
import styles from "./createGroupModal.module.css";
import { Modal } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { createGroup } from "../../redux/noteSlice";

export const CreateGroupModal = ({ openModal, setOpenModal }) => {
  const colors = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const dispatch = useDispatch();

  const [grpTitle, setGrpTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState("");

  const { groups } = useSelector((note) => note.note);

  const handleCreateGroup = (e) => {
    setError("");
    e.preventDefault();

    if (!selectedColor) {
      setError("Please select a color!");
      return;
    }
    const grpNames = groups.reduce((acc, curr) => [...acc, curr.groupName], "");
    if (grpNames.includes(grpTitle)) {
      setError("This title already exists!");
      return;
    }

    dispatch(createGroup({ groupName: grpTitle, groupColor: selectedColor }));
    setOpenModal(false);
  };

  return (
    <Modal
      opened={openModal}
      onClose={() => setOpenModal(false)}
      closeOnClickOutside
      withCloseButton={false}
      // title="Create New Group"
      centered
    >
      <p className={styles.createNewGroup}>Create New Group</p>
      <form className={styles.modal} onSubmit={handleCreateGroup}>
        <div className={styles.modal_input}>
          <label htmlFor="grpName">Group Name</label>
          <input
            type="text"
            id="grpName"
            placeholder="Enter Group Name"
            required
            name="grpName"
            autoComplete="off"
            autoFocus
            onChange={(e) => setGrpTitle(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div className={styles.modal_input}>
            <label htmlFor="color">Choose Color</label>
            <div className={styles.colors}>
              {colors.map((color, _) => (
                <div
                  key={_}
                  className={styles.modal_input_color}
                  style={{
                    backgroundColor: color,
                    border: selectedColor === color && "2px solid black",
                  }}
                  onClick={() => setSelectedColor(color)}
                ></div>
              ))}
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
        </div>

        <div className={styles.modal_btn_div}>
          <button type="submit" className={styles.modalBtn}>
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};
