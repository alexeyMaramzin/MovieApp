const API_KEY = "1af89232-a3d7-465a-b7fb-e85cf46b998e";
let currentPage=1;
let API_URL_POPULAR = 
`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${currentPage}`
const moviesE1 = document.querySelector(".movies-container");
const sectionPagination = document.querySelector(".movies-pagination");
let paginationSh = 0;
getMovies(API_URL_POPULAR);

async function getMovies(url){
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY
        },
    });
    const respData = await response.json();
    console.log(respData);
    showMovies(respData);
    if(paginationSh===0) showPagination(respData);
}

function showMovies(data){
    data.films.forEach((movie) => {
        const movieE1 = document.createElement("div");
        movieE1.classList.add("movies-grid");
        movieE1.innerHTML = `
            <div class="movies-grid__card">
                <div class="movies-grid__rating movies-grid__${getRatingCollor(movie.rating)}">
                    ${movie.rating}
                </div>
                <img class="movies-grid__card-img" loading="lazy" src="${movie.posterUrlPreview}">
                <h1 class="movies-grid__card-title">
                    ${movie.nameRu}
                </h1>
                <p class="movies-grid__card-genres">
                    ${movie.genres.map((genre) => ` ${genre.genre}`)}
                </p>
            </div>
        `;
        moviesE1.appendChild(movieE1);
    });
}

function getRatingCollor(rate){
    if(rate>=7) return `green`; else
    if(rate<7 && rate>5) return `orange`; else
    if(rate<5 && rate>1) return `red`; else
    if(rate==`null`||rate==null||rate==undefined) return `hide`;
    
}

function showPagination(data){
    paginationSh=1;
    paginationActive=0;
    pages=data.pagesCount;
    const paginationUl = document.createElement("ul");
    paginationUl.classList.add("pagination");
    sectionPagination.appendChild(paginationUl);
    for(let i=1;i<=pages-15;i++){
        const list = document.createElement("li");
        list.classList.add("pagination__item");
        list.innerText = i;
        paginationUl.appendChild(list);
        list.addEventListener('click', ()=>{
            moviesE1.innerHTML='';
            if(paginationActive>0){
                let active = document.querySelector(".pagination__active");
                active.classList.remove("pagination__active");
            }
            list.classList.add("pagination__active");
            paginationActive=1;
            getMovies(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${i}`);
        })
    }
}

let moviesSearch = document.querySelector(".header__search");
let keyword;
moviesSearch.addEventListener('change', ()=>{
    if(moviesSearch.value.length>1){
        keyword=moviesSearch.value;
        let getMovie=
`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${keyword}`
        getByKeyword(getMovie);
    }
    if(moviesSearch.value.length==0){
        moviesE1.innerHTML='';
        paginationSh=0;
        getMovies(API_URL_POPULAR);
    }
})

function showSearchResult(data){
    let pagination = document.querySelector(".pagination")
    pagination.classList.add("hide")
    moviesE1.innerHTML='';
    showMovies(data);
}

async function getByKeyword(url){
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY
        },
    });
    const respData = await response.json();
    console.log(respData);
    showSearchResult(respData);
}








    



