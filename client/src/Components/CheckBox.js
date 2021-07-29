import React from 'react'

export const CheckBox = props => {
    console.log('here are the props for checkbox: ', props)
    return (
      <li>
       <input key={props.id}
          name={props.value}
          onChange={props.handleCheckedElements} 
          type="checkbox" 
          checked={props.isChecked} 
          value={props.value} 
        /> 
       <span>{props.value}</span>
      </li>
    )
}

export default CheckBox