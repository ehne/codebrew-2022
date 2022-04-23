import { Alert } from 'baseui/icon';
import React from 'react';
import EmptyState from '../EmptyState';


const Camera = () => (<EmptyState Icon={Alert} action={()=>{}} text="This input mode is under development" kind="warning"/>)

export default Camera;