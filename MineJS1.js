/*
-------------------------------------------
-------------------------------------------
        Funkcija - Karta i Polje
-------------------------------------------
-------------------------------------------
*/
//definicija Karte
function Karta(duzinaXOse, duzinaYOse, polje){
    this.duzinaXOse = duzinaXOse;
    this.duzinaYOse = duzinaYOse;
    this.brojMinaNaKarti;
    this.polje = polje; // Buduci - niz polja na karti
    //Definicija - Jednog minskog polja
    function NovoPolje(xOsa, yOsa){
        this.xOsa = xOsa;
        this.yOsa = yOsa;
        this.mina = false;
        this.brojMinaOkoPolja = 0;
        this.dugme = document.createElement('button');
        this.getMinaState = function (){
            return this.mina;
        }
        this.setMinaState = function(mina){
            this.mina=mina;
        }
    }
    this.brojPoljaNaKarti = function (){
        return duzinaXOse * duzinaYOse;
    }
    this.dodajPolje = function (i,j){
        this.polje.push(new NovoPolje(i,j));
    }
}
/*
-------------------------------------------
-------------------------------------------
                Funkcije 
-------------------------------------------
-------------------------------------------
*/
function inicijalizacija(){
    //incijalizacija dugmcia
let z=0;
for(let i = 0; i < InstancaKarte.duzinaXOse; i++) 
{
    for(let j = 0; j < InstancaKarte.duzinaYOse; j++)
    {
        InstancaKarte.dodajPolje(i,j);
        InstancaKarte.polje[z].dugme.appendChild(document.createTextNode(`[${InstancaKarte.polje[z].xOsa},${InstancaKarte.polje[z].yOsa}]`));
        InstancaKarte.polje[z].dugme.setAttribute('id',z);
        kartaElement.appendChild(InstancaKarte.polje[z].dugme);
        z++;
    }
    kartaElement.appendChild(document.createElement('br'));
}
//Raspored broja mina
InstancaKarte.brojMinaNaKarti = 9;
for(let i = 0; i < InstancaKarte.brojMinaNaKarti; i++) {
        let slucajni = getRandomInt(InstancaKarte.brojPoljaNaKarti());
        if(!InstancaKarte.polje[slucajni].mina)
        {
            console.log(InstancaKarte.polje[slucajni].mina);
        InstancaKarte.polje[slucajni].mina = true;
        }
        else
        i--;
}
//rasporedBrojeva
for(let i = 0; i < InstancaKarte.brojPoljaNaKarti(); i++) {
    for(let j = 0; j < InstancaKarte.brojPoljaNaKarti(); j++)
    {
    if(!InstancaKarte.polje[i].getMinaState()){
        if((InstancaKarte.polje[j].xOsa === InstancaKarte.polje[i].xOsa + 1) && (InstancaKarte.polje[j].yOsa === InstancaKarte.polje[i].yOsa + 1) && InstancaKarte.polje[j].getMinaState())
        InstancaKarte.polje[i].brojMinaOkoPolja++;
        if((InstancaKarte.polje[j].xOsa === InstancaKarte.polje[i].xOsa) && (InstancaKarte.polje[j].yOsa === InstancaKarte.polje[i].yOsa + 1) && InstancaKarte.polje[j].getMinaState())
        InstancaKarte.polje[i].brojMinaOkoPolja++;
        if((InstancaKarte.polje[j].xOsa === InstancaKarte.polje[i].xOsa - 1) && (InstancaKarte.polje[j].yOsa === InstancaKarte.polje[i].yOsa + 1) && InstancaKarte.polje[j].getMinaState())
        InstancaKarte.polje[i].brojMinaOkoPolja++;
        if((InstancaKarte.polje[j].xOsa === InstancaKarte.polje[i].xOsa + 1) && (InstancaKarte.polje[j].yOsa === InstancaKarte.polje[i].yOsa) && InstancaKarte.polje[j].getMinaState())
        InstancaKarte.polje[i].brojMinaOkoPolja++;
        if((InstancaKarte.polje[j].xOsa === InstancaKarte.polje[i].xOsa - 1) && (InstancaKarte.polje[j].yOsa === InstancaKarte.polje[i].yOsa) && InstancaKarte.polje[j].getMinaState())
        InstancaKarte.polje[i].brojMinaOkoPolja++;
        if((InstancaKarte.polje[j].xOsa === InstancaKarte.polje[i].xOsa - 1) && (InstancaKarte.polje[j].yOsa === InstancaKarte.polje[i].yOsa - 1) && InstancaKarte.polje[j].getMinaState())
        InstancaKarte.polje[i].brojMinaOkoPolja++;
        if((InstancaKarte.polje[j].xOsa === InstancaKarte.polje[i].xOsa) && (InstancaKarte.polje[j].yOsa === InstancaKarte.polje[i].yOsa - 1) && InstancaKarte.polje[j].getMinaState())
        InstancaKarte.polje[i].brojMinaOkoPolja++;
        if((InstancaKarte.polje[j].xOsa === InstancaKarte.polje[i].xOsa + 1) && (InstancaKarte.polje[j].yOsa === InstancaKarte.polje[i].yOsa - 1) && InstancaKarte.polje[j].getMinaState())
        InstancaKarte.polje[i].brojMinaOkoPolja++;
        }
        else
        InstancaKarte.polje[i].brojMinaOkoPolja = -1;
    }
}
}
//Funkcija za randomizaciju
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

