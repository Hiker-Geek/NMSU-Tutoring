import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';

const DropdownBtn = (props) => {
    return (
        <DropdownButton onSelect={props.eventHandle} variant="lostPage" class="btn btn-secondary dropdown-toggle" id="dropdown-basic-button" data-toggle="dropdown" title={props.title} >
            {props.items.map(item => (
                <li><Dropdown.Item eventKey={item}>{item}</Dropdown.Item></li>
            ))}
        </DropdownButton>
    )
}
//<Card.Img variant="top" src={props.img} />
const Cards = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title >{props.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Card style={{ width: '300px', marginLeft: "50px", marginBottom:"15px", boxShadow: "1px 1px 10px grey", padding: "10px" }}>
                <Card.Img variant="top" src={props.img} style={{height: "150px"}}/>
                <Card.Body>
                    <Card.Title style={{fontSize: "22px", fontWeight: "bold"}}>{props.name}</Card.Title>
                    <ListGroup variant="flush" style={{textAlign: 'left'}}>
                        <ListGroup.Item> <b>Tutoring Subjects:</b> {props.subjects}<br/><b>Major: </b>{props.major} <br/> <b>Year:</b> {props.studentYear} </ListGroup.Item>
                        <ListGroup.Item><b>Schedule:</b> {props.schedule}<br/><b>Locations:</b> {props.locations}</ListGroup.Item>
                        <ListGroup.Item><b>About Me<br/></b> {props.bio}</ListGroup.Item>
                    </ListGroup>
                    <Button variant="success" onClick={handleShow}>
                        {props.buttonText}
                    </Button>
                </Card.Body>
            </Card>
        </>
    )
}

export { Cards, DropdownBtn }; 