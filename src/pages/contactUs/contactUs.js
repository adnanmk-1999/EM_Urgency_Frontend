import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import ContactImage from '../../images/contactUs.png';
import gmail from '../../images/gmail.png';
import facebook from '../../images/facebook.png';
import twitter from '../../images/twitter.png';

import './contactUs.css';


function ContactUs() {
    return (
        <>
            <div className='textImage'>
                <div className='titleContact'>
                    <h1 >Contact Us</h1>
                    <center><div style={{ height: 6, width: '12%', background: "linear-gradient(to right, #FFC0B1 , #ffab99)" }}></div></center>
                    <h2 style={{ paddingTop: '3%', fontWeight: 'lighter' }}>We’re here to help and listen</h2>
                </div>
                <img src={ContactImage} className='img-fluid shadow-4 contactImage' alt='contact'></img>
            </div>
            <Container className="contactIntro">
                <p>
                    If you have questions, feedback, or need assistance related to emergency
                    alerts, preparedness resources, or platform usage, feel free to reach out.
                    We welcome inquiries and aim to respond as promptly as possible.
                </p>
            </Container>

            <Container className="contactMethods">
                <Row>
                    <Col md={4}>
                        <div className="contactBox">
                            <img src={gmail} alt="Email" />
                            <h4>Email</h4>
                            <p>
                                For questions, feedback, or support related to EM-Urgency.
                            </p>
                            <a
                                href="mailto:emurgency.experion@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                emurgency.experion@gmail.com
                            </a>
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="contactBox">
                            <img src={twitter} alt="Twitter" />
                            <h4>Twitter</h4>
                            <p>
                                Follow us for updates, announcements, and public safety information.
                            </p>
                            <a
                                href="https://twitter.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                @em_urgency
                            </a>
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="contactBox">
                            <img src={facebook} alt="Facebook" />
                            <h4>Facebook</h4>
                            <p>
                                Stay connected and engage with community-related updates.
                            </p>
                            <a
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                em_urgency
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ContactUs;