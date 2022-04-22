import React from 'react';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {Combobox} from 'baseui/combobox';
import {Button} from 'baseui/button';
import {DatePicker} from 'baseui/datepicker';
import {ChevronRight, Plus} from 'baseui/icon';
import {Checkbox} from 'baseui/checkbox';
import { Formik, Form } from 'formik';

const Manual = () => {
  return (
    <Formik
      initialValues={{'productName': '', 'expiryDate': [new Date()], 'isOpened': false}}
      validate={(v)=>{}}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
        }, 400);
      }}
    >
      {({values, handleBlur, handleChange, isSubmitting}) => (
        <Form>
          <FormControl
            label={() => "Product name"}
          >
            <Input
              name="productName"
              value={values.productName}
              onBlur={handleBlur}
              onChange={e => {console.log(e); handleChange(e)}}
            />
          </FormControl>
          <FormControl
            label={() => "Expiry date"}
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
