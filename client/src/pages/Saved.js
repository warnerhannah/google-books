import React, { Component } from "react";
import API from "../utils/API";
import "./style.css";

class Saved extends Component {
    state = {
        books: []
    }

    deleteBook = (id) => {
        console.log(id)
        API.deleteBook(id)
        .then(res => {
            API.getSaved()
            .then(res => {
                this.setState({ books: res.data })
            })
        })
    }

    componentDidMount() {
        API.getSaved()
            .then(res => {
                this.setState({ books: res.data })
            })
    }

    render() {
        return (
            <div>
                <div className="saved">
                    <h3>Saved</h3>
                    {this.state.books.map(book => (
                        <div className="book">
                            <div className="top">
                                <h3>{book.title}</h3>
                                <div className="button">
                                    <a href={book.link}>View</a>
                                    <button
                                    onClick={() => this.deleteBook(book._id)}
                                    >Delete</button>
                                </div>
                            </div>
                            <p>Written By: {book.authors}</p>
                            <div className="body"> 
                                <img src={book.image} alt="This Book"></img>
                                <p>{book.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    };
}

export default Saved;