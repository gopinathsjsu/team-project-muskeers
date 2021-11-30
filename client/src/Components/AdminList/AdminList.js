import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import Axios from 'axios';
import endPointObj from '../../endPointObj'

function AdminList(props) {

    const [flights, setFlights] = useState([]);


    useEffect(() => {
        getFlights().then((data) => {
            //console.log(data.flight_id)
            setFlights(data.details);

        })
    }, []);


    const getFlights = () => {


        return new Promise((reslove, reject) => {
            Axios.get(endPointObj.url + 'filghtDetailsAdmin').then((response) => {



                reslove(response.data);


            }).catch((e) => {

            })
        })
    }


    return (
        <div>
            <ListGroup>
                <ListGroup.Item disabled>Cras justo odio</ListGroup.Item>

                {flights.map((a) => (
                    <ListGroup.Item key={a.flight_id} value={a.flight_id}>
                        {a.source_city}
                    </ListGroup.Item>
                ))}

            </ListGroup>
        </div>
    );
}

export default AdminList;