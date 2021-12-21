import React, { Component } from 'react';
import { Button, Form, Row, Col, Table } from 'react-bootstrap';
import { Appearance } from './Appearance';

export class ServiceRecord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            record: {},
            gamertag: '',
            isLoadedIn: false,
            loading: false
        };

        this.searchForRecord = this.searchForRecord.bind(this);
    }

    searchForRecord(event) {
        event.preventDefault();
        this.setState({ isLoadedIn: false, loading: true });
        fetch(window.apiUrl + `service-record/?gamertag=${event.target.Gamertag.value}`)
            .then(response => response.json())
            .then(record => {
                this.setState({ record: record.data, gamertag: record.additional.gamertag, isLoadedIn: true, loading: false });
            });
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Col sm={5}>
                        <Form onSubmit={this.searchForRecord}>
                            <Form.Group controlId="Gamertag">
                                <Form.Label>Gamertag</Form.Label>
                                <Form.Control type="text" name="Gamertag" required placeholder="Gamertag" />
                            </Form.Group>
                            <br />
                            <Form.Group>
                                <Button variant="primary" type="submit">
                                    Search For Record
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>

                {this.renderPlayerAppearance()}
                {this.renderPlayerRecord()}
            </div>
        );
    }

    renderPlayerAppearance() {
        if (this.state.isLoadedIn) {
            return (
                <div>
                    <Appearance gamertag={this.state.gamertag} />
                </div>
            )
        }
    }

    renderPlayerRecord() {
        if (this.state.isLoadedIn) {
            const data = this.state.record;
            const core = this.state.record.core;
            const summary = this.state.record.core.summary;
            const shots = this.state.record.core.shots;
            const breakdowns = this.state.record.core.breakdowns;
            const damage = this.state.record.core.damage;
            return (
                <div>
                    <h2> Lifetime Overview </h2>
                    <Table striped bordered hover size="lg">
                        <thead>
                            <tr>
                                <th>Total Matches Played</th>
                                <th>Time Played</th>
                                <th>Win Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data.matches_played}</td>
                                <td>{data.time_played.human}</td>
                                <td>{data.win_rate}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table striped bordered hover size="lg">
                        <thead>
                            <tr>
                                <th>Kills</th>
                                <th>Deaths</th>
                                <th>Assists</th>
                                <th>Betrayals</th>
                                <th>Suicides</th>
                                <th>Vehicles Destroyed</th>
                                <th>Vehicle Hijacks</th>
                                <th>Medals</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{summary.kills}</td>
                                <td>{summary.deaths}</td>
                                <td>{summary.assists}</td>
                                <td>{summary.betrayals}</td>
                                <td>{summary.suicides}</td>
                                <td>{summary.vehicles.destroys}</td>
                                <td>{summary.vehicles.hijacks}</td>
                                <td>{summary.medals}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table striped bordered hover size="lg">
                        <thead>
                            <tr>
                                <th>Damage Taken</th>
                                <th>Damage Dealt</th>
                                <th>Damage Average</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{damage.taken}</td>
                                <td>{damage.dealt}</td>
                                <td>{damage.average}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table striped bordered hover size="lg">
                        <thead>
                            <tr>
                                <th>KDR</th>
                                <th>KDA</th>
                                <th>Total Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{core.kdr}</td>
                                <td>{core.kda}</td>
                                <td>{core.total_score}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table striped bordered hover size="lg">
                        <thead>
                            <tr>
                                <th>Damage Taken</th>
                                <th>Damage Dealt</th>
                                <th>Damage Average</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{damage.taken}</td>
                                <td>{damage.dealt}</td>
                                <td>{damage.average}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table striped bordered hover size="lg">
                        <thead>
                            <tr>
                                <th>Shots Fired</th>
                                <th>Shots Landed</th>
                                <th>Shots Missed</th>
                                <th>Overall Accuracy</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{shots.fired}</td>
                                <td>{shots.landed}</td>
                                <td>{shots.missed}</td>
                                <td>{shots.accuracy}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <h4> Kills Breakdown </h4>
                    <Table striped bordered hover size="lg">
                        <thead>
                            <tr>
                                <th>Melee</th>
                                <th>Grenades</th>
                                <th>Headshots</th>
                                <th>Power Weapons</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{breakdowns.kills.melee}</td>
                                <td>{breakdowns.kills.grenades}</td>
                                <td>{breakdowns.kills.headshots}</td>
                                <td>{breakdowns.kills.power_weapons}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <h4> Assists Breakdown </h4>
                    <Table striped bordered hover size="lg">
                        <thead>
                            <tr>
                                <th>EMP</th>
                                <th>Driver</th>
                                <th>Callouts</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{breakdowns.assists.emp}</td>
                                <td>{breakdowns.assists.driver}</td>
                                <td>{breakdowns.assists.callouts}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <h4> Match Breakdowns </h4>
                    <Table striped bordered hover size="lg">
                        <thead>
                            <tr>
                                <th>Wins</th>
                                <th>Losses</th>
                                <th>Left</th>
                                <th>Draws</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{breakdowns.matches.wins}</td>
                                <td>{breakdowns.matches.losses}</td>
                                <td>{breakdowns.matches.left}</td>
                                <td>{breakdowns.matches.draws}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            )
        } else if (this.state.loading) {
            return (
                <span>
                    <br />
                    Loading...
                </span>
            )
        }
    }

}