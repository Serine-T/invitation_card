import { SVGProps } from 'react';

const MinusIcon = (props: SVGProps<any>) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M9.184 13.048V11.98H14.068V13.048H9.184Z" fill="#1D73E3" />
      <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#1D73E3" />
    </svg>
  );
};

export default MinusIcon;
