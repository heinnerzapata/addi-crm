import React, { useState, useEffect } from "react";
import Modal from "react-modal";

interface crmModalProps {
  modalIsOpen: boolean;
  contentLabel: string;
  onAfterOpen: () => void;
  onCloseModal: () => void;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "80%",
    height: "60%",
    backgroundColor: "white",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  } as React.CSSProperties,
};

const CrmModal: React.SFC<crmModalProps> = (props) => {
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
