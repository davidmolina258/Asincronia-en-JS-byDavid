// Super importante saber utilizar y entender funciones anonimas autoejecutables
const persona = {
  nombre: "david",
  edad: 29,
};
((obj) => {
  console.log(`hola soy ${obj.nombre} y tengo ${obj.edad} años`);
})(persona);
//++++++++++++++++++++++++++++++++++++++++++++ Funciones asincronas
// son funciones que reciben como parametro otra funcion
function cuadrado(valor, fn) {
  setTimeout(() => {
    fn(valor, valor * valor);
  }, Math.random() * 1000);
}

cuadrado(2, (valor, result) => {
  console.log(`comienza callback`);
  console.log(`el cuadrado del numero ${valor} es ${result}`);
  cuadrado(3, (valor, result) => {
    console.log(`el cuadrado del numero ${valor} es ${result}`);
  });
  cuadrado(4, (valor, result) => {
    console.log(`el cuadrado del numero ${valor} es ${result}`);
  });
  cuadrado(5, (valor, result) => {
    console.log(`el cuadrado del numero ${valor} es ${result}`);
  });
});

function saludar(fn) {
  fn(["david", "daniel", "pedro"]);
}

saludar((nombres) => {
  console.log(`hola ${nombres[0]} como estas?`);
});

function correr(nombre, fn) {
  setTimeout(() => {
    fn(nombre);
  }, Math.random() * 1000);
}

correr("david", (nombre) => {
  console.log(`${nombre} corre 2km todos los dias`);
});

function comer(fn) {
  fn("desayuno");
}
comer((desayuno) => {
  console.log(`comiendo... el ${desayuno}`);
});

const Blog = [
  { nombre: "a", id: 1, coment: "lorem ipsum 1" },
  { nombre: "b", id: 2, coment: "lorem ipsum 2" },
  { nombre: "c", id: 3, coment: "lorem ipsum 3" },
];

function getPostById(id, fn) {
  const post = Blog.find((el) => el.id === id);

  if (post) {
    fn(null, post.coment);
  } else {
    console.log(`no se encontro el comentario`);
  }
}

getPostById(1, (error, coment) => {
  if (coment) {
    console.log(coment);
  }
});
// +++++++++++++++++++++++++++++++++++++++++++++++++Promesas
// Las promesas como en la vida real pueden ser ciertas o no, en palabras de progamacion, se puede esperar ejecutar un codigo satisfactoriamente o no con algun error;
// la idea es retorna una promesa que recibe como parametro una parte que ejecuta llamada resolve y una parte de error llamada reject;  tanto resolve como reject (lo que sea que se cree ahi dentro, puede ser un obj) seran recibidos por then() y catch()
// el metodo resolve y reject son estaticos, no necesito instanciar una nueva promesa para usarlos,
function cuadradoPromise(value) {
  if (typeof value !== "number") {
    return Promise.reject(`el valor ingresado no es un numero`);
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        value: value,
        result: value * value,
      });
    }, Math.random() * 1000);
  });
}

cuadradoPromise(2)
  .then((obj) => {
    console.log(`Promesa, el cuadrado de ${obj.value} es ${obj.result}`);
    return cuadradoPromise(3);
  })
  .then((obj) => {
    console.log(`Promesa, el cuadrado de ${obj.value} es ${obj.result}`);
    return cuadradoPromise("4");
  })
  .then((obj) => {
    console.log(`Promesa, el cuadrado de ${obj.value} es ${obj.result}`);
    return cuadradoPromise(5);
  })
  .catch((err) => console.error(err));

// ******************************promesa para tarer un comentario

function getComentarioPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const comentario = Blog.find((el) => el.id === id);
      if (comentario) {
        resolve(comentario);
      } else reject(`no se encontro el comentario con el id ${id}`);
    }, 2000);
  });
}
getComentarioPromise(3)
  .then((comentario) => console.log(comentario))
  .catch((err) => console.log(err));

const findPostById = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const post = Blog.find((el) => el.id === id);
      if (post) {
        resolve(post);
      } else {
        reject(`no se encontro el comentario`);
      }
    }, 3000);
  });

findPostById(2)
  .then((obj) => console.log(obj.coment))
  .catch((err) => console.log(err));
// ********************************************** ASYN AWAIT
// cuando anteponemos la palabra Async a una funcion decimos que es asincrona (una Promesa), es decir tarda en ejecutarse, es por ello que usamos AWAIT, lo que indica que espere a que se resuelva la Promesa, para despues continuar con el codigo.
// dato importante:
//no se usa then y catch, asyn y await es una mejora para invocar nuestra promesa;
//sino que guardamos la respuesta positiva de la promesa en una variable; es recomendable usar la estructura de control try catch

