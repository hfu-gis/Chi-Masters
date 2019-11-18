import { Scene } from 'phaser'
import logo from '../../assets/images/ChiMasters_gay.png';

export default class BootScene extends Scene {
    constructor () {
        super({ key: 'BootScene' })
    }

    preload () {
        this.load.image('logo', logo);
    }

    create () {
        this.scene.start('PlayScene')
    }
}