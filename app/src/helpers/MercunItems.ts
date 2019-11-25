import { MercunItem } from './MercunItem'

// export type MercunItems = any[];


// export interface JSONData {
//   [name: string] : JSONData|number|string|boolean| JSONData[]
// }

// @TODO Json type declaration

export type MercunItems = {
  [data: string]: MercunItem
}