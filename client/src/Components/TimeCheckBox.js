import React from 'react'

export const TimeCheckBox = props => {
    console.log('here are the props for checkbox: ', props)
    return (
      <li>
       <input key={props.id}
          name={props.value}
          onChange={props.handleCheckedTimes} 
          type="checkbox" 
          checked={props.isChecked} 
          value={props.value} 
        /> 
       {props.value}
      </li>
    )
}

export default TimeCheckBox