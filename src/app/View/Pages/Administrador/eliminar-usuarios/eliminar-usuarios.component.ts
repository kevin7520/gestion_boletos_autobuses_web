import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eliminar-usuarios',
  templateUrl: './eliminar-usuarios.component.html',
  styleUrls: ['./eliminar-usuarios.component.Scss']
})
export class EliminarUsuariosComponent implements OnInit {

  constructor() { }

  sizeTable = { name: 'Small', class: 'p-datatable-sm' };
    
  productos: any[] = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
  },
  {
    id: '1001',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: 'bamboo-watch.jpg',
    price: 65,
    category: 'Body',
    quantity: 24,
    inventoryStatus: 'INSTOCK',
    rating: 5
},
{
  id: '1000',
  code: 'f230fh0g301234567890',
  name: 'Aamboo Watch',
  description: 'Product Description',
  image: 'bamboo-watch.jpg',
  price: 65,
  category: 'Accessories',
  quantity: 24,
  inventoryStatus: 'INSTOCK',
  rating: 5
}
  ]
  ngOnInit() {
  }

}
