import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-show-pass-on-note',
    templateUrl: './show-pass-on-note.page.html',
    styleUrls: ['./show-pass-on-note.page.scss'],
})
export class ShowPassOnNotePage implements OnInit {


    showmessage: any;
    constructor(public activatedRoute: ActivatedRoute, private router: Router, ) {
        this.activatedRoute.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                this.showmessage = this.router.getCurrentNavigation().extras.state.mymessage;
            }
        })
    }

    ngOnInit() {
    }

}
