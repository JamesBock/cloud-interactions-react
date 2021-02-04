import "@Styles/main.scss";
import * as React from "react";
import { Helmet } from "react-helmet";
import { RouteComponentProps, withRouter } from "react-router";
import { IPersonModel } from "@Models/IPersonModel";
import Result from "@Core/Result";
import *  as interactionStore from "@Store/interactionStore";
import { wait } from "domain-wait";

type Props = typeof interactionStore.actionCreators &
    interactionStore.IInteractionStoreState &
    RouteComponentProps<{}>;

export interface IState {
    id: string;
    handleSelectClick: (id: string) => void;
    children: (renderEditor: () => JSX.Element, submit: () => void) => JSX.Element;
}
const GetMedicationsButton: React.FC<Props, IState> = (props: Props) => {

    super(props);
    const handleSelectClick = (id: string) => wait(async () => {
        props.getMedications(id);
        let history = useHistory();
        history.push(`/patient`);
    }, "patientSearchPageTask");
}
  

// This function will be passed to children components as a parameter.
// It's necessary to build custom markup with controls outside this component.
const renderEditor = (values: IPersonModel) => {

    return <FormValidator className="form" ref={x => formValidator.current = x}>
        <div className="form-group">
            <Field name={nameof.full<IPersonModel>(x => x.firstName)}>
                {({ field }) => (
                    <>
                        <label className="control-label required" htmlFor="person__firstName">First name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="person__firstName"
                            name={field.name}
                            data-value-type="string"
                            data-val-required="true"
                            data-msg-required="First name is required."
                            value={field.value || ''}
                            onChange={field.onChange}
                        />
                    </>
                )}
            </Field>
        </div>
        <div className="form-group">
            <Field name={nameof.full<IPersonModel>(x => x.lastName)}>
                {({ field }) => (
                    <>
                        <label className="control-label required" htmlFor="person__lastName">Last name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="person__lastName"
                            name={field.name}
                            data-value-type="string"
                            data-val-required="true"
                            data-msg-required="Last name is required."
                            value={field.value || ''}
                            onChange={field.onChange}
                        />
                    </>
                )}
            </Field>
        </div>
    </FormValidator>;
}

return <Formik
    enableReinitialize
    initialValues={props.data}
    onSubmit={(values, { setSubmitting }) => {
        onSubmitForm(values);
    }}
>
    {({ values, handleSubmit }) => {
        // Let's say that the children element is a parametrizable function.
        // So we will pass other elements to this functional component as children 
        // elements of this one: 
        // <PersonEditor>
        // {(renderEditor, handleSubmit) => <>
        //     {renderEditor()}
        //     <button onClick={x => handleSubmit()}>Submit</button>
        // </>}
        // </PersonEditor>.
        return props.children(() => renderEditor(values), handleSubmit);
    }}
</Formik>;
}

export default GetMedicationsButton;