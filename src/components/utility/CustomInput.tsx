import React, { Fragment } from 'react'

interface IProps {
  elementId: string,
  elementType: string,
  labelText: string,
  value: string | number | boolean,
  action: Function
}
const CustomInput: React.FC<IProps> = ({ elementId, elementType, labelText, value, action }) => {

  

  const getInputType = () => {
    switch (elementType) {
      case "checkbox":
        return <input type="checkbox" name={elementId} id={elementId} checked={value as boolean} onChange={(e) => action(e.currentTarget.checked)} />
      case "date":
        return <input type="date" name={elementId} id={elementId} value={value as string} onChange={(e) => action(e.currentTarget.value)} />
      default:
        return <input type="text" name={elementId} id={elementId} value={value as string} onChange={(e) => action(e.currentTarget.value)} />
    }
  }

  return (
    <Fragment>
      <label htmlFor={ elementId }>{ labelText }</label>
      { getInputType() }
    </Fragment>
  )
}

export default CustomInput
