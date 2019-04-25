import axios from "axios";

export default {
    getSaved: function () {
        return axios.get("/api/saved")
    },

    saveBook: function (book) {
        return axios.post("/api/saved", (book))
    },

    deleteBook: function (id) {
        return axios.post(`/api/delete/${id}`)
    },

    searchBook: function (search) {
        return (axios.get(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
            .then(function (response) {
                return response.data.items
            })
            .catch(function (error) {
                console.log(error);
            })
        )
    }
};