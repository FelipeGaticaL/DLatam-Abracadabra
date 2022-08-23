// usamos el express y una instancia de express, mas el modulo path
const express = require("express");
const app = express();
const path = require("path");
// inicializado el servidor
app.listen(3000, () => {
  console.log("El servidor está inicializado en puerto 3000");
});
// generar numero random entre 1 y 4
//const n = Math.floor(Math.random() * (5 - 1)) + 1;
// definir ruta para archivos estaticos que sera en /assets
app.use(express.static(path.join(__dirname + "/assets")));
// usuarios del sistema
const usuarios = [
  "Juan",
  "Jocelyn",
  "Astrid",
  "Maria",
  "Ignacia",
  "Javier",
  "Brian",
];
// Se debe devolver un JSON con un arreglo de nombres alojado en el servidor.
// Consultar http://localhost:3000/abracadabra/usuarios
app.get("/abracadabra/usuarios", function (req, res) {
  //res.send(usuarios); funciona lo retorne como array
  res.send( {usuarios} );
});
// A través de un middleware, verificar que el usuario escrito como parámetro existe en el arreglo
//alojado en el servidor.
//  http://localhost:3000/abracadabra/juego/Juan -- >OK
//  http://localhost:3000/abracadabra/juego/gabriel -> error

app.use("/abracadabra/juego/:usuario", (req, res, next) => {
  const usuario = req.params.usuario;
  console.log("Valor de usuarios: ", usuarios)
  console.log("Valor de usuario buscado: ", usuario);
  usuarios.includes(usuario) ? console.log("Cierto") : console.log("Falso") ;
  // busca en el array u objeto de array
  usuarios.includes(usuario) ? next() : res.redirect("/who.jpeg");
});
// definir ruta de archivos estaticos
app.get("/abracadabra/juego/:usuario", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
  console.log("Ruta publica es: ", __dirname + "/index.html")
  console.log("Valor de res.Sendfile: ",res.sendFile )
});
// consultar a ver si coincide el conejo de numero random generado con uno de los existentes
// req.params.n toma su valor de cada ruta que es enviada desde el front segun sombrero escogido
app.get("/abracadabra/conejo/:n", function (req, res) {
  const n = Math.floor(Math.random() * (5 - 1)) + 1;
  console.log("Valor de n generado random: ",n);
  console.log("Valor de req.params.n : ", req.params.n );
  req.params.n == n
    ? res.redirect("/conejito.jpg")
    : res.redirect("/voldemort.jpg");
});
// middleware para manejar pagina no existente
app.use((req, res) => {
  res.status(404);
  res.send("*** Esta página no existe ***");
});
