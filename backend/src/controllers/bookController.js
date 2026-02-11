import Book from "../models/bookModel.js"

export async function getAllBooks(_, res) {
    // console.log("getAllBooks")
    // res.status(200).json("getAllBooks")
    
    try {
        const books = await Book.find().sort({ createdAT: -1})
        res.status(200).json(books)
    } catch (error) {
          console.error("Error in getAllBooks controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function getBookById(req, res) {
    // console.log("getBookById")
    // res.status(200).json("getBookById")
    
    try {
        const book = await Book.findById(req.params.id)
        if(!book) return res.status(404).json({message: "Book not found"})
            res.status(200).json(book)
    } catch (error) {
         console.error("Error in getBookById controller", error)
        res.status(500).json({message: "Internal server error"})
        
    }
}

export async function createBook(req, res) {
    // console.log("createBook")
    // res.status(200).json("createBook")
    try {
        const {title, author, publishYear} = req.body
        if (!title || !author || !publishYear) {
            return res.status(404).json({message: 'All fields are required'})
        }
        const book = new Book({title, author, publishYear})
        const savedBook = await book.save()
        res.status(201).json({savedBook})

    } catch (error) {
        console.error("Error in createBook controller", error)
        res.status(500).json({message: "Internal server error"})
        
    }
}


export async function updateBook(req, res) {
    // console.log("updateBook")
    // res.status(200).json("updateBook")
    try {
        const {title, author, publishYear}= req.body
        const updateBook = await
        Book.findByIdAndUpdate(req.params.id, {title, author, publishYear}, {new : true})
        if(!updateBook) return res.status(404).json({message: "Book not found"})
             res.status(200).json({updateBook})


    } catch (error) {
         console.error("Error in updateBook controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function deleteBook(req, res) {
    // console.log("deleteBook")
    // res.status(200).json("deleteBook")
    
    try {
        const deletedBook = await
        Book.findOneAndDelete(req.params.id)
        if(!deletedBook) return res.status(404).json({message: "Book not found"})
             res.status(200).json({message: "Book Deleted Succesfully"})

    } catch (error) {
        console.error("Error in deleteBook controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}


    