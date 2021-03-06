//Definicija jednog minskog polja
function Polje(xOsa, yOsa){
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
//Funkcija za randomizaciju
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
function kalkulacija(Karta,broj) {
    Karta[broj].dugme.innerText = Karta[broj].brojMinaOkoPolja;
    let indicator = true;
    if(Karta[broj].brojMinaOkoPolja === 0)
    {
    const nizNula = new Array (Karta[broj]);
    while(nizNula.length) // Gleda da li za pratecom nulom ima ostalih nula i otvara polja okolo.......
    {
        for(let j = 0; j < 10 * 10; j++)
        {
            if(((Karta[j].xOsa === nizNula[0].xOsa + 1) && (Karta[j].yOsa === nizNula[0].yOsa + 1)) ||
                ((Karta[j].xOsa === nizNula[0].xOsa) && (Karta[j].yOsa === nizNula[0].yOsa + 1)) ||
                ((Karta[j].xOsa === nizNula[0].xOsa - 1) && (Karta[j].yOsa === nizNula[0].yOsa + 1)) ||
                ((Karta[j].xOsa === nizNula[0].xOsa + 1) && (Karta[j].yOsa === nizNula[0].yOsa)) ||
                ((Karta[j].xOsa === nizNula[0].xOsa - 1) && (Karta[j].yOsa === nizNula[0].yOsa)) ||
                ((Karta[j].xOsa === nizNula[0].xOsa - 1) && (Karta[j].yOsa === nizNula[0].yOsa - 1)) ||
                ((Karta[j].xOsa === nizNula[0].xOsa) && (Karta[j].yOsa === nizNula[0].yOsa - 1)) ||
                ((Karta[j].xOsa === nizNula[0].xOsa + 1) && (Karta[j].yOsa === nizNula[0].yOsa - 1)))
                {
                    if(Karta[j].dugme.innerText.charAt(0) === '[' && nizNula[0].brojMinaOkoPolja === 0)
                    {
                    console.log(Karta[j].dugme.innerText.charAt(0)); //pregled
                    nizNula.push(Karta[j]);
                    Karta[j].dugme.innerText = Karta[j].brojMinaOkoPolja;
                    }
                }
        }
        nizNula.shift(0);
        console.log(nizNula);//pregled
    }
}
}
//Incijalizacija
const kartaElement = document.querySelector('#karta');
const Karta = new Array();
let z=0;
for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++){
        Karta.push(new Polje (i,j));
        Karta[z].dugme.appendChild(document.createTextNode(`[${Karta[z].xOsa},${Karta[z].yOsa}]`));
        Karta[z].dugme.setAttribute('id',z);
        kartaElement.appendChild(Karta[z].dugme);
        z++;
    }
    kartaElement.appendChild(document.createElement('br'));
}
//Raspored broja mina
let brojMina = 9;
for(let i = 0; i < brojMina; i++) {
        let slucajni = getRandomInt(100);
        if(!Karta[slucajni].getMinaState())
        Karta[slucajni].setMinaState(true);
        else
        i--;
}
//rasporedBrojeva
for(let i = 0; i < 10*10; i++) {
    for(let j = 0; j < 10*10; j++)
    {
    if(!Karta[i].getMinaState()){
        if((Karta[j].xOsa === Karta[i].xOsa + 1) && (Karta[j].yOsa === Karta[i].yOsa + 1) && Karta[j].getMinaState())
        Karta[i].brojMinaOkoPolja++;
        if((Karta[j].xOsa === Karta[i].xOsa) && (Karta[j].yOsa === Karta[i].yOsa + 1) && Karta[j].getMinaState())
        Karta[i].brojMinaOkoPolja++;
        if((Karta[j].xOsa === Karta[i].xOsa - 1) && (Karta[j].yOsa === Karta[i].yOsa + 1) && Karta[j].getMinaState())
        Karta[i].brojMinaOkoPolja++;
        if((Karta[j].xOsa === Karta[i].xOsa + 1) && (Karta[j].yOsa === Karta[i].yOsa) && Karta[j].getMinaState())
        Karta[i].brojMinaOkoPolja++;
        if((Karta[j].xOsa === Karta[i].xOsa - 1) && (Karta[j].yOsa === Karta[i].yOsa) && Karta[j].getMinaState())
        Karta[i].brojMinaOkoPolja++;
        if((Karta[j].xOsa === Karta[i].xOsa - 1) && (Karta[j].yOsa === Karta[i].yOsa - 1) && Karta[j].getMinaState())
        Karta[i].brojMinaOkoPolja++;
        if((Karta[j].xOsa === Karta[i].xOsa) && (Karta[j].yOsa === Karta[i].yOsa - 1) && Karta[j].getMinaState())
        Karta[i].brojMinaOkoPolja++;
        if((Karta[j].xOsa === Karta[i].xOsa + 1) && (Karta[j].yOsa === Karta[i].yOsa - 1) && Karta[j].getMinaState())
        Karta[i].brojMinaOkoPolja++;
        }
        else
        Karta[i].brojMinaOkoPolja = -1;
    }
}
//Koristenje eventa da kaze je li mina ili nije
addEventListener('click', (e) => {
    e.preventDefault();
    if(Karta[e.target.id].getMinaState())
        Karta[e.target.id].dugme.innerText = "\uD83D\uDCA3";
    else
    {
        kalkulacija(Karta,e.target.id);
    }

});

console.log(Karta);


