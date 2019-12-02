let sirina = 600;
let visina = 300;
let smjer = 'd';
let kraj = false;
let skor = 0;
var canvas;
let zmija = [{
    x: 50,
    y: 30
}, {
    x: 40,
    y:30
},{x: 30,
    y: 30
}];

window.onload = function() {
    canvas = document.getElementById('myCanvas');
    document.addEventListener('keydown', function(event) {
        let prosliSmjer = smjer;
        if(event.key == "w" ||event.key =="a"||event.key =="s"|| event.key=="d") {
            smjer = event.key;
        }
        let k = event.keyCode;
        if(k === 37) smjer = 'a';
        else if(k === 38) smjer = 'w';
        else if(k === 39) smjer = 'd';
        else if(k === 40) smjer = 's';

        if(suprotniSmjerovi(prosliSmjer,smjer))
        {
            smjer = prosliSmjer;
        }

    }, false);
};
let suprotniSmjerovi = function(smjer1,smjer2){
    if(smjer1 === 'w')
        return smjer2 ==='s';
    else if(smjer1 === 'a')
        return smjer2 ==='d';
    else if(smjer1 === 's')
        return smjer2 ==='w';
    else if(smjer1 === 'd')
        return smjer2 ==='a';
}
let randomHrana = function()
{
    let x = Math.floor((Math.random()*(sirina/10)) );
    let y = Math.floor((Math.random()*(visina/10)) );
    console.log({x: x*10, y: y*10});
    return {x: x*10, y: y*10};
};
let hrana= randomHrana();
let zmijaSebeTakla = function(glava){
    let i;
    for(i = 0; i < zmija.length; i++)
    {
        if(zmija[i].x == glava.x && zmija[i].y == glava.y)
            return true;
    }
    return false;
};
let crtaj = function(ctx, zmija) {

    ctx.fillStyle = "#cdd1ab";
    ctx.fillRect(0,0,sirina,visina);
    ctx.fillStyle= "rgba(53,0,20,0.98)";
    if(kraj)
    {
        ctx.font = "40px Arial";
        ctx.fillText("KRAJ IGRE", 170, 120);
        return;
    }
    let i;
    for(i = 0; i < zmija.length; i++)
    {
        ctx.fillRect(zmija[i].x,zmija[i].y, 10, 10);
    }
    ctx.fillStyle = "#34aa0b";
    ctx.fillRect(hrana.x,hrana.y, 10, 10);
};
let zmijaPojelaHranu = function()
{
    let i;
    for (i = 0; i < zmija.length; i++)
    {
        if(zmija[i].x == hrana.x && zmija[i].y == hrana.y){
            hrana= randomHrana();
            skor+=10;
            document.getElementById("skorHodler").innerHTML = "Poeni: "+ skor;
            return true;
        }

    }
    return false;
};
let pomjeri = function(ctx, zmija,smjer, trebaOstavitiZadnji){

    let zadnji = zmija.pop();

    if(trebaOstavitiZadnji)
        zmija.push(zadnji);
    let glava = zmija[0];
    if(smjer=== 'w')
        zadnji = {x: glava.x,y:glava.y-10};
    else if(smjer ==='a')
        zadnji = {x: glava.x-10,y:glava.y};
    else if(smjer ==='s')
        zadnji = {x: glava.x,y:glava.y+10};
    else if(smjer === 'd')
        zadnji = {x: glava.x+10,y:glava.y};
    if(zadnji.x < 0 || zadnji.x > sirina || zadnji.y < 0 || zadnji.y > visina||zmijaSebeTakla(zadnji))
    {
        kraj=true;
    }

    zmija.unshift(zadnji);
};
let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
document.getElementById("skorHodler").innerHTML = "Poeni: "+ skor;

let timer = setInterval(function(){
    pomjeri(ctx,zmija,smjer, zmijaPojelaHranu());
    crtaj(ctx,zmija);
}, 100);


