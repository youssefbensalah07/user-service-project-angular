import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',
    loadComponent: () =>
      import('./components/user-list/user-list.component').then(m => m.UserListComponent),  }, // الصفحة الرئيسية تظهر الفورم
  { path: 'form',
    loadComponent: () =>
      import('./components/user-form/user-form.component').then(m => m.UserFormComponent), },    // للمستقبل، إدخال جديد
  { path: 'form/:id',
    loadComponent: () =>
      import('./components/user-form/user-form.component').then(m => m.UserFormComponent),}  // لتعديل مستخدم موجود
];
