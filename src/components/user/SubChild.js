import React from 'react'
function SubChild(props) {
  return (
    <div>
      {`SubComponent is used by ${props.name} `}
    </div>
  )
}

export default SubChild
