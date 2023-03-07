import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'iterable-differs'
    },
    {
        path: 'iterable-differs',
        loadComponent: () => import('./iterable-differs.component').then(c => c.IterableDiffersComponent),
        title: 'Iterable Differs',
    },
    {
        path: 'employees',
        loadComponent: () => import('./employee.component').then(c => c.EmployeeComponent),
        title: 'Employees',
    },
    {
        path: 'my-ng-style',
        loadComponent: () => import('./my-ng-style.component').then(c => c.MyNgStyleComponent),
        title: 'My Ng Style',
    },
];
