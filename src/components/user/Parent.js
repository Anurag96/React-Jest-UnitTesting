import React from 'react'
import Child from './Child'
import SubChild from './SubChild'
import User from './User'

function Parent() {
    
    const user = <User name={"Anurag"} />
    return (
        <>
            <div>Parent Component</div>
            <Child user={user} />
            <SubChild/>

        </>
    )
}

export default Parent
