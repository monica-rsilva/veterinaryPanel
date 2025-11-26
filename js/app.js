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

//função criada para gerar as senhas
function generatePasswords(passwordType){

    const newPassword = passwordType === 'P' ? initialPreferredPassword++ : initialPassword++;

    const password = `${passwordType.toUpperCase()}${newPassword}`; 

    if(passwordType.toUpperCase() == 'P'){
        preferredPasswords.push(password); 
    } else{
        commomPasswords.push(password);
    }
    allPasswords.push(password);
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
    displayOnly();
    
}

//função para exibir apenas 4 elementos do vetor
function displayOnly(){
    const elements = document.querySelectorAll('li');

    elements.forEach((four, index) => {
        four.style.display = index < 4 ? 'flex' : 'none';
    });
}

// função para desativar o "esqueleto"
function skeletonDisabled(){
    const skeletons = document.querySelectorAll('#skeleton')

    skeletons.forEach((skeleton, index) => {
        if(index < allPasswords.length){
            skeleton.style.display = 'none';
        } else{
            skeleton.style.display = 'flex';
        }
    });
}