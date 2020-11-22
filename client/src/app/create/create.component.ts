import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../connection/connection.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(
    private connectionService: ConnectionService,
    private formBuilder: FormBuilder
  ) {
    this.createForm = formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  connect() {
    this.connectionService.connect();
  }

  onSubmit() {
    const formValues: {} = Object.assign({}, this.createForm.value);
    this.connect();
    console.log(formValues);
  }
}
