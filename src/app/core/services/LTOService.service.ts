import { Injectable } from '@angular/core';
import LTO from '@ltonetwork/lto';

export const lto = new LTO('T');

@Injectable({ providedIn: 'root' })
export class LTOservice {
  public static isValidAddress(address: string): boolean {
    try {
      return lto.isValidAddress(address);
    } catch (e) {
      return false;
    }
  }
}
