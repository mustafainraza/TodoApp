import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './Header/Header.component';
import { TagsComponent } from './tags/tags.component';

@NgModule({
   declarations: [
      AppComponent,
      UserComponent,
      HeaderComponent,
      TagsComponent
   ],
   imports: [
	 BrowserModule,
	 AppRoutingModule,
	 SharedModule,
	 HomeModule,
	],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
