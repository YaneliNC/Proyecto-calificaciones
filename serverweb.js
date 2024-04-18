//MONGO DB 
const express = require ('express');
const mongoose = require ('mongoose');
const cors = require('cors'); // Importa el middleware cors
require("dotenv").config();


//?Configura la aplicacion Express
const app =  express ();
app.use(express.json());
app.use(cors());

//?Conexion de la base de datos de MONGO DB 
mongoose.connect(process.env.MONGODB_URI);    //! <---IMPORTANTEEE
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error de conexion a MongoDB: "));
db.once("open", ()=> {
    console.log("Conectado a la base de datos MongoDB");
});

//? Define el esquema del modelo

//? USUARIOS 
const UsuarioSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Property is required"],
    },
    email: {
      type: String,
      required: [true, "Property is required"],
    },
    password: {
      type: String,
      required: [true, "Property is required"],
    },
    age: {
      type: Number,
      required: [true, "Property is required"],
    },
});

//? CALIFICACIONES 
let califSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "Property is required"],
  },
  materiaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Materia",
    required: [true, "Property is required"],
  },
  calificacion: {
    type: Number,
    required: [true, "Property is required"],
  },
});

//? MATERIA 
const MateriaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Property is required"],
  },
  
});

//? Define el modelo 
const Usuario = mongoose.model("Usuario", UsuarioSchema);
const Calificacion = mongoose.model("Calificaciones", califSchema);
const Materia = mongoose.model("Materia", MateriaSchema);

//USUARIO
//? METODO GET 
app.get( "/Usuarios", async(request, response) => { 
  try{
    const usuarios = await Usuario.find();
    response.json(usuarios);
  }
  catch (error){
    console.error("Error al ontener usuarios:", error);
    response.status(500).json({ error: "Error interno en el servidor"});
  }
} );

//? METODO POST 
app.post('/newusuario', async (request, response) => { 
  try { 
      const data = await Usuario.create(request.body); // Crear un nuevo usuario en la base de datos usando los datos del cuerpo de la solicitud
      return response.send(data); // Enviar los datos del usuario creado como respuesta al cliente
  } 
  catch (error) { 
      console.error('Error al crear usuario:', error); // Muestra el error en la consola 
      response.status(500).json({ error: 'Error interno del servidor' }); // Enviar una respuesta de error al cliente con estado 500 (Internal Server Error)
  }
});

//? METODO PUT 
app.put('/editarusuarios/:id', async (request, response) => { 
  try { 
    const { id } = request.params; // Obtener el ID del usuario 
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, request.body, { new: true }); // Buscar y actualizar el usuario en la base de datos
    response.json(usuarioActualizado); // Enviar los datos actualizados 
  }
   catch (error) { 
    console.error('Error al actualizar:', error); //Error en la consola 
    response.status(500).json({ error: 'Error interno en el servidor' }); // Enviar una respuesta de error
  }
});

//? METODO DELETE 
app.delete('/eliminarusuarios/:id', async (request, response) => {
  try {
    const { id } = request.params;
    await Usuario.findByIdAndDelete(id);
    response.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    response.status(500).json({ error: 'Error interno del servidor' });
  }
});


//CALIFICACIONES 
//? METODO GET 
app.get("/calificaciones", async (request, response) => {
  try {
    const calificaciones = await Calificacion.find();
    // const usuarios = await Usuario.findById(req.params.userId);

    let nuevasCalif = await Promise.all(
      calificaciones.map(async (element) => {
        const userInfo = await Usuario.findById(element.userId);
        const matInfo = await Materia.findById(element.materiaId);
        return {
          userInfo,
          matInfo,
          calificacion: element.calificacion,
          ca_id: element._id,
        };
      })
    );

    response.json(nuevasCalif);
  } catch (error) {
    console.error("Error al obtener Calificaciones:", error);
    response.status(500).json({ error: "Error interno del servidor" });
  }
});

