import React from 'react'

function Child(props) {
  return (
    <>
      {/* {`Hello ${props.name}`} */}
      <div className="ChildComponent">
        {`Child component 
      ${props.message}
      ${props.title} 
      ${props.subTitle}
      ${props.description}
      `}
      </div>
    </>
  )
}

export default Child
