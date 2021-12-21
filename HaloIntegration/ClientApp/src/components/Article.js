import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export class Article extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            shouldRedirect: false,
            redirectUrl: null
        };

        this.refreshList();
    }

    refreshList() {
        fetch(window.apiUrl + 'article')
            .then(response => response.json())
            .then(data => {
                this.setState({ articles: data.data });
            });
    }

    render() {
        const { articles } = this.state;
        return (
            <div className="container">
                <Table className="" striped bordered hover size="lg">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map(article =>
                            <tr key={article.title}>
                                <td>{article.title}</td>
                                <td>{article.message}</td>
                                <td>
                                    <Link to={`/article/${article.title.replace(/\s+/g, '').toLowerCase()}`}> Info </Link>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        );
    }
}