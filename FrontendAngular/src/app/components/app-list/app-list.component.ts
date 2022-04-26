import { Component, OnInit } from '@angular/core';

import { Article } from 'src/app/models/article.model';
import { NFTsales } from 'src/app/models/nftsales.model';
import { AppserviceService } from 'src/app/services/appservice.service';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent implements OnInit {
  nftsales?: NFTsales[];
  currentNftSale: NFTsales = {};
  currentIndex = -1;
  Date= '';
   

  constructor(private appserviceService: AppserviceService) { }

  ngOnInit(): void {
    this.retrieveNftSales();
  }

  retrieveNftSales(): void {
    this.appserviceService.getAll().subscribe(
      (data) => {
        this.nftsales = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  refreshList(): void {
    this.retrieveNftSales();
    this.currentNftSale = {};
    this.currentIndex = -1;
  }
  setActiveNftSale(nftsale: NFTsales, index: number): void {
    this.currentNftSale = nftsale;
    this.currentIndex = index;
  }

  removeAllNftSales(): void {
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

  searchDate(): void {
    this.currentNftSale = {};
    this.currentIndex = -1;

    this.appserviceService.findByDate(this.Date).subscribe(
      (data) => {
        this.nftsales = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
