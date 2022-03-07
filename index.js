const express = require('express');
const app = express()
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')



let comments = [
    {
        id: uuid(),
        username: 'Ted',
        comment: 'Lolo so funny'
    },
    {
        id: uuid(),
        username: 'Jerry',
        comment: 'soo lame'
    },
    {
        id: uuid(),
        username: 'Nancy',
        comment: 'abe haatt'
    },
    {
        id: uuid(),
        username: 'charlie',
        comment: 'Enjoying life'
    }
]



/////////////Displaying all comments//////////////////////
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})


/////////////Adding a new Comment//////////
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
})
///////////////////////////////////////////////
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment });
})


/////////////////////EDIT COMMENT/////////////////
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', { comment });
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = (req.body.comment);
    console.log(newCommentText);
    const findComment = comments.find(c => c.id === id)
    findComment.comment = newCommentText;
    res.redirect('/comments');
})
///////////////////delete//////////////////
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id)
    res.redirect('/comments');
})

app.get('/tacos', (req, res) => {
    res.send('Get /tacos response');
})

app.post('/tacos', (req, res) => {
    const { meat, quantity } = (req.body);
    res.send(`The quantity is ${quantity} for ${meat} tacos`);
})

app.listen(3000, () => {
    console.log("on port 3000")
})