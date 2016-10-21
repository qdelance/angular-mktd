
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { Quizz, QuizzResponses, QuizzResult, Photo, Question } from './quizz.model';

/**
 * QuizzService.
 * Utilise Http pour les accés HTTP en AJAX
 * Utilise Storage pour stocker les données
 */
@Injectable()
export class QuizzService {

  /**
   * Méthode statique utilitaire pour le traitement des erreurs HTTP
   */
  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log dans la console
    return Observable.throw(errMsg); // Lance une erreur
  }

  /**
   * Créer un nouveau QuizzService avec les services Http et Storage injectés.
   * @param {Http} http - Le service Http injecté.
   * @param {Storage} storage - Le service Storage injecté.
   * @constructor
   */
  constructor(
    private http: Http,
    private storage: Storage) {
  }

  create(name: string): Observable<Quizz> {

    return this.http.get('/api/quizz?userName=' + name)
      .map(response => {
        let quizz = response.json() as Quizz;
        console.log(quizz);
        // Store anwser propals received from server
        this.setQuizz(quizz);
        // Store new structure for upcoming answers
        this.setQuizzResponses(quizz.id, new QuizzResponses());
        return quizz;
      })
      .catch(error => this.handleError(error));
  }

  getQuestionIndex(id: string): number {
    const resp = this.getQuizzResponses(id);
    return resp.responses.length;
  }

  getQuestion(id: string, index: number): Question {
    return this.getQuizz(id).questions[index];
  }

  getResult(id: string): QuizzResult {
    return this.getQuizzResult(id);
  }

  getPhoto(id: string, index: number): Observable<Photo> {
    return this.http.get(`/api/quizz/${id}/${index}`)
      .map(response => {
        let photo = response.json() as Photo;
        console.log('Photo ', photo);
        return photo;
      })
      .catch(error => this.handleError(error));
  }

  addResponse(id: string, response: string): boolean {
    const resp = this.getQuizzResponses(id);
    resp.responses.push(response);
    this.setQuizzResponses(id, resp);
    // continuer s'il y a pas d'autres questions
    return resp.responses.length !== this.getQuizz(id).questions.length;
  }

  sendResponses(id: string): Observable<QuizzResult> {
    // TODO utiliser le service Http pour faire le POST api/quizz/id pour envoyer les réponses
    // TODO utiliser la fonction map pour retourner le résultat, il faut aussi enregistrer le résultat avec setQuizzResult
    // TODO utiliser QuizzService.handleError pour traiter les éventuelles erreurs
    return Observable.throw('A implémenter');
  }

  private getQuizz(id: string): Quizz {
    return JSON.parse(this.storage.getItem(`quizz-${id}`)) as Quizz;
  }

  private setQuizz(quizz: Quizz) {
    this.storage.setItem(`quizz-${quizz.id}`, JSON.stringify(quizz));
  }

  private getQuizzResponses(id: string): QuizzResponses {
    return JSON.parse(this.storage.getItem(`responses-${id}`)) as QuizzResponses;
  }

  private setQuizzResponses(id: string, quizzResponses: QuizzResponses) {
    this.storage.setItem(`responses-${id}`, JSON.stringify(quizzResponses));
  }
  private getQuizzResult(id: string): QuizzResult {
    return JSON.parse(this.storage.getItem(`result-${id}`)) as QuizzResult;
  }

  private setQuizzResult(id: string, quizzResult: QuizzResult) {
    this.storage.setItem(`result-${id}`, JSON.stringify(quizzResult));
  }
}

