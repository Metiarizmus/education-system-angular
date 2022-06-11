import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusSort'
})
export class StatusSortPipe implements PipeTransform {

  transform(value: any[]): any {
    console.log(value)

    return value.sort((one, two) => (one.progressTasks[0].progressTaskEnum > two.progressTasks[0].progressTaskEnum ? -1 : 1));

  }

}
