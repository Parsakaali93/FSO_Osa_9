export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
  }
  
export enum Visibility {
Great = 'great',
Good = 'good',
Ok = 'ok',
Poor = 'poor',
Kissa = 'i am error'
}

export interface DiaryEntry {
id: number;
date: string;
weather: Weather;
visibility: Visibility;
comment: string;
}


export type NewDiary = Omit<DiaryEntry, 'id'>