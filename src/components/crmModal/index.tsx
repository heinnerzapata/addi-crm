import React, { useState, useEffect, useCallback } from "react";
import Modal from "react-modal";

interface crmModalProps {
  modalIsOpen: boolean;
  contentLabel: string;
  onAfterOpen: () => void;
  onCloseModal: () => void;
}

const CrmModal: React.SFC<crmModalProps> = (props) => {
  const [width, setWidth] = useState("80%");

  const resizeListener = useCallback(() => {
    const width = window.innerWidth;
    setWidth(`${(width < 1280 ? width * 0.8 : width * 0.3).toString()}`);
  }, []);

  useEffect(() => {
    resizeListener();
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [resizeListener]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: `${width}px`,
      height: "80%",
      backgroundColor: "white",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    } as React.CSSProperties,
  };

  return (
    <React.Fragment>
      <Modal
        isOpen={props.modalIsOpen}
        onAfterOpen={props.onAfterOpen}
        onRequestClose={props.onCloseModal}
        style={customStyles}
        contentLabel={props.contentLabel}
      >
        {props.children}
      </Modal>
    </React.Fragment>
  );
};

export default CrmModal;
