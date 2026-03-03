import { getURL_IMG } from '../../firebase/apiImg';
import Image from '../uix/Image';
import './style.scss'
import like from '/src/assets/like.svg'

const PostOneCard = ({uid, item, onOpenOneUserPost}) => {
  return (
    <div className="post-card-wrap" onClick={() => onOpenOneUserPost(item.id)} >
      
      <div className="post-card-img">
        <Image src={getURL_IMG(uid, item.id)} alt="post-photo" />
        <span className='post-card-like'>{item.like.length}<img src={like} alt="" /></span>
      </div>
      <div className="post-card-content">{item.title}</div>
      <div className="background"></div>
    </div>
  );
};

export default PostOneCard;
