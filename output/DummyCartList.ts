export type DummyCartList = {
  id: number
  productId: number
  name: string
  brandName: string
  color: string
  price: number
  discountPrice: number
  thumbnail: string
  count: number
  size: string
  flags: string[]
  productStockCount: number
  productStocks?: {
    color: string
    size: string
    count: number
  }[]
  isLiked: boolean
  checked: boolean
}
