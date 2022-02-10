import { ErrorMessage, Field, Form, Formik } from 'formik';
import { stringify } from 'querystring';
import React from 'react';
import { useSelector } from 'react-redux';
import { FilterType } from '../../redux/users-reducer';
import { getUsersFilter } from '../../redux/users-selectors';

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type PropsType = {
  onFilterChange: (filter: FilterType) => void;
};
type FriendFromType = 'true' | 'false' | 'null';
type FormType = {
  term: string;
  friend: FriendFromType;
};
const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
  const submit = (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    const filter: FilterType = {
      term: values.term,
      friend: values.friend === 'true' ? true : values.friend === 'false' ? false : null,
    };
    props.onFilterChange(filter);
  };

  let filter = useSelector(getUsersFilter);

  return (
    <div>
      <Formik
        initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFromType }}
        validate={usersSearchFormValidate}
        onSubmit={submit}>
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field name="friend" as="select">
              <option value="null">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});
export default UsersSearchForm;
