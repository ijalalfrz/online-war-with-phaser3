let i = 0;
export default class BaseCharacter {
	constructor(name, width, height, isSprite, ext) {
		this.name = name;
		this.width = width;
		this.height = height;
		this.isSprite = isSprite;
		this.ext = ext;
		this.baseUrlAsset = 'assets/characters/';
		this.keyWalkUp = null;
		this.keyWalkSide = null;
		this.keyWalkDown = null;

		this.keyAttackUp = null;
		this.keyAttackSide = null;
		this.keyAttackDown = null;

		this.keyIdle = null;
		this.keyJump = null;
		this.keyHit = null;
		this.keyDeath = null;
		this.attackPlay = false;
        this.player = null;
        this.health = null;
        this.originHealth = null;
		this.isDead = false;
        this.platform = null;
        this.isBounce = false;
        this.showUltimate = false;
        this.isMoving = false;
        this.damage = 0
	}

	setHealth(health) {
		this.health = health;
		this.originHealth = health;
	}

	loadAssets(scene) {
		if (this.isSprite) {
			scene.load.atlas(this.name, `${this.baseUrlAsset}${this.name}/Sprites/Idle.${this.ext}`,`${this.baseUrlAsset}${this.name}/Sprites/Idle.json`)
			
		}
	}

	createAnimation(scene, key, sprite, prefix, end, zeroPad, frameRate, repeat, start = 0) {
		scene.anims.create({
			key: key,
			frames: scene.anims.generateFrameNames(sprite, { prefix, start, end, zeroPad }),
			frameRate: frameRate,
			repeat: repeat
		});
	}


    addPlayerToScene(scene, x, y, flip=false) {
        this.player = scene.physics.add.sprite(x, y, this.name);
        this.player.setSize(this.width,this.height)
        this.player.setCollideWorldBounds(true);
        
        if (flip) {
            this.player.flipX = true
        }

    }

    addPlatforms(scene, platform) {
        scene.physics.add.collider(this.player, platform);
        this.platform = platform;
    }


    standing() {
        this.player.anims.play(`${this.name}-idle`, true);
        if (this.touchingPlatform()) {
            this.isMoving = false;
        }

    }


    moveUp() {
        this.player.setVelocityY(-10);
    }

    moveDown() {
        this.player.setVelocityY(10);
    }

    death() {
        this.player.anims.play(`${this.name}-death-side`, true);
        this.isDead = true
    }

    faceUp() {
        this.player.anims.play(`${this.name}-walk-up`, true);
        this.attackPlay = false;
    }

    faceDown() {
        this.player.anims.play(`${this.name}-walk-down`, true);
        this.attackPlay = false;
    }
    
    faceLeft() {
        this.player.anims.play(`${this.name}-walk-side`, true);
        this.attackPlay = false;
        this.player.flipX = true
    }

    faceRight() {
        this.player.anims.play(`${this.name}-walk-side`, true);
        this.attackPlay = false;
        this.player.flipX = false
    }

    moveFace(enemy) {
        let yDiff = Math.abs(enemy.y - this.player.y)
        if (yDiff < 100) {
            if (enemy.x < this.player.x) {
                this.faceLeft()
            } else {
                this.faceRight()
            }
        } else {
            if (enemy.y < this.player.y) {
                this.faceUp()
            } else {
                this.faceDown()
            }
        }
    }


    stop() {
        this.player.body.reset(this.player.x,this.player.y)

    }

    attackSide(enemy) {
        if (!enemy.isDead) {
            this.player.setDepth(1)
            const damage = this.damage
            if (enemy.player.x < this.player.x) {
                this.player.flipX = true
            } else{
                this.player.flipX = false
            }
            this.attackPlay = true;
            this.player.anims.play(this.keyAttackSide, true).once('animationcomplete', () => {
                if (enemy.health > 0) {
                    enemy.health -= damage
                    if (enemy.health <= 0) {
                        enemy.death()
                        enemy.stop()
                    }
                }
                this.attackPlay = false;
            });
        } else {
            this.attackPlay = false
        }
    }

    takeHit() {
        this.attackPlay = true;
        this.player.anims.play(`${this.name}-hit`, true).once('animationcomplete', () => {
            this.attackPlay = false;
        });
    }

 


} 