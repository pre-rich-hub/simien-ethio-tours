import { brandPaths } from './brandPaths'

// Third-party marks for the footer, in each brand's own colours.

function Glyph({ d, fill }: { d: string; fill: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
      <path d={d} fill={fill} />
    </svg>
  )
}

// --- Social glyphs (sit on a white chip) ---

export const InstagramMark = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="h-full w-full">
    <defs>
      <radialGradient id="footer-ig" cx="0.3" cy="1.07" r="1.1">
        <stop offset="0" stopColor="#fdd56b" />
        <stop offset="0.45" stopColor="#fd5949" />
        <stop offset="0.7" stopColor="#d6249f" />
        <stop offset="1" stopColor="#285aeb" />
      </radialGradient>
    </defs>
    <path d={brandPaths.instagram} fill="url(#footer-ig)" />
  </svg>
)
export const YouTubeMark = () => <Glyph d={brandPaths.youtube} fill="#ff0000" />
export const FacebookMark = () => <Glyph d={brandPaths.facebook} fill="#0866ff" />
export const XMark = () => <Glyph d={brandPaths.x} fill="#000" />
export const TikTokMark = () => (
  // TikTok's offset cyan/red echo behind the black note
  <svg viewBox="-1 -1 26 26" aria-hidden className="h-full w-full">
    <path d={brandPaths.tiktok} fill="#25f4ee" transform="translate(-0.7 -0.7)" />
    <path d={brandPaths.tiktok} fill="#fe2c55" transform="translate(0.7 0.7)" />
    <path d={brandPaths.tiktok} fill="#000" />
  </svg>
)

// --- Travel platforms (sit on a cream tile) ---

export const TripadvisorMark = () => (
  <span className="grid h-full w-full place-items-center rounded-full bg-[#34e0a1] p-[15%]">
    <Glyph d={brandPaths.tripadvisor} fill="#000" />
  </span>
)

export const TripadvisorLogo = () => (
  <span className="flex items-center gap-1.5">
    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#34e0a1] p-1">
      <Glyph d={brandPaths.tripadvisor} fill="#000" />
    </span>
    <span className="font-sans text-[15px] font-bold tracking-tight text-black">Tripadvisor</span>
  </span>
)
export const ViatorLogo = () => (
  <span className="font-sans text-[22px] font-extrabold lowercase tracking-tight text-[#186b6d]">
    viator
  </span>
)
export const GetYourGuideLogo = () => (
  <span className="flex flex-col font-sans text-[13px] font-black uppercase leading-[0.92] tracking-tight text-[#ff5533]">
    <span>Get</span>
    <span>Your</span>
    <span>Guide</span>
  </span>
)
export const SafariBookingsLogo = () => (
  <span className="font-serif text-[13px] uppercase tracking-[0.06em] text-[#5a4632]">
    Safari<span className="font-semibold">Bookings</span>
  </span>
)

// --- Payment methods (sit on a cream tile) ---

export const VisaLogo = () => (
  <span className="block h-14 w-14">
    <Glyph d={brandPaths.visa} fill="#1a1f71" />
  </span>
)
export const MastercardLogo = () => (
  <svg viewBox="0 0 38 24" aria-hidden className="h-7 w-auto">
    <circle cx="12" cy="12" r="11" fill="#eb001b" />
    <circle cx="26" cy="12" r="11" fill="#f79e1b" />
    <path d="M19 3.5a11 11 0 0 1 0 17 11 11 0 0 1 0-17z" fill="#ff5f00" />
  </svg>
)
export const PayPalLogo = () => (
  <span className="flex items-center gap-1">
    <span className="block h-5 w-5">
      <Glyph d={brandPaths.paypal} fill="#003087" />
    </span>
    <span className="font-sans text-[17px] font-extrabold italic tracking-tight">
      <span className="text-[#003087]">Pay</span>
      <span className="text-[#0079c1]">Pal</span>
    </span>
  </span>
)
