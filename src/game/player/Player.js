import { Tilemaps } from "phaser";
import { toHandlers } from "vue";
import CharacterFactory from "./CharacterFactory";
import getDistance from "./Helper";

export default class Player {
    constructor(scene, number, character) {
        this.characterName = character;
        this.character = new CharacterFactory(this.characterName).create();
        // this.character.loadAssets(scene)
        this.character.buildAnimation(scene)
        this.healthBar = null;
        this.playerNum = number;
        this.arrive = false;
        this.target = null;
    }

    showAliasText(scene, x, y) {
        scene.add.text(this.character.aliasPosition[this.playerNum].x, this.character.aliasPosition[this.playerNum].y, this.character.alias, { font: "bold 24px Arial", fill: "#ea7"}).setShadow(2, 2, 'rgba(0,0,70,1)', 1);
    } 

    setUpHealthBar(scene, x, y) {
        this.healthBar = this.makeBar(scene,x, y, 280, 25, 0xeeee44);
    }

    setHealthValue(bar, percentage){
        bar.scaleX = - percentage / 100;
    } 

    makeBar(scene, x, y, xSize, ySize, color) {
        let bar = scene.add.graphics();  //draw the bar
        bar.fillStyle(color, 1);  //color the bar
        bar.fillRect(0, 0, xSize, ySize);  //fill the bar with a rectangle
        //position the bar
        bar.x = x;
        bar.y = y;
        return bar;
    }

    avaliableHitJustDown(hitBtn) {
        return Phaser.Input.Keyboard.JustDown(hitBtn) && !this.character.isMoving && !this.character.justDownPlayer && (this.character.health > 0);
    }

    avaliableSideIsDown(sideBtn) {
        return sideBtn.isDown && !this.character.justDownPlayer && (this.character.health > 0);
    }

    avaliableJumpIsDown(jumpBtn) {
        return jumpBtn.isDown && this.character.player.body.touching.down && !this.character.justDownPlayer && (this.character.health > 0);
    }
    isPlayerDown() {
        return (!this.character.justDownPlayer) && (this.character.health > 0);
    }
    
    isPlayerDead() {
        return (this.character.health <= 0)
    }

    playerArrive() {
        setTimeout(()=>{
            this.character.showUltimate = false

        }, 3000)
    }
    
    alive() {
        return this.character.health > 0
    }

    touchDownCheck () {
        if (this.character.touchingPlatform()) {
            this.character.isBounce = false;
        }
    }

    getCharacterObj() {
        return this.character.player
    }

    getX() {
        return this.character.player.x
    }

    getY() {
        return this.character.player.y
    }
    
    checkTargetHealth() {
        if (this.target && this.target.character.health <= 0) {
            console.log('Fireddd')
            this.target = null
        }
    }

    checkNearBy(scene, enemies = []) {
        if (this.target) {
            this.character.moveToEnemy(scene, this.target)
        } else {
            enemies.forEach((enemy) => {
               
                let x1 = this.getX()
                let y1 = this.getY()
                let x2 = enemy.getX()
                let y2 = enemy.getY()
                const distance = getDistance(x1,y1,x2,y2)
                if (distance < 150 && enemy.alive()) {
                    if (!this.target) {
                        this.target = enemy
                        this.character.attackPlay = false
                        this.character.moveToEnemy(scene, this.target)
                    }
                } else {
                    this.character.isMoving = true
                    if (this.playerNum == 1) {
                        this.character.moveUp()
                        this.character.faceUp()
                    }
                    else if (this.playerNum == 2) {
                        this.character.moveDown()
                        this.character.faceDown()
                    }
                }
                
                
            })
        }
    }

    needToMoveToEnemy(enemy) {
        let enemyChar = enemy.character

        if (this.character.player.x < enemyChar.player.x) {
            return !this.character.isDead && !this.character.isBounce && !this.character.showUltimate && enemyChar.player.x - (enemyChar.width*1.2) > this.character.player.x
        } else {
            return !this.character.isDead && !this.character.isBounce && !this.character.showUltimate && enemyChar.player.x + (enemyChar.width*1.2) < this.character.player.x
        }
    }
}