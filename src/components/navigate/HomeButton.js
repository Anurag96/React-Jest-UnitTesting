import { useNavigate } from 'react-router-dom';

const useHome = () => {

  const navigate = useNavigate();

  const handleClientChange = () => { navigate(`/home`);};


  return {
    handleClientChange
  };
};


export default useHome