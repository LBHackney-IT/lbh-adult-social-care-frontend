import React from "react";

const Breadcrumbs = ({ values, className = '' }) => {
  return (
    <div className={`breadcrumbs${className ? ' ' + className : ''}`}>
      {values.map((item, index) => {
        const isLastItem = (index + 1) === values.length;
        return (
          <div key={item.text}>
            <p onClick={() => item.onClick && item.onClick()}
              className={`breadcrumbs__item${item.onClick ? ' text-underline green' : ''}`}
            >{item.text}
            </p>
            {!isLastItem && <span> › </span>}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
