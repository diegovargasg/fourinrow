import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MathChallengeService {
  levels: number = 5;
  config: Array<{}> = [];
  operators = ['+', '-', '*', '/'];
  operatorsMax = [100, 100, 10, 50];

  constructor() {
    for (let index = 0; index < this.levels; index++) {
      const operator = this.getRandomInt(3);
      const firstDigit = this.getRandomInt(this.operatorsMax[operator]);
      const secondDigit = this.getRandomInt(this.operatorsMax[operator]);
      let result = 0;

      switch (operator) {
        case 0:
          result = firstDigit + secondDigit;
          break;
        case 1:
          result = firstDigit - secondDigit;
          break;
        case 2:
          result = firstDigit * secondDigit;
          break;
        case 3:
          result = Math.round((firstDigit / secondDigit) * 10) / 10;
          break;
      }
      this.config[index] = {
        [`${firstDigit} ${this.operators[operator]} ${secondDigit}`]: result,
      };
    }
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
