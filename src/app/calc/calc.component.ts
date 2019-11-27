import { Component, OnInit } from '@angular/core';
import { CalculateService} from '../calculate.service'
@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
  expression = '';
  constructor(private calculate: CalculateService) {
   }

  ngOnInit() {
  }
  insert(x) {
    this.expression += x;
  }
  clean() {
    this.expression = '';
  }
  back() {
    this.expression = this.expression.slice(0, -1);
  }
  equal() {
    console.log(this.expression);
    let res  = this.calculate.evaluate(this.expression);
    console.log(res);
    this.expression = res;
  }
}
