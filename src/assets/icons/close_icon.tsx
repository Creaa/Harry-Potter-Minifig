import React from 'react';
import { SvgXml } from 'react-native-svg';

const CloseIconSvg = () => {
  const svg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 6L18.7742 18.7742" stroke="#102B51" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M6 18.7744L18.7742 6.00022" stroke="#102B51" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  // eslint-disable-next-line react/no-unstable-nested-components
  const CloseSvg = () => <SvgXml xml={svg} width={24} height={24} />;
  return <CloseSvg />;
};

export default CloseIconSvg;
