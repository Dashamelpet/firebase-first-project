
import { useNavigate } from 'react-router-dom'
import { getURL_IMG } from '../../firebase/apiImg'
const TopOneCard = ({item}) => {//{uid, id, name}
    const navigate = useNavigate();
  return (
    <div className='top-card-item' onClick={() => navigate('/posts/' + item.uid +'/'+ item.id)}>
        <img src={getURL_IMG(item.uid, item.id)} alt="" />
        
        <div>{item.name}</div>
        <div className='background'></div>
    </div>
  )
}

export default TopOneCard
