import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer style={{'backgroundColor': 'teal', 'color': 'white'}}>
            <Row>
                <Col className='text-center py-3'>&copy;Pie-Shop | 2021</Col>
            </Row>
            <Row>
                <Col className='text-center py-3'>
                    Designed & Developed by  <a style={{'color': 'white'}} href='https://www.linkedin.com/in/prayas-banerjee/' target='_blank'>
                         Prayas Banerjee
                    </a>
                </Col>
            </Row>
        </footer>
    )
}

export default Footer
