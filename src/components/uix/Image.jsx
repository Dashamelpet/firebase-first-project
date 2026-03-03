import { useState } from 'react'
import defaultImgSRC from '/src/assets/placeholder-img.svg'

const Image = ({src, onClick = () => {}, defaultImg = defaultImgSRC, alt = 'img', className = ""} ) => {
        const [img, setImg] = useState(src)
        const onError = () => {
            setImg(defaultImg)
        }
      return (
        <img 
            src={img} 
            className={className}
            alt={alt} 
            onClick={onClick} 
            onError={onError} />
      )
    }

export default Image
