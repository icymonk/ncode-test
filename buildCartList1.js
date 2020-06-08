const { cart: carts } = require("./input/cart.json")
const { like: likes } = require("./input/like.json")
const { product: products } = require("./input/products.json")

const findProductById = (products, productId) =>
  products.find((product) => product.id === productId)
const findStockByColorSize = (stocks, color, size) =>
  stocks.find((stock) => stock.color === color && stock.size === size)
const findLikeById = (likes, productId) =>
  likes.find((like) => like.productId === productId)

const buildCartList = (products, likes, carts) =>
  carts.map(({ id, productId, color, size, count }) => {
    const product = findProductById(products, productId)
    const stock = findStockByColorSize(product.productStocks, color, size)
    const likeData = findLikeById(likes, productId)

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
      productStockCount: stock ? stock.count : 0,
      productStocks: product.productStocks,
      isLiked: likeData ? likeData.like : false,
      checked: true,
    }
  })

const cartList = buildCartList(products, likes, carts)
console.log(JSON.stringify(cartList, null, 4))
