import { Component, OnInit } from '@angular/core';
import { QuizzService, QuizzResult, Photo, Question } from '../../shared/index';

@Component({
  moduleId: module.id,
  selector: 'mktd-question',
  templateUrl: 'question.component.html',
  styleUrls: ['question.component.css'],
})
export class QuestionComponent implements OnInit {

  // step of the quizz, current question index
  index: number;

  // photo for the current question
  photo: Photo;

  // list of possible answers for current step
  question: Question;

  // bound to input (id of the answer of question for the current index)
  response: string = null;

  // initialized once all questions have been answered
  result: QuizzResult;

  // UUID of the quizz
  // set by API in initial call to get questions
  // reused in next calls to API to submit results or get photos
  private quizzId: string;

  /**
   * Créer un nouveau QuestionComponent avec le service QuizzService injecté.
   *
   * @param {QuizzService} quizzService - le service QuizzService injecté.
   */
  constructor(private quizzService: QuizzService) {
  }

  /**
   * Initialise le composant
   */
  ngOnInit() {
    // Créer un nouveau Quizz
    this.quizzService.create('Toto')
      .subscribe(quizz => {
        // Aprés création du Quizz, on initialise les attributs
        this.quizzId = quizz.id;
        this.index = 0;
        // puis on appel le service pour charger la question courante
        this.load();
      });
  }

  /**
   * Répondre à cette question
   * @return {boolean} - false pour éviter le comportement par défaut du submit d'un formulaire HTML.
   */
  next(): boolean {
    console.log('next');
    const hasNext = this.quizzService.addResponse(this.quizzId, this.response);
    if (hasNext) {
      console.log(`get question for index #${this.index}`);
      const next = this.quizzService.getQuestionIndex(this.quizzId);
      this.index = next;
      console.log(`again get question for index #${this.index}`);
      this.load();
    } else {
      console.log('no more question, posting result');
      // On est dans une version 'dégradé' de l'application, on affiche le résultat dans la console
      this.quizzService.sendResponses(this.quizzId)
        .subscribe(result => {
          console.log('Résultat', result);
          this.result = result;
        });
    }
    return false;
  }

  private load() {
    console.log(`load question for index #${this.index}`);
    // Charge la photo
    this.quizzService.getPhoto(this.quizzId, this.index)
      .subscribe(photo => this.photo = photo);

    // Charge la question
    this.question = this.quizzService.getQuestion(this.quizzId, this.index);
  }
}
