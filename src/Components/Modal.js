import React from "react";

function Modal({ inner }) {
    console.log(inner)
    let inside = ("");
    if (inner == true) {
        inside = (<div>
            <h3>Correct!</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
        </div>
        );
    } else {
        inside = (<div>
            <h2>Wrong</h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
        </div>);
    }
    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                {inside}
            </div>
        </div>
    );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    position: "relative",
    width: "80%",
    maxWidth: "500px"
  }
};

export default Modal;
