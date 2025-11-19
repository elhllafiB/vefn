import { renderApplication } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

export default function render() {
  return renderApplication(AppComponent, appConfig);
}
