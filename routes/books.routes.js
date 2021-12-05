const router = require('express').Router();

const Book = require("../models/Book.model")

router.get('/books/create',(req,res,next)=>{
    res.render('books/books-create')
})

router.get('/books',(req,res,next)=>{
    Book.find()
    .then((allTheBooksFromDB)=>{
        console.log('All books from Db: ',allTheBooksFromDB)
        res.render('books/books-list',{books:allTheBooksFromDB})
    })
    .catch(error=>{
        console.log('Error en getting all the books from db', error)
        next(error)
    })
})

router.post('/books/create',(req,res,next)=>{
    const {title,author,description,rating} = req.body
    Book.create({title,author,description,rating})
    .then(() => res.redirect('/books'))
    .catch(error=>next(error))
})


router.get('/books/:bookId',(req,res,next)=>{
    const {bookId} = req.params
    Book.findById(bookId)
    .then((theBookFromDB => {
        console.log(theBookFromDB)
        res.render('books/book-details', {book:theBookFromDB})
    }))
    .catch(error=>{
        console.log('Error while retrieving ONE book details: ',error)
        next(error)
    })

})


module.exports = router;