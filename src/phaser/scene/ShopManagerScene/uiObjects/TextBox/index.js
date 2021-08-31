import Phaser from '@/package/phaser';

class TextBox extends Phaser.GameObjects.Container {
  constructor(scene, width, height, color, contents) {
    super(scene, 0, 0);

    this._textBoxBackground = scene.add.rectangle(0, 0, width, height, color);
    this._contents = scene.add.text(0, 0, contents);

    Phaser.Display.Align.In.Center(this._contents, this._textBoxBackground);

    this.add(this._textBoxBackground);
    this.add(this._contents);
    this.setSize(width, height);

    scene.add.existing(this);
  }

  setText(newContents) {
    this._contents.setText(newContents);
    Phaser.Display.Align.In.Center(this._contents, this._textBoxBackground);
  }
}

export default TextBox;
