import React from 'react';
import { Link } from '../index';

export default function Timeline({ timelines = [] }) {
  return (
    <ol className="lbh-timeline">
      {timelines.map(timeline => {
        const gapBelowClass = timeline.gapBelow ? ' lbh-timeline__event--gap-below' : '';
        const actionNeededClass = timeline.actionNeeded ? ' lbh-timeline__event--action-needed' : '';
        const majorClass = timeline.major ? ' lbh-timeline__event--major' : '';
        const minorClass = timeline.minor ? ' lbh-timeline__event--minor' : '';
        const calcClasses = `${actionNeededClass}${majorClass}${minorClass}${gapBelowClass}`;
        const { header } = timeline;
        return (
          <li className={`lbh-timeline__event${calcClasses}`}>
            {header && <h3 className={header.rewriteClass || 'lbh-heading-h3'}>{header.text}</h3>}
            {timeline.innerElements.map(element => {
              if(element.text) {
                return (
                  <p className={element.rewriteClass || 'lbh-body'}>
                    {element.link ?
                      <Link
                        href={element.link}
                        text={element.text}
                        className='lbh-link--no-visited-state'
                      /> : element
                    }
                  </p>
                )
              }
              return element.component;
            })}
          </li>
        )})}
    </ol>
  );
}