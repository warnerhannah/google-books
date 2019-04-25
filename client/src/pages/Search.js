import React, { Component } from "react";
import "./style.css";
import API from "../utils/API";
// import { resolve } from "dns";

class Search extends Component {
    state = {
        search: "",
        books: []
    }

    saveBook = (book) => {
        API.saveBook(book)
        .then(res => {
            alert("Saved!")
            console.log(res)
        })
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    searchMyBook = (e) => {
        e.preventDefault();

        console.log("search")
        API.searchBook(this.state.search)
        .then(res => {
            console.log("searched")
            this.setState({
                books: res
            })
        })
    }

    render() {
        return (
            <div>
                <div className="saved">
                    <h3 className="left">Search</h3>
                    <h5 className="left">Book</h5>
                    <form>
                        <input
                            name="search"
                            placeholder="Title"
                            onChange={this.handleInputChange}>
                        </input>
                        <button
                            onClick={this.searchMyBook}>
                        Search
                        </button>
                    </form>
                </div>



                {/* SHOW RESULTS */}
                <div className="saved">
                    <h3 className="left">Results</h3>
                    {this.state.books.map(book => (
                        <div className="book">
                            <div className="top">
                                <h3>{book.volumeInfo.title}</h3>
                                <div className="button">
                                    <a href={book.accessInfo.webReaderLink}>View</a>
                                    <button onClick={() => this.saveBook(book)}>Save</button>
                                </div>
                            </div>
                            <p>Written By: {book.volumeInfo.authors[0]}</p>
                            <div className="body">
                                <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book"></img>
                                <p>{book.volumeInfo.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    };
}

export default Search;