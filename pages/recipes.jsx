import React from 'react';
import { Alert } from 'baseui/icon';
import EmptyState from '../components/EmptyState';


const Recipes = () => (<EmptyState Icon={Alert} action={()=>{}} text="The recipe page is currently under development" kind="warning"/>)

export default Recipes;
