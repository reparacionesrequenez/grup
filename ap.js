// CONFIGURACIÓN FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyCLUbc6f6HmkAa3XEHfYeiS2g9HtVmirpU",
  authDomain: "crud-online-ca595.firebaseapp.com",
  projectId: "crud-online-ca595",
  storageBucket: "crud-online-ca595.firebasestorage.app",
  messagingSenderId: "664875061888",
  appId: "1:664875061888:web:53a76a7062c78f7f498c65"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// VARIABLE GLOBAL
let idSeleccionado = null;

// CREATE (Crear)
function crearUsuario() {
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;

  db.collection("usuarios").add({
    nombre: nombre,
    correo: correo
  }).then(() => {
    limpiar();
    leerUsuarios();
  });
}

// READ (Leer)
function leerUsuarios() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  db.collection("usuarios").get().then(snapshot => {
    snapshot.forEach(doc => {
      const data = doc.data();

      lista.innerHTML += `
        <li>
          ${data.nombre} - ${data.correo}
          <button onclick="editarUsuario('${doc.id}', '${data.nombre}', '${data.correo}')">Editar</button>
          <button onclick="eliminarUsuario('${doc.id}')">Eliminar</button>
        </li>
      `;
    });
  });
}

// UPDATE (Actualizar)
function editarUsuario(id, nombre, correo) {
  document.getElementById("nombre").value = nombre;
  document.getElementById("correo").value = correo;
  idSeleccionado = id;
}

function actualizarUsuario() {
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;

  db.collection("usuarios").doc(idSeleccionado).update({
    nombre: nombre,
    correo: correo
  }).then(() => {
    limpiar();
    leerUsuarios();
  });
}

// DELETE (Eliminar)
function eliminarUsuario(id) {
  db.collection("usuarios").doc(id).delete().then(() => {
    leerUsuarios();
  });
}

// LIMPIAR FORMULARIO
function limpiar() {
  document.getElementById("nombre").value = "";
  document.getElementById("correo").value = "";
  idSeleccionado = null;
}

// INICIALIZAR
leerUsuarios();