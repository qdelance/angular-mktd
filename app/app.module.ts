import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { QuestionComponent } from './quizz/question/question.component';

import { QuizzService } from './shared/quizz/quizz.service'

import { SharedModule } from './shared/shared.module';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule.forRoot()
  ],
  declarations: [AppComponent, QuestionComponent],
  providers: [
    QuizzService,
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: Storage, useValue: sessionStorage},
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
