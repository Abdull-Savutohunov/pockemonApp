const $wrapper = document.querySelector('.wrapper');
const $container = document.querySelector('.container');
const back = document.querySelector('.back')
const $next = document.querySelector('.next');
const $prev = document.querySelector('.prev');
const $currentPage = document.querySelector('.currentPage');
const $allPages = document.querySelector('.allPages');

const $pageInput = document.querySelector('.pageInput');
const $inputButton = document.querySelector('.inputButton');

const BASE_URL = 'https://pokeapi.co/api/v2/'

const LIMIT = 20

const ALL_POKEMONS = 1126
const ALL_PAGES = Math.floor(ALL_POKEMONS / LIMIT)

let offsetCounter = 0
let currentPage = 1

let selectPage = 1

window.addEventListener('load' , () => {
    getData(`${BASE_URL}pokemon` , `limit=${LIMIT}&offset=${offsetCounter}offsetCounter` , cb => {
        cardTeplate(cb.results )
    })
})

function getData(url , query , callBack){
    fetch(`${url}?${query}`)
    .then(res => res.json())
    .then(response => {
        callBack(response)
    })
}

function cardTeplate(base){
    const markur = base.map(({name ,  url}) => `
        <div class="card" onclick="getSingleData('${url}')">
            ${name}
        </div>
    `).join('')
    $wrapper.innerHTML = markur 
}

function getSingleData(url){
    getData(url , '' , cb => {
        console.log(cb);
       $container.innerHTML = `
        <div class="single">
            <div class="signleWrapper">
                <img src="${cb.sprites.other.dream_world.front_default}" alt="pokemonImage">

                <ul class="">
                    <li>
                        Name: <span>${cb.name}</span>
                    </li>
                    <li>
                        Weight: <span>${cb.weight}</span>
                    </li>
                    <li>
                        Height: <span>${cb.height}</span>
                    </li>
                    <li>
                        NUmber: <span>${cb.number}</span>
                    </li>
                    <li>
                        Type: <span>${cb.type}</span>
                    </li>
                </ul>
            </div>
            <button class="back" onclick="goBack()">Go Back</button>
        </div>
       `
    })
}

function goBack(){
    window.location.reload()
}

window.addEventListener('load' , () => {
    $allPages.innerHTML = ALL_PAGES
    $currentPage.innerHTML = currentPage

    $prev.setAttribute('disabled' , true)
})

$next.addEventListener('click', e => {
    e.preventDefault()

    offsetCounter += LIMIT
    currentPage++

    if(currentPage === ALL_PAGES){
        $next.setAttribute('disabled' , true)
    }

    changePage()

    $prev.removeAttribute('disabled' , true)

    getData(`${BASE_URL}pokemon` , `limit${LIMIT}&offset=${offsetCounter}`, cb => {
        cardTeplate(cb.results)
    })
})

$prev.addEventListener('click' , e => {
    e.preventDefault()

    offsetCounter -= LIMIT
    currentPage--

    changePage()

    if(currentPage === 1){
        $prev.setAttribute('disabled' , true)
    }

    $next.removeAttribute('disabled')

    getData(`${BASE_URL}pokemon` , `limit=${LIMIT}&offset=${offsetCounter}` , cb => {
        cardTeplate(cb.results)
    })
})

function changePage(){
    $currentPage.innerHTML = currentPage
}

$pageInput.addEventListener('change' , e => {
    selectPage = e.target.value
})

$inputButton.addEventListener('click' , e => {
    e.preventDefault()

    if(selectPage.trim() > ALL_PAGES || selectPage.trim() < 1 || selectPage.trim() === currentPage){
        alert('ведите корректную страницу!')

        $pageInput.value = ''
    }else{
        const selectedOffset = selectPage.trim() * LIMIT - LIMIT

        offsetCounter =  selectedOffset

        currentPage = selectPage.trim()

        $currentPage.innerHTML = selectPage.trim() 

        if(selectPage.trim() !== 1){
            $prev.removeAttribute('disabled')
        }else{
            $prev.setAttribute('disabled' , true)
        }

        if(selectPage.trim() !== ALL_PAGES){
            $next.removeAttribute('disabled')
        }else{
            $next.setAttribute('disabled' , true)
        }

        $pageInput.value = ''

        getData(`${BASE_URL}pokemon`, `limit=${LIMIT}&offset=${selectedOffset}`, cb => {
            cardTeplate(cb.results)
        })
    }
})

back.addEventListener('click', e => {
    e.preventDefault()

    window.open('./auth.html', '_self')
})
