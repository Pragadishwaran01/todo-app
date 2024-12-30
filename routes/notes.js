const express = require('express');
const Note = require('../models/Note');
const router = express.Router();
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);
    
    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.userId = decoded.id;
        next();
    });
};

// Create Note
router.post('/', verifyToken, async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content,
        userId: req.userId,
    });
    
    await note.save();
    res.status(201).json(note);
});

// Get All Notes
router.get('/', verifyToken, async (req, res) => {
    const notes = await Note.find({ userId: req.userId });
    res.json(notes);
});

// Update Note
router.put('/:id', verifyToken, async (req, res) => {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(note);
});

// Delete Note
router.delete('/:id', verifyToken, async (req, res) => {
    await Note.findByIdAndRemove(req.params.id);
    res.sendStatus(204);
});

module.exports = router;
