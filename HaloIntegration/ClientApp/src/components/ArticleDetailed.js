import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export class ArticleDetailed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            article: {}
        };
        this.makeRequestForArticleInformation();
    }

    makeRequestForArticleInformation() {
        fetch(window.apiUrl + `article/${this.props.articleId}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ article: data })
            });
    }

    render() {
        const { article } = this.state;
        return (
            <div className="container">
                <h3 className="m-3 d-flex justify-content-center">
                    {article.title}
                </h3>

                <Row className="d-flex justify-content-center">
                    <Col>
                        <img src={article.image_url} alt="article_image" />
                    </Col>
                </Row>
                <br />
                <p> {article.message} </p>
            </div>
        )
    }
}