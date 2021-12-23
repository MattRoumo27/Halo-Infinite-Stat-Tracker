import React, { Component } from 'react';

export class Appearance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            appearance: {}
        }

        this.searchForRecord();
    }

    searchForRecord() {
        fetch(window.apiUrl + `appearance/?gamertag=${this.props.gamertag}`)
            .then(response => response.json())
            .then(appearanceJson => {
                this.setState({ appearance: appearanceJson.data });
            });
    }

    render() {
        const { appearance } = this.state;
        return (
            <div className="card h-100" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h2 className="card-title">{this.props.gamertag}</h2>
                    <h3 className="card-subtitle mb-2 text-muted">{appearance.service_tag}</h3>
                    <img className="card-img-top" src={appearance.emblem_url} alt="emblem" />
                </div>
            </div>
        );
    }
}