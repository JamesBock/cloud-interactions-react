import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Helmet } from "react-helmet";
import logo from "@Images/logo.png";
import { Button } from "react-bootstrap"; 
import { Nav } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

type Props = RouteComponentProps<{}>;

const HomePage: React.FC<Props> = () => {
    return <div>
        <Helmet>
            <title>Patient Search</title>
        </Helmet>

        <br />

        <Button style={{ "margin": "0 auto", "display": "block", "width": "60%" }}>
            <LinkContainer exact to={'/patient'}>
                <Nav.Link>Continue</Nav.Link>
            </LinkContainer></Button>
        <p className="text-center" style={{ "fontSize": "3rem" }}>Enter a name then press continue</p>
    </div>;
}

export default HomePage;