import { useEffect, useRef, useState } from "react";
import { Button } from "antd";

import WinPopup from "../../components/winPopup/WinPopup";
import useWheelPageHook from "./useWheelpageHook";

const COLORS = [
  "#FF6B6B",
  "#5B8DEF",
  "#8B5CF6",
  "#F97316",
  "#14B8A6",
  "#EC4899",
];

export default function WheelPage() {
  const { state, handler } = useWheelPageHook();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState(320);

  useEffect(() => {
    const updateSize = () => {
      if (!wrapperRef.current) return;

      const width = wrapperRef.current.offsetWidth;

      const wheelSize = Math.max(260, Math.min(width * 0.95, 600));

      setSize(wheelSize);
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    window.addEventListener("resize", updateSize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const SVG_SIZE = size;
  const CENTER = SVG_SIZE / 2;
  const RADIUS = SVG_SIZE * 0.46;

  const isMobile = SVG_SIZE < 400;

  const POINTER_OFFSET = isMobile ? 24 : 40;

  const CARD_SIZE = isMobile ? SVG_SIZE * 0.15 : SVG_SIZE * 0.18;

  const IMAGE_SIZE = CARD_SIZE * 0.5;

  const CENTER_BUTTON = isMobile ? SVG_SIZE * 0.16 : SVG_SIZE * 0.18;

  const slice = 360 / state.items.length;

  return (
    <>
      <div
        ref={wrapperRef}
        style={{
          width: "100%",
          maxWidth: 800,
          margin: "0 auto",
          padding: isMobile ? 12 : 24,
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            width: SVG_SIZE,
            height: SVG_SIZE + POINTER_OFFSET + 40,
          }}
        >
          {/* POINTER */}
          <svg
            width={SVG_SIZE * 0.08}
            height={SVG_SIZE * 0.12}
            viewBox="0 0 50 80"
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              transform: "translateX(-50%)",
              zIndex: 20,
            }}
          >
            <path
              d="
                M25 80
                C10 55 0 42 0 25
                C0 11 11 0 25 0
                C39 0 50 11 50 25
                C50 42 40 55 25 80
              "
              fill="#FF4D4F"
              stroke="#B91C1C"
              strokeWidth="2"
            />

            <circle cx="25" cy="25" r="7" fill="#FFFFFF" />
          </svg>

          {/* WHEEL */}
          <div
            style={{
              marginTop: POINTER_OFFSET,
              width: SVG_SIZE,
              height: SVG_SIZE,
              marginInline: "auto",
              transition: state.isSpinning
                ? "transform 5s cubic-bezier(.08,.85,.18,1)"
                : "none",
              transform: `rotate(${state.rotation}deg)`,
              transformOrigin: "center center",
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
            >
              <defs>
                <filter id="shadow">
                  <feDropShadow
                    dx="0"
                    dy="3"
                    stdDeviation="3"
                    floodOpacity="0.25"
                  />
                </filter>

                <filter id="textShadow">
                  <feDropShadow
                    dx="0"
                    dy="1"
                    stdDeviation="1"
                    floodOpacity="0.6"
                  />
                </filter>

                <linearGradient
                  id="centerGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="100%" stopColor="#DC2626" />
                </linearGradient>
              </defs>

              {/* outer ring */}
              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS + 10}
                fill="rgba(0,0,0,.08)"
              />

              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS + 6}
                fill="#FFF"
                stroke="#FF4D4F"
                strokeWidth={4}
              />

              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS + 1}
                fill="none"
                stroke="rgba(255,77,79,.25)"
                strokeWidth={2}
              />

              {state.items.map((item, index) => {
                const startAngle = index * slice;
                const endAngle = startAngle + slice;

                const startX =
                  CENTER +
                  RADIUS * Math.cos(((startAngle - 90) * Math.PI) / 180);

                const startY =
                  CENTER +
                  RADIUS * Math.sin(((startAngle - 90) * Math.PI) / 180);

                const endX =
                  CENTER + RADIUS * Math.cos(((endAngle - 90) * Math.PI) / 180);

                const endY =
                  CENTER + RADIUS * Math.sin(((endAngle - 90) * Math.PI) / 180);

                const path = `
                  M ${CENTER} ${CENTER}
                  L ${startX} ${startY}
                  A ${RADIUS} ${RADIUS}
                  0 0 1
                  ${endX} ${endY}
                  Z
                `;

                const middleAngle = startAngle + slice / 2;

                const itemRadius = RADIUS * 0.62;

                const itemX =
                  CENTER +
                  itemRadius * Math.cos(((middleAngle - 90) * Math.PI) / 180);

                const itemY =
                  CENTER +
                  itemRadius * Math.sin(((middleAngle - 90) * Math.PI) / 180);

                const lines = handler.splitText(item.name, 12);

                const imageY = itemY - CARD_SIZE * 0.18;

                const textY = itemY + CARD_SIZE * 0.25;

                return (
                  <g key={item.id ?? index}>
                    <path
                      d={path}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#fff"
                      strokeWidth={3}
                      filter="url(#shadow)"
                    />

                    <rect
                      x={itemX - CARD_SIZE / 2}
                      y={itemY - CARD_SIZE / 2}
                      width={CARD_SIZE}
                      height={CARD_SIZE}
                      rx={12}
                      fill="rgba(255,255,255,0)"
                      stroke="rgba(255,255,255,0)"
                      strokeWidth={1.5}
                    />

                    <circle
                      cx={itemX}
                      cy={imageY}
                      r={IMAGE_SIZE / 2}
                      fill="#fff"
                    />

                    {item.img && (
                      <>
                        <defs>
                          <clipPath id={`clip-${index}`}>
                            <circle
                              cx={itemX}
                              cy={imageY}
                              r={IMAGE_SIZE * 0.45}
                            />
                          </clipPath>
                        </defs>

                        <image
                          href={item.img}
                          x={itemX - IMAGE_SIZE * 0.45}
                          y={imageY - IMAGE_SIZE * 0.45}
                          width={IMAGE_SIZE * 0.9}
                          height={IMAGE_SIZE * 0.9}
                          clipPath={`url(#clip-${index})`}
                        />
                      </>
                    )}

                    <text
                      x={itemX}
                      y={textY - ((lines.length - 1.5) * SVG_SIZE * 0.012) / 2}
                      textAnchor="middle"
                      fill="#fff"
                      fontSize={isMobile ? SVG_SIZE * 0.018 : SVG_SIZE * 0.02}
                      fontWeight="800"
                      filter="url(#textShadow)"
                    >
                      {lines.map((line, lineIndex) => (
                        <tspan
                          key={lineIndex}
                          x={itemX}
                          dy={lineIndex === 0 ? 0 : "1.2em"}
                        >
                          {line}
                        </tspan>
                      ))}
                    </text>

                    {/* Quantity */}
                    {/* <g>
                        <rect
                          x={itemX - 20}
                          y={itemY + CARD_SIZE * 0.25}
                          width="40"
                          height="18"
                          rx="9"
                          fill="#fff"
                        />
                  
                        <text
                          x={itemX}
                          y={itemY + CARD_SIZE * 0.4}
                          textAnchor="middle"
                          fill="#DC2626"
                          fontWeight="700"
                          fontSize={
                            isMobile
                              ? SVG_SIZE * 0.013
                              : SVG_SIZE * 0.015
                          }
                        >
                          x{item.quantity}
                        </text>
                      </g> */}
                  </g>
                );
              })}

              <circle
                cx={CENTER}
                cy={CENTER}
                r={SVG_SIZE * 0.1}
                fill="#fff"
                stroke="#444"
                strokeWidth={3}
              />

              <circle
                cx={CENTER}
                cy={CENTER}
                r={SVG_SIZE * 0.085}
                fill="url(#centerGradient)"
              />
            </svg>
          </div>

          {/* SPIN BUTTON */}
          <Button
            type="primary"
            shape="circle"
            loading={state.isSpinning}
            onClick={handler.spin}
            style={{
              position: "absolute",
              top: POINTER_OFFSET + SVG_SIZE / 2,
              left: SVG_SIZE / 2,
              transform: "translate(-50%, -50%)",

              width: CENTER_BUTTON,
              height: CENTER_BUTTON,

              zIndex: 30,

              border: "4px solid #fff",

              background: "linear-gradient(135deg,#FF6B6B,#DC2626)",

              color: "#fff",

              fontWeight: 800,

              fontSize: isMobile ? 14 : SVG_SIZE * 0.03,

              boxShadow: `
                0 10px 25px rgba(220,38,38,.35),
                inset 0 2px 4px rgba(255,255,255,.25)
              `,
            }}
          >
            QUAY
          </Button>
        </div>
      </div>

      <WinPopup
        open={state.openPopup}
        winner={state.winner}
        onClose={() => handler.setOpenPopup(false)}
      />
    </>
  );
}
