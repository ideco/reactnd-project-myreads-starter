import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './BookSearch'
import BookList from './BookList'
import ErrorPage404 from './ErrorPage404'
import { Switch, Route } from 'react-router'


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
    if (!query) {
      this.setState({ searchBooks: [] })
      return
    }
    BooksAPI.search(query).then(foundBooks => {
      if (!foundBooks || foundBooks.error) {
        this.setState({ searchBooks: [] })
        return
      }
      this.setState((state) => ({
        searchBooks: foundBooks.map(book => {
          book.shelf = this.findShelf(book, state.books)
          return book
        })
      }))
    })
  }

  findShelf(searchBook, books) {
    let bookWithShelf = books.find(book => book.id === searchBook.id)
    if (bookWithShelf && bookWithShelf.shelf) {
      return bookWithShelf.shelf
    }
    return 'none'
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

    for (let bookId in bookIdsToShelf) {
      BooksAPI.get(bookId).then((book) => this.setState(state => ({
        books: state.books.concat([book])
      })))
    }

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
        <Switch>
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
          <Route component={ErrorPage404}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp


