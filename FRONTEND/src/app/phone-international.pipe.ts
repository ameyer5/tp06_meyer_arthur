import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneInternational'
})
export class PhoneInternationalPipe implements PipeTransform {
  // The phone number in input will be formatted to the international format
  transform(phone: string): unknown {
    phone = phone.replace("-", "");
    phone = phone.charAt(0) != "0" ? "0" + phone : "" + phone;

    let internationalPhone = "";     let i = 0;
    for (; i < Math.floor(phone.length / 2) - 1; i++) {
      internationalPhone = internationalPhone + phone.substr(i * 2, 2) + "-";
    }

    return internationalPhone + phone.substr(i * 2);
  }
}
