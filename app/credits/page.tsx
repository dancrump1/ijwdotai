export const credits = [
	"https://www.fancycomponents.dev",
	"https://www.ui-layouts.com",
	"https://github.com/pqoqubbw/icons",
	"https://www.joshuawootonn.com/",
	"https://skiper-ui.com/",
	"https://www.hover.dev",
	"https://kokonutui.com/",
	"https://zenui.net/",
	"https://ui.noxhd.com",
	"https://www.reactbits.dev/",
	"https://ui.noxhd.com/",
	"https://www.serenity-ui.com/",
	"https://cuicui.day/",
	"https://starui.link/",
	"https://berlix.vercel.app/",
	"https://ui.aceternity.com/",
	"https://www.cult-ui.com/",
	"https://auraui.vercel.app/",
	"https://www.sparkui.me/",
	"https://www.kibo-ui.com/",
	"https://www.smoothui.dev/",
	"https://geist.vercel.app/",
	"https://eclairui.gopx.dev/",
	"https://namer-ui.netlify.app/",
	"https://animata.design/",
	"https://ground.bossadizenith.me",
	"https://www.hover.dev/",
	"https://www.edilozi.pro/",
	"https://www.pldkhoa.dev",
	"https://karrix.dev/",
	"https://github.com/PhanDangKhoa96",
	"https://www.diceui.com",
	"https://motion-primitives.com/",
	"https://codepen.io/jh3y/pen/gOEgxbd",
	"https://pro.lightswind.com/",
	"https://aetherui.in/",
	"https://21st.dev/",
	"https://www.vyomaui.design",
];

export default function Page({}: {}) {
	return (
		<div>
			<section className="h-[50vh]">
				<h2>Credits ({credits.length}):</h2>
				<div className="flex flex-wrap gap-2">
					{credits.sort().map((item, i) => (
						<a
							href={item}
							target="_blank"
							rel="noopener noreferrer"
							className={`rounded-2xl h-fit relative px-6 py-4 bg-zinc-800 hover:bg-zinc-700 transition-colors text-center font-medium shadow-md ${"text-white"}`}
						>
							{item
								.replace("https://", "")
								.replace("www.", "")
								.replace(".dev", "")
								.replace(".com", "")
								.replace(".net", "")
								.replace(".me", "")
								.replace(".io", "")
								.replace(".app", "")
								.replace("/", "")
								.replace(".design", "")}
						</a>
					))}
				</div>
			</section>
		</div>
	);
}
