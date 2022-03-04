import createElement from "./createElement.js";

class Player{
    constructor(player, name, img){
        this.player = player;
        this.name = name;
        this.img = img;
    }

    player;
    name;
    hp = 100;
    img;

    attack = () => {
        console.log(`${this.name} Fight!`)
    }

    changeHp = (damage) =>{
        this.hp -= damage
    
        if (this.hp <= 0){
            this.hp = 0
        }
    }

    elHp = () => {
        return document.querySelector('.player' +this.player+ ' .life')
    }
    renderHp = () =>{
        return this.elHp().style.width = this.hp + '%'
    }

     createPlayer = () => {
        const $player = createElement('div', 'player' + this.player)
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
    
        $img.src = this.img
        $name.innerText = this.name
        $life.style.width = this.hp + '%'
    
        return $player
    }
}

export const player1 = new Player( 1,'Scorpion', 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif');
export const player2 = new Player( 2,'Sub-Zero', 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif');

