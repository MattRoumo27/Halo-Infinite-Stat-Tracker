import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div className="container">
            <h4 className="m-5 d-flex justify-content-center">
                Welcome to the Unofficial Halo Infinite Integration
            </h4>

            <p className="m-5 d-flex justify-content-center">
                Check out recent news articles and player stats!
            </p>
        </div>
    );
  }
}
