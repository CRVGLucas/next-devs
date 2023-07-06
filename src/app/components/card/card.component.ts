import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() post: any;
  @Input() type: any;
  constructor() { }

  ngOnInit(): void {
  }

  toLimitText(text = '', limit = 50, elipsi?: string): string{
    return `${text.substring(0,limit)}${elipsi}`
  }

}
