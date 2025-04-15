const Note = require('../models/Note')
const sendConfirmationEmail = require('../utils/sendEmail')

exports.createNote = async (req, res) => {
    const {title, description} = req.body;
    try{
        const newNote = new Note({title, description});
        await newNote.save();
        sendConfirmationEmail(newNote);
        res.status(201).json(newNote);
    }catch(err){
        res.status(500).json({message: 'Error creating note', error: err});
    }
};


exports.getNotes = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    try{
        const notes = await Note.find().sort({createdAt: -1}).skip(skip).limit(limit);
        const total = await Note.countDocuments();
        res.json({notes, totalPages: Math.ceil(total / limit), currentPage: page})

        }     catch(err){
            res.status(500).json({message: 'Erropr Fetching notes', error: err});
        }

     
  };

  exports.updateNote = async (req, res) => {
    const{title, description} = req.body
    try{
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title, description},
            {new: true}

        );
        res.json(updatedNote)

    } catch(err){
        res.status(500).json({message: 'Error updating note', error: err});
    }
  };


  exports.deleteNote = async (req, res) => {
    try{
        await Note.findByIdAndDelete(req.params.id);
        res.json({message: 'Note deleted successfully'});
    } catch(err){
        res.status(500).json({message: 'Error deleting note', error: err});
    }
  };
