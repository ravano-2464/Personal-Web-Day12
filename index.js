const express = require('express');
const path = require('path');
const app = express();
const port = 7000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'src/views'));

app.use("/assets", express.static(path.join(__dirname, 'src/assets')));
app.use(express.urlencoded({ extended: false }));

let data = [];

app.get('/', home);
app.get('/contact', contact);
app.get('/My-Project', MyProject);
app.get('/add-My-Project', addMyProjectView);
app.post('/add-My-Project', addMyProject);

app.get('/My-Project-detail/:id', MyProjectDetail);
app.get('/testimonial', testimonials);

app.get('/update-My-Project/:id', updateMyProjectView);
app.post('/update-My-Project/:id', updateMyProject);

app.get('/delete-My-Project/:id', deleteMyProject);

function home(req, res) {
    res.render('index');
}

function contact(req, res) {
    res.render('contact');
}

function MyProject(req, res) {
    res.render('My-Project', { data, title: "My Project" });
}

function addMyProjectView(req, res) {
    res.render('add-My-Project');
}

function addMyProject(req, res) {
    const title = req.body.title;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const description = req.body.description;
    const technologies = req.body.technologies;
  
    console.log("Project Name:", title);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("description:", description);
    console.log("technologies", technologies);
  
    data.push({
        title,
        startDate,
        endDate,
        description,
        technologies,
    });

    res.redirect('/My-Project');
}

function MyProjectDetail(req, res) {
    const { id } = req.params;
    const projectDetailsData = data[id];
    res.render('My-Project-detail', { data: projectDetailsData });
}

function testimonials(req, res) {
    res.render('testimonial');
}

function updateMyProjectView(req, res) {
    const { id } = req.params;
    const editProjectData = data[+id];

    // Pastikan editProjectData ada sebelum mencoba mengakses propertinya
    if (editProjectData) {
        editProjectData.id = id;
        res.render('update-My-Project', { data: editProjectData });
    } else {
        // Handle jika data tidak ditemukan, misalnya dengan me-redirect atau menampilkan pesan error
        res.redirect('/My-Project'); // Atau res.render('error') dengan pesan bahwa data tidak ditemukan
    }
}

function updateMyProject(req, res) {
    const { id } = req.params;
    const { title, startDate, endDate, technologies, description } = req.body;
    const technologiesArray = Array.isArray(technologies) ? technologies : [technologies];
e
    if (data[+id]) {
        data[+id] = {
            title,
            startDate,
            endDate,
            technologies: technologiesArray,
            description,
        };

        res.redirect('/My-Project');
    } else {
        res.redirect('/My-Project');
    }
}

function deleteMyProject(req, res) {
    const { id } = req.params;

    data.splice(id, 1);
    res.redirect('/My-Project');
}

app.listen(port, () => {
    console.log(`Server Berjalan Di Port ${port}`);
});
