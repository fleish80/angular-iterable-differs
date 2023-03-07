import {
    Component,
    DoCheck,
    inject,
    IterableChangeRecord,
    IterableChanges,
    IterableDiffer,
    IterableDiffers
} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'angular-iterable-differs-iterable-differs',
    standalone: true,
    imports: [CommonModule],
    template: `
        <button (click)="click()">CLICK ME</button>
    `,
    styles: []
})
export class IterableDiffersComponent implements DoCheck {
    a: number[] = [1, 2, 3];
    differ: IterableDiffer<number> = inject(IterableDiffers).find(this.a).create();

    click() {
        this.a = [1, 3, 4];
    }

    ngDoCheck(): void {
        console.clear();

        const changes: IterableChanges<number> | null = this.differ.diff(this.a);
        if (changes) {
            changes.forEachAddedItem((record: IterableChangeRecord<number>) => console.log('added', record));

            changes.forEachMovedItem((record: IterableChangeRecord<number>) => console.log('moved', record));

            changes.forEachRemovedItem((record: IterableChangeRecord<number>) => console.log('removed', record));
        }
    }
}
