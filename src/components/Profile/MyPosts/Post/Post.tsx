import React from 'react';
import s from './Post.module.css';

type PropsType={
  message: string;
  likesCount: number;
}
const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <img src="https://avatars.mds.yandex.net/get-zen_doc/3683451/pub_5efb3ff066fe1d5006536937_5efb4cb267cc5e13be1840cc/scale_1200"></img>
      {props.message}
      <div>
        <span>
          <img src="https://img.icons8.com/ios/452/love-circled.png"></img>
        </span>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  );
};

export default Post;
