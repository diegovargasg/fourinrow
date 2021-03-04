import { Injectable } from '@angular/core';
import { Game } from '../models/game.model';
import { GameDataModel } from '../models/gameData.model';
import { gameDataModelFactory } from '../models/gameDataFactory.model';

@Injectable({
  providedIn: 'root',
})
export class NewGameService implements Game {
  private _playerId = '';
  private _playerName = '';

  _id: string = '';
  _data = gameDataModelFactory();

  constructor() {}

  get id() {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get data() {
    return this._data;
  }

  set data(data: GameDataModel) {
    this._data = data;
  }

  //TODO: move this attributes to it's own new player service
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
}
