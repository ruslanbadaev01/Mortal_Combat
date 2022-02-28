import { logs } from './logs.js';
import createElement from './createElement.js';
import attack from './attack.js';
import getRandom from './getRandom.js';
import changeHp from './changeHp.js';
import elHp from './elHp.js';
import renderHp from './renderHp.js';

const $arenas = document.querySelector('.arenas')
const $randomButton = document.querySelector('.button')
const $chat = document.querySelector('.chat');

const $formFight = document.querySelector('.control');
const HIT = {
    head: 3000,
    body: 2500,
    foot: 2000,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Kunai'],
    attack,
    changeHp,
    elHp,
    renderHp,
};

const player2 = {
    player: 2,
    name: 'Sub Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Sword'],
    attack,
    changeHp,
    elHp,
    renderHp,
};



//Осатвить
function createPlayer (player){
    const $player = createElement('div', 'player' + player.player)
    const $progressbar = createElement('div', 'progressbar')
    const $character = createElement('div', 'character')
    const $life = createElement('div', 'life')
    const $name = createElement('div', 'name')
    const $img = createElement('img')
    const $root = document.querySelector('.root')
    
    $root.append($player)
    $player.append($progressbar, $character)
    $progressbar.append($life, $name)
    $character.appendChild($img)

    $img.src = player.img
    $name.innerText = player.name
    $life.style.width = player.hp + '%'

    return $player
}


function playerWins (name){
    const $winTitle = createElement('div', 'loseTitle')
    if (name){
        $winTitle.innerText = name + ' Wins!'
    } else {
        $winTitle.innerText = 'Draw'
    }

    return $winTitle
}
function createReloadButton (){
    const $reloadWrap = createElement('div', 'reloadWrap')
    const $reloadButton = createElement('button', 'button')
    $reloadButton.innerText = 'Restart'
    $reloadWrap.append($reloadButton)

    return $reloadWrap
}

$arenas.append(createPlayer (player1))
$arenas.append(createPlayer (player2))

function enemyAttack(){
    const hit = ATTACK[getRandom(3)-1];
    const defence = ATTACK[getRandom(3)-1];

    return{
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}
//-->
function showResult(){
    
    if (player1.hp === 0 || player2.hp === 0){
        const $reloadButton = createReloadButton()
        
        $reloadButton.addEventListener('click', function (){
            window.location.reload()
        })

        $arenas.append($reloadButton)
        for (let item of $formFight) {
            item.disabled = true;
       }
    }
    if (player1.hp === 0 && player1.hp < player2.hp){
        $arenas.append(playerWins(player2.name))
    } else if (player2.hp === 0 && player2.hp < player1.hp){
        $arenas.append(playerWins(player1.name))
    } else if (player1.hp === 0 && player2.hp === 0){
        $arenas.append(playerWins())
        draw ('draw')
    }

}


function draw(type){
    let draw = logs [type];
    console.log (draw);
    const $draw = `<p>${draw}</p>`;
    $chat.insertAdjacentHTML('afterbegin', $draw);
}


function generatelogs (type, player1, player2){

    let kick = logs [type][getRandom(14)]
    .replace('[playerDefence]', player2.name)
    .replace('[playerKick]', player1.name)
    

    console.log (kick);
    const el = `<p>${kick}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);

}


//Оставить
function logMessage(message,player1,player2){

    const getCurrentTime = () => {
        const currentTime = new Date();
        var options = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        return currentTime.toLocaleTimeString('ru', options);
    }

    const date = new Date();
    const dateString = getCurrentTime();
    
    let output= ' ';
         
    switch(message){
        case 'start':
            output = logs.start
        break
        case 'end':
            output = logs.end[getRandom(3)]
        break
    }
    output = output.replace('[time]',dateString).replace('[player1]',player1.name).replace('[player2]', player2.name)

    const finalString = `<p>${output}</p>`;
    $chat.insertAdjacentHTML('afterbegin', finalString);

}
logMessage('start', player1, player2);


//Оставить
$formFight.addEventListener('submit', function(e){
    e.preventDefault();
    const enemy = enemyAttack();
    const attack = {};

    for(let item of $formFight){
        if(item.checked && item.name === 'hit'){
            attack.value = getRandom (HIT[item.value]);
            attack.hit = item.value;
        }
        if( item.checked && item.name === 'defence'){
            attack.defence = item.value;
        }
 
        item.checked = false;
    }
    if (enemy.hit !== attack.defence){
        player1.changeHp(enemy.value);
        player1.renderHp( );
        generatelogs('hit',player2, player1)
       
    }
    if (attack.hit !== enemy.defence){
        player2.changeHp(attack.value);
        player2.renderHp( );
        generatelogs('hit',player1, player2);
    }
    if(attack.hit == enemy.defence){
        generatelogs('defence',player1, player2);
    }
    if(enemy.hit == attack.defence){
        generatelogs('defence',player2, player1);
    }
 
    showResult();

})

