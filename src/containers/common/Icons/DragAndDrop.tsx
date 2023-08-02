/* eslint-disable max-len */
import { SVGProps } from 'react';

const DragAndDropIcon = (props: SVGProps<any>) => {
  return (
    <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7 3.5H3L5 0.5L7 3.5Z" fill="#1D73E3" />
      <rect y="5.5" width="10" height="1" fill="#1D73E3" />
      <rect y="8.5" width="10" height="1" fill="#1D73E3" />
      <rect y="11.5" width="10" height="1" fill="#1D73E3" />
      <path d="M7 14.5H3L5 17.5L7 14.5Z" fill="#1D73E3" />
    </svg>

  );
};

export default DragAndDropIcon;
