class Product {
  id: number;
  product_name: string;
  price: number;
  discount: number;
  image: string;

  constructor(id: number, product_name: string, price: number, discount: number, image: string) {
    this.id = id;
    this.product_name = product_name;
    this.price = price;
    this.discount = discount;
    this.image = image;
  }
}
export default Product;
