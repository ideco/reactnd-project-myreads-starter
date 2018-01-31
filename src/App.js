import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './BookSearch'
import BookList from './BookList'
import { Route } from 'react-router'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      console.log(books)
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList
            books={this.state.books}
            onMoveBook={this.state.moveBook}
          />
        )} />
        <Route exact path="/search" component={BookSearch} />
      </div>
    )
  }
}

export default BooksApp
