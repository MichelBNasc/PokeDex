
/* =========== Back to top =========== */
const article = document.createElement('article');
document.body.appendChild(article);

const button = document.createElement('button');
button.setAttribute("onclick","backtop();");
button.classList = "scrollTop";
article.appendChild(button);

const img = document.createElement('img');
img.src = "Art/arrow.svg";
img.alt = ".";
button.appendChild(img);

window.addEventListener('scroll', function(){
    let scroll = document.querySelector('.scrollTop')
        scroll.classList.toggle('active', window.scrollY > 450)
})

function backtop() {
       window.scrollTo({
            top: 0,
            behavior: 'smooth'
       }) 
}

/* =========== Dark/Light mode =========== */
const mode = document.createElement("label");
mode.classList = "mode";
mode.setAttribute("for","switch");
document.body.appendChild(mode);

const daynight = document.createElement('img');
daynight.classList = "img";
daynight.src = "Art/daynight.png";
mode.appendChild(daynight);

const input = document.createElement('input');
input.classList = "dark";
input.type = "checkbox";
input.id = "switch";
mode.appendChild(input);

const $card = document.querySelector('html')
const $checkbox = document.querySelector('#switch')

$checkbox.addEventListener('change', function() {
    $card.classList.toggle('dark-mode')
})

/* =========== Tags HTML =========== */
const header = document.createElement("header");
header.setAttribute("name","home");
header.classList = "navbar";
document.body.appendChild(header);

const main = document.createElement("nav");
header.appendChild(main);

const logo = document.createElement("a");
logo.href = "/";
logo.classList = "logo";
main.appendChild(logo);

const mobileMenu = document.createElement("div");
mobileMenu.classList = "mobile-menu";
main.appendChild(mobileMenu);

const line1 = document.createElement("div");
line1.classList = "line1";
mobileMenu.appendChild(line1);

const line2 = document.createElement("div");
line2.classList = "line2";
mobileMenu.appendChild(line2);

const line3 = document.createElement("div");
line3.classList = "line3";
mobileMenu.appendChild(line3);

const navList = document.createElement("ul");
navList.classList = "nav-list";
main.appendChild(navList);

const li1 = document.createElement("li");
navList.appendChild(li1);

const a1 = document.createElement("a");
a1.innerText = "Home",
a1.href = "/";
li1.appendChild(a1);

const li2 = document.createElement("li");
navList.appendChild(li2);

const a2 = document.createElement("a");
a2.innerText = "Pokedex";
a2.href = "/";
li2.appendChild(a2);

const li3 = document.createElement("li");
navList.appendChild(li3);

const a3 = document.createElement("a");
a3.innerText = "Trainer";
a3.href = "/";
li3.appendChild(a3);

const btn = document.createElement("div");
btn.classList = "btn";
document.body.appendChild(btn);

const menu = document.createElement("div");
menu.classList = "container";
document.body.appendChild(menu);

const ul = document.createElement("ul");
ul.setAttribute("data-js","pokedex");
ul.classList = "pokedex";
menu.appendChild(ul);


/* =========== Consumindo API =========== */
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    accumulator += `
                        <li class="card ${elementTypes[0]}">
                        <img class="card-image" alt="${name}"
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"/>
                            <h2 class="card-title">${id}. ${name}</h2>
                            <p class="card-subtitle">${elementTypes.join(' | ')}</p>
                
                        </li>
            `
    return accumulator
}, '')

const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')

    ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)

    

/* =========== Menu-Navbar =========== */
class MobileNavBar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
    }

    animateLinks() {
        this.navLinks.forEach((link) => {
            link.style.animation
                ?(link.style.animation = "")
                :(link.style.animation = 'navLinkFade 0.5s forwards 0.2s');
        });

    }

    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
        this.animateLinks();
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
    }
    init() {
        if (this.mobileMenu){
            this.addClickEvent();
        }
        returnthis;
    }
}

const mobileNavBar = new MobileNavBar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
);

mobileNavBar.init();






