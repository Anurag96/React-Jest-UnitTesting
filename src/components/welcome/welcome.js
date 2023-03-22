import React from 'react'

function welcome(props) {
  return (
    <div>
      <span>
      {`Hello ${props.name}`}
      </span>
    </div>
  )
}

export default welcome
