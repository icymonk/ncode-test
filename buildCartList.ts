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

const buildCartList = (
  products: Product[],
  likes: Like[],
  carts: Cart[],
): DummyCartList[] =>
  carts.map(
    ({ id, productId, color, size, count }, index): DummyCartList => {
      const product = products[index]
      const like = likes[index]
      const stock = product.productStocks.find(
        (stock) => stock.color === color && stock.size === size,
      )

      return {
        id,
        productId,
        color,
        size,
        count,
        name: product.name,
        brandName: product.brandName,
        price: product.price,
        discountPrice: product.discountPrice,
        thumbnail: product.thumbnail,
        flags: product.flags,
        productStockCount: stock?.count ?? 0,
        productStocks: product.productStocks,
        isLiked: like?.like ?? false,
        checked: true,
      }
    },
  )

const cartList: DummyCartList[] = buildCartList(products, likes, carts)
console.log(JSON.stringify(cartList, null, 4))
