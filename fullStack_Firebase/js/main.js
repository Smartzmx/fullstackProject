// Pasos para levantar la conexion a la base de datos de Firebase

// Clave de API web
const apiKey = 'AIzaSyDOCzrEl7CYbUSjAaVwGdKnlskH2GLFeQM';
// ID del proyecto
const projectId='p-school';
const collection = 'users';

firebase.initializeApp({
    apiKey,
    projectId
});

var db = firebase.firestore();

// genero la funcion getUsers
// declaro una promesa.-  db.collection(collection).get()
// espero resultado de la promesa que se guarda en la variable response
// y hago un ciclo de foreach debido a que mis datos son un arreglo al cual puedo iterar

const getUsers = () => {
    // db.collection(collection).get().then((response) => { SIN FILTRO
    // db.collection(collection).where("age",">",24).get().then((response) => { ANEXANDO EL METODO WHERE PARA FILTRAR
    // db.collection(collection).where("startDate",">",newDate()).get().then((response) => {
    db.collection(collection).get().then((response) => {
        response.forEach((doc) => {
            console.log(doc.id);
            console.log(doc.data())
        });
    });
};

// getUsers();

// const getUsers = () => {
// let date = new Date()
        
//     db.collection(collection)
//         .where("date", ">", new Date(date.getFullYear(),date.getMonth(),date.getDay(),00,00,00))
//         .get().then((response) => {
//             response.forEach((doc) => {
//                 console.log(doc.id);
//                 console.log(doc.data());
//             });
//     });
// };

// Creando la funcion de manera más generica
// getCollection = (collection) => {
//     db.collection(collection).get().then((response) => {
//         response.forEach((doc) => {
//             console.log(doc.id);
//             console.log(doc.data())
//         });
//     });
// }

// getCollection('users');


// Declaro la funcion de add user
const addUser = () => {

    // Form Validation

    if(document.getElementById('fullNameInput').value === '' ||
    document.getElementById('emailInput').value === '' ||
    document.getElementById('passwordInput').value === ''
    ){
        alert('Todos los campos son obligatorios')
        return
    } 
    
    if (!ValidateEmail(document.getElementById('emailInput').value)){
        alert('El email capturado no es valido')
        return
    } 

    if (document.getElementById('passwordInput').value !== document.getElementById('confirmPasswordInput').value){
        alert('Error en la validación de passwords')
        return
    }

    //Declaro las variables para tomar los valores de cada input
    let fullNameValue = document.getElementById('fullNameInput').value;
    let emailValue = document.getElementById('emailInput').value;
    let passwordValue = document.getElementById('passwordInput').value;
    let userTypeValue = document.querySelector('input[name="userTypeInput"]:checked').value;
   
    // console.log(fullNameValue, emailValue, passwordValue, userTypeValue)
    // llamo a la base de datos en este caso para agregar la información
    db.collection("users").add({
      fullName: fullNameValue,
      email: emailValue,
      password: passwordValue,
      userType: userTypeValue
    })
    .then(function(response) {
        alert(`Usuario ${fullNameValue}, registrado correctamente`);
        getUsers()
    })
    .catch(function(error) {
        alert("Error: ", error);
    });
    clearForm()
};

const clearForm = () =>{
  
    document.getElementById('fullNameInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('passwordInput').value = '';
    document.getElementById('confirmPasswordInput').value = '';
    if( document.querySelector('input[name="userTypeInput"]').value === 'Parent'){
        document.querySelector('input[name="userTypeInput"]:checked') === 'Teacher'
    }
}

const ValidateEmail = (email) =>{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
        return (true)
    }
        return (false)
}


//Declaro la funcion para actualizar o editar datos
const updateUser = (userId, name, lastName, age, address) => {
    db.collection(collection).doc(userId).set({
        name: name,
        lastName: lastName,
        age: age,
        address: address,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
    }, { merge: true })
};

// la variable merge como true solo actualiza los datos y si lo colocas como false reempaza todos campos y los coloca con los nuevos
// updateUser('YG5w0NOaHXm5V3MKJokj', 'Juan', 'Suarez', '35', 'Zapopan')

// Funcion para trabajar con arreglos
// si el segundo parametro es false lo va a agregar y si es true lo va a eliminar
const phones = (userId, remove, item) => {
    const user = db.collection('users').doc(userId)

    if(remove){
        user.update({
            phones: firebase.firestore.FieldValue.arrayRemove(item)
        });
    } else {
        user.update({
            phones: firebase.firestore.FieldValue.arrayUnion(item)
        });
    };
};

// phones('YG5w0NOaHXm5V3MKJokj', false, '3312915920');


// Funcion para eliminar un campo
const removeAddres = (userId) => {
    const user = db.collection(collection).doc(userId);
    user.update({
        address: firebase.firestore.FieldValue.delete()
    });
};

// removeAddres('YG5w0NOaHXm5V3MKJokj');

const removeUser = (userId) => {
    db.collection('users').doc(userId).delete()
};

// removeUser('YG5w0NOaHXm5V3MKJokj');