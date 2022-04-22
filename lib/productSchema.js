import { date, object, string, boolean } from "yup";

const productSchema = object({
  productName: string().min(1).required(),
  isOpened: boolean().required(),
  expiryDate: date().required()
})

export default productSchema