import "@Styles/main.scss";
import * as React from "react";
import { Helmet } from "react-helmet";
import { RouteComponentProps, useHistory, withRouter } from "react-router";
import { IPatientModel as IPatientModel } from "@Models/IPatientModel";
import { IPatientListModel as IPatientListModel } from "@Models/IPatientListModel";
import * as interactionStore from "@Store/interactionStore";
import { withStore } from "@Store/index";
import Paginator from "@Components/shared/Paginator";
import PersonEditor from "@Components/person/PersonEditor";
import { paginate, getPromiseFromActionCreator } from "@Utils";
import { Modal, Button, Container, Row, Card } from "react-bootstrap";
import { wait } from "domain-wait";
import Result from "@Core/Result";

type Props = typeof interactionStore.actionCreators &
interactionStore.IInteractionStoreState &
  RouteComponentProps<{}>;

interface IState {
  
  isSelectModalOpen: boolean;
  
}

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

  render() {
    return (
      <Container>
        <Helmet>
          <title>`${this.props.activePatient.lastName}, ${this.props.activePatient.firstName}`</title>
            </Helmet>
            <h2>`${this.props.activePatient.lastName}, ${this.props.activePatient.firstName}`</h2>
            <h3>View Medications</h3>
            <h3>Order Medication</h3>
      </Container>
    );
  }
}

// Connect component with Redux store.
let connectedComponent = withStore(
  PatientPage,
  (state) => state.interaction, // Selects which state properties are merged into the component's props.
  interactionStore.actionCreators // Selects which action creators are merged into the component's props.
);

// Attach the React Router to the component to have an opportunity
// to interract with it: use some navigation components,
// have an access to React Router fields in the component's props, etc.
export default withRouter(connectedComponent);
