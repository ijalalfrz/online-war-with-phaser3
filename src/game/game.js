import Phaser from 'phaser'
import PlayScene from '@/game/scenes/PlayScene'


function launch(containerId) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    parent: containerId,
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        overlapBias: 60,
        tileBias: 30,
        fps: 60,
        fixedStep: true
      }
    },
    scene: [PlayScene]
  })
}

export default launch
export { launch }
