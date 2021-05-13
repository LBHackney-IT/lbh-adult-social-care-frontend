import { ReactComponent as HackneyLogoSvg } from "../../assets/icons/hackney_logo.svg";
import { ReactComponent as CalendarIconSvg } from "../../assets/icons/icon_calendar.svg";
import { ReactComponent as ArrowLeftIconSvg } from "../../assets/icons/icon_arrow_left.svg";
import { ReactComponent as CheckGreenIconSvg } from "../../assets/icons/icon_check_green.svg";
import { ReactComponent as CheckIconSvg } from "../../assets/icons/icon_check.svg";
import { ReactComponent as CaretRightIconSvg } from "../../assets/icons/icon_caret_right.svg";
import { ReactComponent as CaretDownIconSvg } from "../../assets/icons/icon_caret_down.svg";
import { ReactComponent as CaretRightHighlightIconSvg } from "../../assets/icons/icon_caret_right_highlight.svg";
import React from "react";

const HackneyLogo = () => {
  return <HackneyLogoSvg />;
};

const HackneyFullLogo = () => {
  return (
    <svg width="172" height="47" viewBox="0 0 172 47" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="172" height="33" fill="url(#pattern0)"/>
      <path d="M9.07031 46L7.92969 42.8281H3.5625L2.44531 46H0.476562L4.75 34.5312H6.78125L11.0547 46H9.07031ZM7.4375 41.2188L6.36719 38.1094C6.28906 37.901 6.17969 37.5729 6.03906 37.125C5.90365 36.6771 5.8099 36.349 5.75781 36.1406C5.61719 36.7812 5.41146 37.4818 5.14062 38.2422L4.10938 41.2188H7.4375ZM15.2812 46.1562C14.2031 46.1562 13.362 45.7656 12.7578 44.9844C12.1536 44.2031 11.8516 43.1068 11.8516 41.6953C11.8516 40.2786 12.1562 39.1771 12.7656 38.3906C13.3802 37.599 14.2292 37.2031 15.3125 37.2031C16.4479 37.2031 17.3125 37.6224 17.9062 38.4609H18C17.9115 37.8411 17.8672 37.3516 17.8672 36.9922V33.8438H19.7109V46H18.2734L17.9531 44.8672H17.8672C17.2786 45.7266 16.4167 46.1562 15.2812 46.1562ZM15.7734 44.6719C16.5286 44.6719 17.0781 44.4609 17.4219 44.0391C17.7656 43.612 17.9427 42.9219 17.9531 41.9688V41.7109C17.9531 40.6224 17.776 39.849 17.4219 39.3906C17.0677 38.9323 16.513 38.7031 15.7578 38.7031C15.112 38.7031 14.6146 38.9661 14.2656 39.4922C13.9167 40.013 13.7422 40.7578 13.7422 41.7266C13.7422 42.6849 13.9115 43.4167 14.25 43.9219C14.5885 44.4219 15.0964 44.6719 15.7734 44.6719ZM28.4297 46L28.1719 44.8672H28.0781C27.8229 45.2682 27.4583 45.5833 26.9844 45.8125C26.5156 46.0417 25.9792 46.1562 25.375 46.1562C24.3281 46.1562 23.5469 45.8958 23.0312 45.375C22.5156 44.8542 22.2578 44.0651 22.2578 43.0078V37.3594H24.1094V42.6875C24.1094 43.349 24.2448 43.8464 24.5156 44.1797C24.7865 44.5078 25.2109 44.6719 25.7891 44.6719C26.5599 44.6719 27.125 44.4427 27.4844 43.9844C27.849 43.5208 28.0312 42.7474 28.0312 41.6641V37.3594H29.875V46H28.4297ZM34.3281 46H32.4922V33.8438H34.3281V46ZM40.1797 44.6719C40.6276 44.6719 41.0755 44.6016 41.5234 44.4609V45.8438C41.3203 45.9323 41.0573 46.0052 40.7344 46.0625C40.4167 46.125 40.0859 46.1562 39.7422 46.1562C38.0026 46.1562 37.1328 45.2396 37.1328 43.4062V38.75H35.9531V37.9375L37.2188 37.2656L37.8438 35.4375H38.9766V37.3594H41.4375V38.75H38.9766V43.375C38.9766 43.8177 39.0859 44.1458 39.3047 44.3594C39.5286 44.5677 39.8203 44.6719 40.1797 44.6719ZM54.1953 42.8984C54.1953 43.9141 53.8281 44.7109 53.0938 45.2891C52.3594 45.8672 51.3464 46.1562 50.0547 46.1562C48.763 46.1562 47.7057 45.9557 46.8828 45.5547V43.7891C47.4036 44.0339 47.9557 44.2266 48.5391 44.3672C49.1276 44.5078 49.6745 44.5781 50.1797 44.5781C50.9193 44.5781 51.4635 44.4375 51.8125 44.1562C52.1667 43.875 52.3438 43.4974 52.3438 43.0234C52.3438 42.5964 52.1823 42.2344 51.8594 41.9375C51.5365 41.6406 50.8698 41.2891 49.8594 40.8828C48.8177 40.4609 48.0833 39.9792 47.6562 39.4375C47.2292 38.8958 47.0156 38.2448 47.0156 37.4844C47.0156 36.5312 47.3542 35.7812 48.0312 35.2344C48.7083 34.6875 49.6172 34.4141 50.7578 34.4141C51.8516 34.4141 52.9401 34.6536 54.0234 35.1328L53.4297 36.6562C52.4141 36.2292 51.5078 36.0156 50.7109 36.0156C50.1068 36.0156 49.6484 36.1484 49.3359 36.4141C49.0234 36.6745 48.8672 37.0208 48.8672 37.4531C48.8672 37.75 48.9297 38.0052 49.0547 38.2188C49.1797 38.4271 49.3854 38.625 49.6719 38.8125C49.9583 39 50.474 39.2474 51.2188 39.5547C52.0573 39.9036 52.6719 40.2292 53.0625 40.5312C53.4531 40.8333 53.7396 41.1745 53.9219 41.5547C54.1042 41.9349 54.1953 42.3828 54.1953 42.8984ZM63.875 41.6641C63.875 43.0755 63.513 44.1771 62.7891 44.9688C62.0651 45.7604 61.0573 46.1562 59.7656 46.1562C58.9583 46.1562 58.2448 45.974 57.625 45.6094C57.0052 45.2448 56.5286 44.7214 56.1953 44.0391C55.862 43.3568 55.6953 42.5651 55.6953 41.6641C55.6953 40.263 56.0547 39.1693 56.7734 38.3828C57.4922 37.5964 58.5052 37.2031 59.8125 37.2031C61.0625 37.2031 62.0521 37.6068 62.7812 38.4141C63.5104 39.2161 63.875 40.2995 63.875 41.6641ZM57.5859 41.6641C57.5859 43.6589 58.3229 44.6562 59.7969 44.6562C61.2552 44.6562 61.9844 43.6589 61.9844 41.6641C61.9844 39.6901 61.25 38.7031 59.7812 38.7031C59.0104 38.7031 58.4505 38.9583 58.1016 39.4688C57.7578 39.9792 57.5859 40.7109 57.5859 41.6641ZM69.4766 46.1562C68.1693 46.1562 67.1745 45.776 66.4922 45.0156C65.8151 44.25 65.4766 43.1536 65.4766 41.7266C65.4766 40.2734 65.8307 39.1562 66.5391 38.375C67.2526 37.5938 68.2812 37.2031 69.625 37.2031C70.5365 37.2031 71.3568 37.3724 72.0859 37.7109L71.5312 39.1875C70.7552 38.8854 70.1146 38.7344 69.6094 38.7344C68.1146 38.7344 67.3672 39.7266 67.3672 41.7109C67.3672 42.6797 67.5521 43.4089 67.9219 43.8984C68.2969 44.3828 68.8438 44.625 69.5625 44.625C70.3802 44.625 71.1536 44.4219 71.8828 44.0156V45.6172C71.5547 45.8099 71.2031 45.9479 70.8281 46.0312C70.4583 46.1146 70.0078 46.1562 69.4766 46.1562ZM75.75 46H73.9141V37.3594H75.75V46ZM73.8047 35.0703C73.8047 34.7422 73.8932 34.4896 74.0703 34.3125C74.2526 34.1354 74.5104 34.0469 74.8438 34.0469C75.1667 34.0469 75.4167 34.1354 75.5938 34.3125C75.776 34.4896 75.8672 34.7422 75.8672 35.0703C75.8672 35.3828 75.776 35.6302 75.5938 35.8125C75.4167 35.9896 75.1667 36.0781 74.8438 36.0781C74.5104 36.0781 74.2526 35.9896 74.0703 35.8125C73.8932 35.6302 73.8047 35.3828 73.8047 35.0703ZM83.7891 46L83.4219 44.7969H83.3594C82.9427 45.3229 82.5234 45.6823 82.1016 45.875C81.6797 46.0625 81.138 46.1562 80.4766 46.1562C79.6276 46.1562 78.9635 45.9271 78.4844 45.4688C78.0104 45.0104 77.7734 44.362 77.7734 43.5234C77.7734 42.6328 78.1042 41.9609 78.7656 41.5078C79.4271 41.0547 80.4349 40.8073 81.7891 40.7656L83.2812 40.7188V40.2578C83.2812 39.7057 83.151 39.2943 82.8906 39.0234C82.6354 38.7474 82.237 38.6094 81.6953 38.6094C81.2526 38.6094 80.8281 38.6745 80.4219 38.8047C80.0156 38.9349 79.625 39.0885 79.25 39.2656L78.6562 37.9531C79.125 37.7083 79.638 37.5234 80.1953 37.3984C80.7526 37.2682 81.2786 37.2031 81.7734 37.2031C82.8724 37.2031 83.7005 37.4427 84.2578 37.9219C84.8203 38.401 85.1016 39.1536 85.1016 40.1797V46H83.7891ZM81.0547 44.75C81.7214 44.75 82.2552 44.5651 82.6562 44.1953C83.0625 43.8203 83.2656 43.2969 83.2656 42.625V41.875L82.1562 41.9219C81.2917 41.9531 80.6615 42.099 80.2656 42.3594C79.875 42.6146 79.6797 43.0078 79.6797 43.5391C79.6797 43.9245 79.7943 44.224 80.0234 44.4375C80.2526 44.6458 80.5964 44.75 81.0547 44.75ZM89.5 46H87.6641V33.8438H89.5V46ZM101.344 36.0156C100.271 36.0156 99.4271 36.3958 98.8125 37.1562C98.1979 37.9167 97.8906 38.9661 97.8906 40.3047C97.8906 41.7057 98.1849 42.7656 98.7734 43.4844C99.3672 44.2031 100.224 44.5625 101.344 44.5625C101.828 44.5625 102.297 44.5156 102.75 44.4219C103.203 44.3229 103.674 44.1979 104.164 44.0469V45.6484C103.268 45.987 102.253 46.1562 101.117 46.1562C99.4453 46.1562 98.1615 45.651 97.2656 44.6406C96.3698 43.625 95.9219 42.1745 95.9219 40.2891C95.9219 39.1016 96.138 38.0625 96.5703 37.1719C97.0078 36.2812 97.638 35.599 98.4609 35.125C99.2839 34.651 100.25 34.4141 101.359 34.4141C102.526 34.4141 103.604 34.6589 104.594 35.1484L103.922 36.7031C103.536 36.5208 103.128 36.362 102.695 36.2266C102.268 36.0859 101.818 36.0156 101.344 36.0156ZM111.836 46L111.469 44.7969H111.406C110.99 45.3229 110.57 45.6823 110.148 45.875C109.727 46.0625 109.185 46.1562 108.523 46.1562C107.674 46.1562 107.01 45.9271 106.531 45.4688C106.057 45.0104 105.82 44.362 105.82 43.5234C105.82 42.6328 106.151 41.9609 106.812 41.5078C107.474 41.0547 108.482 40.8073 109.836 40.7656L111.328 40.7188V40.2578C111.328 39.7057 111.198 39.2943 110.938 39.0234C110.682 38.7474 110.284 38.6094 109.742 38.6094C109.299 38.6094 108.875 38.6745 108.469 38.8047C108.062 38.9349 107.672 39.0885 107.297 39.2656L106.703 37.9531C107.172 37.7083 107.685 37.5234 108.242 37.3984C108.799 37.2682 109.326 37.2031 109.82 37.2031C110.919 37.2031 111.747 37.4427 112.305 37.9219C112.867 38.401 113.148 39.1536 113.148 40.1797V46H111.836ZM109.102 44.75C109.768 44.75 110.302 44.5651 110.703 44.1953C111.109 43.8203 111.312 43.2969 111.312 42.625V41.875L110.203 41.9219C109.339 41.9531 108.708 42.099 108.312 42.3594C107.922 42.6146 107.727 43.0078 107.727 43.5391C107.727 43.9245 107.841 44.224 108.07 44.4375C108.299 44.6458 108.643 44.75 109.102 44.75ZM120.094 37.2031C120.464 37.2031 120.768 37.2292 121.008 37.2812L120.828 38.9922C120.568 38.9297 120.297 38.8984 120.016 38.8984C119.281 38.8984 118.685 39.138 118.227 39.6172C117.773 40.0964 117.547 40.7188 117.547 41.4844V46H115.711V37.3594H117.148L117.391 38.8828H117.484C117.771 38.3672 118.143 37.9583 118.602 37.6562C119.065 37.3542 119.562 37.2031 120.094 37.2031ZM126.391 46.1562C125.047 46.1562 123.995 45.7656 123.234 44.9844C122.479 44.1979 122.102 43.1172 122.102 41.7422C122.102 40.3307 122.453 39.2214 123.156 38.4141C123.859 37.6068 124.826 37.2031 126.055 37.2031C127.195 37.2031 128.096 37.5495 128.758 38.2422C129.419 38.9349 129.75 39.888 129.75 41.1016V42.0938H123.992C124.018 42.9323 124.245 43.5781 124.672 44.0312C125.099 44.4792 125.701 44.7031 126.477 44.7031C126.987 44.7031 127.461 44.6562 127.898 44.5625C128.341 44.4635 128.815 44.3021 129.32 44.0781V45.5703C128.872 45.7839 128.419 45.9349 127.961 46.0234C127.503 46.112 126.979 46.1562 126.391 46.1562ZM126.055 38.5938C125.471 38.5938 125.003 38.7786 124.648 39.1484C124.299 39.5182 124.091 40.0573 124.023 40.7656H127.945C127.935 40.0521 127.763 39.513 127.43 39.1484C127.096 38.7786 126.638 38.5938 126.055 38.5938Z" fill="white"/>
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0" transform="translate(-0.0938967 -0.317073) scale(0.00234742 0.0121951)"/>
        </pattern>
        <image id="image0" width="478" height="122" xlinkHref="data:image/png;base64,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AkMIL2OjHwYQCS+DouIQAREQAREwESgtvHh8aGV1dbQFVT4cCa9PQ69FQAREQARGIVBSeHFf9/Nz5yazR4KEd5QqpkRFQAREQAR8AqWEd6jtd31b+l5LePsI6XMREAEREIHiBNjCi/u5JX+a0AJEwmuhp++KgAiIgAhQCFiFF/dw8Xev/qWk/fonO8f8MYc+IBLePkL6XAREQAREoDiB3B9BSP1Fq+KGRCQg4Y2ApEtEQAREQAREgEVAwssiqXhEQAREQAREIIKAhDcCki4RAREQAREQARYBCS+LpOIRAREQAREQgQgCEt4ISLpEBERABERABFgEJLwskopHBERABERABCIISHgjIOkSERABERABEWARkPCySCoeERABERABEYggIOGNgKRLREAEREAERIBFQMLLIql4REAEREAERCCCgIQ3ApIuEQEREAEREAEWAQkvi6TiEQEREAEREIEIAhLeCEi6RAREQAREQARYBCS8LJKKRwREQAREQAQiCEh4IyDpEhEQAREQARFgEZDwskgqHhEQAREQARGIICDhjYCkS0RABERABESARUDCyyKpeERABERABEQggsD/ABG/lp+0tCPNAAAAAElFTkSuQmCC"/>
      </defs>
    </svg>
  );
};

