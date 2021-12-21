import React, { Component } from 'react';
import { Home } from './components/Home';
import { Article } from './components/Article';
import { ArticleDetailed } from './components/ArticleDetailed';
import { ServiceRecord } from './components/ServiceRecord';
import banner from './Photos/Banner.jpg';

import { NavMenu } from './components/NavMenu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './custom.css'

window.apiUrl = 'https://localhost:7195/api/';

export default class App extends Component {
    static displayName = App.name;

    renderArticle(routerProps) {
        console.log(routerProps);
        let articleId = routerProps.match.params.id;
        return <ArticleDetailed articleId={articleId} />
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <h1 className="m-3 d-flex justify-content-center">
                        Halo Infinite Integration
                    </h1>

                    <NavMenu />

                    <div className="m-3 d-flex justify-content-center">
                        <img src={banner} alt="banner" width="1000" />
                    </div>

                    <Switch>
                        <Route path='/' component={Home} exact />
                        <Route path='/articles' component={Article} />
                        <Route path='/article/:id' render={routerProps => this.renderArticle(routerProps)} />
                        <Route path='/service-record' component={ServiceRecord} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
