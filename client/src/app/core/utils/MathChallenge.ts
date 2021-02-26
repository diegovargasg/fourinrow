export class MathChallenge {
  config: Array<{}> = [];
  operators = ['+', '-', '*', '/'];
  operatorsMax = [200, 100, 20, 50];

  constructor(rounds: number) {
    for (let index = 0; index < rounds; index++) {
      const operator = this.getRandomInt(4);
      let firstDigit = 0;
      let secondDigit = 0;
      do {
        firstDigit = this.getRandomInt(this.operatorsMax[operator]);
      } while (firstDigit == 0);

      let result = 0;
      let heading = '';

      switch (operator) {
        case 0:
          secondDigit = this.getRandomInt(this.operatorsMax[operator]);
          result = firstDigit + secondDigit;
          break;
        case 1:
          secondDigit = this.getRandomInt(firstDigit);
          result = firstDigit - secondDigit;
          break;
        case 2:
          secondDigit = this.getRandomInt(this.operatorsMax[operator]);
          result = firstDigit * secondDigit;
          break;
        case 3:
          do {
            secondDigit = this.getRandomInt(firstDigit);
          } while (firstDigit % secondDigit != 0);
          result = firstDigit / secondDigit;
          break;
      }

      heading = `${firstDigit} ${this.operators[operator]} ${secondDigit}`;
      this.config[index] = {
        [heading]: result,
      };
    }
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
