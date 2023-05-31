import { parseDate } from './../utils/date_utils';

export class Show {
  public id: string;
  public title: string;
  public premiere: Date;
  public isRunning?: boolean;
  public language: string;
  public mainGenre: string;
  public posterUrl?: string;

  constructor(showObject: any) {
    const { id, title, premiere, isRunning, language, mainGenre, posterUrl } = showObject;
    this.id = id;
    this.title = title;
    this.premiere = parseDate(premiere);
    this.isRunning = isRunning;
    this.language = language;
    this.mainGenre = mainGenre;
    this.posterUrl = posterUrl;
  }
}