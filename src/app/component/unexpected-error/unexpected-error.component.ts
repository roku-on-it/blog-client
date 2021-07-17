import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SnackBarComponent } from 'src/app/shared/component/snack-bar/snack-bar.component';
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
    '(e.g.%2C%20 1: I selected the xyz category)' +
    '%0A' +
    '(e.g.%2C%20 2: I clicked the Read post button)' +
    '%0A%0A%0A' +
    'The%20page%20where%20you%20encountered%20the%20problem:' +
    '%0A' +
    '(e.g.%2C%20 ' +
    document.location.origin +
    '/categories/technology-6812548705698661376)';

  constructor(private router: Router, private snackBar: MatSnackBar) {
    this.handleHttpFailure(
      router.getCurrentNavigation()?.extras.state?.err,
      snackBar
    );
  }

  ngOnInit(): void {}

  handleHttpFailure = (err: any, snackBar: MatSnackBar) => {
    if (null != err?.message) {
      if (/http failure/gi.test(err?.message)) {
        snackBar.openFromComponent(SnackBarComponent, {
          data:
            'Server is not responding. ' +
            'Please check your internet connection or try again later',
          duration: 1000000,
          panelClass: ['snack-error'],
        });
      } else {
        snackBar.openFromComponent(SnackBarComponent, {
          data: err?.message,
          duration: 1000000,
        });
      }

      return throwError(err);
    }

    return throwError(err);
  };
}
