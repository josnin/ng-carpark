import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

import { MatButtonModule, 
         MatToolbarModule, 
         MatInputModule, 
         MatProgressSpinnerModule, 
         MatCardModule, 
         MatGridListModule,
         MatTooltipModule,
         MatStepperModule,
         MatExpansionModule,
         MatListModule,
         MatIconModule,
         MatSidenavModule,
         MatFormFieldModule,
         MatChipsModule,
         MatAutocompleteModule} from '@angular/material';

@NgModule({
    imports: [MatButtonModule, 
              MatToolbarModule, 
              MatInputModule, 
              MatProgressSpinnerModule, 
              MatCardModule, 
              MatExpansionModule, 
              MatIconModule,
              MatGridListModule,
              MatTooltipModule,
              MatStepperModule,
              MatListModule,
              MatSidenavModule,
              MatFormFieldModule,
              MatChipsModule,
              MatAutocompleteModule,
              LayoutModule],
    exports: [MatButtonModule, 
              MatToolbarModule, 
              MatInputModule, 
              MatProgressSpinnerModule, 
              MatCardModule, 
              MatExpansionModule,
              MatIconModule,
              MatGridListModule,
              MatTooltipModule,
              MatStepperModule,
              MatListModule,
              MatSidenavModule,
              MatFormFieldModule,
              MatChipsModule,
              MatAutocompleteModule,
              LayoutModule]
})

export class MaterialModule {}
