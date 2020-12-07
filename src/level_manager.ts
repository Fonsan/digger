import { LevelIndex } from './level_index'
export type Level = {
  name: string,
  data: ArrayBuffer
}
interface SearchableLevel {
  id: number,
  name: string,
  path: string,
}
export class LevelManager {
  private position = 0;
  public readonly levelNames: string[];
  public sequence!: string[];
  public nextOverride?: string;
  private levelIndex: LevelIndex;
  constructor(levelIndex: LevelIndex, levelNames: string[]) {
    this.levelIndex = levelIndex;
    this.levelNames = levelNames;
    this.shuffle();
  }

  public async pop():Promise<Level> {
    const name = this.nextOverride ? this.nextOverride : this.sequence[++this.position % this.sequence.length]
    this.nextOverride = undefined;
    return {
      name,
      data: await this.levelIndex.levelData(name)
    }
  }

  public setNext(levelName: string) {
    this.nextOverride = levelName;
  }

  public skip() {
    if (this.nextOverride) {
      this.nextOverride = undefined
    } else {
      this.position++;
    }
  }

  public currentName():string {
    return this.sequence[this.position % this.sequence.length];
  }

  public peekName():string {
    return this.nextOverride ? this.nextOverride : this.sequence[(this.position + 1) % this.sequence.length];
  }

  public shuffle():void {
    this.sequence = this.levelNames.slice().sort((a,b) => Math.random() - 0.5)
  }
}
