import React from 'react';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {Button} from 'baseui/button';
import {DatePicker} from 'baseui/datepicker';
import {ChevronRight} from 'baseui/icon';
import {Checkbox} from 'baseui/checkbox';
import { Formik, Form } from 'formik';
import { useDB } from 'react-pouchdb';
import superjson from 'superjson';

import productSchema from '../../lib/productSchema';
import { useRouter } from 'next/router';


const Manual = () => {
  const db = useDB()
  const router = useRouter();

  return (
    <Formik
      initialValues={{'productName': '', 'expiryDate': new Date(), 'isOpened': false}}
      validationSchema={productSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          // TODO: clean up ID system for db items
          db.put({
            '_id': `${values.expiryDate.getTime() + Math.random()}`,
            ...superjson.serialize({
              addedDate: (new Date()),
              ...values,
            }), 
          })
          setSubmitting(false);
          router.push('/')
        }, 400);
      }}
    >
      {({values, handleBlur, handleChange, isSubmitting, errors}) => (
        <Form>
          <FormControl
            label={() => "Product name"}
            error={errors.productName}
          >
            <Input
              name="productName"
              value={values.productName}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl
            label={() => "Expiry date"}
            error={errors.expiryDate}
          >
            <DatePicker
              name="expiryDate"
              value={values.expiryDate}
              onChange={({date}) => handleChange({type: 'change', target: {type: 'text', value: date, name: 'expiryDate'}})}
              onBlur={handleBlur}
            />
          </FormControl>
          <FormControl>
          <Checkbox
            name="isOpened"
            checked={values.isOpened}
            onChange={handleChange}
            onBlur={handleBlur}
            //checkmarkType="toggle"
            //labelPlacement="left"
          >
            This product is opened
          </Checkbox>
          </FormControl>
          
          <Button
            type="submit"
            endEnhancer={ChevronRight}
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
    
  );
}

export default Manual;
