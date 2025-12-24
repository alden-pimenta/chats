require('dotenv').config();

const express = require('express');
const app = express();
const port = 8081;
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const chat = require("./models/chat.js");


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const mongodb_url =process.env.URL;

async function main() {
    await mongoose.connect(mongodb_url);
}

main()
    .then(() => console.log('Connected successfully to MongoDB'))
    .catch((err) => console.log(' Error connecting to MongoDB:', err));


app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
});


app.get('/', (req, res) => {
    res.send('Server is running correctly');
});


app.get('/chats', async (req, res) => {
    try {
        let chats = await chat.find();
        res.render('index.ejs', { chats });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error loading chats");
    }
});


app.get('/chats/new', (req, res) => {
    res.render('new.ejs');
});


app.post('/chats', async (req, res) => {
    try {
        const { from, to, message } = req.body;

        const newChat = new chat({
            from,
            to,
            message,
            created_at: new Date()
        });

        await newChat.save();
        console.log('New chat saved successfully!');
        res.redirect('/chats');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving new chat");
    }
});

app.get('/chats/:id/edit', async (req, res) => {
    try {
        const { id } = req.params;
        const chat_ = await chat.findById(id);
        res.render('edit.ejs', { chat_ });
    } catch (err) {
        console.error(err);
        res.status(404).send("Chat not found");
    }
});


app.put('/chats/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;

        await chat.findByIdAndUpdate(
            id,
            { message: message },
            { runValidators: true, new: true }
        );

        console.log('Chat updated successfully!');
        res.redirect('/chats');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating chat");
    }
});

app.delete('/chats/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await chat.findByIdAndDelete(id);
        console.log('🗑️ Chat deleted successfully!');
        res.redirect('/chats');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting chat");
    }
});






