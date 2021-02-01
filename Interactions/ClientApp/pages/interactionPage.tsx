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
import { IMedicationInteractionPair } from "@Models/IMedicationInteractionPair";

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
}
