import { useMyContext } from '../store/context';

function Home() {
  const { data, changeSetData } = useMyContext();

  return <div onClick={changeSetData}>{data}</div>;
}

export default Home;
