import { Component, Input, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../notification/notification.component';
import { getIPService } from '../../core/services/getIp.service';
import { LTORepository } from '../../core/repository/lto.repository';
import { requestPayload } from '../../core/types/requestPayload';
import { LTOservice } from '../../core/services/LTOService.service';

@Component({
  selector: 'app-faucet-dialog',
  standalone: true,
  imports: [
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './faucet-dialog.component.html',
  styleUrl: './faucet-dialog.component.scss',
})
export class FaucetDialogComponent implements OnInit {
  amount: number = 0;
  amountState: boolean = false;
  address = new FormControl('');
  amountText: string = 'Amount';
  ipInfo: any;
  err: boolean = false;
  timestamp: number = Date.now();

  @Input() info = '';

  constructor(
    private _snackBar: MatSnackBar,
    private ipService: getIPService,
    private ltoRepository: LTORepository
  ) {}

  ngOnInit(): void {
    this.ipService.getIpInfo().subscribe(
      (data) => (this.ipInfo = data),
      (error) => console.error('Error fetching IP info:', error)
    );
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(NotificationComponent, {
      data: { message },
      duration: 5000,
    });
  }

  submit() {
    this.timestamp = Date.now();

    if (this.amount > 0 && this.address.value !== '') {
      const payload: requestPayload = {
        address: this.address.value,
        amount: this.amount,
        ip: this.ipInfo.ip,
        timestamp: this.timestamp,
      };

      const valid = LTOservice.isValidAddress(this.address.value || '');
      if (!valid) {
        this.openSnackBar('The address you provided is invalid');
        return;
      }

      this.ltoRepository.getTokens(payload).subscribe({
        next: (response) => {
          if (response.status == 200) {
            this.openSnackBar(`${payload.amount} LTO Sent!`);
          } else {
            this.openSnackBar(`You cannot request tokens at this time`);
          }
        },
        error: () => {
          this.openSnackBar(`You cannot request tokens at this time`);
        },
      });
    } else {
      this.openSnackBar('Invalid details');
    }
  }

  getAmount(value: number) {
    this.amountState = true;
    this.amount = value;
    this.amountText = value.toString();
  }
}
