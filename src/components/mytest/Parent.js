import React from 'react'
import Child from './Child'
function Parent() {
  const mydata = {
    message: 'Hello',
    title: 'test title',
    subTitle: 'test subTitle',
    description: 'test description'
  }
  return (
    <div className="ParentComponent">
      <div>Parent Component</div>
      {/* <Child message={'Hello'}/> */}
      {/* {Child(message:'Hello')} */}
      {Child(mydata)}
    </div>
  )
}

export default Parent
