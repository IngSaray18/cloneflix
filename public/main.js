const api = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	headers: {
	  'Content-Type': 'application/json;charset=utf-8',
	},
	params: {
	  'api_key':'36639efff6c82089200e97427b3dd495',
	},
  });

  
  
async function gettvshows(){
	const contenedorTvShow = document.querySelector('#recomendadas');
	contenedorTvShow.innerHTML= '';
	const {data}= await api('/tv/top_rated')
const tvShows = data.results
	//console.log({tvShows})
tvShows.forEach(tvShow => {
	const tvContainer = document.createElement('div')
	tvContainer.classList.add('pelicula')
	const tvImg= document.createElement('img')
	tvImg.setAttribute('alt', tvShow.name);
	tvImg.setAttribute('src' , 'https://image.tmdb.org/t/p/w300' + tvShow.poster_path);

	const link = document.createElement('a');

	link.appendChild(tvImg);
	tvContainer.appendChild(link);
	contenedorTvShow.appendChild(tvContainer);

	

	

});
/*
	<div class="pelicula">
		<a href="#"><img src="https://www.themoviedb.org/t/p/w220_and_h330_face/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg" alt=""></a>
	</div>
*/

deslizar('contenedor-recomendadas','recomendadas', 'recomendadas')
}


async function getUltimosestrenos(){
	const contenedorTvShow = document.querySelector('#ultimos-estrenos');
	contenedorTvShow.innerHTML= '';
	const {data}= await api('/tv/airing_today')
const tvShows = data.results
	console.log({tvShows})
tvShows.forEach(tvShow => {
	const tvContainer = document.createElement('div')
	tvContainer.classList.add('pelicula')
	const tvImg= document.createElement('img')
	tvImg.setAttribute('alt', tvShow.name);
	tvImg.setAttribute('src' , 'https://image.tmdb.org/t/p/w300' + tvShow.poster_path);

	const link = document.createElement('a');

	link.appendChild(tvImg);
	tvContainer.appendChild(link);
	contenedorTvShow.appendChild(tvContainer);
});
deslizar('contenedor-estrenos','estrenos','estrenos');
}



async function getDiscoverTv(int){
	const seriePrincipal = document.querySelector('#serie-principal');

	const {data}= await api('/discover/tv');
	const discoverShows = data.results;

	const title = document.querySelector('.titulo')
	title.innerHTML = discoverShows[int].name
	
	const description = document.querySelector('.descripcion');

	description.innerHTML= discoverShows[int].overview
	const movieImgUrl =  'https://image.tmdb.org/t/p/original' + discoverShows[int].backdrop_path;
	//console.log(discoverShows)
	seriePrincipal.style.background = ` linear-gradient(rgba(0, 0, 0, .50) 0%, rgba(0,0,0,.50) 100%), 
    url(${movieImgUrl})
  `;
 // seriePrincipal.style.backgroundposition ='center, center'
  seriePrincipal.style.backgroundSize = 'cover'
 
}


async function getPopulars(){
	const contenedorTvShow = document.querySelector('#populares');
	contenedorTvShow.innerHTML= '';
	const {data}= await api('/tv/popular')
const tvShows = data.results
	console.log({tvShows})
tvShows.forEach(tvShow => {
	const tvContainer = document.createElement('div')
	tvContainer.classList.add('pelicula')
	const tvImg= document.createElement('img')
	tvImg.setAttribute('alt', tvShow.name);
	tvImg.setAttribute('src' , 'https://image.tmdb.org/t/p/w300' + tvShow.poster_path);

	const link = document.createElement('a');

	link.appendChild(tvImg);
	tvContainer.appendChild(link);
	contenedorTvShow.appendChild(tvContainer);
});
deslizar('contenedor-populares','populares','populares');
}




function getRandom(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
  }


  function  deslizar(idFila, idflechaDerecha,idflechaIzquierda){
	const fila = document.getElementById(idFila);
	const flechaDerecha = document.getElementById('flecha-derecha-' + idflechaDerecha);
	const flechaIzquierda = document.getElementById('flecha-izquierda-' + idflechaIzquierda);


	flechaDerecha.addEventListener('click',() =>{
		fila.scrollLeft += fila.offsetWidth;
		console.log('hola')
	
	})
	
	flechaIzquierda.addEventListener('click',() =>{
		fila.scrollLeft -= fila.offsetWidth;
		console.log('hola')
	
	})
	


  }



const peliculas = document.querySelectorAll('.pelicula');
const paginas = Math.ceil( peliculas.length/5);





for (let i = 0; i < paginas; i++) {
    const indicador = document.createElement('button');

    if(i === 0){
		indicador.classList.add('activo');
	}

    document.querySelector('.indicadores').appendChild(indicador);
    indicador.addEventListener('click', (e) => {
		fila.scrollLeft = i * fila.offsetWidth;

		document.querySelector('.indicadores .activo').classList.remove('activo');
		e.target.classList.add('activo');
	});

}



gettvshows();
getDiscoverTv(getRandom(0,19));
getUltimosestrenos();
getPopulars();