import * as React from "react";
import { IMedicationConceptDTO } from "@Models/IMedicationConceptDTO";
import Helmet from "react-helmet";
import { IPatientModel } from "@Models/IPatientModel";
import { Container } from "react-bootstrap";

export interface IProps {
    medications: IMedicationConceptDTO[];
    activePatient: IPatientModel;
    //onSubmit: (data: IPersonModel) => void;
    //children: (renderEditor: () => JSX.Element, submit: () => void) => JSX.Element;
}
//this isn't how these are supposed to be used because this is not a child of the component that would pass it props
const PatientComponent: React.FC<IProps> = (props: IProps) => {

    // const formValidator = React.useRef<FormValidator>(null);

    // const onSubmitForm = (values: IPersonModel) => {
    //     if (!formValidator.current.isValid()) {
    //         // Form is not valid.
    //         return;
    //     }
    //     props.onSubmit(values);
    //}

    // This function will be passed to children components as a parameter.
    // It's necessary to build custom markup with controls outside this component.
    function renderRows(arr: IMedicationConceptDTO[]) {
        return arr.map((med) => (
            <tr key={med.resourceId}>
                <td>{med.resourceId}</td>
                <td>{med.text}</td>
                <td>{med.prescriber}</td>
                <td>{med.timeOrdered}</td>

            </tr>
        ));

    }

    return (
        <Container>
            <Helmet title="{this.props.activePatient.lastName}${this.props.activePatient.firstName}">
                {/* <title></title> */}
            </Helmet>
            <h2>{props.activePatient.lastName}</h2>
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
                <tbody>{renderRows(props.medications)}</tbody>
            </table>
            <h3>Order Medication</h3>
        </Container>
    );
}

export default PatientComponent;