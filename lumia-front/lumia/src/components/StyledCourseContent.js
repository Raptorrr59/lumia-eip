import React from 'react';

const StyledCourseContent = ({ html }) => {
  return (
    <div className='pb-14'
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default StyledCourseContent;
