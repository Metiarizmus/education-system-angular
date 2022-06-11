import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'statusFilter'
})
export class StatusFilterPipe implements PipeTransform {

  transform(items: any, ...sel: any[]): any {

    if (sel[0] === 'ALL') {
      return items
    }

    console.log(items)

     if (!items) return null;
     if (!sel) return items;

    // @ts-ignore
    return sel ? items.filter(sal => sal.progressTasks[0].progressTaskEnum === sel[0]) : items;

  }

}
