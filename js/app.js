'use strict'

function atualizarDataHora(){
   
const elementoHora = document.getElementById('time');
const elementoData = document.getElementById('date');

const agora = new Date();

//Time
const horas = String(agora.getHours()).padStart(2, '0');
const minutos = String(agora.getMinutes()).padStart(2,'0');
const segundos = String(agora.getSeconds()).padStart(2,'0');

const horaFormatada = `${horas}:${minutos}:${segundos}`;

elementoHora.textContent = horaFormatada;

//Date
const dia = String(agora.getDate()).padStart(2,'0');
const mes = String(agora.getMonth() + 1).padStart(2,'0');
const ano = agora.getFullYear();

const dataFormatada = `${dia}/${mes}/${ano}`;

elementoData.textContent = dataFormatada;

}

atualizarDataHora();
setInterval(atualizarDataHora, 1000);

//variaveis de senhas
let initialPassword = 1;
let initialPreferredPassword = 1;
let commomPasswords = [];
let preferredPasswords = [];
let allPasswords = [];
let previousPasswords = [];

//função criada para gerar as senhas
function generatePasswords(passwordType){

    const newPassword = passwordType === 'P' ? initialPreferredPassword++ : initialPassword++;

    const password = `${passwordType.toUpperCase()}${newPassword}`; 

    if(passwordType.toUpperCase() == 'P'){
        preferredPasswords.push(password); 
    } else{
        commomPasswords.push(password);
    }

    allPasswords.unshift(password);
    passwordList();
    
    return
}

//função para exibir as senhas em lista
function passwordList(){
   let passwords = document.querySelector('#generated_passwords');

    passwords.innerHTML = "";

    for (let i = 0; i < allPasswords.length; i++){
        const password = allPasswords[i];
        const li = document.createElement('li');
        li.innerHTML = password;

        passwords.appendChild(li);

    }
    skeletonDisabled();
    displayOnlyGenerated();
}

//função para chamar próxima senha
function nextPassword(){
    
    let current_password = null;

    if(preferredPasswords.length > 0){
        current_password = preferredPasswords.shift();
    } 
    else if (commomPasswords.length > 0 ) {
        current_password = commomPasswords.shift();
    } 
    else {
        console.log('sem senhas');
        return
    }
    
    const index = allPasswords.indexOf(current_password);
    if(index !== -1){
        allPasswords.splice(index, 1);
    }

    let number_password = document.getElementById('password_number');
    
    number_password.textContent = current_password;
    
    const current_Guiche = generateGuiche();
    
    let number_guiche = document.getElementById('guiche_number');
    
    number_guiche.textContent = current_Guiche;

    previousPasswords.unshift({
        password: current_password,
        guiche: current_Guiche,
    })

    animation();
    passwordList();
    listPreviousPasswords();
}

function generateGuiche(){
     return Math.floor(Math.random()*4) + 1;
}

// // função para animar senha
function animation(){
    const strong = document.getElementById('password_number');

    const strongTwo = document.getElementById('guiche_number');

    strong.classList.remove("piscar");
    strongTwo.classList.remove("piscar");

    void strong.offsetWidth;
    void strongTwo.offsetWidth;

    strong.classList.add("piscar");
    strongTwo.classList.add("piscar");
}

//função para exibir as senhas em lista
function listPreviousPasswords(){
   let passwords = document.querySelector('#previous_passwords_list');

    passwords.innerHTML = "";

    for (let i = 0; i < previousPasswords.length; i++){
    const item = previousPasswords[i];
        const li = document.createElement('li');
        li.textContent = `${item.password} - Guichê ${item.guiche}`;

        passwords.appendChild(li);

    }
    skeletonDisabledTwo();
    displayOnlyPrevious();
    
}

//função para exibir apenas 4 elementos do vetor
function displayOnlyGenerated(){

    let ul = document.getElementById('generated_passwords');
    let elements = ul.querySelectorAll('li');

    elements.forEach((four, index) => {
        four.style.display = index < 4 ? 'flex' : 'none';
    });
}

function displayOnlyPrevious(){

    let ul = document.getElementById('previous_passwords_list');
    let elements = ul.querySelectorAll('li');

    elements.forEach((four, index) => {
        four.style.display = index < 4 ? 'flex' : 'none';
    });
}

// função para desativar o "esqueleto"
function skeletonDisabled(){
    const skeletons = document.querySelectorAll('#skeleton_1')

    skeletons.forEach((skeleton, index) => {
        if(index < allPasswords.length){
            skeleton.style.display = 'none';
        } else{
            skeleton.style.display = 'flex';
        }
    });
}

function skeletonDisabledTwo(){
    const skeletons = document.querySelectorAll('#skeleton_2')

    skeletons.forEach((skeleton2, index) => {
        if(index < previousPasswords.length){
            skeleton2.style.display = 'none';
        } else{
            skeleton2.style.display = 'flex';
        }
    });
}