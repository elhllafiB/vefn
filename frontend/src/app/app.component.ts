import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './components/app-header.component';
import { AppFooterComponent } from './components/app-footer.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeaderComponent, AppFooterComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'boutique-app';

  constructor(
    private translate: TranslateService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    // Configuration de la langue par défaut
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');
  }
}
