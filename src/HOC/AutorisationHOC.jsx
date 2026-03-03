import { useUserContext } from '../store/user/userContext';

const AutorisationHOC = (Component) => (props) => {
  const { user } = useUserContext();
  if (user === null) return <h1>No Found</h1>;

  return <Component {...props} />;
};

export default AutorisationHOC;
