import { SVGProps } from 'react'

export default function AdventureIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="w-full h-full drop-shadow-sm"
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Background Abstract Shapes */}
      <path
        d="M48.5 258C18.5 238 -5.5 188 4.5 158C14.5 128 58.5 118 88.5 138C118.5 158 138.5 208 128.5 238C118.5 268 78.5 278 48.5 258Z"
        fill="#0666ee0d"
        className="animate-pulse"
        style={{ animationDuration: '4s' }}
      />
      <path
        d="M320 80C350 60 390 70 400 100C410 130 370 160 340 180C310 200 270 190 260 160C250 130 290 100 320 80Z"
        fill="#0666ee0d"
      />
      <circle cx="200" cy="150" r="120" fill="#f8fafc" />

      {/* Abstract Terrain/Path Base - Made lighter and smoother */}
      <path
        d="M40 280 H360 C370 280 375 275 365 265 L320 220 L280 260 L240 220 L200 260 L160 220 L120 260 L80 220 L35 265 C25 275 30 280 40 280Z"
        fill="#e2e8f0"
        opacity="0.5"
      />

      {/* Dashed Trajectory Line */}
      <path
        d="M80 230 Q 150 230 180 180 T 280 100"
        stroke="#cbd5e1"
        strokeWidth="3"
        strokeDasharray="8 8"
        fill="none"
        className="animate-[pulse_3s_ease-in-out_infinite]"
      />

      {/* Target/Goal Pole */}
      <path
        d="M280 100 L280 160"
        stroke="#334155"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="280" cy="160" r="3" fill="#334155" />

      {/* Flag/Target */}
      <path
        d="M280 100 L320 85 L280 70"
        fill="#f43f5e"
        stroke="#334155"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Paper Plane - Adjusted colors for contrast */}
      <g>
        <path d="M80 210 L140 195 L95 235 L80 210Z" fill="#475569" />
        <path d="M80 210 L140 195 L95 215 L80 210Z" fill="#64748b" />
        <path d="M95 235 L140 195 L110 230 L95 235Z" fill="#1e293b" />
      </g>

      {/* Decorative Elements */}
      <g fill="#fda4af">
        <rect
          x="340"
          y="240"
          width="4"
          height="14"
          rx="2"
          transform="rotate(45 342 247)"
        />
        <rect
          x="340"
          y="240"
          width="4"
          height="14"
          rx="2"
          transform="rotate(-45 342 247)"
        />
      </g>
      <g fill="#fda4af">
        <rect
          x="60"
          y="80"
          width="3"
          height="10"
          rx="1.5"
          transform="rotate(45 61.5 85)"
        />
        <rect
          x="60"
          y="80"
          width="3"
          height="10"
          rx="1.5"
          transform="rotate(-45 61.5 85)"
        />
      </g>

      <circle
        cx="360"
        cy="120"
        r="4"
        fill="#475569"
        className="animate-pulse"
      />
      <circle cx="40" cy="180" r="6" fill="#f43f5e" opacity="0.4" />
      <circle cx="150" cy="60" r="3" fill="#cbd5e1" />

      {/* Plants - Simplified */}
      <path d="M340 280 Q 340 260 330 260 Q 320 260 320 280" fill="#475569" />
      <path d="M350 280 Q 360 250 370 280" fill="#475569" />
    </svg>
  )
}
