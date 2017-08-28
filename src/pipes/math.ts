import {Pipe} from '@angular/core';
 
@Pipe({
  name: 'add'
})
export class Add {
  transform(value, args) {
    return value;
  }
}