/*
-------------------------------------------
-------------------------------------------
                Main
-------------------------------------------
-------------------------------------------
*/
const kartaElement = document.querySelector('#karta');
const dugmeStart = document.querySelector('#kreni');
let InstancaKarte = null;
/*
-------------------------------------------
-------------------------------------------
   Upotreba "click" eventa sa funkcijama 
-------------------------------------------
-------------------------------------------
*/
dugmeStart.addEventListener('click', (e) => {
    //Ako je vec ucitana igra brise dugmice
    while (kartaElement.firstChild) {
        kartaElement.removeChild(kartaElement.lastChild);
    }
    //Vuce podatke iz polja i kreira nova polje
    let xOsa = document.getElementById('xOsa').value;
    let yOsa = document.getElementById('yOsa').value;
    InstancaKarte = new Karta(xOsa,yOsa,new Array());
    inicijalizacija(InstancaKarte,9);
});
kartaElement.addEventListener('click', (e) => {
    const provjeraJeLiDugme = e.target.nodeName === 'BUTTON';
    if(!provjeraJeLiDugme)
    return;
    if(InstancaKarte.polje[e.target.id].getMinaState())
    {
        InstancaKarte.polje[e.target.id].dugme.style.backgroundColor = 'red';
        InstancaKarte.polje[e.target.id].dugme.innerText = "\uD83D\uDCA3"; //moze isto i ovaj format code iz hex u U/ "\u{1f600}"
    }
    else
    {
        kalkulacija(InstancaKarte,e.target.id);
    }

});

function kalkulacija(InstancaKarte,broj) {
    InstancaKarte.polje[broj].dugme.innerText = InstancaKarte.polje[broj].brojMinaOkoPolja;
    InstancaKarte.polje[broj].dugme.style.backgroundColor = 'white';
    if(InstancaKarte.polje[broj].brojMinaOkoPolja === 0)
    {
    const nizNula = new Array (InstancaKarte.polje[broj]);
    while(nizNula.length) // Gleda da li za pratecom nulom ima ostalih nula i otvara polja okolo.......
    {
        for(let j = 0; j < InstancaKarte.brojPoljaNaKarti(); j++)
        {
            if(((InstancaKarte.polje[j].xOsa === nizNula[0].xOsa + 1) && (InstancaKarte.polje[j].yOsa === nizNula[0].yOsa + 1)) ||
                ((InstancaKarte.polje[j].xOsa === nizNula[0].xOsa) && (InstancaKarte.polje[j].yOsa === nizNula[0].yOsa + 1)) ||
                ((InstancaKarte.polje[j].xOsa === nizNula[0].xOsa - 1) && (InstancaKarte.polje[j].yOsa === nizNula[0].yOsa + 1)) ||
                ((InstancaKarte.polje[j].xOsa === nizNula[0].xOsa + 1) && (InstancaKarte.polje[j].yOsa === nizNula[0].yOsa)) ||
                ((InstancaKarte.polje[j].xOsa === nizNula[0].xOsa - 1) && (InstancaKarte.polje[j].yOsa === nizNula[0].yOsa)) ||
                ((InstancaKarte.polje[j].xOsa === nizNula[0].xOsa - 1) && (InstancaKarte.polje[j].yOsa === nizNula[0].yOsa - 1)) ||
                ((InstancaKarte.polje[j].xOsa === nizNula[0].xOsa) && (InstancaKarte.polje[j].yOsa === nizNula[0].yOsa - 1)) ||
                ((InstancaKarte.polje[j].xOsa === nizNula[0].xOsa + 1) && (InstancaKarte.polje[j].yOsa === nizNula[0].yOsa - 1)))
                {
                    if(InstancaKarte.polje[j].dugme.innerText.charAt(0) === '[' && nizNula[0].brojMinaOkoPolja === 0)
                    {
                    console.log(InstancaKarte.polje[j].dugme.innerText.charAt(0)); //pregled
                    nizNula.push(InstancaKarte.polje[j]);
                    InstancaKarte.polje[j].dugme.innerText = InstancaKarte.polje[j].brojMinaOkoPolja;
                    InstancaKarte.polje[j].dugme.style.backgroundColor = 'white';
                    }
                }
        }
        nizNula.shift(0);
        console.log(nizNula);//pregled
    }
}
let brojiNepoznataPolja = 0;
for(let j = 0; j < InstancaKarte.brojPoljaNaKarti; j++)
if(InstancaKarte.polje[j].dugme.innerText.charAt(0) === '[')
    brojiNepoznataPolja++;
if(brojiNepoznataPolja === InstancaKarte.brojMinaNaKarti)
{
    console.log("POBJEDA!!!!");
    for(let j = 0; j < InstancaKarte.brojPoljaNaKarti(); j++)
    {
        InstancaKarte.polje[j].dugme.disabled = true;
    }
}
}

