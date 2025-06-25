import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  keyword: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe(users => this.users = users);
  }

  deleteUser(id?: number): void {
    if (id === undefined) return;
  
    const confirmed = confirm('هل أنت متأكد أنك تريد حذف هذا المستخدم؟');
    if (confirmed) {
      this.userService.delete(id).subscribe(() => {
        alert('✅ تم الحذف بنجاح');
        this.loadUsers();
      });
    }
  }

  search(): void {
    if (this.keyword.trim()) {
      this.userService.search(this.keyword).subscribe(users => this.users = users);
    } else {
      this.loadUsers();
    }
  }

  goToForm(id?: number): void {
    if (id !== undefined) {
      this.router.navigate(['/form', id]);
    } else {
      this.router.navigate(['/form']);
    }
  }
}