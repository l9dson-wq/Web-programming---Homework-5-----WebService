const express = require('express');
const app = express();

app.use(express.json());

const students = [
    {id: 1, nombre: 'Jorge', apellido: 'Garnizo', telefono: 8292065868},
    {id: 2, nombre: 'Mariana', apellido: 'lopera', telefono: 8264574512},
    {id: 3, nombre: 'Antonio', apellido: 'lopez', telefono: 8092227777}
]

app.get('/', (req, res) => {
    res.send('Node JS api');
});

app.get('/api/students', (req, res) => {
    res.send(students);
} );

app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id) );
    if ( !student ) return res.status(404).send(' Estudiante no encontrado ');
    else res.send( student );
} );

app.post('/api/students', (req, res) => {
    const student = {
        id: students.length + 1, 
        nombre: req.body.nombre, 
        apellido: req.body.apellido,
        telefono: req.body.telefono
    };

    students.push(student);
    res.send(student);
});


app.delete('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id) )
    if ( !students ) return res.status( 404 ).send(' Estudiante no encontrado ')
    
    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student);
} );

const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`) );