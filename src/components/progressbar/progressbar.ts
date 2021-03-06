import {Component, View, Attribute, onChange, coreDirectives} from 'angular2/angular2';

// TODO: write unit tests
// TODO: move view template into file (template bundling in build process needed)

@Component({
  selector: 'boot-progressbar',
  properties: ['value'],
  lifecycle: [onChange],
  directives: [coreDirectives]
})
@View({
  template: `
  <div class="progress">
    <div class="progress-bar" role="progressbar"
      [style.width]="percentWidth" aria-valuemin="0" [attr.aria-valuemax]="max">
      <content></content>
      <span class="sr-only">{{percentWidth}}</span>
    </div>
  </div>
  `
})
export class Progressbar {
  value: number;
  percentWidth: string;
  max: number;

  constructor(@Attribute('value') value, @Attribute('max') max) {
    this.value = value || 0;
    this.max = max || 100;
  }

  _computePercentWidth(value: number) {
    this.percentWidth = +(100 * value / this.max).toFixed(2) + '%';
  }

  onChange(changes) {
    if (changes['value']) {
      this._computePercentWidth(changes['value'].currentValue)
    }
  }
}
