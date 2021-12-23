import React, { Component } from 'react';

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