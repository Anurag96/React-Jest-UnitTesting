import WrapperComponent from './WrapperComponent'

function ParentComponent(){
  return(
    <div className="ParentComponent">
        <a href="https://dev.to/peterlidee/returning-values-from-mocks-jest-mocking-react-part-3-3lfn">Reference Doc</a> 
      <div>Parent Component</div>
      <WrapperComponent>
        <div>Textblock 1.</div>
        <div>Textblock 2.</div>
      </WrapperComponent>
      <WrapperComponent>
        <div>Textblock 3.</div>
        <div>Textblock 4.</div>
      </WrapperComponent>
    </div>
  )
}
export default ParentComponent