/// <reference types="vite/client" />

declare module '*.svg' {
  import { type FC, type SVGProps } from 'react';
  export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
