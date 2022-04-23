import React from 'react';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {Combobox} from 'baseui/combobox';
import {Button} from 'baseui/button';
import {DatePicker} from 'baseui/datepicker';
import {ChevronRight} from 'baseui/icon';
import {Checkbox} from 'baseui/checkbox';
import { Formik, Form } from 'formik';
import { useDB } from 'react-pouchdb';
import superjson from 'superjson';
import { useRouter } from 'next/router';
import {v4 as uuid} from 'uuid';
import productSchema from '../../lib/productSchema';

const Manual = () => {
  const db = useDB()
  const router = useRouter();

  return (
    <Formik
      initialValues={{'productName': '', 'expiryDate': new Date(), 'isOpened': false, 'storageLocation': 'Shelf'}}
      validationSchema={productSchema}
      onSubmit={(values, { setSubmitting }) => {
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
          <FormControl
            label={() => "Storage location"}
            error={errors.storageLocation}
          >
            <Combobox
              name="storageLocation"
              value={values.storageLocation}
              onBlur={handleBlur}
              onChange={value => handleChange({type: 'change', target: {type: 'text', value, name: 'storageLocation'}})}
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
