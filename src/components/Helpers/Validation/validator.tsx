type FieldValueType=(value: string)=> string |undefined

export const requiredField: FieldValueType = (value) => {
  if (value) {
    return undefined;
  }
  return 'Field is required';
};

export const maxLengthCreator = (maxLength:number):FieldValueType => (value) => {
  if (value.length > maxLength) {
    return `Max length is ${maxLength} symbols`;
  }
  return undefined;
};
