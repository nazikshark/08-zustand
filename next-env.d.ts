/// <reference types="next" />
/// <reference types="next/navigation" />
/// <reference types="next/image-types/global" />

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}