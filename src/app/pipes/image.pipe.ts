import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image',
  standalone: true
})
export class ImagePipe implements PipeTransform {

  transform(posterPath: string, size: string = 'w400'): string {
    if (!posterPath) {
      return 'assets/no-image.svg';
    }
    return `${environment.imageUrl}/${size}${posterPath}`;
  }

}
