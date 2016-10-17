import { Component, OnInit } from '@angular/core';
import { QuizzService, Photo, Question } from '../../shared/index';

@Component({
  moduleId: module.id,
  selector: 'mktd-question',
  templateUrl: 'question.component.html',
  styleUrls: ['question.component.css'],
})
export class QuestionComponent implements OnInit {

  photo: Photo;
  response: string = null;
  question: Question;
  private quizzId: string;
  private index: number;

  /**
   * Créer un nouveau QuestionComponent avec le service QuizzService injecté.
   *
   * @param {QuizzService} quizzService - le service QuizzService injecté.
   */
  constructor(private quizzService: QuizzService) {
    this.quizzId = 'quizz-templating';
    this.index = 0;
  }

  /**
   * Initialise le composant
   */
  ngOnInit() {
    this.load();
  }

  /**
   * Répondre à cette question
   * @return {boolean} - false pour éviter le comportement par défaut du submit d'un formulaire HTML.
   */
  next(): boolean {
    const hasNext = this.quizzService.addResponse(this.quizzId, this.response);
    if (hasNext) {
      const next = this.quizzService.getQuestionIndex(this.quizzId);
      this.index = next;
      this.load();
    } else {
      // On est dans une version 'dégradé' de l'application, ça de doit pas arrivé
    }
    return false;
  }

  private load() {
    // Charge la photo
    this.quizzService.getPhoto(this.quizzId, this.index)
      .subscribe(photo => this.photo = photo);

    // Charge la question
    this.question = this.quizzService.getQuestion(this.quizzId, this.index);
  }
}
