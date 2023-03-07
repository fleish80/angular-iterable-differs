import {
  Directive,
  DoCheck,
  ElementRef,
  inject,
  Input, KeyValueChangeRecord,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[angularIterableDiffersMyNgStyle]',
  standalone: true
})
export class MyNgStyleDirective implements DoCheck{

  #myNgStyle!: {[key: string]: string};
  #differ!: KeyValueDiffer<string, string>;

  #differs = inject(KeyValueDiffers);
  #elementRef = inject(ElementRef);
  #renderer = inject(Renderer2);

  @Input('angularIterableDiffersMyNgStyle') set myNgStyle(value:  {[key: string]: string}) {
    this.#myNgStyle = value;
    if (!this.#differ && value) {
      this.#differ = this.#differs.find(this.#myNgStyle).create()
    }
  }

  ngDoCheck(): void {
    if (this.#differs) {
      const changes: KeyValueChanges<string, any> | null = this.#differ.diff(this.#myNgStyle);
      if (changes) {
        changes.forEachAddedItem((record: KeyValueChangeRecord<string, any>) => this.#setStyle(record.key, record.currentValue));
        changes.forEachChangedItem((record: KeyValueChangeRecord<string, any>) => this.#setStyle(record.key, record.currentValue));
        changes.forEachRemovedItem((record: KeyValueChangeRecord<string, any>) => this.#setStyle(record.key, null));
      }
    }
  }

  #setStyle(nameAndUnit: string, value: string | null) {
    const [name, unit] = nameAndUnit.split('.');
    value = value && unit ? `${value}${unit}` : value;
    this.#renderer.setStyle(this.#elementRef.nativeElement, name, value);
  }

}
