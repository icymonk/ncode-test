// deno run --alow-read buildCartList3.ts
export type Cart = {
  id: number
  productId: number
  color: string
  size: string
  count: number
}

export type Like = {
  productId: number
  like: boolean
}
export type ProductFlag = "sales" | "???"
export type ProductStock = {
  color: string
  size: string
  count: number
}
export type Product = {
  id: number
  name: string
  brandName: string
  gender: number
  price: number
  discountPrice: number
  thumbnail: string
  flags: ProductFlag[]
  productStocks: ProductStock[]
}

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

const { cart: carts } = JSON.parse(Deno.readTextFileSync("./input/cart.json"))
const { like: likes } = JSON.parse(Deno.readTextFileSync("./input/like.json"))
const { product: products } = JSON.parse(
  Deno.readTextFileSync("./input/products.json"),
)

const findProductById = (products: Product[], productId: number) =>
  products.find((product: Product) => product.id === productId)
const findProductStock = (stocks: ProductStock[], cartInfo: Cart) =>
  stocks.find(
    (stock: ProductStock) =>
      stock.color === cartInfo.color && stock.size === cartInfo.size,
  )
const findLikeById = (likes: Like[], productId: number) =>
  likes.find((like: Like) => like.productId === productId)

const buildCartList = (products: Product[], likes: Like[], carts: Cart[]) =>
  carts.map(
    (cartInfo: Cart): DummyCartList => {
      const { productId } = cartInfo
      const product = findProductById(products, productId)
      const productStock = findProductStock(
        product ? product.productStocks : [],
        cartInfo,
      )
      const likeData = findLikeById(likes, productId)

      return {
        id: cartInfo.id,
        productId,
        name: product ? product.name : "",
        brandName: product ? product.brandName : "",
        color: cartInfo.color,
        price: product ? product.price : 0,
        discountPrice: product ? product.discountPrice : 0,
        thumbnail: product ? product.thumbnail : "",
        count: cartInfo.count,
        size: cartInfo.size,
        flags: product ? product.flags : [],
        productStockCount: productStock ? productStock.count : 0,
        productStocks: product ? product.productStocks : [],
        isLiked: likeData ? likeData.like : false,
        checked: true,
      }
    },
  )

const cartList: DummyCartList[] = buildCartList(products, likes, carts)
console.log(JSON.stringify(cartList, null, 4))
