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



const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
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

function getRandom (num){
    return Math.ceil(Math.random() * num)
}

function changeHp (damage){
    this.hp -= damage

    if (this.hp <= 0){
        this.hp = 0
    }
}
//--> 
function elHp (){
    return document.querySelector('.player' +this.player+ ' .life')
}
//-->
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
//-->
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

