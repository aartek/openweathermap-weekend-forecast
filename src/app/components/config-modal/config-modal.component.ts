import {Component} from '@angular/core';
import {ModalRef} from '@fundamental-ngx/core';
import {HttpClient} from "@angular/common/http";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {ConfigValidatorService} from "../../services/config-validator.service";

@Component({
  selector: 'fd-config-modal',
  templateUrl: './config-modal.component.html',
  styles: ['.action-button {margin-left: 12px}']
})
export class ConfigModalComponent {

  form: FormGroup;
  data: any;

  constructor(public modalRef: ModalRef, private httpClient: HttpClient, private formBuilder: FormBuilder, private configValidator: ConfigValidatorService) {
    this.form = this.formBuilder.group({
      json: [modalRef.data.config ? JSON.stringify(modalRef.data.config, null, 4) : '',
        [Validators.required, this.jsonValidator(), this.schemaValidator()]]
    })
  }

  close(){
    this.modalRef.close(this.form.get('json').value)
  }

  cancel(){
    this.modalRef.dismiss('')
  }

  jsonValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      try {
        JSON.parse(control.value)
        return null;
      } catch (e) {
        return {'invalidJSON': {value: control.value}}
      }
    };
  }

  schemaValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.configValidator.isValid(control.value)) {
        return null;

      } else {
        return {'invalidConfig': true}
      }
    };
  }

  fillWithExample(){
    this.form.setValue({'json': JSON.stringify(this.modalRef.data.defaultConfig, null, 4)})
  }

}
