import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaucetDialogComponent } from './components/faucet-dialog/faucet-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FaucetDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'lto-faucet';
}
