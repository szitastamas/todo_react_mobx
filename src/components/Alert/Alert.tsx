import React from 'react'
import IAlert from '../../store/models/interfaces/Alert/IAlert'

const Alert: React.FC<{alert: IAlert}> = ({ alert }) => {
  return (
    <div className={`alert ${alert.type}`}>
      { alert.text }
    </div>
  )
}

export default Alert
