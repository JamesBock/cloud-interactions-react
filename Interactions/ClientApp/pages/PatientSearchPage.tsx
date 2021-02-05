import "@Styles/main.scss";
import * as React from "react";
import { Helmet } from "react-helmet";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import { IPatientModel as IPatientModel } from "@Models/IPatientModel";
import { IPatientListModel as IPatientListModel } from "@Models/IPatientListModel";
import * as patientStore from "@Store/patientStore";
import { withStore } from "@Store/index";
import Paginator from "@Components/shared/Paginator";
import PersonEditor from "@Components/person/PersonEditor";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { paginate, getPromiseFromActionCreator } from "@Utils";
import { Modal, Button, Container, Row, Card } from "react-bootstrap";
import { wait } from "domain-wait";
import Result from "@Core/Result";


type Props = typeof patientStore.actionCreators &
  patientStore.IPatientStoreState &
  RouteComponentProps<{}>;

interface IState {
  firstNameSearch: string;
  // lastNameSearch: string;
  currentPageNum: number;
  limitPerPage: number;
  isSelectModalOpen: boolean;
  modelForEdit?: IPatientModel;
}

class PatientSearchPage extends React.Component<Props, IState> {
  private paginator: Paginator;
  //   componentDidMount() {
  //   wait(async () => {
  //     // Lets tell Node.js to wait for the request completion.
  //     // It's necessary when you want to see the fethched data
  //     // in your prerendered HTML code (by SSR).
  //     await this.props.searchAction();
  //   }, "patientPageTask");
  // };

  private debouncedSearch: (
    firstNameSearch: string
    // lastNameSearch: string
  ) => void;

  private navToNextPage: (nextLink: string, count: number) => void;

  //passed a actionCreator from the Redux store, the actionCreator invokes the Service that calls the API
  constructor(props: Props) {
    super(props);

    this.state = {
      firstNameSearch: "",
      // lastNameSearch: "",
      currentPageNum: 1,
      limitPerPage: 5,
      isSelectModalOpen: false,
      modelForEdit: null,
    };
    

    this.debouncedSearch = (firstName) =>
      wait(async () => {
        props.searchAction(this.state.limitPerPage, firstName);

        // Lets tell Node.js to wait for the request completion.
        // It's necessary when you want to see the fethched data
        // in your prerendered HTML code (by SSR).
        //await this.props.searchAction();
      }, "patientSearchPageTask");

    this.navToNextPage = (nextLink, count) => {
      if (!!nextLink) {
        wait(async () => {
          props.loadNext(nextLink, count);
        }, "patientSearchPageTask");
      }
    };
    this.handleSelectClick = (patient: IPatientModel) => wait(async () => {
      props.getMedications(patient.id);
      props.setPatient(patient);
      props.history.push(`/patient`);
  }, "patientSearchPageTask");
    // "AwesomeDebouncePromise" makes a delay between
    // the end of input term and search request.
    //   wait(async () => {
    //   this.debouncedSearch = AwesomeDebouncePromise((firstName: string) => {
    //     getPromiseFromActionCreator(props.loadThunk())
    //       ;      }, 500);

    //   // Lets tell Node.js to wait for the request completion.
    //   // It's necessary when you want to see the fethched data
    //   // in your prerendered HTML code (by SSR).
    //   //await this.props.searchAction();
    // }, "patientPageTask");
  }

  private handleSelectClick: (patient: IPatientModel)
    => void;


  private toggleSelectPatientModal = (modelForEdit?: IPatientModel) => {
    this.setState((prev) => ({
      modelForEdit,
      isSelectModalOpen: !prev.isSelectModalOpen,
    }));
  };



  private renderRows = (arr: IPatientModel[]) =>
    arr.map((patient) => (
      <tr key={patient.id}>
        <td>{patient.firstName}</td>
        <td>{patient.lastName}</td>
        <td>
          <button type="submit" onClick={() => this.handleSelectClick(patient)} className="btn btn-info">Select</button>
          &nbsp;
        </td>
      </tr>
    ));

  private onChangeFirstSearchInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.currentTarget.value;
    this.debouncedSearch(val);
    this.paginator.setFirstPage();
  };

  // private onChangeLastSearchInput = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   this.setState((prev) => ({
  //     currentPageNum: prev.currentPageNum,
  //     limitPerPage: prev.limitPerPage,
  //     lastNameSearch: e.currentTarget.value,
  //   }));
  //   this.debouncedSearch(this.state.firstNameSearch,e.currentTarget.value);
  //   //Warning: This synthetic event is reused for performance reasons. If you're seeing this, you're accessing the method `currentTarget` on a released/nullified synthetic event. This is a no-op function. If you must keep the original synthetic event around, use event.persist(). See https://fb.me/react-event-pooling for more information.

  //   this.paginator.setFirstPage();
  // };

  render() {
    return (
      <Container>
        <Helmet>
          <title>Select Patient</title>
        </Helmet>

        <Card body className="mt-4 mb-4">
          <Row>
            <div className="col-3 col-sm-2 col-md-2 col-lg-1">
              <button
                className="btn btn-success"
                onClick={(x) => this.toggleSelectPatientModal()}
              >
                Search
              </button>
            </div>
            <div className="col-9 col-sm-10 col-md-10 col-lg-11">
              <input
                type="text"
                className="form-control"
                defaultValue={""}
                onChange={this.onChangeFirstSearchInput}
                placeholder={"First Name"}
              />
            </div>
            {/* <div className="col-9 col-sm-10 col-md-10 col-lg-11">
              <input
                type="text"
                className="form-control"
                defaultValue={""}
                onChange={this.onChangeLastSearchInput}
                placeholder={"Last Name"}
              />
            </div> */}
          </Row>
        </Card>

        <table className="table">
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.renderRows(this.props.patients)}</tbody>
        </table>

        {/* select modal */}
        <Modal
          show={this.state.isSelectModalOpen}
          onHide={() => this.toggleSelectPatientModal()}
        >
          <Modal.Header closeButton>
            <Modal.Title>Patient selected</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Get drug-drug interactions for{" "}
              {this.state.modelForEdit
                ? `${this.state.modelForEdit.firstName} ${this.state.modelForEdit.lastName}`
                : null}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
            // onClick={(x) => this.selectPatient(this.state.modelForEdit.id)}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>

        <Paginator
          ref={(x) => (this.paginator = x)}
          totalResults={this.props.total}
          limitPerPage={this.state.limitPerPage} //implement the paging here
          currentPage={this.state.currentPageNum}
          onChangePage={(pageNum) => {
            this.navToNextPage(this.props.nextLink, this.state.limitPerPage);
            this.setState({ currentPageNum: pageNum });
          }}
        />
      </Container>
    );
  }
}


// Connect component with Redux store.
let connectedComponent =

  withStore(
    PatientSearchPage,
    (state) => state.patient, // Selects which state properties are merged into the component's props.
    patientStore.actionCreators // Selects which action creators are merged into the component's props.
  );

// Attach the React Router to the component to have an opportunity
// to interract with it: use some navigation components,
// have an access to React Router fields in the component's props, etc.
export default
  withRouter(connectedComponent);

