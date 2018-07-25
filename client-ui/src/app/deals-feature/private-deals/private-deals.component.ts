// public-deals.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Deal } from '../deal';
import { AuthService } from '../../auth-feature/auth.service';
import { DealService } from '../deal.service';

@Component({
  selector: 'app-private-deals',
  templateUrl: 'private-deals.component.html',
  styleUrls: ['private-deals.component.css']
})
export class PrivateDealsComponent implements OnInit, OnDestroy {
  dealsSub: Subscription;
  privateDeals: Deal[];
  error: any;

  // Note: We haven't implemented the Deal or Auth Services yet.
  constructor(
    public dealService: DealService,
    public authService: AuthService
  ) { }

  // When this component is loaded, we'll call the dealService and get our public deals.
  ngOnInit() {
    this.dealsSub = this.dealService
      .getPrivateDeals()
      .subscribe(
        deals => this.privateDeals = deals,
        err => this.error = err
      );
  }

  ngOnDestroy() {
    this.dealsSub.unsubscribe();
  }
}
