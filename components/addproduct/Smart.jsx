import React from 'react';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Combobox } from 'baseui/combobox';
import { Button } from 'baseui/button';
import { DatePicker } from 'baseui/datepicker';
import { Alert, ChevronRight, Plus } from 'baseui/icon';
import { Checkbox } from 'baseui/checkbox';
import { useFormik, Form } from 'formik';
import useProducts from '../../lib/useProducts';
import ErrorState from '../ErrorState';
import LoadingSpinner from '../LoadingSpinner';
import productSchema from '../../lib/productSchema';
import superjson from 'superjson';

const Smart = () => {
  const { productList, isLoading, isError } = useProducts();

  const formik = useFormik({
    initialValues: { 
      'productName': '', 
      'expiryDate': new Date(), 
      'isOpened': false, 
      'storageLocation': 'Shelf', 
      'purchasedDate': new Date() 
    },
    validationSchema: productSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // TODO: clean up ID system for db items
        db.put({
          '_id': `${values.expiryDate.getTime()}.${uuid()}`,
          ...superjson.serialize({
            addedDate: (new Date()),
            ...values,
          }),
        })
        setSubmitting(false);
        router.push('/')
      }, 400);
    },
  });

  // used for the search functionality of the product list combobox
  const filteredProductList = React.useMemo(() => {
    return productList.filter(option => {
      const optionAsString = option.label;
      return optionAsString
        .toLowerCase()
        .includes(formik.values.productName.toLowerCase());
    });
  }, [productList, formik.values.productName]);

  if (isError) {
    return (
      <ErrorState href="/addproduct" />
    )
  }

  if (isLoading) {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        label={() => "Product name"}
        error={formik.errors.productName}
        caption={() => "Try to use a more generic name of the product, rather than a brand name."}
      >
        <Combobox
          name="productName"
          value={formik.values.productName}
          onBlur={formik.handleBlur}
          onChange={value => formik.handleChange({ type: 'change', target: { type: 'text', value, name: 'productName' } })}
          options={filteredProductList}
          mapOptionToString={option => option.label}
          autocomplete
        />
      </FormControl>
      <FormControl
        label={() => "Expiry date"}
        error={formik.errors.expiryDate}
      >
        <DatePicker
          name="expiryDate"
          value={formik.values.expiryDate}
          onChange={({ date }) => formik.handleChange({ type: 'change', target: { type: 'text', value: date, name: 'expiryDate' } })}
          onBlur={formik.handleBlur}
        />
      </FormControl>
      <FormControl
        label={() => "Storage location"}
        error={formik.errors.storageLocation}
      >
        <Combobox
          name="storageLocation"
          value={formik.values.storageLocation}
          onBlur={formik.handleBlur}
          onChange={value => formik.handleChange({ type: 'change', target: { type: 'text', value, name: 'storageLocation' } })}
          options={[
            { label: "Freezer", id: "Freezer" },
            { label: "Refrigerator", id: "Refrigerator" },
            { label: "Shelf", id: "Shelf" },
          ]}
          mapOptionToString={option => option.label}
          autocomplete
        />
      </FormControl>
    </form>
  );
}

export default Smart;
