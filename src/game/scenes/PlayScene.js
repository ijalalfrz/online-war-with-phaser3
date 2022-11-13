import { Scene } from 'phaser'
import loadAllAssets from '../player/AssetLoader'
import Player from '../player/Player'

export default class PlayScene extends Scene {

    constructor () {
      super({ key: 'PlayScene' })
      this.p = null

      this.player1 = []
      this.player2 = []
      this.test = null
    }

    async preload () {
        loadAllAssets(this)
    }
    
    create () {
        for(var i=0;i<15;i++) {
            this.player1.push(new Player(this, 1, 'warrior1'))
            this.player2.push(new Player(this, 2, 'warrior2'))
        }

        this.player1.forEach((item) => {
            item.character.addPlayerToScene(this, this.getRandomArbitrary(1,600), this.getRandomArbitrary(600,650))
        })

        this.player2.forEach((item) => {
            item.character.addPlayerToScene(this, this.getRandomArbitrary(1,600), this.getRandomArbitrary(400,500))
        })
        this.test = this.physics.add.sprite(200, 100, 'test'); 
    }

    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    

    update () {
        const nearby1 = new Promise(()=>{
            this.player1.forEach((item) => {
                new Promise(()=>{
                    if (item.alive()) {
                        item.checkNearBy(this, this.player2)
                        item.checkTargetHealth()
                    }
                })
            })
        });
        const nearby2 = new Promise(()=>{
            this.player2.forEach((item) => {
                new Promise(()=>{
                    if (item.alive()) {
                        item.checkNearBy(this, this.player1)
                        item.checkTargetHealth()
                    }
                })
            })
        });


        if (this.input.mousePointer.isDown)
        {
            this.test.x = this.input.mousePointer.x
            this.test.y = this.input.mousePointer.y
        }
    }

}