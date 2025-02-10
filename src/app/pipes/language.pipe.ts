import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'language',
  standalone: true
})
export class LanguagePipe implements PipeTransform {
  private languageMap: { [key: string]: string } = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'Deutsch',
    it: 'Italian',
    pt: 'Portuguese',
    ja: 'Japanese',
    zh: 'Chinese',
    ko: 'Korean',
  };

  transform(code: string): string {
    return this.languageMap[code] || code;
  }
}
