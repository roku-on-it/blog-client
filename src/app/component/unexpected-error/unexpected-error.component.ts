import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unexpected-error',
  templateUrl: './unexpected-error.component.html',
  styleUrls: ['./unexpected-error.component.scss'],
})
export class UnexpectedErrorComponent implements OnInit {
  emailString =
    'mailto:tyserract@gmail.com?subject=Blog%20Incident%20Report\n' +
    '&body=' +
    'Steps%20to%20reproduce%20the%20issue:\n' +
    '%0A' +
    '(e.g.%2C%20 1: I selected the Technology category)' +
    '%0A' +
    '(e.g.%2C%20 2: I clicked the Read post button)' +
    '%0A%0A%0A' +
    'The%20page%20where%20you%20encountered%20the%20problem:' +
    '%0A' +
    '(e.g.%2C%20 ' +
    document.location.origin +
    '/categories/technology-6812548705698661376)';

  constructor() {}

  //the page where you encountered the problem
  ngOnInit(): void {}
}
