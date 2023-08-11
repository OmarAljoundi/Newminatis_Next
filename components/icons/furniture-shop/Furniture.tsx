import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import React from "react";

const Furniture = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 19 19" fill="none">
      <g clipPath="url(#clip0_6800_50485)">
        <path
          d="M18.2058 9.41938H17.4722V0.41194C17.4722 0.313306 17.4416 0.218711 17.3872 0.148966C17.3327 0.0792214 17.2589 0.0400391 17.1819 0.0400391L1.81029 0.0400391C1.73329 0.0400391 1.65944 0.0792214 1.605 0.148966C1.55055 0.218711 1.51996 0.313306 1.51996 0.41194V9.41938H0.786416C0.709418 9.41938 0.635573 9.45856 0.581127 9.52831C0.526681 9.59805 0.496094 9.69265 0.496094 9.79128L0.496094 15.0425C0.496605 15.1407 0.527418 15.2347 0.581809 15.3039C0.636199 15.3731 0.709752 15.4119 0.786416 15.4119H3.01222V17.6681C3.01222 17.7668 3.04281 17.8614 3.09726 17.9311C3.1517 18.0009 3.22555 18.04 3.30255 18.04H5.34448C5.42148 18.04 5.49532 18.0009 5.54977 17.9311C5.60422 17.8614 5.6348 17.7668 5.6348 17.6681V15.4119H13.2529V17.6681C13.2529 17.7668 13.2835 17.8614 13.3379 17.9311C13.3923 18.0009 13.4662 18.04 13.5432 18.04H15.5929C15.6699 18.04 15.7437 18.0009 15.7982 17.9311C15.8526 17.8614 15.8832 17.7668 15.8832 17.6681V15.4119H18.2058C18.2828 15.4119 18.3566 15.3728 18.4111 15.303C18.4655 15.2333 18.4961 15.1387 18.4961 15.04V9.79128C18.4961 9.69265 18.4655 9.59805 18.4111 9.52831C18.3566 9.45856 18.2828 9.41938 18.2058 9.41938ZM3.8948 5.66318C3.89531 5.41417 3.97276 5.17554 4.11022 4.99946C4.24768 4.82338 4.43396 4.72416 4.62835 4.72351H7.70384C7.8847 4.72296 8.05934 4.80802 8.19423 4.96235C8.32912 5.11668 8.41475 5.32941 8.43467 5.55968C8.45459 5.78995 8.40739 6.02153 8.30216 6.20995C8.19692 6.39837 8.04105 6.53035 7.86448 6.58053H4.46771C4.30522 6.53336 4.16005 6.41691 4.05597 6.25025C3.95189 6.08359 3.89507 5.8766 3.8948 5.66318V5.66318ZM3.85996 7.32434H4.41545C4.48577 7.34002 4.55698 7.34831 4.62835 7.34913H7.70384C7.77521 7.34831 7.84642 7.34002 7.91674 7.32434H11.0774C11.1477 7.34002 11.2189 7.34831 11.2903 7.34913H14.3638C14.4352 7.34831 14.5064 7.34002 14.5767 7.32434H15.1322C15.5495 7.3228 15.9537 7.51114 16.2728 7.85578C16.5918 8.20042 16.8049 8.67898 16.8742 9.20616H2.13158C2.21291 8.68924 2.42757 8.22237 2.74105 7.88061C3.05453 7.53885 3.44862 7.34206 3.85996 7.32186V7.32434ZM10.5606 5.66318C10.5611 5.41417 10.6386 5.17554 10.776 4.99946C10.9135 4.82338 11.0998 4.72416 11.2942 4.72351H14.3638C14.5447 4.72296 14.7193 4.80802 14.8542 4.96235C14.9891 5.11668 15.0747 5.32941 15.0947 5.55968C15.1146 5.78995 15.0674 6.02153 14.9622 6.20995C14.8569 6.39837 14.701 6.53035 14.5245 6.58053H11.1296C10.9679 6.53239 10.8236 6.41552 10.7203 6.24895C10.6169 6.08239 10.5607 5.87593 10.5606 5.66318V5.66318ZM16.8916 0.783841V7.60698C16.5201 7.06431 16.008 6.71207 15.4496 6.61525C15.5846 6.36225 15.663 6.06688 15.6766 5.76099C15.6901 5.45509 15.6382 5.15025 15.5265 4.87934C15.4148 4.60842 15.2475 4.3817 15.0426 4.2236C14.8377 4.06551 14.603 3.98204 14.3638 3.98219H11.2884C11.0518 3.98234 10.8198 4.06424 10.6165 4.21926C10.4133 4.37428 10.2466 4.59668 10.1338 4.86299C10.021 5.1293 9.96646 5.42965 9.97584 5.73238C9.98521 6.03511 10.0582 6.32898 10.1871 6.58301H8.80513C8.934 6.32898 9.00698 6.03511 9.01635 5.73238C9.02572 5.42965 8.97115 5.1293 8.85838 4.86299C8.74562 4.59668 8.57884 4.37428 8.37564 4.21926C8.17244 4.06424 7.94034 3.98234 7.70384 3.98219H4.62835C4.38902 3.98218 4.15423 4.0659 3.94932 4.2243C3.74441 4.3827 3.57716 4.60977 3.46561 4.88101C3.35406 5.15225 3.30245 5.45737 3.31635 5.76343C3.33025 6.06949 3.40913 6.36488 3.54448 6.61773C2.98301 6.73288 2.47187 7.10025 2.10255 7.65409V0.783841H16.8916ZM5.05416 17.2962H3.59287V15.4119H5.0619L5.05416 17.2962ZM15.3006 17.2962H13.8335V15.4119H15.3025L15.3006 17.2962ZM17.9154 14.6681H1.07674V10.1632H17.9154V14.6681Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_6800_50485">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(0.496094 0.0400391)"
          />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default Furniture;
