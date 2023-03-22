import PropTypes from 'prop-types';


 const Greet = (props) => {
  return (
    <div>
     {`Hello ${props.name}`}
    </div>
  )
}

Greet.propTypes = {
  name: PropTypes.string
};

export default Greet

