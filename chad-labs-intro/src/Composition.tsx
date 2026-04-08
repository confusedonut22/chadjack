import {
	AbsoluteFill,
	Easing,
	Img,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from "remotion";

type IntroVariant = "landscape" | "portrait";

const CHAD_SOURCE_WIDTH = 774;
const CHAD_SOURCE_HEIGHT = 216;
const LABS_SOURCE_WIDTH = 858;
const LABS_SOURCE_HEIGHT = 354;

const startupSamples = [0.04, 0.12, 0.02, 0.28, 0.08, 0.54, 0.16, 0.74, 0.26, 0.92];
const settleSamples = [0.68, 0.92, 0.78, 1, 0.88, 0.96, 0.84, 1, 0.9, 0.98];

const clamp = (value: number, min: number, max: number) => {
	return Math.max(min, Math.min(max, value));
};

const getBootIntensity = (frame: number, delay: number) => {
	const local = frame - delay;
	if (local <= 0) {
		return 0;
	}

	if (local < startupSamples.length * 3) {
		const sampleIndex = Math.min(
			startupSamples.length - 1,
			Math.floor(local / 3),
		);
		const ramp = interpolate(local, [0, startupSamples.length * 3], [0, 0.78], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		});
		return clamp(startupSamples[sampleIndex] * 0.7 + ramp * 0.5, 0, 0.92);
	}

	const settleFrame = local - startupSamples.length * 3;
	const sampleIndex = Math.min(
		settleSamples.length - 1,
		Math.floor(settleFrame / 4),
	);
	const base = interpolate(
		settleFrame,
		[0, settleSamples.length * 4, 120],
		[0.82, 0.94, 0.9],
		{
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		},
	);
	const shimmer = 0.035 * Math.sin((local + delay) * 0.47) + 0.02 * Math.sin((local + delay) * 1.37);
	return clamp(base * 0.55 + settleSamples[sampleIndex] * 0.45 + shimmer, 0.62, 1);
};

