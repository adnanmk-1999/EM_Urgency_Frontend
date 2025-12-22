import React from 'react';
import { Card, Col, Row, Container } from 'react-bootstrap';
import AboutImage from '../../images/aboutUs.png';

import './aboutUs.css';

function AboutUs() {
    return (
        <>
            <div className='textImage'>
                <div className='titleAbout'>
                    <h1>About Us</h1>
                    <div style={{ height: 6, width: '12%', background: "linear-gradient(to right, #FFC0B1 , #ffab99)" }}></div>
                    <h2>
                        Empowering communities with timely emergency information
                    </h2>
                </div>
                <img src={AboutImage} className='img-fluid shadow-4 aboutImage' alt='about'></img>
            </div>

            {/* Content */}
            <Container className="aboutContent">
                {/* Who We Are */}
                <Row>
                    <Col md={12}>
                        <h2 className="sectionTitle">Who We Are</h2>
                        <p className="sectionText">
                            EM-Urgency is a public safety and emergency information platform designed to
                            support communities before, during, and after critical events. The platform
                            brings together emergency alerts, preparedness resources, and response
                            awareness in a single, centralized system to ensure information is clear,
                            accessible, and reliable.
                            <br /><br />
                            Our mission is to ensure that accurate, actionable information reaches people
                            quickly, enabling them to make informed decisions and respond effectively when
                            it matters most. By improving communication and preparedness, EM-Urgency aims
                            to reduce uncertainty, improve coordination, and strengthen community
                            resilience during emergencies.
                        </p>

                        <div className="missionBox">
                            Our mission is to strengthen emergency preparedness and response by
                            making critical information accessible, timely, and easy to act
                            upon — helping communities stay safe when every second counts.
                        </div>
                    </Col>
                </Row>

                <div className="sectionDivider"></div>

                {/* What We Do */}
                <Row className="whatWeDoSection">
                    <Col md={12}>
                        <h2 className="sectionTitle">What We Do</h2>
                    </Col>

                    <Col md={4}>
                        <div className="featureBox">
                            <h4>Emergency Alerts</h4>
                            <p>
                                Deliver timely and reliable alerts during emergencies to ensure people
                                receive critical information without delay. Alerts are designed to provide
                                clear guidance during natural disasters, public safety incidents, and health
                                emergencies, helping individuals take appropriate action when every second
                                counts.
                            </p>
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="featureBox">
                            <h4>Preparedness Resources</h4>
                            <p>
                                Provide practical guidance on emergency planning, preparedness actions, and
                                essential emergency kits to help individuals and families stay ready before
                                disasters occur. These resources focus on reducing risks, improving
                                readiness, and building confidence to respond effectively in emergency
                                situations.
                            </p>
                        </div>
                    </Col>

                    <Col md={4}>
                        <div className="featureBox">
                            <h4>Response Tracking</h4>
                            <p>
                                Enable structured responses that help assess awareness, acknowledgement, and
                                readiness across communities and organizations. By collecting response
                                information in a centralized manner, EM-Urgency supports better coordination,
                                situational awareness, and informed decision-making during emergency
                                situations.
                            </p>
                        </div>
                    </Col>
                </Row>

                <div className="sectionDivider"></div>

                {/* Why EM-Urgency */}
                <Row>
                    <Col md={12}>
                        <div className="whyBox">
                            <h2 className="sectionTitle">Why EM-Urgency</h2>
                            <ul>
                                <li>Public-safety focused design built for real-world emergencies</li>
                                <li>Clear, reliable, and timely communication</li>
                                <li>Centralized access to alerts and preparedness resources</li>
                                <li>Supports informed decision-making under pressure</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AboutUs;