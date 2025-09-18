//alert(document.getElementById("p1").innerText);

let dugmici = document.querySelectorAll("#tastatura button");
let i = 0;
let j = 0;
let matrica = document.getElementById("tabela");
let reci = ["ДАБАР", "ЈЕЛКА", "ХАСКИ", "ПЕКАР", "ШТАЛА", "ЧИЗМА", "ЛОПТА", "ЉУТЊА", "ПЕЧАТ", "ПРАСЕ"];
let rec = "ДАБАР";

let pogodci = [0, 0, 0, 0, 0, 0, 0];


function sacuvajUSkladiste(){
    localStorage.setItem("pog", JSON.stringify(pogodci));
}

function ucitajIzSkladista(){
    let sacuvani = localStorage.getItem("pog");
    if(sacuvani) {
        pogodci = JSON.parse(sacuvani);
    }
}


function izaberirec(){
    rec = reci[Math.floor(Math.random() * reci.length)];
}

function obojibelo(){
    //alert("oboji zeleno" + slovo);
    let dugmad = document.querySelectorAll("#tastatura button");
    dugmad.forEach(
    btn => {        
        btn.style.backgroundColor = "rgb(240, 240, 240)";
    });
}

function obojizeleno(slovo){
    //alert("oboji zeleno" + slovo);
    let dugmad = document.querySelectorAll("#tastatura button");
    dugmad.forEach(
    btn => {
        if (btn.innerText == slovo){
            //let stil = window.getComputedStyle(btn);
            //let boja = stil.backgroundColor;
            btn.style.backgroundColor = "green";
        }
    });
}

function obojzuto(slovo){
    //alert("oboji zuto" + slovo);
    let dugmad = document.querySelectorAll("#tastatura button");
    dugmad.forEach(
    btn => {
        if (btn.innerText == slovo){
            let stil = window.getComputedStyle(btn);
            let boja = stil.backgroundColor;
            if(boja != "rgb(0, 128, 0)"){
                btn.style.backgroundColor = "yellow";
            }
        }
    });
}

function obojsivo(slovo){
    //alert("oboji sivo" + slovo);
    let dugmad = document.querySelectorAll("#tastatura button");
    dugmad.forEach(
    btn => {
        if (btn.innerText == slovo){
            let stil = window.getComputedStyle(btn);
            let boja = stil.backgroundColor;
            if(boja != "rgb(0, 128, 0)" && boja != "rgb(255, 255, 0)"){
                btn.style.backgroundColor = "gray";
            }
        }
    });
}

function pisi(slovo){
    if(i >= 0 && i <= 5 && j >= 0 && j <= 4){
        let polje = matrica.rows[i].cells[j];
        polje.innerText = slovo;
        j++;
    }
}

function brisi(){
    if(i >= 0 && i <= 6 && j > 0 && j <= 5){
        j--;
        let polje = matrica.rows[i].cells[j];
        polje.innerText = '\u00A0';
    }
}

function provera(){
    if(i >= 0 && i <= 6 && j >= 5){
        let str = "";
        let red = matrica.rows[i];
        for (let y = 0; y < red.cells.length; y++) {
            str += red.cells[y].innerText;
        }
        if(!reci.includes(str)){
            return;
        }
        let tmp = [];
        let tmp2 = [];
        //tacno
        for(let x = 0; x < rec.length; x++){
            //alert(rec[x]);
            let polje = matrica.rows[i].cells[x];
            //alert(polje.innerText);
            if(rec[x] == polje.innerText){
                polje.style.backgroundColor = "green";
                obojizeleno(rec[x]);
            }
            else{
                tmp.push(rec[x]);
                tmp2.push(polje);
            }
        }
        if(tmp.length == 0){
            alert("kraj igre");
            ucitajIzSkladista();
            pogodci[i]++;
            sacuvajUSkladiste();
            i = -1;
            j = -1;
        }
        else{
            //zuto
            for(let x = 0; x < tmp2.length; x++){
                let ret = tmp.indexOf(tmp2[x].innerText);
                if(ret != -1){
                    tmp2[x].style.backgroundColor = "yellow";
                    tmp.splice(ret, 1);
                    obojzuto(tmp2[x].innerText);
                }
                else{
                    tmp2[x].style.backgroundColor = "gray";
                    obojsivo(tmp2[x].innerText);
                }
            }
            //alert(tmp);
            i++;
            j = 0;
            if(i == 6){
                ucitajIzSkladista();
                pogodci[6]++;
                sacuvajUSkladiste();
            }
        }      
    }
}

document.addEventListener("keydown", function(event) {
    let slovo =  event.key.toUpperCase();
    if(/^[АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ]$/.test(slovo)){
        pisi(slovo);
        //alert("Pritisnuo si: " + slovo);
    }
    else if(slovo == 'ENTER'){
        //alert(slovo);
        provera();
    }
    else if(slovo == 'BACKSPACE'){
        brisi();
    }
});

dugmici.forEach(
    btn => {
        btn.addEventListener("click", function() {
            let slovo = btn.innerText;
            if(/^[АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ]$/.test(slovo)){
                //alert(slovo);
                pisi(slovo);
            }
            else if(slovo == 'ENTER'){
                provera();
            }
            else if(slovo == '⌫'){
                brisi();
            }
        });
    }
);

function pravila() {
    alert(`▪ Правила игре „Речко“:
    1. Циљ игре је да погодите тајну реч од 5 слова.
    2. Имате 6 покушаја да погодите реч.
    3. После сваког покушаја добијате повратну информацију 
    бојом за свако слово:
        • зелено – слово постоји у тајној речи и налази се на тачном 
        месту;
        • жутo – слово постоји у тајној речи, али није на тачном 
        месту;
        • сивo – слово се не налази у тајној речи.
    4. Речи могу бити само из дозвољеног сета.
    5. Игра се завршава када погодите реч или искористите све 
    покушаје.
    6. На екранској тастатури дугмад ће такође добијати боју у 
    складу са повратном информацијом.
    7. Ако погодите реч, добијате поруку о успеху`);
}

function resetuj(){
    i = 0;
    j = 0;
    for(let x = 0; x < 6; x++){
        for(let y = 0; y < 5; y++){
            let polje = matrica.rows[x].cells[y];
            polje.innerText = '\u00A0';
            polje.style.backgroundColor = "white";
        }
    }
    obojibelo();
    izaberirec();
}

document.getElementById("upitnik").onclick = pravila;
document.getElementById("reset").onclick = resetuj;
izaberirec();
let statsBtn = document.getElementById("stats");
let statsBar = document.getElementById("statBar");

statsBtn.addEventListener("click", function() {
    ucitajIzSkladista();
    if (statsBar.style.display == "none" || statsBar.style.display == "") {
    statsBar.style.display = "block";

    let max = pogodci[0];
    for (let i = 1; i < pogodci.length; i++) {
        if (pogodci[i] > max) {
            max = pogodci[i];
        }
    }
    let html = "";
    for (let i = 0; i < pogodci.length; i++) {
        let znak = i == 6 ? "x" : i + 1;
        let sirina = max > 0 ? (pogodci[i] / max * 200) : 0;
        if(i == pogodci.length - 1){
            html += `<div>${znak}: <span style="display:inline-block; background:red; width:${sirina}px; height:14px;"></span> ${pogodci[i]}</div>`;
        }
        else{
            html += `<div>${znak}: <span style="display:inline-block; background:green; width:${sirina}px; height:14px;"></span> ${pogodci[i]}</div>`;
        }
        
    }

    statsBar.innerHTML = html;
    }
    else {
        statsBar.style.display = "none";
    }
});