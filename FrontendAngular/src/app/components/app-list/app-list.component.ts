import { Component, OnInit } from '@angular/core';

import { Article } from 'src/app/models/article.model';
import { AppserviceService } from 'src/app/services/appservice.service';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {
  articles?: Article[];
  currentArticle: Article = {};
  currentIndex = -1;
  title= '';
   

  constructor(private appserviceService: AppserviceService) { }

  ngOnInit(): void {
    this.retrieveArticles();
  }

  retrieveArticles(): void {
    this.appserviceService.getAll().subscribe(
      (data) => {
        this.articles = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.retrieveArticles();
    this.currentArticle = {};
    this.currentIndex = -1;
  }
  setActiveArticle(article: Article, index: number): void {
    this.currentArticle = article;
    this.currentIndex = index;
  }

  removeAllArticles(): void {
    this.appserviceService.deleteAll().subscribe(
      (response) => {
        console.log(response);
        this.refreshList();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  searchTitle(): void {
    this.currentArticle = {};
    this.currentIndex = -1;

    this.appserviceService.findByTitle(this.title).subscribe(
      (data) => {
        this.articles = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
