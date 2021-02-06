import React from "react";

import styles from "./home.module.scss";

import { Footer, Button } from "./../../components";

import { StageList, CrmModal, Input } from "./../../components";
import { ILead, IForm } from "./../../models";

import { ICrmState } from "./../../store/crm/reducer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface IHomeProps {
  crm: ICrmState;
  onGetStage: () => void;
  onCreateStage: (data: any) => any;
  onDeleteStage: (id: string) => any;
  onRunQualification: (id: string) => any;
}

interface IHomeState {
  modalIsOpen: boolean;
  leads: ILead[];
  formData: IForm;
}

class Home extends React.PureComponent<IHomeProps, IHomeState> {
  private form: React.RefObject<HTMLFormElement>;
  state = {
    modalIsOpen: false,
    leads: [],
    formData: {
      nationalId: "",
      firstName: "",
      lastName: "",
      birthday: new Date().getTime(),
      email: "",
    } as IForm,
  };

  constructor(props: any) {
    super(props);
    this.form = React.createRef();
  }

  private handleAddClick = () => {
    this.setState({ modalIsOpen: true });
  };

  private handleCloseModal = () => {
    this.setState({ modalIsOpen: false });
  };

  componentDidUpdate(prevProps: IHomeProps) {
    if (this.props.crm !== prevProps.crm) {
      this.setState({ leads: this.props.crm.stage });
    }
  }

  private handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      formData: { ...this.state.formData, nationalId: e.target.value },
    });
  };

  private handleBirthday = (date: Date) => {
    this.setState({
      formData: { ...this.state.formData, birthday: date.getTime() },
    });
  };

  private handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      formData: { ...this.state.formData, firstName: e.target.value },
    });
  };

  private handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      formData: { ...this.state.formData, lastName: e.target.value },
    });
  };

  private handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      formData: { ...this.state.formData, email: e.target.value },
    });
  };

  private handleSubmit = () => {
    if (this.form.current) {
      if (this.form.current.reportValidity()) {
        this.props.onCreateStage(this.state.formData).then((result: any) => {
          this.setState({ modalIsOpen: false });
        });
      }
    }
  };

  private handleModalClose = () => {
    this.setState({ modalIsOpen: false });
  };

  private handleDelete = (id: string) => {
    this.props.onDeleteStage(id);
  };

  private handleRunQualification = (id: string) => {
    this.props.onRunQualification(id);
  };

  componentDidMount() {
    this.props.onGetStage();
  }

  render() {
    return (
      <React.Fragment>
        <section className={styles.home}>
          <StageList
            onDelete={this.handleDelete}
            onRunQualification={this.handleRunQualification}
            leads={this.state.leads}
          />
          <Footer onAddLeadClick={this.handleAddClick} />
          <CrmModal
            modalIsOpen={this.state.modalIsOpen}
            contentLabel={"test"}
            onAfterOpen={() => {}}
            onCloseModal={this.handleCloseModal}
          >
            <div className={styles.modalContent}>
              <Button
                className={styles.closeModal}
                height="30px"
                width="30px"
                onClick={this.handleModalClose}
              >
                X
              </Button>
              <h3>Set new lead basic info</h3>
              <br />
              <form ref={this.form} onSubmit={(e) => e.preventDefault()}>
                <Input
                  title="ID"
                  type="number"
                  required
                  pattern={`d{3}`}
                  initValue=""
                  placeHolder="set id"
                  onChange={this.handleId}
                />
                <Input
                  title="First Name"
                  type="text"
                  required
                  initValue=""
                  placeHolder="set first Name"
                  onChange={this.handleFirstName}
                />
                <Input
                  title="Last Name"
                  type="text"
                  required
                  initValue=""
                  placeHolder="set last name"
                  onChange={this.handleLastName}
                />
                <br />
                <div className={styles.date}>
                  <span className={styles.dateTitle}>Birthday</span>
                  <DatePicker
                    popperPlacement="bottom-end"
                    selected={new Date(this.state.formData.birthday)}
                    onChange={this.handleBirthday}
                  />
                </div>
                <Input
                  title="Email"
                  type="email"
                  required
                  initValue=""
                  placeHolder="set an email"
                  onChange={this.handleEmail}
                />
                <br />
                <br />

                <Button
                  disabled={this.props.crm.stage.some(
                    (lead) => lead.nationalId === this.state.formData.nationalId
                  )}
                  size={"25px"}
                  height="80px"
                  width="100%"
                  onClick={this.handleSubmit}
                >
                  Add Lend
                </Button>
              </form>
            </div>
          </CrmModal>
        </section>
      </React.Fragment>
    );
  }
}

export default Home;
