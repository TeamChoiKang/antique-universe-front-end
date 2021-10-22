import PortalZone from '@/phaser/portalZone/PortalZone';

class PortalZoneManager {
  constructor(scene, enterKey, character) {
    this._scene = scene;
    this._enterKey = enterKey;
    this._character = character;
    this._portalZoneMap = new Map();
  }

  createPortalZone(key, x, y, action) {
    this._portalZoneMap.set(
      key,
      new PortalZone(this._scene, x, y, this._character, this._enterKey, action),
    );
  }

  removePortalZone(key) {
    return this._portalZoneMap.delete(key);
  }
}

export default PortalZoneManager;
