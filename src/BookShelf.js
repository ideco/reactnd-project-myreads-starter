import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'

export default class BookShelf extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onMoveBook: PropTypes.func.isRequired
    }
    render() {
        const { title, books, onMoveBook } = this.props
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <BooksGrid
                        books={books}
                        onMoveBook={onMoveBook}
                    />
                </div>
            </div>
        )
    }
}
