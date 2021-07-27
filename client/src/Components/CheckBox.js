import React from 'react'

export const CheckBox = props => {
    return (
      <li>
       <input key={props.id} onChange={props.handleCheckedElements} type="checkbox" checked={props.isChecked} value={props.value} /> 
       {props.value}
      </li>
    )
}

export default CheckBox