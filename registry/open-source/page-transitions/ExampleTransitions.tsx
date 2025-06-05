import { GsapProvider } from "../scrolltrigger-replication/GsapProvider";
import { LenisProvider } from "../scrolltrigger-replication/LenisProvider";
import HeroHome from "./HeroHome";
import { TransitionProvider } from "./TransitionProvider";

export const ExapmleTransitions = () => {
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
};
