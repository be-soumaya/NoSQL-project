import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { AppserviceService } from 'src/app/services/appservice.service';
@Component({
  selector: 'app-add-app',
  templateUrl: './add-app.component.html',
  styleUrls: ['./add-app.component.css']
})
export class AddAppComponent implements OnInit {

  article: Article = {
    title: '',
    description: '',
    published: false,
  };
  submitted = false;

  constructor(private appserviceService: AppserviceService) { }

  ngOnInit(): void {}

  saveArticle(): void {
    const data = {
      title: this.article.title,
      description: this.article.description,
    };

    this.appserviceService.create(data).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newArticle(): void {
    this.submitted = false;
    this.article = {
      title: '',
      description: '',
      published: false,
    };
  }

}
