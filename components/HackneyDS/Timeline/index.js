import React from 'react';
import Link from '../lettering/Link';

export default function Timeline({ timelines = [] }) {
  return (
    <ol className="lbh-timeline">
      {timelines.map(({ gapBelow, actionNeeded, major, minor, header, innerElements }) => {
        const gapBelowClass = gapBelow ? ' lbh-timeline__event--gap-below' : '';
        const actionNeededClass = actionNeeded ? ' lbh-timeline__event--action-needed' : '';
        const majorClass = major ? ' lbh-timeline__event--major' : '';
        const minorClass = minor ? ' lbh-timeline__event--minor' : '';
        const calcClasses = `${actionNeededClass}${majorClass}${minorClass}${gapBelowClass}`;
        return (
          <li className={`lbh-timeline__event${calcClasses}`}>
            {header && (
              <h3 className={header.rewriteClass || 'lbh-heading-h3'}>
                {header.link ? <Link text={header.text} noVisited /> : header.text}
              </h3>
            )}
            {innerElements.map((element) => {
              if (element.text) {
                return (
                  <p className={element.rewriteClass || 'lbh-body'}>
                    {element.link ? <Link href={element.link} text={element.text} noVisited /> : element.text}
                  </p>
                );
              }
              return element.component;
            })}
          </li>
        );
      })}
    </ol>
  );
}