const HackneySearch = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.4342 15.3216L14.0574 11.9454C13.905 11.793 13.6984 11.7083 13.4816 11.7083H12.9295C13.8643 10.5129 14.4198 9.00939 14.4198 7.37376C14.4198 3.48281 11.2665 0.330078 7.37491 0.330078C3.48328 0.330078 0.330017 3.48281 0.330017 7.37376C0.330017 11.2647 3.48328 14.4175 7.37491 14.4175C9.01081 14.4175 10.5146 13.8621 11.7102 12.9274V13.4794C11.7102 13.6962 11.7949 13.9027 11.9473 14.0551L15.3241 17.4313C15.6425 17.7497 16.1573 17.7497 16.4723 17.4313L17.4308 16.473C17.7492 16.1547 17.7492 15.6399 17.4342 15.3216ZM7.37491 11.7083C4.98032 11.7083 3.03959 9.77133 3.03959 7.37376C3.03959 4.97959 4.97693 3.03919 7.37491 3.03919C9.76949 3.03919 11.7102 4.9762 11.7102 7.37376C11.7102 9.76794 9.77288 11.7083 7.37491 11.7083Z" fill="white"/>
    </svg>
  );
};

const CheckGreenIcon = () => {
  return <CheckGreenIconSvg />;
};

