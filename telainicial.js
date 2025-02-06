class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
    }

    preload() {
        this.load.image('background', 'assets/background.jpeg');
        this.load.audio('bgMusic', 'assets/Begin%20Your%20Journey.mp3');
        this.load.image('config', 'assets/botaoconfig.png');
    }

    create() {
        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background')
            .setOrigin(0.5, 0.5)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        const playText = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 2,
            'Clique para iniciar a música',
            { font: '20px Arial', fill: '#ffffff' }
        ).setOrigin(0.5);

        let music;
        playText.setInteractive();
        playText.on('pointerdown', () => {
            music = this.sound.add('bgMusic', { loop: true, volume: 0.5 });
            music.play();
            playText.destroy();
        });

        // Adiciona o botão de configuração no canto superior direito
        const configButton = this.add.image(this.cameras.main.width - 20, 20, 'config')
            .setOrigin(1, 0)
            .setScale(0.5) // Reduz o tamanho do botão
            .setInteractive();

        // Cria um menu de configuração
        const configMenu = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2).setVisible(false);
        const configBackground = this.add.rectangle(0, 0, 200, 100, 0x000000, 0.8).setOrigin(0.5);
        const volumeText = this.add.text(-40, -20, 'Volume:', { font: '16px Arial', fill: '#ffffff' });
        const volumeDown = this.add.text(-50, 10, '-', { font: '20px Arial', fill: '#ffffff' }).setInteractive();
        const volumeUp = this.add.text(30, 10, '+', { font: '20px Arial', fill: '#ffffff' }).setInteractive();
        const closeButton = this.add.text(60, -40, 'X', { font: '16px Arial', fill: '#ff0000' }).setInteractive();

        configMenu.add([configBackground, volumeText, volumeDown, volumeUp, closeButton]);

        configButton.on('pointerdown', () => {
            configMenu.setVisible(true);
        });

        closeButton.on('pointerdown', () => {
            configMenu.setVisible(false);
        });

        volumeDown.on('pointerdown', () => {
            if (music && music.volume > 0.1) {
                music.setVolume(music.volume - 0.1);
            }
        });

        volumeUp.on('pointerdown', () => {
            if (music && music.volume < 1.0) {
                music.setVolume(music.volume + 0.1);
            }
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [StartScene]
};

const game = new Phaser.Game(config);