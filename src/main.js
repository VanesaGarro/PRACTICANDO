import POTTER from './data/potter/potter.js';
import {
  // eslint-disable-next-line import/named
  agregarNewData, filtrar, searchName, filterPatronus, filterVarita,
} from './data.js';

console.log(filterPatronus(agregarNewData(POTTER)));
console.log(filterVarita(agregarNewData(POTTER)));
const newData = agregarNewData(POTTER);
// START SCREEN-HOME
const mostrarInicio = () => {
  let res = '';
  res += `<video id="video" autoplay muted loop>
     <source src="/imagenes/videofondo.mp4" />
     </video>
    `;
  document.querySelector('#paint-template').innerHTML = res;
};

// CHARACTER SCREEN
const DataforCharacter = (dataPotter) => {
  const template = document.createElement('article');
  template.className = 'template-holder-character';
  template.innerHTML = `
    <div class="card">
    <div class="front">
      <div class="imagenes-casa"><img src=${dataPotter.imagenCasa}></div>
      <h2>${dataPotter.name}</h2>
      <div class ="imagenes"><img src=${dataPotter.image}></div>
      </div>
      <div class="back">
      <p> <label> Specie: ${dataPotter.species}</p>
      <p> <label> Gender: ${dataPotter.gender}</p>
      <p> <label> House: ${dataPotter.house}</p>
      <p> <label> Rol: ${dataPotter.rol}</p>
      <p> <label> Date Of Birth: ${dataPotter.dateOfBirth}</p>
      <p> <label> Actor: ${dataPotter.actor}</p>
      </div>
      </div>
      `;
  return template;
};
// WANDS SCREEN
const DataforWand = (dato) => {
  const template = document.createElement('div');
  template.className = 'template';
  let varitaH = '';
  varitaH = `
            <div class = "box-wands">
            <div class="imagenes"><img src=img/varita.gif></div>
             <label>  ${dato.name}
             <div class = "icono-personajes"> <img src=${dato.image}> </div>
            <button> Madera: ${dato.wood}</button>
            <label> Núcleo :${dato.core}
            <div class="imagenes-nucleo"><img src=${dato.nucleo}></div>
            <label> Longitud: ${dato.length}
            <div class="icono-longitud"><img src=img/longitud.png></div>
            
            </div>
            `;
  template.innerHTML = varitaH;
  return template;
};

// PATRONUS SCREEN
const DataforPatronus = (dataPotter) => {
  const template = document.createElement('div');
  template.className = 'template-contairner-patronus';
  let patronusH = '';
  patronusH = `
      <div class="card-patronus"> 
        <img class="img-patronus" src='${dataPotter.image}'/>
        <h1 id="letter1" >${dataPotter.name}</h1>
        <h1 id="letter1" >-${dataPotter.patronus}-</h1>
        <button class="boton" type='submit'>VER PATRONUS</button> 
        </div>  
        
        `;

  template.innerHTML = patronusH;
  return template;
};


// foreach de personajes
const dataPersonaje = (data) => {
  document.querySelector('#paint-template').innerHTML = '';
  data.forEach((dataPotter) => {
    document.querySelector('#paint-template').appendChild(DataforCharacter(dataPotter));
  });
};
// foreach de patronus
const datapatronus = (data) => {
  document.querySelector('#paint-template').innerHTML = '';
  data.forEach((obj) => {
    document.querySelector('#paint-template').appendChild(DataforPatronus(obj));
  });
};
// foreach de varitas
const dataVarita = (data) => {
  document.querySelector('#paint-template').innerHTML = '';
  data.forEach((obj) => {
    document.querySelector('#paint-template').appendChild(DataforWand(obj));
  });
};
// DO RETURN TO DATA
document.querySelector('#menu-home').addEventListener('click', () => {
  document.querySelector('#input-search').classList.add('ocultar');
  document.querySelector('#rol').classList.add('ocultar');
  document.querySelector('#house').classList.add('ocultar');
  document.gquerySelector('#core').classList.add('ocultar');
  mostrarInicio();
});

document.querySelector('#personajes').addEventListener('click', () => {
  document.querySelector('#input-search').classList.remove('ocultar');
  document.querySelector('#rol').classList.remove('ocultar');
  document.querySelector('#house').classList.remove('ocultar');
  document.querySelector('#core').classList.add('ocultar');
  dataPersonaje(newData);
});
document.querySelector('#rol').addEventListener('change', () => {
  const seleccionarcasa = document.querySelector('#rol').value;
  const muestracasa = filtrar(newData, 'rol', seleccionarcasa);
  dataPersonaje(muestracasa);
});
document.querySelector('#house').addEventListener('change', () => {
  const seleccionarcasa = document.querySelector('#house').value;
  const muestracasa = filtrar(newData, 'house', seleccionarcasa);
  dataPersonaje(muestracasa);
});

document.querySelector('#input-search').addEventListener('input', () => {
  const name = document.getElementById('input-search').value;
  const buscar = searchName(newData, name);
  dataPersonaje(buscar);
});
document.querySelector('#varitas').addEventListener('click', () => {
  document.getElementById('core').classList.remove('ocultar');
  document.getElementById('input-search').classList.add('ocultar');
  document.getElementById('rol').classList.add('ocultar');
  document.getElementById('house').classList.add('ocultar');
  const filtrarVarita = filterVarita(newData);
  dataVarita(filtrarVarita);
});
document.querySelector('#patronus').addEventListener('click', () => {
  document.getElementById('input-search').classList.add('ocultar');
  document.getElementById('rol').classList.add('ocultar');
  document.getElementById('house').classList.add('ocultar');
  document.getElementById('core').classList.add('ocultar');
  const filtrarpatronuss = filterPatronus(newData);
  datapatronus(filtrarpatronuss);
});

document.querySelector('#core').addEventListener('change', () => {
  const seleccionarNucleo = document.querySelector('#core').value;
  const muestracore = filtrar(newData, 'core', seleccionarNucleo);
  dataVarita(muestracore);
});