const usuarios = [
  {
    nombre: "carly",
    edad: 25,
    casada: true,
    post: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, voluptates enim? Eius similique exercitationem excepturi quia necessitatibus mollitia! Omnis rem quod eaque itaque tempore aperiam incidunt eveniet, dicta culpa maxime",
    id: 1,
  },
  {
    nombre: "david",
    edad: 29,
    casada: true,
    post: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et animi dolorum, consequatur voluptatem culpa itaque, unde perspiciatis vitae cum, quisquam delectus quidem! Omnis eaque doloremque accusantium fuga cupiditate maiores aliquid",
    id: 2,
  },
  {
    nombre: "franco",
    edad: 6,
    casada: false,
    post: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, iure! Repudiandae voluptate qui maiores tempora error quod, est voluptatibus incidunt veniam vitae quis natus explicabo molestias suscipit voluptatum fuga doloremque",
    id: 3,
  },
];

const obtenerNombre = (id) => {
  if (typeof id !== "number") {
    return Promise.reject(`debes escribir un numero`);
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const nombre_Usuario = usuarios.find((el) => el.id === id);
      if (nombre_Usuario) {
        resolve(nombre_Usuario);
      } else {
        reject(`no se encontro el usuario`);
      }
    }, 5000);
  });
};

// obtenerNombre(2)
//   .then((nom) => console.log(nom.nombre))
//   .catch((err) => console.log(err));

async function buscarNombre(id) {
  try {
    const resp = await obtenerNombre(id);

    console.log(resp.nombre);
  } catch (error) {
    console.log(error);
  }
}

buscarNombre(3);

// ***********************************EJERCICIOS DOM
const d = document;
const familia = [
  {
    nombre: "Carly Felisberto",
    Miembro: "Esposa de David Y Mama de Franco",
    id: 1,
    dicho: "Om mani padme hum",
    img: "/asset/carly.jpg",
  },
  {
    nombre: "Franco",
    Miembro: "Hijo de David y Carly",
    id: 2,
    dicho: "Soy un Carnivoro...",
  },
  {
    nombre: "Pedro",
    Miembro: "Abuelo de Franco",
    id: 3,
    dicho: "Familia que come unida, Permanece Unida",
  },
  {
    nombre: "Rafaela",
    Miembro: "Abuela de Franco",
    id: 4,
    dicho: "Dios me lo bendiga",
  },
  {
    nombre: "Daniel",
    Miembro: "tio de Franco",
    id: 5,
    dicho: "¿donde esta la Chiqui?",
  },
  {
    nombre: "Pedro",
    Miembro: "tio de Franco",
    id: 6,
    dicho: "No sea asi, no sea rata marico,",
  },
];

const getUserPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let id = Math.floor(Math.random() * 10);

      console.log(id);
      let user = familia.find((el) => el.id === id);
      if (user) {
        resolve(user);
      } else {
        reject(`No existe en la base de datos`);
      }
    }, 3000);
  });
};
// getUserPromise()
//   .then((obj) => console.log(obj.nombre))
//   .catch((error) => console.log(error));

const getUser = async () => {
  try {
    loading(true);
    const familiar = await getUserPromise();
    console.log(familiar);
    pintarCard(familiar);
  } catch (error) {
    console.log(error);
  } finally {
    loading(false);
  }
};

// const pintarDom = () => {
//   getUser();
// };
const loading = (estado) => {
  const $spinner = d.querySelector(".container-spiner");
  const $btnContainer = d.querySelector(".cards-container");
  if (estado) {
    $spinner.classList.remove("is-active");
    $btnContainer.style.opacity = "0";
  } else {
    $spinner.classList.add("is-active");
    $btnContainer.style.opacity = "1";
  }
};
const pintarCard = (obj) => {
  const template = d.getElementById("template").content;
  const fragment = d.createDocumentFragment();
  const clone = template.cloneNode(true);
  const cardsContainer = d.querySelector(".cards-container");
  pirmierClick(clone, fragment, cardsContainer);
};
// d.querySelector(".btn").style.display = "auto";

const pirmierClick = (clone, fragment, cardsContainer) => {
  let contadorClick = 0;
  if (contadorClick != 0) {
    cardsContainer.removeChild(fragment);
    h3.textContent = obj.nombre;
    h4.textContent = obj.Miembro;
    h5.textContent = obj.dicho;
    fragment.appendChild(clone);
    cardsContainer.appendChild(fragment);
    contadorClick++;
  } else {
    const h3 = clone.querySelector(".nombre");
    const h4 = clone.querySelector(".who");
    const h5 = clone.querySelector(".lema");
    h3.textContent = obj.nombre;
    h4.textContent = obj.Miembro;
    h5.textContent = obj.dicho;
    fragment.appendChild(clone);
    cardsContainer.appendChild(fragment);
  }
};

d.addEventListener("click", (e) => {
  if (e.target.matches(".btn")) {
    getUser();
  }
});
