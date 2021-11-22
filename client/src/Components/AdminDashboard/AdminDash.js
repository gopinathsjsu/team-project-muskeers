import React, { useState } from 'react';
import { ButtonGroup, Button, Col, Row, Form } from 'react-bootstrap';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import "./AdminDash.css"

function AdminDash(props) {

    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');



    return (

        <Col md={{ span: 6, offset: 3 }} className="admin-dash-align">
            <Row>
                <ButtonGroup aria-label="Basic example" >
                    <Button variant="primary">Create Flight</Button>
                    <Button variant="primary">Update Flight</Button>
                    <Button variant="primary">Delete Flight</Button>
                </ButtonGroup>
            </Row>
            {/* create flight */}
            <Row>
                
                {/* <CountryDropdown
                    value={country}
                    onChange={(val) => setCountry(val)} /> */}
                
                <RegionDropdown
                    country="United States"
                    value={region}
                    defaultOptionLabel="Source"
                    onChange={(val) => setRegion(val)} />

                
                <RegionDropdown
                    country="United States"
                    value={region}
                    defaultOptionLabel="Destination"
                    onChange={(val) => setRegion(val)} />
            </Row>
            {/* update flight */}

            {/* delete flight */}

        </Col>





    );
}

export default AdminDash;