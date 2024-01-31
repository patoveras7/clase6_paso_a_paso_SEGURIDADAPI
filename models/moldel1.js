const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/empresa", { 
useUnifiedTopology: true,
useNewUrlParser: true,
});

const libroSchema = new mongoose.Schema({ 
titulo: String,
genero: String,
paginas: Number
});

const libro = mongoose.model("libros", libroSchema);

module.exports = libro;