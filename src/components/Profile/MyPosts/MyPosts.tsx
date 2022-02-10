import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { requiredField, maxLengthCreator } from '../../Helpers/Validation/validator';
import { Textarea } from '../../common/FormsControl/FormsControl';
import { PostType } from '../../../types/types';
/* const MyPosts = (props) => {
  let postsElements = props.posts.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} />
  ));

  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>

      <div>
        <div>
          <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText} />
        </div>
        <div>
          <button onClick={onAddPost}>Add post</button>
        </div>
      </div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
}; */
const maxLength20 = maxLengthCreator(20);

type PropsType={

}
type PostTextValuesType={
  NewPostText: string 
}
const AddNewPost: React.FC <InjectedFormProps<PostTextValuesType,PropsType > & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component={Textarea} name={'NewPostText'} validate={[requiredField, maxLength20]} />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};
const ReduxAddNewPost= reduxForm<PostTextValuesType, PropsType> ({
  form: 'myPost',
})(AddNewPost);


export type MapStatePropsType={
  posts:Array<PostType>,  
}
export type MapDispatchToProps={
  addPost:(NewPostText: string)=>void
}
const MyPosts: React.FC<MapStatePropsType & MapDispatchToProps> = (props) => {
  console.log('log');
  let postsElements = props.posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ));
  let onAddPost = (values:PostTextValuesType) => {
    props.addPost(values.NewPostText);
    values.NewPostText = '';
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <ReduxAddNewPost onSubmit={onAddPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};
export default MyPosts;
