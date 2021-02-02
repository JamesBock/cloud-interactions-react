import "@Styles/main.scss";
import * as React from "react";
import { Helmet } from "react-helmet";
import { RouteComponentProps, withRouter } from "react-router";
import { IPatientModel as IPatientModel } from "@Models/IPatientModel";
import { IPatientListModel as IPatientListModel } from "@Models/IPatientListModel";
import * as interactionStore from "@Store/interactionStore";
import { withStore } from "@Store/index";
import Paginator from "@Components/shared/Paginator";
import PersonEditor from "@Components/person/PersonEditor";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { paginate, getPromiseFromActionCreator } from "@Utils";
import { Modal, Button, Container, Row, Card } from "react-bootstrap";
import { wait } from "domain-wait";
import Result from "@Core/Result";
import {
  IMedicationInteractionPair as IMedicationInteractionPair,
  IInteractionDetail,
  IMedicationInteractionViewModel,
} from "@Models/IMedicationInteractionPair";

type Props = typeof interactionStore.actionCreators &
  interactionStore.IInteractionStoreState &
  RouteComponentProps<{}>;

interface IState {
  isInteractionsModalOpen: boolean;
}

class InteractionPage extends React.Component<Props, IState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isInteractionsModalOpen: false,
    };
  }
  private toggleShowInteractionsModal = (modelForEdit?: IPatientModel) => {
    this.setState((prev) => ({
      isInteractionsModalOpen: !prev.isInteractionsModalOpen,
    }));
  };

  private renderRows = (arr: IMedicationInteractionPair[]) =>
    arr.map((drug) => (
      <tbody>
        <tr key={drug.interactionId}>
          <td>{drug.medicationPair.item1.displayName}</td>
        </tr>
        <tr>
          <td>
            <small>
              <a href="">
                {" "}
                order reference ID: {drug.medicationPair.item1.resourceId}{" "}
              </a>
              Prescribed by: {drug.medicationPair.item1.prescriber} on{" "}
              {drug.medicationPair.item1.timeOrdered}
            </small>
          </td>
        </tr>
        <tr>
          <td>{drug.medicationPair.item2.displayName}</td>
        </tr>
        <tr >
          <td >
            <small>
              <a href="">
                {" "}
                order reference ID: {drug.medicationPair.item2.resourceId}{" "}
              </a>{" "}
              Prescribed by: {drug.medicationPair.item2.prescriber} on{" "}
              {drug.medicationPair.item2.timeOrdered}
            </small>
          </td>
        </tr>
      </tbody>
    ));
  
  render() {
    return (
      <Container>
       
        <Helmet>
          <title>Select Patient</title>
        </Helmet>
        <table className="table">
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.renderRows(this.props.interactions)}</tbody>
        </table>
      </Container>);
  }
  
}
// Connect component with Redux store.
let connectedComponent = withStore(
  InteractionPage,
  (state) => state.patient, // Selects which state properties are merged into the component's props.
  interactionStore.actionCreators // Selects which action creators are merged into the component's props.
);

// Attach the React Router to the component to have an opportunity
// to interract with it: use some navigation components,
// have an access to React Router fields in the component's props, etc.
export default withRouter(connectedComponent);

