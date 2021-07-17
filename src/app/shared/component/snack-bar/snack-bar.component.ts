import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent implements OnInit {
  countDown = interval(100).pipe(
    take(99),
    map((i) => 98 - i)
  );

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: string,
    public snackBarRef: MatSnackBarRef<SnackBarComponent>
  ) {}

  ngOnInit(): void {}
}
