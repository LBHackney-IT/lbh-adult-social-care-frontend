import React from 'react';

export default function BackToTop({children, to}) {
  return (
    <a href={to} className="lbh-back-to-top" data-module="lbh-back-to-top">
      <svg
        className="lbh-back-to-top__icon"
        width="31px"
        height="31px"
        viewBox="0 0 31 31"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(1.000000, 1.000000)">
          <circle
            className="lbh-back-to-top__icon-circle"
            strokeWidth="1"
            fillRule="evenodd"
            cx="14.5"
            cy="14.5"
            r="14.5"
           />
          <g className="lbh-back-to-top__icon-arrow" transform="translate(9.000000, 9.000000)" fillRule="nonzero">
            <path d="M0.736944572,6.32306662 L0.177622538,5.77803817 C-0.0592075126,5.54726035 -0.0592075126,5.17408771 0.177622538,4.94576498 L5.07295007,0.173083361 C5.30978012,-0.0576944537 5.69273935,-0.0576944537 5.92704993,0.173083361 L10.8223775,4.9433099 C11.0592075,5.17408771 11.0592075,5.54726035 10.8223775,5.77558308 L10.2630554,6.32061154 C10.0237059,6.55384444 9.63318827,6.54893427 9.39887769,6.31079121 L6.50904718,3.35487111 L6.50904718,10.41078 C6.50904718,10.7373061 6.23946404,11 5.90437471,11 L5.09814475,11 C4.76305543,11 4.49347229,10.7373061 4.49347229,10.41078 L4.49347229,3.35487111 L1.60112231,6.31324629 C1.36681173,6.55384444 0.976294091,6.5587546 0.736944572,6.32306662 Z" />
          </g>
        </g>
      </svg>
      <span className="lbh-back-to-top__text">{children}</span>
    </a>
  );
}
