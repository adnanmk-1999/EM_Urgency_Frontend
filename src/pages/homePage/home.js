import React from 'react';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';
import './home.css';

import emergencyAlert from '../../images/emergencyAlert.png'
import buildAKit from '../../images/buildAKit.png'
import flooding from '../../images/flooding.png'
import getVaccinated from '../../images/getVaccinated.png'
import makeAPlan from '../../images/makeAPlan.png'
import preparednessVideos from '../../images/preparednessVideos.png'

import Carousel from "../../components/carousel"

function homePage() {
    return (
        <>
            <Carousel />

            <Container>
                <Row>
                    <Col md={12}>
                        <h1 className="welcomeText">Welcome to EM-Urgency</h1>

                        <Card className="welcomeCard">
                            <Card.Body>
                                <Card.Text className="welcomeContent">
                                    EM-Urgency is a public safety platform built to support communities during emergencies.
                                    It provides timely alerts, preparedness guidance, and reliable information to help people
                                    respond effectively to critical situations such as natural disasters, health emergencies,
                                    and public safety threats. By bringing alerts and resources together in one place,
                                    EM-Urgency helps ensure that no vital information is missed when it matters most.
                                </Card.Text>

                                <div style={{ textAlign: "center" }}>
                                    <Button
                                        className="welcomeButton authLikeBtn"
                                        href="/aboutus"
                                    >
                                        Learn More
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Container className='tileContainer'>
                <Row>
                    <Col md={6} >
                        <Card className='tileCard'>
                            <Container>
                                <Row>
                                    <Col xs={4} sm={3} md={3}>
                                        <Card.Img className='tileImage' src={flooding} />
                                    </Col>
                                    <Col xs={8} sm={9} md={9}>
                                        <a href="https://youtu.be/iQuwhR99YdA" target="_blank" rel="noopener noreferrer"><Card.Body className='tileBody'>
                                            <Card.Title className='tileHeading'>Flooding</Card.Title>
                                            <Card.Text className="anchor">
                                                Flooded roads and walkways can be extremely dangerous. If you encounter flooding,
                                                turn around and choose a safer route — your safety comes first.
                                            </Card.Text>
                                        </Card.Body></a>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                    <Col md={6} >
                        <Card className='tileCard'>
                            <Container>
                                <Row>
                                    <Col xs={4} sm={3} md={3}>
                                        <Card.Img className='tileImage' src={preparednessVideos} />
                                    </Col>
                                    <Col xs={8} sm={9} md={9}>
                                        <a href="https://youtu.be/yiXHOBM_cjs" target="_blank" rel="noopener noreferrer"><Card.Body className='tileBody'>
                                            <Card.Title className='tileHeading'>Preparedness Videos</Card.Title>
                                            <Card.Text className='anchor'>
                                                Learn how to prepare for emergencies through trusted preparedness videos and
                                                public service announcements designed to help you act with confidence.
                                            </Card.Text>
                                        </Card.Body></a>
                                    </Col>
                                </Row>

                            </Container>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col md={6} >
                        <Card className='tileCard'>
                            <Container>
                                <Row>
                                    <Col xs={4} sm={3} md={3}>
                                        <Card.Img className='tileImage' src={emergencyAlert} />
                                    </Col>
                                    <Col xs={8} sm={9} md={9}>
                                        <a href="https://youtu.be/9yLd2AjGzYI" target="_blank" rel="noopener noreferrer"><Card.Body className='tileBody'>
                                            <Card.Title className='tileHeading'>Emergency Alerts</Card.Title>
                                            <Card.Text className='anchor'>
                                                Emergency alerts provide timely, life-saving information during critical situations,
                                                helping communities respond quickly and safely to take immediate actions.
                                            </Card.Text>
                                        </Card.Body></a>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                    <Col md={6} >
                        <Card className='tileCard'>
                            <Container>
                                <Row>
                                    <Col xs={4} sm={3} md={3}>
                                        <Card.Img className='tileImage' src={makeAPlan} />
                                    </Col>
                                    <Col xs={8} sm={9} md={9}>
                                        <a href="https://youtu.be/TybjwGLHA88" target="_blank" rel="noopener noreferrer"><Card.Body className='tileBody'>
                                            <Card.Title className='tileHeading'>Make a Plan</Card.Title>
                                            <Card.Text className='anchor'>
                                                Planning ahead can save lives. Create an emergency plan today and practice it
                                                regularly so you know exactly what to do when it matters most.
                                            </Card.Text>
                                        </Card.Body></a>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col md={6} >
                        <Card className='tileCard'>
                            <Container>
                                <Row>
                                    <Col xs={4} sm={3} md={3}>
                                        <Card.Img className='tileImage' src={buildAKit} />
                                    </Col>
                                    <Col xs={8} sm={9} md={9}>
                                        <a href="https://youtu.be/KKN7Ewht1DQ" target="_blank" rel="noopener noreferrer"><Card.Body className='tileBody'>
                                            <Card.Title className='tileHeading'>Build a Kit</Card.Title>
                                            <Card.Text className='anchor'>
                                                A well-prepared emergency kit ensures you have essential supplies when access
                                                to services is limited. Make sure your kit is ready before an emergency occurs.
                                            </Card.Text>
                                        </Card.Body></a>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                    <Col md={6} >
                        <Card className='tileCard'>
                            <Container>
                                <Row>
                                    <Col xs={4} sm={3} md={3}>
                                        <Card.Img className='tileImage' src={getVaccinated} />
                                    </Col>
                                    <Col xs={8} sm={9} md={9}>
                                        <a href="https://youtu.be/uxcb9s0dpJg" target="_blank" rel="noopener noreferrer"><Card.Body className='tileBody'>
                                            <Card.Title className='tileHeading'>Get Vaccinated</Card.Title>
                                            <Card.Text className='anchor'>
                                                Vaccination is a key step in protecting yourself and others during public health
                                                emergencies. Safe and effective vaccines are available to those who need them.
                                            </Card.Text>
                                        </Card.Body></a>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default homePage;