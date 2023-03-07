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

interface Employee {
    id: number;
    name: string;
}

@Component({
    selector: 'angular-iterable-differs-employee',
    standalone: true,
    imports: [CommonModule],
    template: `
        <button (click)="click()">CLICK ME</button>
    `,
    styles: [],
})
export class EmployeeComponent implements DoCheck {

    employee1: Employee = {id: 1, name: 'Joe'};
    employee2: Employee = {id: 2, name: 'Dog'};

    employees = [this.employee1, this.employee2];

    employee3: Employee = {id: 1, name: 'Joe'};

    differ: IterableDiffer<Employee> = inject(IterableDiffers).find(this.employees).create(this.trackBy);

    click() {
        this.employees = [this.employee3, this.employee2];
    }

    ngDoCheck(): void {
        console.clear();

        const changes: IterableChanges<Employee> | null = this.differ.diff(this.employees);
        if (changes) {
            changes.forEachAddedItem((record: IterableChangeRecord<Employee>) => console.log('added', record));

            changes.forEachMovedItem((record: IterableChangeRecord<Employee>) => console.log('moved', record));

            changes.forEachRemovedItem((record: IterableChangeRecord<Employee>) => console.log('removed', record));
        }
    }

    trackBy(index: number, employee: Employee) {
        return employee.id;
    }

}
