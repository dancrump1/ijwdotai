import HeroHome from "@/registry/open-source/page-transitions/HeroHome";
import { TransitionProvider } from "@/registry/open-source/page-transitions/TransitionProvider";
import { GsapProvider } from "@/registry/open-source/scrolltrigger-replication/GsapProvider";
import { LenisProvider } from "@/registry/open-source/scrolltrigger-replication/LenisProvider";

export default function Usage() {
	return (
		<TransitionProvider>
			<LenisProvider>
				<div className="flex min-h-svh justify-between flex-col gap-y-12 lg:min-h-screen lg:gap-y-20">
					<HeroHome />
				</div>
			</LenisProvider>
			<GsapProvider scrollTrigger />
		</TransitionProvider>
	);
}
