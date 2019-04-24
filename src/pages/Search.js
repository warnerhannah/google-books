import React, { Component } from "react";
import "./style.css";
import API from "../utils/API";
// import { resolve } from "dns";

class Search extends Component {
    state = {
        books: []
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleFormSubmit() {
        API.searchBook()
        .then(res => {
            this.setState({ books: res.data })
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
                            name="Search"
                            placeholder="Title"
                            value={this.state.title}
                            onChange={this.handleInputchange}>
                        </input>
                        <button
                            onClick={this.handleFormSubmit}>
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
                                <h3>{book.title}</h3>
                                <div className="button">
                                    <a href={book.link}>View</a>
                                    <a href="/api/books/:id">Save</a>
                                </div>
                            </div>
                            <p>Written By: {book.authors}</p>
                            <div className="body">
                                <img src={book.image} alt="Book"></img>
                                <p>{book.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    };
}

export default Search;