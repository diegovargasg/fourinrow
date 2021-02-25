import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewGameService {
  private _gameId = '';
  private _gameConfig: Array<{}> = [];
  private _playerId = '';
  private _playerName = '';

  constructor() {}

  get gameId() {
    return this._gameId;
  }

  set gameId(gameId: string) {
    this._gameId = gameId;
  }

  get playerName() {
    return this._playerName;
  }

  set playerName(playerName: string) {
    this._playerName = playerName;
  }

  get playerId() {
    return this._playerId;
  }

  set playerId(playerId: string) {
    this._playerId = playerId;
  }

  set gameConfig(gameConfig) {
    this._gameConfig = gameConfig;
  }

  get gameConfig() {
    return this._gameConfig;
  }
}
