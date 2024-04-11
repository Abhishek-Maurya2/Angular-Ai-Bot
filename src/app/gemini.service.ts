import { Injectable, inject } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  History: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private gemini: GoogleGenerativeAI;
  private firestore: Firestore = inject(Firestore);
  constructor() {
    this.gemini = new GoogleGenerativeAI(environment.gemini.api);
  }
  async generate(prompt: string) {
    const model = this.gemini.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    this.History.next({
      prompt: prompt,
      response: text,
    });
    
  }
}
