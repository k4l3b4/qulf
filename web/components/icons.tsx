import { SVGProps } from "react"

export const Cross = (props: SVGProps<SVGSVGElement>) => (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden
      {...props}
    >
      <title>Cross</title>
      <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
