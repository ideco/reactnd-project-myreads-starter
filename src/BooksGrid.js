import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
export default class BooksGrid extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    }
    render() {
        const { books, onMoveBook } = this.props
        return (
            <div>
                <ol className="books-grid">
                    {books.map((book) =>
                        <li key={book.id}>
                            <Book 
                                book={book}
                                onMoveBook={onMoveBook}
                            />
                        </li>
                    )}

                </ol>
            </div>
        )
    }
}
