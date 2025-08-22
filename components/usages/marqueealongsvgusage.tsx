import MarqueeAlongSvgPath from "@/registry/open-source/marquee-along-svg";

const path =
	"m266.5,72.5c-42,65 -10,143 -10.5,142.5c0.5,0.5 182.5,-61.5 183,-61c0.5,0.5 156.5,-45.5 156,-46c0.5,0.5 -14.5,134.5 -15,134c0.5,0.5 -347.5,54.5 -348,54c0.5,0.5 -129.5,-164.5 -130,-165c0.5,0.5 81.5,-72.5 81.5,-73.5c0,-1 125,-50 83,15z";
export default function MarqueeAlongSvgPathDemo() {
	return (
		<MarqueeAlongSvgPath
			path={path}
			baseVelocity={2}
			slowdownOnHover={true}
			draggable={true}
			repeat={1}
			dragSensitivity={0.1}
			showPath
			className="absolute w-full h-full"
			// preserveAspectRatio="none"
			grabCursor
		>
			{imgs.map((img, i) => (
				<div
					key={i}
					className="w-14 h-full hover:scale-150 duration-300 ease-in-out"
				>
					<img
						src={img.src}
						alt={`Example ${i}`}
						className="w-full h-full object-cover"
						draggable={false}
					/>
				</div>
			))}
		</MarqueeAlongSvgPath>
	);
}

const imgs = [
	{
		src: "/itjustworks.jpg",
		link: "https://google.com",
	},
	// {
	// 	src: "/itjustworks.jpg",
	// 	link: "https://google.com",
	// },
	// {
	// 	src: "/itjustworks.jpg",
	// 	link: "https://google.com",
	// },
	// {
	// 	src: "/itjustworks.jpg",
	// 	link: "https://google.com",
	// },
	// {
	// 	src: "/itjustworks.jpg",
	// 	link: "https://google.com",
	// },
	// {
	// 	src: "/itjustworks.jpg",
	// 	link: "https://google.com",
	// },
	// {
	// 	src: "/itjustworks.jpg",
	// 	link: "https://google.com",
	// },
	// {
	// 	src: "/itjustworks.jpg",
	// 	link: "https://google.com",
	// },
	// {
	// 	src: "/itjustworks.jpg",
	// 	link: "https://google.com",
	// },
	// {
	// 	src: "/itjustworks.jpg",
	// 	link: "https://google.com",
	// },
	// {
	// 	src: "/itjustworks.jpg",
	// 	link: "https://google.com",
	// },
	// {
	// 	src: "/itjustworks.jpg",
	// 	link: "https://google.com",
	// },
	// {
	// 	src: "/itjustworks.jpg",
	// 	link: "https://google.com",
	// },
	// {
	// 	src: "/itjustworks.jpg",
	// 	link: "https://google.com",
	// },
	// {
	// 	src: "/itjustworks.jpg",
	// 	link: "https://google.com",
	// },
	// {
	// 	src: "/itjustworks.jpg",
	// 	link: "https://google.com",
	// },
];
