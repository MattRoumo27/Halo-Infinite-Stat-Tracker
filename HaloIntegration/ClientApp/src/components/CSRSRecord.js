import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export class CSRSRecord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            csrs: {}
        }

        this.searchForRecord();
    }

    searchForRecord() {
        fetch(window.apiUrl + `csrs/top-rank/?gamertag=${this.props.gamertag}`)
            .then(response => response.json())
            .then(csrsJson => {
                this.setState({ csrs: csrsJson });
            });
    }

    render() {
        const { csrs } = this.state;
        if (csrs.response) {
            return (
                //<Row className="align-items-center">
                //    <h2> Ranked Stats </h2>
                //    <h4> {csrs.queue} ({csrs.input}) </h4>
                //    <Col xs={2}>
                //        <img src={csrs.response.current.tier_image_url} width="200" height="200" alt="csrsRank" />
                //    </Col>
                //    <Col xs={6}>
                //        <div>
                //            <h3> {csrs.response.current.tier} {csrs.response.current.sub_tier + 1} </h3>
                //            <span> <strong>CSRS Value: </strong>{csrs.response.current.value} </span>
                //        </div>
                //    </Col>

                //    {/*<div className="card" style={{ width: "18rem" }}>*/}
                //    {/*    <div className="card-body">*/}
                //    {/*        <h2 className="card-title">{this.props.gamertag}</h2>*/}
                //    {/*        <h3 className="card-subtitle mb-2 text-muted">{appearance.service_tag}</h3>*/}
                //    {/*        <img className="card-img-top" src={appearance.emblem_url} alt="emblem" />*/}
                //    {/*    </div>*/}
                //    {/*</div>*/}
                //</Row>

                <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h2 className="card-title">{csrs.response.current.tier} {csrs.response.current.sub_tier + 1} </h2>
                        <h5 className="card-subtitle mb-2 text-muted">CSRS: {csrs.response.current.value} ({csrs.queue} {csrs.input})</h5>
                        <img className="card-img-top" src={csrs.response.current.tier_image_url} alt="csrsRank" />
                    </div>
                </div>
            );
        } else {
            return (<> </>);
        }

    }
}