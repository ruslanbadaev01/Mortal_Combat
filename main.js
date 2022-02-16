const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player:1,
    name: 'SCORPION',
    hp:100 ,
    img: './assets/Heroes/scorpion.gif',
    attack: function(name){
        console.log(name + ' ' + 'Fight...');
    }
};
const player2 = {
    player:2,
    name: 'Sonya',
    hp:100 ,
    img: './assets/Heroes/sonya.gif',
    attack: function(name){
        console.log(name + ' ' + 'Fight...' );
    }
};

function randomChangeHP(player){
   
    const $playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= Math.ceil( Math.random() * 20);
    $playerLife.style.width = player.hp + '%';
        if(player.hp <= 0){
            player.hp=0;
            $randomButton.disabled = true;
            $arenas.appendChild(playerWin(player.name));
            $playerLife.style.width=0+'%';
        }
    console.log(player.hp);
}




function playerWin(name){
    const $WinTitle = createElement('div', 'loseTitle');
    if(name == 'Sonya'){
        $WinTitle.innerText ='SCORPION wins';
    }
    else if(name == 'SCORPION'){
        $WinTitle.innerText ='Sonya wins';
    }
    return $WinTitle;
}

$randomButton.addEventListener('click', function(){

    console.log('###:click')
    randomChangeHP(player1);
    randomChangeHP(player2);
})

function createElement(tag, className){
  
    const $tag = document.createElement(tag);
    if(className){
        $tag.classList.add(className);
    }
    return $tag;
}

function createPlayer(playerObj){
    const $player = createElement('div' , 'player'+playerObj.player);
    const $progressbar = createElement('div','progressbar' );
    const $life =createElement('div', 'life');
    const $name =createElement('div','name');    
    const $character =createElement('div','character');
    const img = createElement('img');

    $life.style.width = playerObj.hp +'%';
    $name.innerText = playerObj.name;
    img.src = playerObj.img;

    $player.appendChild($progressbar);
    $player.appendChild($character);

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    
    $character.appendChild(img);
   
    return $player;

}



$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));




