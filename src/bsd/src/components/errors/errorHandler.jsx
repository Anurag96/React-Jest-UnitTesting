
import '../../css/error.css'
export default function ErrorHandler({error}) {
    return (
      <div role="alert" className="alert">
        <p>An error occurred:</p>
        <pre>{error.message}</pre>
      </div>
      
    )
    
}
