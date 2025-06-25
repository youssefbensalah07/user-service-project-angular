import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  userId?: number;
  private toastr = inject(ToastrService);
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('\\d{8,15}')]]
    });

    this.userId = +this.route.snapshot.paramMap.get('id')!;
    if (this.userId) {
      this.userService.get(this.userId).subscribe(user => 
        this.form.patchValue(user));
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const user: User = this.form.value;
    if (this.userId) {
      this.userService.update(this.userId, user).subscribe({
        next: () => {
          this.toastr.success('✅ تم التعديل بنجاح');
          this.router.navigate(['/']);
        },
        error: () => {
          this.toastr.error('❌ حدث خطأ أثناء التعديل');
        }
      });
    } else {
      this.userService.create(user).subscribe({
        next: () => {
          this.toastr.success('✅ تمت الإضافة بنجاح');
          this.router.navigate(['/']);
        },
        error: () => {
          this.toastr.error('❌ حدث خطأ أثناء الإضافة');
        }
      });
    }
  }
}