//? METODO POST 
app.post('/newcalificacion', async (request, response) => { 
  try { 
      const data = await Calificacion.create(request.body); // Crear un nuevo usuario en la base de datos usando los datos del cuerpo de la solicitud
      return response.send(data); // Enviar los datos del usuario creado como respuesta al cliente
  } 
  catch (error) { 
      console.error('Error al crear Calificaciones:', error); // Muestra el error en la consola 
      response.status(500).json({ error: 'Error interno del servidor' }); // Enviar una respuesta de error al cliente con estado 500 (Internal Server Error)
  }
});

//? METODO PUT 
app.put('/editarcalificacion/:id', async (request, response) => { 
  try { 
    const { id } = request.params; // Obtener el ID del usuario 
    const caliActualizado = await Calificacion.findByIdAndUpdate(id, request.body, { new: true }); // Buscar y actualizar el usuario en la base de datos
    response.json(caliActualizado); // Enviar los datos actualizados 
  }
   catch (error) { 
    console.error('Error al actualizar:', error); //Error en la consola 
    response.status(500).json({ error: 'Error interno en el servidor' }); // Enviar una respuesta de error
  }
});

//? METODO DELETE 
app.delete('/eliminarcalificacion/:id', async (request, response) => {
  try {
    const { id } = request.params;
    await Calificacion.findByIdAndDelete(id);
    response.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar calificacion:', error);
    response.status(500).json({ error: 'Error interno del servidor' });
  }
});


//MATERIA
//? METODO GET 
app.get( "/materias", async(request, response) => { 
  try{
    const materias = await Materia.find();
    response.json(materias);
  }
  catch (error){
    console.error("Error al ontener Materias:", error);
    response.status(500).json({ error: "Error interno en el servidor"});
  }
} );

//? METODO POST 
app.post('/newmaterias', async (request, response) => { 
  try { 
      const data = await Materia.create(request.body); // Crear un nuevo usuario en la base de datos usando los datos del cuerpo de la solicitud
      return response.send(data); // Enviar los datos del usuario creado como respuesta al cliente
  } 
  catch (error) { 
      console.error('Error al crear Materia:', error); // Muestra el error en la consola 
      response.status(500).json({ error: 'Error interno del servidor' }); // Enviar una respuesta de error al cliente con estado 500 (Internal Server Error)
  }
});

//? METOD O PUT 
app.put('/editarmaterias/:id', async (request, response) => { 
  try { 
    const { id } = request.params; // Obtener el ID del usuario 
    const matActualizado = await Materia.findByIdAndUpdate(id, request.body, { new: true }); // Buscar y actualizar el usuario en la base de datos
    response.json(matActualizado); // Enviar los datos actualizados 
  }
   catch (error) { 
    console.error('Error al actualizar:', error); //Error en la consola 
    response.status(500).json({ error: 'Error interno en el servidor' }); // Enviar una respuesta de error
  }
});

//? METODO DELETE 
app.delete('/eliminarmaterias/:id', async (request, response) => {
  try {
    const { id } = request.params;
    await Materia.findByIdAndDelete(id);
    response.json({ message: 'Materia eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar materia:', error);
    response.status(500).json({ error: 'Error interno del servidor' });
  }
});


// Agregar un nuevo endpoint para la autenticación de usuario
app.post('/login', async (request, response) => {
  const { email, password } = request.body;
  try {
    // Buscar al usuario en la base de datos por correo electrónico y contraseña
    const user = await Usuario.findOne({ email, password });
    if (user) {
      // Si el usuario es encontrado, devolver un código 200 (OK) con el usuario
      return response.status(200).json({ user });
    } else {
      // Si las credenciales son inválidas, devolver un código 401 (Unauthorized)
      return response.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    // Si ocurre un error en el servidor, devolver un código 500 (Internal Server Error)
    console.error('Error al autenticar usuario:', error);
    return response.status(500).json({ error: 'Error interno del servidor' });
  }
});




//? Inicia el servidor 
const PORT = 3000;
app.listen (PORT, () =>
{ 
    console.log('Servidor en funcionamiento en http://localhost:${PORT}');
} );