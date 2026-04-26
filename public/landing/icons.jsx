// Reusable inline SVG icons (stroke-based, 24px viewport)
const Icon = ({ d, size = 18, stroke = 1.6, fill = "none", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
       stroke="currentColor" strokeWidth={stroke}
       strokeLinecap="round" strokeLinejoin="round" style={style}>
    {typeof d === 'string' ? <path d={d}/> : d}
  </svg>
);

const ArrowRight = ({size=16}) => <Icon size={size} stroke={1.4} d="M4 12h15M13 6l6 6-6 6"/>;
const ArrowLeft  = ({size=16}) => <Icon size={size} stroke={1.4} d="M20 12H5M11 6l-6 6 6 6"/>;
const Plus       = ({size=14}) => <Icon size={size} d="M12 5v14M5 12h14"/>;
const Minus      = ({size=14}) => <Icon size={size} d="M5 12h14"/>;
const Check      = ({size=16}) => <Icon size={size} d="M5 13l4 4L19 7"/>;
const ChevDown   = ({size=18}) => <Icon size={size} d="M6 9l6 6 6-6"/>;
const Play       = ({size=14}) => <Icon size={size} fill="currentColor" stroke="none" d="M8 5v14l11-7z"/>;
const Pause      = ({size=14}) => <Icon size={size} fill="currentColor" stroke="none" d={<g><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></g>}/>;
const Sparkle    = ({size=16}) => <Icon size={size} d="M12 3l1.8 4.5L18 9l-4.2 1.5L12 15l-1.8-4.5L6 9l4.2-1.5z"/>;
const Filter     = ({size=16}) => <Icon size={size} d="M4 6h16M7 12h10M10 18h4"/>;
const Grid       = ({size=16}) => <Icon size={size} d={<g><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></g>}/>;
const Mic        = ({size=16}) => <Icon size={size} d={<g><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></g>}/>;
const Bell       = ({size=16}) => <Icon size={size} d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21a2 2 0 0 0 4 0"/>;
const Heart      = ({size=16}) => <Icon size={size} d="M20.8 6.6a5.5 5.5 0 0 0-9-1.7l-.3.3-.3-.3a5.5 5.5 0 1 0-7.8 7.8l8.1 8.1 8.1-8.1a5.5 5.5 0 0 0 1.2-6.1z"/>;
const Compass    = ({size=16}) => <Icon size={size} d={<g><circle cx="12" cy="12" r="9"/><path d="M14.5 9.5l-2 5-5 2 2-5z"/></g>}/>;
const Layers     = ({size=16}) => <Icon size={size} d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 18l9 5 9-5"/>;
const Clock      = ({size=16}) => <Icon size={size} d={<g><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></g>}/>;
const Logo = ({size=22}) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M11 22c4-1 6-3 7-7 1 4 3 6 7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="16" cy="11" r="2.2" fill="currentColor"/>
  </svg>
);

Object.assign(window, {
  Icon, ArrowRight, ArrowLeft, Plus, Minus, Check, ChevDown, Play, Pause,
  Sparkle, Filter, Grid, Mic, Bell, Heart, Compass, Layers, Clock, Logo,
});
