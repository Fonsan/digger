import lunr from 'lunr'
import { AllMaps } from './all_maps'
interface SearchableLevel {
  id: number,
  full: string,
  name: string,
  path: string,
}
export class LevelIndex {
  public readonly baseURL: string;
  public levels: string[];
  private searchLevels: SearchableLevel[];
  private index: lunr.Index;
  private mapCache = new Map<string, ArrayBuffer>();
  constructor(baseURL: string, levelNames?: string[]) {
    this.baseURL = baseURL;
    this.levels = levelNames || AllMaps
    const searchLevels = this.searchLevels = this.levels.map((text, i) => {
      const parts = text.split('/')
      return {
        id: i,
        full: text,
        path: parts[parts.length - 2],
        name: parts[parts.length - 1]
      }
    })
    this.index = lunr(function() {
      this.field('name', {boost: 2})
      this.field('path', {boost: 1})
      searchLevels.forEach(searchableLevel => this.add(searchableLevel))
    })
  }

  public async levelData(name: string):Promise<ArrayBuffer> {
    let data = this.mapCache.get(name)
    if (data) {
      return data;
    }
    data = await (await fetch(this.baseURL + '/' +  name)).arrayBuffer();
    this.mapCache.set(name, data)
    return data;
  }

  public search(text: string):SearchableLevel[] {
    return this.index.search(text).map(
      searchResult => this.searchLevels[parseInt(searchResult.ref, 10)]
    )
  }
}
