import MarqueeAlongSvgPath from "@/registry/open-source/MarqueeAlongSVG";

const path =
	"M1 209.434C58.5872 255.935 387.926 325.938 482.583 209.434C600.905 63.8051 525.516 -43.2211 427.332 19.9613C329.149 83.1436 352.902 242.723 515.041 267.302C644.752 286.966 943.56 181.94 995 156.5";

export default function MarqueeAlongSvgPathDemo() {
	return (
		<div className="w-dvw h-dvh bg-zinc-50 flex">
			<MarqueeAlongSvgPath
				path={path}
				baseVelocity={8}
				slowdownOnHover={true}
				draggable={true}
				repeat={2}
				dragSensitivity={0.1}
				className="absolute -left-24 sm:-left-32 top-32 scale-60 sm:scale-100"
				grabCursor
			>
				{imgs.map((img, i) => (
					<div
						key={i + "marqueeSVG"}
						className="w-14 h-full hover:scale-150 duration-300 ease-in-out"
					>
						<img
							src={img.src}
							alt={`Usage ${i}`}
							className="w-full h-full object-cover"
							draggable={false}
						/>
					</div>
				))}
			</MarqueeAlongSvgPath>
		</div>
	);
}

const imgs = [
	{
		src: "/itjustworks.jpg",
		link: "https://google.com",
	},
	{
		src: "/itjustworks.jpg",
		link: "https://www.instagram.com/p/C4RTJvVpP4R/?igsh=MWZwOTNlYTVodGszMw%3D%3D",
	},
	{
		src: "/itjustworks.jpg",
		link: "https://google.com",
	},
	{
		src: "/itjustworks.jpg",
		link: "https://google.com",
	},
	{
		src: "/itjustworks.jpg",
		link: "https://google.com",
	},
	{
		src: "/itjustworks.jpg",
		link: "https://google.com",
	},
	{
		src: "/itjustworks.jpg",
		link: "https://google.com",
	},
	{
		src: "/itjustworks.jpg",
		link: "https://google.com",
	},
	{
		src: "/itjustworks.jpg",
		link: "https://google.com",
	},
	{
		src: "/itjustworks.jpg",
		link: "https://google.com",
	},
	{
		src: "/itjustworks.jpg",
		link: "https://google.com",
	},
	{
		src: "/itjustworks.jpg",
		link: "https://google.com",
	},
	{
		src: "/itjustworks.jpg",
		link: "https://google.com",
	},
];
