import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
export default class BooksGrid extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    }
    render() {
        const { books } = this.props
        return (
            <div>
                <ol className="books-grid">
                    {books.map((book) =>
                        <li key={book.id}>
                            <Book 
                                book={book}
                            />
                        </li>
                    )}

                </ol>
            </div>
        )
    }
}
