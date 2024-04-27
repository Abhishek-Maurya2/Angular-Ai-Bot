import { Injectable, inject } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();
  History: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private gemini: GoogleGenerativeAI;
  // private firestore: Firestore = inject(Firestore);
  constructor() {
    this.gemini = new GoogleGenerativeAI(environment.gemini.api);
  }
  async generate(prompt: string) {
    this._loading.next(true);
    const model = this.gemini.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    this.History.next({
      prompt: prompt,
      response: text,
    });
    // console.log(this.History);
    this._loading.next(false);
  }
}
