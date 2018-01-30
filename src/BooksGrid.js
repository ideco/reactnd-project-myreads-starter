import React, { Component } from 'react'
import Book from './Book'
export default class BooksGrid extends Component {
    render() {
        return (
            <div>
                <ol className="books-grid">
                    <li>
                        <Book />
                    </li>
                </ol>
            </div>
        )
    }
}
