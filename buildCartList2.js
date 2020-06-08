const { cart: cartData } = require("./input/cart.json")
const { like } = require("./input/like.json")
const { product } = require("./input/products.json")

const productData = product.reduce((acc, cur) => {
  acc[cur.id] = cur
  return acc
}, {})

const likeData = like.reduce((acc, cur) => {
  if (!cur.like) return acc

  acc[cur.productId] = true
  return acc
}, {})

const buildCartList = (productData, likeData, cartData) =>
  cartData.map((cart) => {
    const { productId } = cart
    const product = productData[productId]
    const productStock = product.productStocks.find(
      (stock) => stock.color === cart.color && stock.size === cart.size,
    )

    return {
      ...product,
      ...cart,
      productStockCount: productStock ? productStock.count : 0,
      productStocks: product.productStocks,
      isLiked: likeData[productId],
      checked: true,
    }
  })

const cartList = buildCartList(productData, likeData, cartData)
console.log(JSON.stringify(cartList, null, 4))
