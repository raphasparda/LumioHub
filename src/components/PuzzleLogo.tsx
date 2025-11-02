import React, { CSSProperties, useId } from 'react';
import './PuzzleLogo.css';

interface PuzzleLogoProps {
  className?: string;
}

type Connector = 'left' | 'right' | 'top' | 'bottom';

const protrusionCenter: Record<Connector, { cx: number; cy: number }> = {
  left: { cx: 0, cy: 50 },
  right: { cx: 100, cy: 50 },
  top: { cx: 50, cy: 0 },
  bottom: { cx: 50, cy: 100 },
};

interface PieceConfig {
  x: number;
  y: number;
  color: 'blue' | 'red' | 'yellow' | 'green';
  protrusions: Connector[];
  indentations: Connector[];
  startX: number;
  startY: number;
  startRot: number;
  delay: number;
}

const pieces: PieceConfig[] = [
  {
    x: 10,
    y: 10,
    color: 'blue',
    protrusions: ['right'],
    indentations: ['bottom'],
    startX: -32,
    startY: -34,
    startRot: -8,
    delay: 0,
  },
  {
    x: 110,
    y: 10,
    color: 'red',
    protrusions: ['bottom'],
    indentations: ['left'],
    startX: 34,
    startY: -30,
    startRot: 9,
    delay: 0.12,
  },
  {
    x: 10,
    y: 110,
    color: 'yellow',
    protrusions: ['top'],
    indentations: ['right'],
    startX: -30,
    startY: 34,
    startRot: 6,
    delay: 0.24,
  },
  {
    x: 110,
    y: 110,
    color: 'green',
    protrusions: ['left'],
    indentations: ['top'],
    startX: 30,
    startY: 32,
    startRot: -6,
    delay: 0.36,
  },
];

const renderProtrusions = (color: string, protrusions: Connector[]) =>
  protrusions.map((connector) => {
    const { cx, cy } = protrusionCenter[connector];
    return <circle key={`${connector}-${color}`} cx={cx} cy={cy} r={20} fill={`var(--puzzle-${color})`} />;
  });

const PuzzleLogo: React.FC<PuzzleLogoProps> = ({ className }) => {
  const rawId = useId();
  const baseId = rawId.replace(/:/g, '');

  return (
    <span className={`puzzle-logo ${className ?? ''}`}>
      <svg viewBox="0 0 220 220" role="presentation" aria-hidden="true">
        {pieces.map((piece, index) => {
          const maskId = `${baseId}-mask-${piece.color}-${index}`;
          const style = {
            '--start-x': `${piece.startX}px`,
            '--start-y': `${piece.startY}px`,
            '--start-rot': `${piece.startRot}deg`,
            animationDelay: `${piece.delay}s`,
          } as CSSProperties & {
            '--start-x': string;
            '--start-y': string;
            '--start-rot': string;
          };

          return (
            <g key={`${piece.color}-${index}`} transform={`translate(${piece.x} ${piece.y})`}>
              <mask id={maskId} maskUnits="userSpaceOnUse">
                <rect width="100" height="100" rx="24" fill="white" />
                {piece.indentations.map((connector) => {
                  const { cx, cy } = protrusionCenter[connector];
                  return <circle key={`${maskId}-${connector}`} cx={cx} cy={cy} r={20} fill="black" />;
                })}
              </mask>

              <g className={`puzzle-logo__piece puzzle-logo__piece--${piece.color}`} style={style}>
                <rect width="100" height="100" rx="24" fill={`var(--puzzle-${piece.color})`} mask={`url(#${maskId})`} />
                {renderProtrusions(piece.color, piece.protrusions)}
              </g>
            </g>
          );
        })}
      </svg>
    </span>
  );
};

export default PuzzleLogo;
