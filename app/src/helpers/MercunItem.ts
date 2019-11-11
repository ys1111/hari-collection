// export type MercunItem = any;

// @TODO Json type declaration
export type MercunItem = Array<{
  id: string
  name: string
  description: string
  like_count: number
  cot_count: number
  price: number
  is_sold_out: boolean
  shipping_fee: string
  image: string
  category_id: number
}>