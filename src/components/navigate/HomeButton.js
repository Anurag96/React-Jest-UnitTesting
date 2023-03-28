import { useNavigate } from 'react-router-dom';

const HomeButton = () => {

  const navigate = useNavigate();

  const handleClientChange = () => { navigate(`/home`);};

  return (
    handleClientChange
  );
};

export default HomeButton