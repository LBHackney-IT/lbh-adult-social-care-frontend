import React from "react";

const Breadcrumbs = ({values, onClickBreadcrumb}) => {
  return (
    <div className='breadcrumbs'>
      {values.map((item, index) => {
        const isLastItem = (index + 1) === values.length;
        return (
          <>
            <p key={item.text} onClick={() => onClickBreadcrumb(item)}
              className={`breadcrumbs__item${item.onClick ? ' text-underline green' : ''}`}
            >{item.text}
            </p>
            {isLastItem && <span> > </span>}
          </>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
