import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './BookSearch'
import BookList from './BookList'
import { Route } from 'react-router'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(updateResult => {
      this.setState((state) => ({
        books: this.mergeUpdate(state.books, updateResult)
      }))
    })
  }

  searchBooks = (query) => {
    console.log('Search for ' + query)
  }

  mergeUpdate(books, updateResult) {
    let bookIdsToShelf = this.mapBookIdsToShelf(updateResult);
    let merged = books.reduce((updatedBooks, book) => {
      if (!(book.id in bookIdsToShelf)) {
        // book was removed
        return updatedBooks;
      }
      book.shelf = bookIdsToShelf[book.id];
      updatedBooks.push(book);
      delete bookIdsToShelf[book.id]
      return updatedBooks;
    }, []);

    // todo add newly added books

    return merged
  }

  mapBookIdsToShelf(updateResult) {
    let bookIdsToShelf = {};
    for (let shelf in updateResult) {
      let bookIds = updateResult[shelf];
      for (let i in bookIds)
        bookIdsToShelf[bookIds[i]] = shelf;
    }
    return bookIdsToShelf;
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList
            books={this.state.books}
            onMoveBook={this.moveBook}
          />
        )} />
        <Route exact path="/search" render={() => (
          <BookSearch 
            books={this.state.searchBooks}
            onQueryChanged={this.searchBooks}
            onMoveBook={this.moveBook}
          />
        )
        } />
      </div>
    )
  }
}

export default BooksApp