export const ChadLabsIntro: React.FC<{variant?: IntroVariant}> = ({variant = "landscape"}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const isPortrait = variant === "portrait";
	const logoSize = isPortrait ? 720 : 940;
	const chadWidth = logoSize * (CHAD_SOURCE_WIDTH / 1024);
	const chadHeight = logoSize * (CHAD_SOURCE_HEIGHT / 1024);
	const labsWidth = logoSize * (LABS_SOURCE_WIDTH / 1024);
	const labsHeight = logoSize * (LABS_SOURCE_HEIGHT / 1024);

	const settle = spring({
		fps,
		frame,
		config: {
			damping: 200,
			stiffness: 80,
			mass: 1.05,
		},
		durationInFrames: 24,
	});

	const logoOpacity = interpolate(frame, [0, 1, 4], [0.88, 0.96, 1], {
		easing: Easing.out(Easing.cubic),
		extrapolateRight: "clamp",
	});
	const scale = interpolate(settle, [0, 1], [0.96, 1]);

	const letterL = getBootIntensity(frame, 4);
	const letterA = getBootIntensity(frame, 14);
	const letterB = getBootIntensity(frame, 24);
	const letterS = getBootIntensity(frame, 34);
	const labsAverage = (letterL + letterA + letterB + letterS) / 4;
	const labsGlow = interpolate(labsAverage, [0, 1], [0.2, 1.2]);

	const descentStart = 0;
	const contactFrame = isPortrait ? 90 : 94;
	const chadReveal = interpolate(frame, [contactFrame - 1, contactFrame + 3], [0, 1], {
		easing: Easing.out(Easing.cubic),
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const chadLift = interpolate(frame, [descentStart, contactFrame], [0, 122], {
		easing: Easing.out(Easing.cubic),
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const chadBrightness = interpolate(frame, [contactFrame - 1, contactFrame + 5], [0.16, 1.12], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const chadContrast = interpolate(frame, [contactFrame - 1, contactFrame + 8], [0.86, 1.18], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const chadShadow = interpolate(frame, [0, contactFrame - 1, contactFrame + 5], [0.96, 0.96, 0], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});
	const contactBloom = interpolate(frame, [contactFrame - 4, contactFrame + 4, contactFrame + 16], [0, 1, 0.18], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const reflectionStart = isPortrait ? 102 : 108;
	const reflectionDuration = 26;
	const reflectionProgress = interpolate(
		frame,
		[reflectionStart, reflectionStart + reflectionDuration],
		[0, 1],
		{
			easing: Easing.inOut(Easing.cubic),
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		},
	);
	const reflectionOpacity = interpolate(
		frame,
		[reflectionStart, reflectionStart + 4, reflectionStart + reflectionDuration],
		[0, 0.95, 0],
		{
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		},
	);
	const reflectionX = interpolate(reflectionProgress, [0, 1], [0.31, 0.84]);

	const floorOpacity = interpolate(labsAverage, [0, 1], [0.08, 0.74]);
	const floorBlur = interpolate(labsAverage, [0, 1], [22, 42]);
	const bridgeGlow = interpolate(frame, [contactFrame - 6, contactFrame, contactFrame + 10], [0, 0.42, 0.12], {
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const logoTranslateY = isPortrait ? -43 : -47;
	const chadTopBase = logoSize * (isPortrait ? 0.122 : 0.108);
	const labsTop = logoSize * (isPortrait ? 0.49 : 0.442);
	const floorTop = logoSize * (isPortrait ? 0.645 : 0.57);
	const bridgeTop = logoSize * (isPortrait ? 0.382 : 0.345);
	const bridgeWidth = logoSize * (isPortrait ? 0.54 : 0.48);
	const bridgeHeight = logoSize * (isPortrait ? 0.28 : 0.24);

	return (
		<AbsoluteFill
			style={{
				background:
					"radial-gradient(circle at 50% 38%, rgba(20, 20, 54, 0.9) 0%, rgba(7, 8, 25, 0.98) 42%, rgba(2, 3, 12, 1) 76%)",
				color: "white",
				fontFamily: "system-ui, sans-serif",
				overflow: "hidden",
			}}
		>
			<AbsoluteFill
				style={{
					background:
						"radial-gradient(circle at 50% 40%, rgba(34, 28, 92, 0.24) 0%, rgba(34, 28, 92, 0.08) 22%, rgba(0, 0, 0, 0) 58%)",
					opacity: 0.96,
				}}
			/>
			<AbsoluteFill
				style={{
					background:
						"linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 24%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.42) 100%)",
				}}
			/>

			<div
				style={{
					position: "absolute",
					left: "50%",
					top: "50%",
					width: logoSize,
					height: logoSize,
					transform: `translate(-50%, ${logoTranslateY}%) scale(${scale})`,
					opacity: logoOpacity,
				}}
			>
				<div
					style={{
						position: "absolute",
						left: "50%",
						top: floorTop,
						width: logoSize * 0.74,
						height: logoSize * 0.11,
						transform: "translateX(-50%)",
						borderRadius: 999,
						background:
							"linear-gradient(90deg, rgba(40,135,255,0.72) 0%, rgba(63,228,255,0.9) 16%, rgba(146,255,73,0.78) 37%, rgba(255,211,72,0.84) 62%, rgba(255,94,56,0.82) 82%, rgba(255,74,164,0.72) 100%)",
						filter: `blur(${floorBlur}px)`,
						opacity: floorOpacity,
					}}
				/>
				<div
					style={{
						position: "absolute",
						left: "50%",
						top: bridgeTop,
						width: bridgeWidth,
						height: bridgeHeight,
						transform: "translateX(-50%)",
						borderRadius: "50%",
						background:
							"radial-gradient(circle, rgba(255,214,97,0.95) 0%, rgba(255,214,97,0.42) 26%, rgba(255,214,97,0.08) 56%, rgba(255,214,97,0) 74%)",
						filter: "blur(18px)",
						opacity: bridgeGlow + contactBloom * 0.3,
					}}
				/>

				<div
					style={{
						position: "absolute",
						left: "50%",
						top: chadTopBase + chadLift,
						width: chadWidth,
						height: chadHeight,
						transform: "translateX(-50%)",
					}}
				>
					<div
						style={{
							position: "absolute",
							inset: 0,
							background:
								"linear-gradient(180deg, rgba(5,7,18,1) 0%, rgba(5,7,18,0.96) 100%)",
							opacity: 0.98,
							maskImage: `url("${staticFile("logo-chad.png")}")`,
							maskSize: "contain",
							maskRepeat: "no-repeat",
							maskPosition: "center",
							WebkitMaskImage: `url("${staticFile("logo-chad.png")}")`,
							WebkitMaskSize: "contain",
							WebkitMaskRepeat: "no-repeat",
							WebkitMaskPosition: "center",
							filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.34))",
						}}
					/>
					<Img
						src={staticFile("logo-chad.png")}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "contain",
							opacity: chadReveal,
							filter: `brightness(${chadBrightness}) contrast(${chadContrast}) saturate(${0.94 + chadReveal * 0.12}) drop-shadow(0 16px 44px rgba(255, 179, 46, ${0.06 + chadReveal * 0.16 + contactBloom * 0.18}))`,
						}}
					/>
					<div
						style={{
							position: "absolute",
							inset: 0,
							background:
								"linear-gradient(180deg, rgba(2,3,12,0.96) 0%, rgba(2,3,12,0.72) 56%, rgba(2,3,12,0.22) 100%)",
							opacity: chadShadow,
							maskImage: `url("${staticFile("logo-chad.png")}")`,
							maskSize: "contain",
							maskRepeat: "no-repeat",
							maskPosition: "center",
							WebkitMaskImage: `url("${staticFile("logo-chad.png")}")`,
							WebkitMaskSize: "contain",
							WebkitMaskRepeat: "no-repeat",
							WebkitMaskPosition: "center",
						}}
					/>
					<div
						style={{
							position: "absolute",
							inset: 0,
							background:
								"linear-gradient(180deg, rgba(255,244,200,0.22) 0%, rgba(255,244,200,0.08) 36%, rgba(255,244,200,0) 76%)",
							opacity: 0.08 + contactBloom * 0.42,
							mixBlendMode: "screen",
							maskImage: `url("${staticFile("logo-chad.png")}")`,
							maskSize: "contain",
							maskRepeat: "no-repeat",
							maskPosition: "center",
							WebkitMaskImage: `url("${staticFile("logo-chad.png")}")`,
							WebkitMaskSize: "contain",
							WebkitMaskRepeat: "no-repeat",
							WebkitMaskPosition: "center",
						}}
					/>
					<div
						style={{
							position: "absolute",
							inset: 0,
							background: `linear-gradient(102deg,
								rgba(255,255,255,0) ${Math.max(0, reflectionX * 100 - 5)}%,
								rgba(255,244,196,0.18) ${Math.max(0, reflectionX * 100 - 2.5)}%,
								rgba(255,255,255,0.95) ${reflectionX * 100}%,
								rgba(255,229,126,0.28) ${Math.min(100, reflectionX * 100 + 2.5)}%,
								rgba(255,255,255,0) ${Math.min(100, reflectionX * 100 + 6)}%)`,
							mixBlendMode: "screen",
							opacity: reflectionOpacity,
							maskImage: `url("${staticFile("logo-chad.png")}")`,
							maskSize: "contain",
							maskRepeat: "no-repeat",
							maskPosition: "center",
							WebkitMaskImage: `url("${staticFile("logo-chad.png")}")`,
							WebkitMaskSize: "contain",
							WebkitMaskRepeat: "no-repeat",
							WebkitMaskPosition: "center",
							filter: "blur(0.5px)",
						}}
					/>
				</div>

				<div
					style={{
						position: "absolute",
						left: "50%",
						top: labsTop,
						width: labsWidth,
						height: labsHeight,
						transform: "translateX(-50%)",
					}}
				>
					<div
						style={{
							position: "absolute",
							left: "10%",
							top: "48%",
							width: "20%",
							height: "12%",
							borderRadius: 999,
							background: "rgba(78, 191, 255, 0.95)",
							filter: `blur(${10 + 16 * letterL}px)`,
							opacity: 0.04 + letterL * 0.24,
						}}
					/>
					<div
						style={{
							position: "absolute",
							left: "33%",
							top: "50%",
							width: "18%",
							height: "12%",
							borderRadius: 999,
							background: "rgba(161, 255, 72, 0.95)",
							filter: `blur(${10 + 16 * letterA}px)`,
							opacity: 0.04 + letterA * 0.22,
						}}
					/>
					<div
						style={{
							position: "absolute",
							left: "55%",
							top: "50%",
							width: "18%",
							height: "12%",
							borderRadius: 999,
							background: "rgba(255, 176, 43, 0.96)",
							filter: `blur(${10 + 16 * letterB}px)`,
							opacity: 0.04 + letterB * 0.22,
						}}
					/>
					<div
						style={{
							position: "absolute",
							left: "74%",
							top: "49%",
							width: "17%",
							height: "12%",
							borderRadius: 999,
							background: "rgba(255, 86, 126, 0.96)",
							filter: `blur(${10 + 16 * letterS}px)`,
							opacity: 0.04 + letterS * 0.24,
						}}
					/>
					<Img
						src={staticFile("logo-labs-cutout.png")}
						style={{
							position: "absolute",
							left: 0,
							top: 0,
							width: labsWidth,
							height: labsHeight,
							objectFit: "contain",
							opacity: 0.1 + labsAverage * 0.9,
							filter: `brightness(${0.3 + labsAverage * 0.9}) saturate(${0.88 + labsAverage * 0.22}) drop-shadow(0 0 ${8 + 14 * labsGlow}px rgba(92, 184, 255, ${0.08 + 0.12 * letterL})) drop-shadow(0 0 ${8 + 14 * labsGlow}px rgba(161, 255, 72, ${0.08 + 0.12 * letterA})) drop-shadow(0 0 ${8 + 14 * labsGlow}px rgba(255, 176, 43, ${0.08 + 0.12 * letterB})) drop-shadow(0 0 ${8 + 14 * labsGlow}px rgba(255, 86, 126, ${0.08 + 0.12 * letterS}))`,
						}}
					/>

					<div
						style={{
							position: "absolute",
							inset: 0,
							background:
								"linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 34%, rgba(255,255,255,0) 100%)",
							opacity: 0.18 + labsAverage * 0.16,
							maskImage: `url("${staticFile("logo-labs-cutout.png")}")`,
							maskSize: "contain",
							maskRepeat: "no-repeat",
							maskPosition: "center",
							WebkitMaskImage: `url("${staticFile("logo-labs-cutout.png")}")`,
							WebkitMaskSize: "contain",
							WebkitMaskRepeat: "no-repeat",
							WebkitMaskPosition: "center",
						}}
					/>
					<div
						style={{
							position: "absolute",
							left: "50%",
							bottom: labsHeight * 0.04,
							width: labsWidth * 0.76,
							height: labsHeight * 0.13,
							transform: "translateX(-50%)",
							borderRadius: 999,
							background:
								"linear-gradient(90deg, rgba(31,150,255,0.9) 0%, rgba(143,255,84,0.9) 36%, rgba(255,201,47,0.92) 64%, rgba(255,86,126,0.88) 100%)",
							filter: `blur(${18 + labsGlow * 9}px)`,
							opacity: 0.08 + labsAverage * 0.42,
						}}
					/>
				</div>
			</div>
		</AbsoluteFill>
	);
};
