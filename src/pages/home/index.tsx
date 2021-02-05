import React from "react";

import styles from "./home.module.scss";

import { Footer } from "./../../components";

import { StageList, CrmModal, Input } from "./../../components";
import { ILead } from "./../../models";

import { ICrmState } from "./../../store/crm/reducer";

interface IHomeProps {
  crm: ICrmState;
  onGetStage: () => void;
}

interface IHomeState {
  modalIsOpen: boolean;
  leads: ILead[];
}

class Home extends React.PureComponent<IHomeProps, IHomeState> {
  state = {
    modalIsOpen: false,
    leads: [],
  };

  private handleAddClick = () => {
    this.setState({ modalIsOpen: true });
  };

  private handleCloseModal = () => {
    this.setState({ modalIsOpen: false });
  };

  componentDidUpdate(prevProps: IHomeProps) {
    if (this.props.crm !== prevProps.crm && this.props.crm.stage.length) {
      this.setState({ leads: this.props.crm.stage });
    }
  }

  componentDidMount() {
    this.props.onGetStage();
  }

  render() {
    return (
      <React.Fragment>
        <section className={styles.home}>
          <StageList leads={this.state.leads} />
          <Footer onAddLeadClick={this.handleAddClick} />
          <CrmModal
            modalIsOpen={this.state.modalIsOpen}
            contentLabel={"test"}
            onAfterOpen={() => {}}
            onCloseModal={this.handleCloseModal}
          >
            <div className={styles.modalContent}>
              <h4>Set new lead basic info</h4>
              <br />
              <Input
                title="First Name"
                type="text"
                initValue=""
                placeHolder="First Name"
                onChange={() => null}
              />
              <Input
                title="Last Name"
                type="text"
                initValue=""
                placeHolder="First Name"
                onChange={() => null}
              />
            </div>
          </CrmModal>
        </section>
      </React.Fragment>
    );
  }
}

export default Home;
