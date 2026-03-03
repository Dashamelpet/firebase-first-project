import React, { useState } from 'react'
import { getAvatarURL_IMG } from '../../firebase/apiImg'
import defoultAvatar from '../../assets/user-photo.svg'

const Avatar = ({uid, onClick= () => {}}) => {
    const [avatar, setAvatar] = useState(getAvatarURL_IMG(uid))
    const onError = () => {
        setAvatar(defoultAvatar)
    }
  return (
    <img src={avatar} className='user-avatar' alt="avatar" onClick={onClick} onError={onError} />
  )
}

export default Avatar
