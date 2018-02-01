import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class ErrorPage404 extends Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>Page not found</h1>
                    <p>
                        <Link to="/">Go back</Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default ErrorPage404;