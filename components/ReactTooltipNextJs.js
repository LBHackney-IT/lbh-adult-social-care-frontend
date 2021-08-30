import React from 'react';
import dynamic from "next/dynamic";

const ReactTooltipNextJs = dynamic(() => import("react-tooltip"), {
  ssr: false,
});

export default ReactTooltipNextJs;