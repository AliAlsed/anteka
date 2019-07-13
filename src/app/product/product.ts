import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-product',
  templateUrl: './product.html',
  styleUrls: ['./product.scss'],
})
export class ProductPage implements OnInit {
  key: any;
  ngOnInit(): void {
    console.log(this.route.snapshot.data);
    this.route.queryParams.subscribe((res) => {
      console.log(res.item);
      this.key = res.item;
      this.list = this.db.list(`products/${res.item}`).snapshotChanges();
      console.log(this.list + '      ' + this.key)
    });
  }
  list: Observable<any>;
  constructor(
    public db: AngularFireDatabase,
    private route: ActivatedRoute,
    public router: Router,
  ) { }

  object = {
    description: '',
    image: '',
    name: '',
    price: '',
    status: '',
    userid: ''
  }
  buy(item: any) {
    this.object.description = item.description;
    this.object.image = item.image;
    this.object.name = item.name;
    this.object.price = item.price;
    this.object.status = item.status ? item.status : 'غير معلوم';
    this.object.userid = item.userid;
    console.log(this.object);
    this.router.navigate(['/selectedproduct/'],
      {
        queryParams: {
          'description': this.object.description,
          'image': this.object.image,
          'name': this.object.name,
          'price': this.object.price,
          'status': this.object.status,
          'uid': this.object.userid
        },
      });
  }

}
