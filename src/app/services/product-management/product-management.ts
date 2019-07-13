import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
@Injectable()
export class ProductManagementProvider {

  constructor(public db : AngularFireDatabase) {
  }
  addProducts(category:string,userid:string,name:string,price:number,description:string,image:string,status:string){
    return  this.db.list(`waitingproducts/${category}`).push({
      userid : userid,
      name:name,
      description:description,
      image:image,
      price:price,
      status:status
    }).then(()=>{
      this.db.list(`myproducts/${userid}`).push({
        name:name,
        description:description,
        image:image,
        price:price,
        status:status
      }).then((product)=>{
        console.log(product);
      });
    });
  }

 async buy(count,name,desc,price,img,username,address,phone){
    return await this.db.list(`paid`).push({
      count:count,
      name:name,
      desc:desc,
      price:price,
      img:img,
      username:username,
      address:address,
      phone:phone,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    });
  }

}
