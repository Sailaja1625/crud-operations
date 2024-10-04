import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './product.service';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTableModule, FormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud-operations';



  constructor(private ps: ProductService) { }


  displayedColumns: string[] = ['pid', 'ptitle', 'pcategory', 'prating', 'pstock'];

  showForm = false;

  products = [];
  formHeader = "Add Product";
  pid: any = "";
  ptitle: string = "";
  pcategory: string = "";
  pprice: any = "";
  prating: any = "";
  pstock: any = "";

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.ps.fetchProduct().subscribe(
      (data: any) => {
        this.products = data.products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      })
  }



  openForm(data: any = null) {
    this.clearForm();
    this.showForm = true;
    if (data) {
      this.pid = data.pid;
      this.ptitle = data.ptitle;
      this.pcategory = data.pcategory;
      this.pprice = data.pprice;
      this.prating = data.prating;
      this.pstock = data.pstock;
      this.formHeader = 'Edit Product'
    }

    else{
      this.pid = null,
      this.formHeader = 'Add Product'
    }

  }
  clearForm() {
    this.pid = null;
    this.ptitle = '';
    this.pcategory = '';
    this.pprice = null;
    this.prating = null;
    this.pstock = null;

  }

  saveProduct() {
    this.showForm = false;
    let body = {
      id: this.pid,
      title: this.ptitle,
      category: this.pcategory,
      price: this.pprice,
      rating: this.prating,
      stock: this.pstock


    }
    this.ps.postProduct(body).subscribe(
      (res) => {
        this.getProducts()
      }
    )

    // console.log('body',body)
    // if(this.pid){
    //   body['id']=this.pid;
    //   this.ps.putProduct(body).subscribe(
    //     (res)=>{
    //       this.getProducts()
    //     }
    //   )

    // }
    // else{

    // }
  }
  cancelForm() {
    this.showForm = false;
  }

  editForm() {
    this.showForm = true;
    let body = {
      id: this.pid,
      title: this.ptitle,
      category: this.pcategory,
      price: this.pprice,
      rating: this.prating,
      stock: this.pstock
    }

    this.ps.putProduct(body, this.pid).subscribe(
      (res) => {
        this.getProducts()
      }
    )


  }

}
