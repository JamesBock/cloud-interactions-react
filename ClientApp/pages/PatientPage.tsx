import "@Styles/main.scss";
import * as React from "react";
import { Helmet } from "react-helmet";
import { RouteComponentProps, withRouter } from "react-router";
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

class PatientPage extends React.Component<Props, IState> {
  private paginator: Paginator;

  private debouncedSearch: (
    firstNameSearch: string
    // lastNameSearch: string
  ) => void;
  componentDidMount() {
    this.renderRows(this.props.patients.patients);
  }
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

    // "AwesomeDebouncePromise" makes a delay between
    // the end of input term and search request.
    this.debouncedSearch = AwesomeDebouncePromise((firstName: string) => {
      props.searchAction(firstName);
    }, 3000);

    wait(async () => {
      // Lets tell Node.js to wait for the request completion.
      // It's necessary when you want to see the fethched data
      // in your prerendered HTML code (by SSR).
      await this.props.searchAction();
    }, "patientPageTask");
  }

  private toggleSelectPatientModal = (modelForEdit?: IPatientModel) => {
    this.setState((prev) => ({
      modelForEdit,
      isSelectModalOpen: !prev.isSelectModalOpen,
    }));
  };

  private selectPatient = async (patientId: string) => {
    //TODO:search
    const result = ((await this.props.searchAction(
      //TODO: makeread Action on DRUG INTERACTION store NOT IMPLEMENTED
      patientId
    )) as any) as Result<string>;

    if (!result.hasErrors) {
      this.paginator.setLastPage();
      this.toggleSelectPatientModal();
    }
  };
  private searchPerson = async (data: string) => {
    return getPromiseFromActionCreator(this.props.searchAction(data)).then(
      (p) => {
        return p.value.patients;
      }
    );
  };
  private renderRows = (arr: IPatientModel[]) => {
   
    return paginate(
      arr, //this is null
      this.state.currentPageNum,
      this.state.limitPerPage
    ).map((patient) => (
      <tr key={patient.id}>
        <td>{patient.firstName}</td>
        <td>{patient.lastName}</td>
        <td>
          <button
            className="btn btn-info"
            // onClick={(x) => this.toggleSelectPatientModal(patient)}
          >
            Select
          </button>
          &nbsp;
        </td>
      </tr>
    ));
  };

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
          <tbody> {async ()=>this.renderRows //cant pass a function like this
          (await this.searchPerson(this.state.firstNameSearch).then((p) => {
      return p;
    }))}</tbody>
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
              onClick={(x) => this.selectPatient(this.state.modelForEdit.id)}
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>

        <Paginator
          ref={(x) => (this.paginator = x)}
          totalResults={this.props.patients.patients.length}
          limitPerPage={this.state.limitPerPage} //implement the paging here
          currentPage={this.state.currentPageNum}
          onChangePage={(pageNum) => this.setState({ currentPageNum: pageNum })}
        />
      </Container>
    );
  }
}

// Connect component with Redux store.
const connectedComponent = withStore(
  PatientPage,
  (state) => state.patient, // Selects which state properties are merged into the component's props.
  patientStore.actionCreators // Selects which action creators are merged into the component's props.
);

// Attach the React Router to the component to have an opportunity
// to interract with it: use some navigation components,
// have an access to React Router fields in the component's props, etc.
export default withRouter(connectedComponent);
