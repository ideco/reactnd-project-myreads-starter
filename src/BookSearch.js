import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'

export default class BookSearch extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onQueryChanged: PropTypes.func.isRequired,
        onMoveBook: PropTypes.func.isRequired
    }
    render() {
        const { books, onQueryChanged, onMoveBook } = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <DebounceInput
                            debounceTimeout={500}
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => onQueryChanged(event.target.value.trim())}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksGrid
                        books={books}
                        onMoveBook={onMoveBook}
                    />
                </div>
            </div>
        )
    }
}
