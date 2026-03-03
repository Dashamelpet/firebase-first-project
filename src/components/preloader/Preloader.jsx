import logo from '/src/assets/logo.svg';
import './style.scss';
const Preloader = ({ isGetUser }) => {
  const preloadClass = isGetUser === false ? 'preloader-wrapper' : 'preloader-wrapper hide';
  return (
    <div>
      <div className={preloadClass}>
        <img src={logo} alt="" className="logo" />
      </div>
    </div>
  );
};

export default Preloader;
