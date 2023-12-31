import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { courseTitleValidator } from '../../validators/course-title.validator';

interface courseCategory {
  code: string,
  description: string
}

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss']
})
export class CreateCourseStep1Component implements OnInit {
  form = this.fb.group({
    title: ['', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ],
      asyncValidators: [courseTitleValidator(this.courses)],
      updateOn: 'blur'
    }],
    releaseAt: [new Date(), Validators.required],
    category: ['BEGINNER', Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: ['', [Validators.required, Validators.minLength(3)]]
  });

  coursesCategories$: Observable<courseCategory[]>;

  constructor(private fb: FormBuilder, private courses: CoursesService) {


  }

  ngOnInit() {
    this.coursesCategories$ = this.courses.findCourseCategories();

    const draft = localStorage.getItem('STEP_1');

    if(draft) {
      this.form.setValue(JSON.parse(draft));
    }

    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid)
      )
      .subscribe(val => localStorage.setItem('STEP_1', JSON.stringify(val)));
  }

  get courseTitle() {
    return this.form.controls['title'];
  }

}
