import {Component, ElementRef, ViewChild} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  dataSource : any;
  private name: any;
  private Inteligencename: any;
  private Power: any;
  constructor(private  store: AngularFirestore){}
  ngOnInit(){
    this.getAll();
  }
  @ViewChild('btnShow')
  btnShow!: ElementRef;

  @ViewChild('btnClose')
  btnClose!: ElementRef;

  openDialog(){
    this.btnShow.nativeElement.click();
  }

  closeDialog(){
    this.btnClose.nativeElement.click();
  }
  getAll() {
    this.store.collection('superheros').snapshotChanges().subscribe((response) => {
      this.dataSource = response.map(item =>
        Object.assign({id: item.payload.doc.id}, item.payload.doc.data())
      );
    });
  }
   add(){
     this.store.collection('superheros').add({Inteligence:this.Inteligencename, name: this.name, Power : this.Power});
     this.closeDialog();
   }
}
