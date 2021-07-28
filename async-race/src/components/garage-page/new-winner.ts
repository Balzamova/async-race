export default class NewWinner {
  id: number;

  wins: number;

  time: number;

  constructor(id: number, wins: number, time: number) {
    this.id = id;
    this.wins = wins;
    this.time = time;
  }
}
