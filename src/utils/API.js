import axios from "axios";

export default {
    getBooks: function () {
        return axios.get("/api/books")
    },

    addNewBook: function (book) {
        return axios.post("/api/books", (book))
    },

    deleteBook: function(id) {
        return axios.delete("/api/books/:id", (id))
    }
};