const CheckIcon = () => {
  return <CheckIconSvg />;
};

const CalendarIcon = () => {
  return <CalendarIconSvg />;
};

const ArrowLeftIcon = () => {
  return <ArrowLeftIconSvg />;
};

const CaretRightIcon = () => {
  return <CaretRightIconSvg />;
};

const CaretDownIcon = ({ onClick = () => {}}) => {
  return <CaretDownIconSvg onClick={onClick} />;
};

const CaretRightHighlightIcon = () => {
  return <CaretRightHighlightIconSvg />;
};

const CircleCloseIcon = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.9998 29.3332C23.3636 29.3332 29.3332 23.3636 29.3332 15.9998C29.3332 8.63604 23.3636 2.6665 15.9998 2.6665C8.63604 2.6665 2.6665 8.63604 2.6665 15.9998C2.6665 23.3636 8.63604 29.3332 15.9998 29.3332Z" stroke="#6F777B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20 12L12 20" stroke="#6F777B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 12L20 20" stroke="#6F777B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export {
  HackneyLogo,
  CheckIcon,
  CheckGreenIcon,
  CalendarIcon,
  ArrowLeftIcon,
  CaretDownIcon,
  CaretRightIcon,
  CaretRightHighlightIcon,
  HackneyFullLogo,
  HackneySearch,
  CircleCloseIcon,
};
