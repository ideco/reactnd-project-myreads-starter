import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookSearch from './BookSearch'
import BookList from './BookList'
import { Route } from 'react-router'

class BooksApp extends React.Component {
  state = {
  }

  

  render() {
    return (
      <div className="app">
      <Route exact path="/" component={BookList} />
      <Route exact path="/search" component={BookSearch} />
      </div>
    )
  }
}

export default BooksApp
