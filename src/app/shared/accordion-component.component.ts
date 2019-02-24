import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-accordion-component',
  templateUrl: './accordion-component.component.html',
  styleUrls: ['./accordion-component.component.scss']
})
export class AccordionComponentComponent implements OnInit {
  @Input()
  title: string;
  @Input()
  hasJustViewed: boolean;
  panelExpanded = true;

  constructor() { }

  ngOnInit() {
  }

}
