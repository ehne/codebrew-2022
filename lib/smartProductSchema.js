import { date, object, string, boolean } from "yup";


const smartProductSchema = (productsList) => object({
  productName: string().min(1).test(
    'in-product-list',
    'This product is not in our database. Use the manual entry mode.',
    async (value, ctx) => {

      const filtered = productsList.filter(i => {
        if (i.label == value) {
          return true
        } else {
          return false
        }
      })
      console.log(filtered)
      return filtered.length === 1;
    }
  ).required(),
  isOpened: boolean().required(),
  expiryDate: date().required(),
  storageLocation: string().matches(/(Refrigerator|Freezer|Shelf)/).required(),
  addedDate: date().required()
})

export default smartProductSchema