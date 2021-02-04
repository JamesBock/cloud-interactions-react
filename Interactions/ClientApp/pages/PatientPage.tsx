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


type Props = typeof patientStore.actionCreators &
  patientStore.IPatientStoreState &
  RouteComponentProps<{}>;

interface IState {

  isSelectModalOpen: boolean;

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

      isSelectModalOpen: false,

    };

  }

  private renderRows = (arr: IMedicationConceptDTO[]) =>
    arr.map((med, index) => (
      <tr key={med.resourceId}>
        <td>{med.resourceId}</td>
        <td>{med.text}</td>
        <td>{med.prescriber}</td>
        <td>{med.timeOrdered}</td>

      </tr>
    ));

  render() {
    return (
      <Container>
        <Helmet title="{this.props.activePatient.lastName}${this.props.activePatient.firstName}">
          {/* <title></title> */}
        </Helmet>
        <h2>{this.props.activePatient.lastName}</h2>
        <h3>View Medications</h3>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Prescriber</th>
              <th>Date Ordered</th>
            </tr>
          </thead>
          <tbody>{this.renderRows(this.props.medications)}</tbody>
        </table>
        <h3>Order Medication</h3>
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
