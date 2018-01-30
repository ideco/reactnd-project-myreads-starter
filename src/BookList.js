import React, { Component } from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class BookList extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    }
    render() {
        const { books } = this.props
        let booksCurrentlyReading = books.filter((book) => book.shelf === 'currentlyReading')
        let booksWantToRead = books.filter((book) => book.shelf === 'wantToRead')
        let booksRead = books.filter((book) => book.shelf === 'read')
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <BookShelf
                        title="Currently Reading"
                        books={booksCurrentlyReading}
                    />
                    <BookShelf
                        title="Want To Read"
                        books={booksWantToRead}
                    />
                    <BookShelf
                        title="Read"
                        books={booksRead}
                    />
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}
