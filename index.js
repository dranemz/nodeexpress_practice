const Joi = require('joi');//npm i Joi
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
    
];
app.get('/', (req, res) => {
    res.send('Hello WOrldss');
});

app.get('/api/courses/', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    //const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);//object destructor = result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(courses);
});

app.put('/api/courses/:id', (req, res) => {
    //Look up the course
    //If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the givin ID was not found');

    //Validate
    //If invalid, return 404 - Bad request
    // const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);//object destructor = result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    //Update course
    course.name = req.body.name;
    //Return the updated course
    return res.send(courses);
});

app.delete('/api/courses/:id', (req, res) => {
    //Look up the course
    //Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the givin ID was not found');

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    //Return the same course
    res.send(course);
});




function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}










app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the givin ID was not found');
    res.send(course);
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening of port ${port}`));