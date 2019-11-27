import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  constructor() { }
  res(v1, v2, op) {
    if (op == '+'){
      return v1+v2;
    }
    if (op == '-'){
      return v1-v2;
    }
    if (op == '*'){
      return v1*v2;
    }
    if (op == '/'){
      return v1/v2;
    }
  }
  precedence(x) {
    if (x == '+' || x == '-') {
        return 1;
    }
    if (x == '*' || x == '/') {
      return 1;
  }
    return 0;
  }
  evaluate(stri) {
    if(stri.length==0){
      return stri;
    }
    let latters = /^[A-Za-z]+$/;
    console.log(stri);
    const values = [];
    const ops = [];
    let i = 0;
    while (i < stri.length) {
      //console.log("loop")
      //console.log(stri[i])
      //console.log(values);
      //console.log(ops);
      //console.log(!isNaN(stri[i]));
      if (stri.charAt(i).match(latters)){
        return "0";
      }
      if (stri.charAt(i) == ' ') {
        i += 1;
        continue;
      } else if (stri.charAt(i) == '(') {
        ops.push(stri.charAt(i));
      } else if (!isNaN(stri.charAt(i))) {
        let val = '';
        while (i < stri.length && (!isNaN(stri.charAt(i)) || stri.charAt(i) == '.')) {
          val += stri.charAt(i);
          i += 1;
        }
        values.push(parseFloat(val));
        continue;
      } else if (stri.charAt(i) == ')') {
        while (ops.length != 0 && ops[ops.length - 1] != '(') {
          const v1 = values.pop();
          const v2 = values.pop();
          const op = ops.pop();
          values.push(this.res(v1, v2, op));
        }
        ops.pop();
      } else {
        // tslint:disable-next-line: triple-equals
        while (ops.length != 0 && this.precedence(ops[ops.length - 1]) >= this.precedence(stri.charAt(i))) {
          const v1 = values.pop();
          const v2 = values.pop();
          const op = ops.pop();
          values.push(this.res(v1, v2, op));
        }
        ops.push(stri.charAt(i));
      }
      i+=1;
    }
    while (ops.length != 0) {
      const v1 = values.pop();
      const v2 = values.pop();
      const op = ops.pop();
      values.push(this.res(v1, v2, op));
    }
    console.log(values);
    console.log(ops)
    return values[0].toString(10);
  }
}
