import {Http , Response}from '@angular/http'; 
import { Injectable } from '@angular/core';

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_TOKEN = 'AIzaSyDMA0oWKa4UMZ4ODwC4vhnGqOpotDqUM6c';

@Injectable()
export class YouTubeAPIService{
  constructor(private http:Http){}
  
  search(query){
    return this.http.get(`${BASE_URL}?q=${query}&part=snippet&maxResults=21&type=video&key=${API_TOKEN}`)
      .map((res:Response) => res.json())
      .map(json => json.items);
  }

} 