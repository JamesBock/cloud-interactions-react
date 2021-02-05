import "@Styles/main.scss";
import * as React from "react";
import { Helmet } from "react-helmet";
import { IPatientModel as IPatientModel } from "@Models/IPatientModel";
import * as patientStore from "@Store/patientStore";
import { withStore } from "@Store/index";
import Paginator from "@Components/shared/Paginator";
import { paginate, getPromiseFromActionCreator } from "@Utils";
import { Modal, Button, Container, Row, Card } from "react-bootstrap";
import { wait } from "domain-wait";
import Result from "@Core/Result";
import { IMedicationConceptDTO } from "@Models/IMedicationConceptDTO";
import { RouteComponentProps, withRouter } from "react-router";
import { IMedicationInteractionPair } from "@Models/IMedicationInteractionPair";


type Props = typeof patientStore.actionCreators &
  patientStore.IPatientStoreState &
  RouteComponentProps<{}>;

interface IState {

  isInteractionsModalOpen: boolean;

}
//if you make this a FC you should be able to use Hooks to get the state you need and to navigate
//Interctions page has code for modal
class PatientPage extends React.Component<Props, IState> {
  private paginator: Paginator;
  //   componentDidMount() {
  //   wait(async () => {
  //     // Lets tell Node.js to wait for the request completion.
  //     // It's necessary when you want to see the fethched data
  //     // in your prerendered HTML code (by SSR).
  //     await this.props.searchAction();
  //   }, "patientPageTask");
  // };


  constructor(props: Props) {
    super(props);

    this.state = {

      isInteractionsModalOpen: false,

    };
    this.toggleInteractionsModal = () => {
      if (this.props.interactions.length === 0) {

        this.props.getInteractions(this.props.activePatient.id)

      }
      this.setState((prev) => ({
        isInteractionsModalOpen: !prev.isInteractionsModalOpen,
      }));
    };
  }

  private toggleInteractionsModal: () =>
    void
    ;


  private renderMeds = (arr: IMedicationConceptDTO[]) =>
    arr.map((med) => (
      <tr key={med.resourceId}>
        <td>{med.resourceId}</td>
        <td>{med.text}</td>
        <td>{med.prescriber}</td>
        <td>{med.timeOrdered}</td>

      </tr>
    ));
  private renderInteractions = (arr: IMedicationInteractionPair[]) =>
    arr.map((interaction) => (
      <tbody>
        <tr key={interaction.interactionId}>
          <td>{interaction.medicationPair.item1.displayName}</td>
        </tr>
        <tr>
          <td>
            <small>
              <a href="">
                {" "}
                order reference ID: {interaction.medicationPair.item1.resourceId}{" "}
              </a>
              Prescribed by: {interaction.medicationPair.item1.prescriber} on{" "}
              {interaction.medicationPair.item1.timeOrdered}
            </small>
          </td>
        </tr>
        <tr>
          <td>{interaction.medicationPair.item2.displayName}</td>
        </tr>
        <tr >
          <td >
            <small>
              <a href="">
                {" "}
                order reference ID: {interaction.medicationPair.item2.resourceId}{" "}
              </a>{" "}
              Prescribed by: {interaction.medicationPair.item2.prescriber} on{" "}
              {interaction.medicationPair.item2.timeOrdered}
            </small>
          </td>
        </tr>
      </tbody>
    ));


  render() {
    return (
      <Container>
        <Helmet title="${this.props.activePatient.lastName},${this.props.activePatient.firstName}">
          {/* <title></title> */}
        </Helmet>
        <h2>{this.props.activePatient.lastName}</h2>
        <Container>
          <Row>

            <h3>View Medications</h3>
            <Card body className="mt-4 mb-4">
              <Row>
                <div className="col-3 col-sm-2 col-md-2 col-lg-1">
                  <button
                    className="btn btn-success"
                    onClick={(x) => this.toggleInteractionsModal()}
                  >View Interactions
              </button>
                </div>

              </Row>
            </Card>
          </Row>
        </Container>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Prescriber</th>
              <th>Date Ordered</th>
            </tr>
          </thead>
          <tbody>
            {this.renderMeds(this.props.medications)}
          </tbody>
        </table>
        <h3>Order Medication</h3>

        {/* Update modal */}
        <Modal
          show={this.state.isInteractionsModalOpen}
          onHide={() => this.toggleInteractionsModal()}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Drug-Drug interactions :{" "}
              {this.props.activePatient
                ? `${this.props.activePatient.firstName} ${this.props.activePatient.lastName}`
                : null}
            </Modal.Title>
          </Modal.Header>


          <Modal.Body><table>
            {this.renderInteractions(this.props.interactions)}
          </table>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={(x) => this.toggleInteractionsModal()}
            >
              Close
                  </Button>

          </Modal.Footer>

        </Modal>
      </Container>
    );
  }
}

// Connect component with Redux store.
let connectedComponent = withStore(
  PatientPage,
  (state) => state.patient, // Selects which state properties are merged into the component's props.
  patientStore.actionCreators // Selects which action creators are merged into the component's props.
);

// Attach the React Router to the component to have an opportunity
// to interract with it: use some navigation components,
// have an access to React Router fields in the component's props, etc.
export default withRouter(connectedComponent);
