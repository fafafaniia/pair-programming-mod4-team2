import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2';

// Obtener __dirname en ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar conexión a la base de datos
const connection = await mysql.createConnection({
  host: "127.0.0.1", 
  port: 3306,
  user: "root",      
  password: "",    
  database: "netflix", 
});
await connection.promise().connect();

// Conectar a la BD
connection.connect((error) => {
  if (error) {
    console.error("Error al conectar a la BD:", error);
  } else {
    console.log("Conectado a la base de datos ✅");
  }
});

// create and config server
const server = express();
server.use(cors());
server.use(express.json());



// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

const fakeMovies = [
    {
      id: 1,
      title: "Wonder Woman",
      genre: "Action",
      image:
        "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/12/gal-gadot-como-wonder-woman-universo-extendido-dc-2895594.jpg?tf=3840x",
      category: "Superhero",
      year: 2017,
      director: "Patty Jenkins",
    },
    {
      id: 2,
      title: "Inception",
      genre: "Science Fiction",
      image:
        "https://m.media-amazon.com/images/S/pv-target-images/e826ebbcc692b4d19059d24125cf23699067ab621c979612fd0ca11ab42a65cb._SX1080_FMjpg_.jpg",
      category: "Thriller",
      year: 2010,
      director: "Christopher Nolan",
    },
  ];

server.get("/movies", (req, res) => {
  res.json({
    success: true,
    movies: fakeMovies
  });
});

// Servidor de archivos estáticos desde 'public-react'
const staticServerPath = path.join(__dirname, "./public-react");
server.use(express.static(staticServerPath));

const movieImagesPath = path.join(__dirname, "./public-movies-images");
server.use("/public-movies-images", express.static(movieImagesPath));
// server.use(express.static(path.join(__dirname, "public-movies-images"))); 




