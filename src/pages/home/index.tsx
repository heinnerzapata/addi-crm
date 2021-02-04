import React from "react";

import styles from "./home.module.scss";

import { Footer } from "./../../components";

import { StageList, CrmModal } from "./../../components";

interface IHomeProps {}
interface IHomeState {
  modalIsOpen: boolean;
}

class Home extends React.PureComponent<IHomeProps, IHomeState> {
  state = {
    modalIsOpen: false,
  };

  private handleAddClick = () => {
    this.setState({ modalIsOpen: true });
  };

  private handleCloseModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        <section className={styles.home}>
          <StageList />
          <Footer onAddLeadClick={this.handleAddClick} />
        </section>
        <CrmModal
          modalIsOpen={this.state.modalIsOpen}
          contentLabel={"test"}
          onAfterOpen={() => {}}
          onCloseModal={this.handleCloseModal}
        >
          heinner
        </CrmModal>
      </React.Fragment>
    );
  }
}

export default Home;
