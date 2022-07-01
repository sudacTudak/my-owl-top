export const API = {
  topPage: {
    find: process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find',
    byAlias: process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/',
    textSearch: process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/textSearch',
  },
  product: {
    find: process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find'
  },
  review: {
    createDemo: process.env.NEXT_PUBLIC_DOMAIN + '/api/review/create-demo'
  }
};
