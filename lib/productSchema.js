import { date, object, string, boolean } from "yup";

const productSchema = object({
  productName: string().min(1).required(),
  isOpened: boolean().required(),
  expiryDate: date().required(),
  storageLocation: string().matches(/(Refrigerator|Freezer|Shelf)/).required(),
})

export default productSchema