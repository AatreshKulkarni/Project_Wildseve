// // import { Component } from '@angular/core';
// // import { UserService } from './../../services/user.service';


// // @Component({
// //   selector: 'app-dashboard',
// //   templateUrl: 'login.component.html'
// // })
// // export class LoginComponent {

// //   constructor( private authService: UserService) {

// //   }
// //   onSubmit() {
// //     this.authService.login
// //   }
// // }

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { UserService } from '../../services/user.service';

// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   form: FormGroup;
//   private formSubmitAttempt: boolean;

//   constructor(
//     private fb: FormBuilder,
//     private authService: UserService
//   ) {}

//   ngOnInit() {
//     this.form = this.fb.group({
//       userName: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }

//   isFieldInvalid(field: string) {
//     return (
//       (!this.form.get(field).valid && this.form.get(field).touched) ||
//       (this.form.get(field).untouched && this.formSubmitAttempt)
//     );
//   }

//   onSubmit() {
//     if (this.form.valid) {
//       this.authService.login(this.form.value);
//     }
//     this.formSubmitAttempt = true;
//   }
// }

