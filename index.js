const express = require('express');
const path = require('path');
const app = express();
const port = 7000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'src/views'));

app.use("/assets", express.static(path.join(__dirname, 'src/assets')));
app.use(express.urlencoded({ extended: false }));

let data = [
    {
        title: "Title 1",
        content: "Content 1"
    },
    {
        title: "Title 2",
        content: "Content 2"
    },
    {
        title: "Title 3",
        content: "Content 3"
    }
];

app.get('/', home);
app.get('/contact', contact);
app.get('/My-Project', MyProject);
app.get('/add-My-Project', addMyProjectView);
app.post('/add-My-Project', addMyProject);

app.get('/My-Project-detail/:id', MyProjectDetail);
app.get('/testimonial', testimonial);

app.get('/update-My-project/:id', updateMyProjectView);
app.post('/update-My-Project/:id', updateMyProject);

app.get('/delete-My-Project/:id', deleteMyProject);

function home(req, res) {
    res.render('index');
}

function contact(req, res) {
    res.render('contact');
}

function MyProject(req, res) {
    res.render('My-Project', { data });
}

function addMyProjectView(req, res) {
    res.render('add-My-Project');
}

function addMyProject(req, res) {
    const { title, content } = req.body;

    console.log("Title :", title);
    console.log("Content :", content);

    data.push({ title, content });

    res.redirect('/My-Project');
}

function MyProjectDetail(req, res) {
    const { id } = req.params;

    const projectData = data[id];

    res.render('My-Project-detail', { data: projectData });
}

function updateMyProjectView(req, res) {
    const { id } = req.params;
    const projectData = data[id];

    res.render('update-My-Project', { data: projectData });
}

function updateMyProject(req, res) {
    const { title, content, id } = req.body;

    console.log("Id :", id);
    console.log("Title :", title);
    console.log("Content :", content);

    data[parseInt(id)] = {
        title,
        content,
    };

    res.redirect('/My-Project');
}

function deleteMyProject(req, res) {
    const { id } = req.params;

    data.splice(id, 1);
    res.redirect('/My-Project');
}

function testimonial(req, res) {
    res.render('testimonial');
}

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
