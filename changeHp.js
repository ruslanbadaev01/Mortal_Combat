function changeHp (damage){
    this.hp -= damage

    if (this.hp <= 0){
        this.hp = 0
    }
}
export default changeHp;