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
import superjson from 'superjson';
import { Block } from 'baseui/block';
import { useDB } from 'react-pouchdb';
import {v4 as uuid} from 'uuid';
import { useRouter } from 'next/router';
import smartProductSchema from '../../lib/smartProductSchema';

const Smart = () => {
  const db = useDB();
  const router = useRouter();
  const { productList, isLoading, isError } = useProducts();
  const [state, setState] = React.useState('beforeInput');

  const formik = useFormik({
    initialValues: { 
      'productName': '', 
      'expiryDate': new Date(), 
      'isOpened': false, 
      'storageLocation': 'Shelf', 
      'addedDate': new Date() 
    },
    validationSchema: smartProductSchema(productList),
    onSubmit: (values, { setSubmitting }) => {
      // if we're already showing suggestions, we can just then take 
      // the submit handler to update the db
      if (state === 'showSuggestions') {
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
      } else {
        // find new suggestions
        // convert time to format recognised by api YYYY-MM-DD
        const dd = values.addedDate.getDate().toString().padStart(2, '0');
        const mm = (values.addedDate.getMonth() + 1).toString().padStart(2, '0');
        const yyyy = values.addedDate.getFullYear().toString().padStart(4, '0');
        
        const queries = `item=${encodeURIComponent(values.productName)}&storageMethod=${encodeURIComponent(values.storageLocation)}&opened=${values.isOpened}&time=${yyyy}-${mm}-${dd}`
        console.log(queries)
        fetch(`/api/getExpiry2?${queries}`)
          .then(res => res.json())
          .then(data => {
            if(data.type === 'error') {
              throw "BadStorage";
            }
            return data
          })
          .then(data=>{
            console.log(data)
            setState('showSuggestions')
            formik.handleChange({ type: 'change', target: { type: 'text', value: (new Date(data.expiry)), name: 'expiryDate' } })
          }).catch(e => {
            if (e === 'BadStorage') {
              alert('Bad storage type for food item. Please select a different method')
              setState('beforeInput')
            } else {
              setState('error')
            }
            console.error(e)
          }).finally(_ => {
            setSubmitting(false);
          })
      }
    },
  });

  // used for the search functionality of the product list combobox
  const filteredProductList = React.useMemo(() => {
    if (isLoading) return productList;

    return productList.filter(option => {
      const optionAsString = option.label;
      return optionAsString
        .toLowerCase()
        .includes(formik.values.productName.toLowerCase());
    });
  }, [productList, formik.values.productName, isLoading]);

  if (isError || state === 'error') {
    return (
      <ErrorState href="/addProduct?t=1" />
    )
  }

  if (isLoading) {
    return (
      <LoadingSpinner />
    )
  }

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off" autoCorrect="off" autoCapitalize="off">
      <FormControl
        label={() => "Product name"}
        error={formik.errors.productName}
        caption={() => "Try to use a more generic name of the product, rather than a brand name."}
      >
        <Combobox
          name="productName"
          disabled={formik.isSubmitting || state === 'showSuggestions'}
          value={formik.values.productName}
          onBlur={formik.handleBlur}
          onChange={value => formik.handleChange({ type: 'change', target: { type: 'text', value, name: 'productName' } })}
          options={filteredProductList}
          mapOptionToString={option => option.label}
          autocomplete
        />
      </FormControl>
      <FormControl
        label={() => "Date purchased"}
        error={formik.errors.addedDate}
      >
        <DatePicker
          name="addedDate"
          disabled={formik.isSubmitting || state === 'showSuggestions'}
          value={formik.values.addedDate}
          onChange={({ date }) => formik.handleChange({ type: 'change', target: { type: 'text', value: date, name: 'addedDate' } })}
          onBlur={formik.handleBlur}
        />
      </FormControl>
      <FormControl
        label={() => "Storage location"}
        error={formik.errors.storageLocation}
      >
        <Combobox
          name="storageLocation"
          disabled={formik.isSubmitting || state === 'showSuggestions'}
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
      <FormControl>
        <Checkbox
          name="isOpened"
          checked={formik.values.isOpened}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting || state === 'showSuggestions'}
          //checkmarkType="toggle"
          //labelPlacement="left"
        >
          This product is opened
        </Checkbox>
      </FormControl>
      <Button
        endEnhancer={ChevronRight}
        type="submit"
        disabled={formik.isSubmitting || state === 'showSuggestions'}
        isLoading={formik.isSubmitting && state !== 'showSuggestions'}
      >
        Continue
      </Button>
      <Block marginTop="scale1000"/>
      {
        state === 'showSuggestions' ? (
          <>
            <FormControl
              label={() => "Suggested expiry date"}
              error={formik.errors.expiryDate}
              caption={() => "From our database, this is the suggested expiry date. Feel free to change it."}
            >
              <DatePicker
                name="expiryDate"
                value={formik.values.expiryDate}
                onChange={({ date }) => formik.handleChange({ type: 'change', target: { type: 'text', value: date, name: 'expiryDate' } })}
                onBlur={formik.handleBlur}
              />
            </FormControl>
            <Button
              endEnhancer={ChevronRight}
              type="submit"
              disabled={formik.isSubmitting}
              isLoading={formik.isSubmitting}
            >
              Submit
            </Button>
          </>
        ) : ''
      }
      
    </form>
  );
}

export default Smart;
