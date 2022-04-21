import React from 'react';
import { Block } from 'baseui/block';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {Combobox} from 'baseui/combobox';
import {Button} from 'baseui/button';
import {DatePicker} from 'baseui/datepicker';
import {ChevronRight, Plus} from 'baseui/icon';


const Addproduct = () => {
  return (
    <Block>
      <FormControl
        label={() => "Product name"}
        caption={() => "Try to use a more generic name of the product, rather than a brand name."}
      >
        <Combobox
          value=""
          onChange={()=>{}}
          options={[
            { label: "AliceBlue", id: "#F0F8FF" },
            { label: "AntiqueWhite", id: "#FAEBD7" },
            { label: "Aqua", id: "#00FFFF" },
            { label: "Aquamarine", id: "#7FFFD4" },
            { label: "Azure", id: "#F0FFFF" },
            { label: "Beige", id: "#F5F5DC" }
          ]}
          mapOptionToString={option => option.label}
          autocomplete
          isLoading
        />
      </FormControl>
      <FormControl
        label={() => "Date purchased"}
      >
        <DatePicker
          value={[new Date()]}
          onChange={({ date }) =>
            alert(Array.isArray(date) ? date : [date])
          }
        />
      </FormControl>
      <Button
        onClick={() => alert("click")}
        endEnhancer={ChevronRight}
      >
        Submit
      </Button>
    </Block>
  );
}

export default Addproduct;
