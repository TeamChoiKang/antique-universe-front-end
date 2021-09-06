import Phaser from '@/package/phaser';

class TextBox extends Phaser.GameObjects.DOMElement {
  constructor(scene, contents, color = 0xffffff, width = 0, height = 0) {
    super(scene).createFromHTML(
      `<div
        id="text-box-dom-wrapper"
        style="width: ${width}px; height: ${height}px;"
      ></div>
      <style type="text/css">
        #text-box-dom-wrapper::-webkit-scrollbar {
          display: none;
        }

        #text-box-dom-wrapper {
          overflow-y: scroll;
          background: #${color.toString(16)};
        }
      </style>`,
    );

    this._contents = contents;

    scene.add.existing(this);

    this.setContents(contents);
  }

  _clearHTML() {
    const textBoxDomWrapper = this.getChildByID(`text-box-dom-wrapper`);
    while (textBoxDomWrapper.firstChild) textBoxDomWrapper.removeChild(textBoxDomWrapper.lastChild);
  }

  setContents(contents) {
    this._clearHTML();
    const textBoxDomWrapper = this.getChildByID(`text-box-dom-wrapper`);
    const html = `
      <div class="text-box">
        ${contents}
      </div>
      <style>
        .text-box {
            text-align: center;
            font-size: 1.5rem;
            color: white;
            line-height: 2;
            padding-left: 10px;
            padding-right: 10px;
        }
      </style>
    `;
    textBoxDomWrapper.insertAdjacentHTML('beforeend', html);
  }

  setSize(width, height) {
    const textBoxDomWrapper = this.getChildByID(`text-box-dom-wrapper`);
    textBoxDomWrapper.style.width = `${width}px`;
    textBoxDomWrapper.style.height = `${height}px`;
  }
}

export default TextBox;
