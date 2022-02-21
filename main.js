const $arenas = document.querySelector('.arenas')
const $randomButton = document.querySelector('.button')


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

function attack (){
    console.log(`${this.name} Fight!`)
}

function createElement (tag, className){
    const $tag = document.createElement(tag)
    if (className){
        $tag.classList.add(className)
    }

    return $tag
}

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

function getRandom (num){
    return Math.ceil(Math.random() * num)
}

function changeHp (damage){
    this.hp -= damage

    if (this.hp <= 0){
        this.hp = 0
    }
}

function elHp (){
    return document.querySelector('.player' +this.player+ ' .life')
}

function renderHp (){
    return this.elHp().style.width = this.hp + '%'
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


$formFight.addEventListener('submit', function(e){
    e.preventDefault();
    //console.dir($formFight);
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
    }else{
        console.log('player blocked');
    }
    if (attack.hit !== enemy.defence){
        player2.changeHp(attack.value);
        player2.renderHp( );
    }else{ 
       console.log('sucessful')
    }
    console.log(attack);
    console.log(enemy);
   



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
    }

})


// $randomButton.addEventListener('click', function (){
//     player1.changeHp(getRandom(20))
//     player2.changeHp(getRandom(20))
//     player1.renderHp()
//     player2.renderHp()


//     if (player1.hp === 0 || player2.hp === 0){
//         $randomButton.disabled = true
//         const $reloadButton = createReloadButton()
        
//         $reloadButton.addEventListener('click', function (){
//             window.location.reload()
//         })

//         $arenas.append($reloadButton)
//     }
//     if (player1.hp === 0 && player1.hp < player2.hp){
//         $arenas.append(playerWins(player2.name))
//     } else if (player2.hp === 0 && player2.hp < player1.hp){
//         $arenas.append(playerWins(player1.name))
//     } else if (player1.hp === 0 && player2.hp === 0){
//         $arenas.append(playerWins())
//     }
// })