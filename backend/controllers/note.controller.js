import { set } from 'mongoose';
import Note from '../models/note.model.js';

export const createNote = async (req, res) => {
    try{
        const { title, description } = req.body;

        if(!title || !description){
            return res.status(400).json({ message: "Title and description are required" });
        }
        if (title && title.length > 50) {
            return res.status(400).json({ message: "Title must be 50 characters or less" });
        }
        if (description && description.length > 150) {
            return res.status(400).json({ message: "Description must be 150 characters or less" });
        }
        
        const newNote = new Note({title, description});
        await newNote.save();
        
        res.status(201).json({ message: "Note created successfully", note: newNote });
    } catch (error) {

        res.status(500).json({ message: "Error creating note", error: error.message }); 
    }

}

export const getNotes = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const notes = await Note.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalNotes = await Note.countDocuments();

    setTimeout(() => {
      res.status(200).json({
        notes,
        currentPage: page,
        totalPages: Math.ceil(totalNotes / limit),
        totalNotes,
      });
    }, 2000);

  } catch (error) {
    console.error("Error fetching notes:", error);

    res.status(500).json({
      message: "Failed to fetch notes",
      error: error.message,
    });
  }
};
export const updateNote = async(req, res) => {
    try{
        const {title,description} = req.body;

        if (title !== undefined && title.length > 50) {
            return res.status(400).json({ message: "Title must be 50 characters or less" });
        }
        if (description !== undefined && description.length > 150) {
            return res.status(400).json({ message: "Description must be 150 characters or less" });
        }

        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, description}, {new: true});
        if(!updatedNote){
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note updated successfully", note: updatedNote });
    }
        catch(error){
            res.status(500).json({ message: "Error updating note", error: error.message });
        }
}

export const deleteNote = async(req, res)  => {
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if(!deletedNote){
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully", note: deletedNote });
    }
    catch(error){
        res.status(500).json({message: "Error deleting note", error: error.message});
    }
}