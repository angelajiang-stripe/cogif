export type Store = {
    id: number,
    name: string,
    stripe_account_id: string,
    description?: string,
    products?: Array<Product>
}

export type Stores = Array<Store>

export type Product = {
  id: number,
  name: string,
  image: string,
  price: number
  stores?: Store
}

export type Products = Array<Product>

export type Order = {
  id: number,
  created_at: string,
  products: Product
}

export type Orders = Array<Order>