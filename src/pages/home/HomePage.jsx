import React, { useEffect, useState } from "react";
import styles from "./homepage.module.css";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Landing } from "../../components/landing/Landing";
import { SingleGroup } from "../../components/singleGroup/SingleGroup";
import { useSelector } from "react-redux";

export default function HomePage() {
  const [windowWith, setWindowWith] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setWindowWith(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { currentActiveGroup } = useSelector((note) => note.note);

  const isCurrGrpNull = currentActiveGroup === null;

  return (
    <div className={styles.container}>
      <div
        className={styles.left_container}
        style={{ display: isCurrGrpNull || (windowWith < 720 && "none") }}
      >
        <Sidebar />
      </div>

      {!currentActiveGroup ? (
        <div className={styles.right_container}>
          <Landing />
        </div>
      ) : (
        (currentActiveGroup || windowWith > 719) && (
          <div className={styles.right_container} style={{ display: "block" }}>
            <SingleGroup />
          </div>
        )
      )}
    </div>
  );
}
