"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import Component from "@/components/Component";
import { cn } from "@/lib/utils";
import Image1 from "@/public/itjustworks.jpg";
import { Back, Front } from "@/registry/examples/flipcardexample";
import { IconsList } from "@/registry/examples/IconsExample";
import MarqueeAlongSvgPathDemo from "@/registry/examples/marqueealongsvgexample";
import TextAlongPathExample from "@/registry/examples/textalongpathexample";
import Ballpit from "@/registry/open-source/Ballpit";
import { CheckBoxAnimated } from "@/registry/open-source/CheckboxAnimated";
import CSSBoxRef from "@/registry/open-source/CSSBox";
import Cubes from "@/registry/open-source/Cubes";
import {
	Editor,
	EditorBubbleMenu,
	EditorCharacterCount,
	EditorClearFormatting,
	EditorFloatingMenu,
	EditorFormatBold,
	EditorFormatCode,
	EditorFormatItalic,
	EditorFormatStrike,
	EditorFormatSubscript,
	EditorFormatSuperscript,
	EditorFormatUnderline,
	EditorLinkSelector,
	EditorNodeBulletList,
	EditorNodeCode,
	EditorNodeHeading1,
	EditorNodeHeading2,
	EditorNodeHeading3,
	EditorNodeOrderedList,
	EditorNodeQuote,
	EditorNodeTable,
	EditorNodeTaskList,
	EditorNodeText,
	EditorProvider,
	EditorSelector,
	EditorTableColumnAfter,
	EditorTableColumnBefore,
	EditorTableColumnDelete,
	EditorTableColumnMenu,
	EditorTableDelete,
	EditorTableFix,
	EditorTableGlobalMenu,
	EditorTableHeaderColumnToggle,
	EditorTableHeaderRowToggle,
	EditorTableMenu,
	EditorTableMergeCells,
	EditorTableRowAfter,
	EditorTableRowBefore,
	EditorTableRowDelete,
	EditorTableRowMenu,
	EditorTableSplitCell,
	JSONContent,
} from "@/registry/open-source/Editor";
import { FlipCard } from "@/registry/open-source/FlipCard";
import { FullscreenImage } from "@/registry/open-source/FullscreenImage";
import { ICON_LIST } from "@/registry/open-source/icons";
import { InputAnimated } from "@/registry/open-source/InputAnimated";
import MagicBento from "@/registry/open-source/MagicBento";
import PixelImage from "@/registry/open-source/PixelImage";
import { Spinner, SpinnerProps } from "@/registry/open-source/Spinner";
import TargetCursor from "@/registry/open-source/TargetCursor";
import TextCurve from "@/registry/open-source/TextCurve";
import { TextSplit } from "@/registry/open-source/TextSplit";
import TextTrail from "@/registry/open-source/TextTrail";
import {
	animeData,
	ASCII,
	bentoItems,
	blogContent,
	cards,
	chromaItems,
	content,
	data,
	demoItems,
	dummyContent,
	example_cardstack_data,
	example_opposite_links_data,
	example_testimonials_data,
	exampleData,
	exampleImages,
	fadeInVariants,
	filter_constants,
	filterOptions,
	highlightClass,
	highlightColor,
	images,
	infiniteMenuItems,
	inViewOptions,
	items,
	itemsLinearlDialog,
	mediaBetweenElements,
	people,
	products,
	projects,
	socials,
	stepsExamples,
	tabs,
	testimonials,
	testimonialsExamples,
	TitleComponent,
	transition,
	typewritterTestimonials,
	words,
	wordVariants,
} from "@/registry/utils/example_data";
import { useWindowSize } from "@/registry/utils/useWindowSize";
import Lenis from "lenis";
import {
	Bell,
	CheckIcon,
	ChevronDown,
	Facebook,
	HelpCircle,
	Home,
	Instagram,
	Linkedin,
	Mail,
	Plus,
	Send,
	Star,
	Twitter,
	XCircle,
	XIcon,
} from "lucide-react";
import {
	AnimatePresence,
	LayoutGroup,
	motion,
	steps,
	useMotionValueEvent,
	useScroll,
	useTransform,
} from "motion/react";
import { Poline, positionFunctions } from "poline";
import { FiMousePointer } from "react-icons/fi";
import { useMediaQuery } from "usehooks-ts";

import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";

const ComponentLoading = () => {
	useEffect(() => {
		return () => {};
	}, []);

	return (
		<div
			role="status"
			className="flex w-full h-screen justify-center items-center"
		>
			<svg
				aria-hidden="true"
				className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
				/>
				<path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/>
			</svg>
			<span className="sr-only">Loading...</span>
		</div>
	);
};

const MatterBody = dynamic(
	() => import("@/registry/open-source/Gravity").then((mod) => mod.MatterBody),
	{
		loading: ComponentLoading,
		// loader: async () => {
		// 	return await ComponentLoading;
		// },
	}
);
const GridContent = dynamic(
	() => import("@/registry/open-source/GridContent"),
	{ loading: ComponentLoading }
);
const GridDistortion = dynamic(
	() => import("@/registry/open-source/GridDistortion"),
	{ loading: ComponentLoading }
);
const HeroHighlight = dynamic(
	() =>
		import("@/registry/open-source/HeroHighlight").then(
			(mod) => mod.HeroHighlight
		),
	{ loading: ComponentLoading }
);
const Highlight = dynamic(
	() =>
		import("@/registry/open-source/HeroHighlight").then(
			(mod) => mod.Highlight
		),
	{ loading: ComponentLoading }
);
const HeroParallax = dynamic(
	() =>
		import("@/registry/open-source/HeroParallax").then(
			(mod) => mod.HeroParallax
		),
	{ loading: ComponentLoading }
);
const CardCTA = dynamic(() => import("@/registry/open-source/HorizontalCta"), {
	loading: ComponentLoading,
});
const Example = dynamic(
	() => import("@/registry/open-source/HorizontalScrollGallery"),
	{ loading: ComponentLoading }
);
const DirectionAwareHover = dynamic(
	() =>
		import("@/registry/open-source/Hover").then(
			(mod) => mod.DirectionAwareHover
		),
	{ loading: ComponentLoading }
);
const HoverBorderGradient = dynamic(
	() =>
		import("@/registry/open-source/HoverBorder").then(
			(mod) => mod.HoverBorderGradient
		),
	{ loading: ComponentLoading }
);
const EvervaultCard = dynamic(
	() =>
		import("@/registry/open-source/HoverCard").then(
			(mod) => mod.EvervaultCard
		),
	{ loading: ComponentLoading }
);
const Icon = dynamic(
	() => import("@/registry/open-source/HoverCard").then((mod) => mod.Icon),
	{ loading: ComponentLoading }
);
const HoverCards = dynamic(() => import("@/registry/open-source/HoverCards"), {
	loading: ComponentLoading,
});
const HoverCard = dynamic(
	() =>
		import("@/registry/open-source/HoverGallery").then(
			(mod) => mod.HoverCard
		),
	{ loading: ComponentLoading }
);
const ClipPathLinks = dynamic(
	() =>
		import("@/registry/open-source/HoverSquares").then(
			(mod) => mod.ClipPathLinks
		),
	{ loading: ComponentLoading }
);
const ImageReveal = dynamic(
	() => import("@/registry/open-source/ImageReveal"),
	{ loading: ComponentLoading }
);
const ImageWheel = dynamic(() => import("@/registry/open-source/ImageWheel"), {
	loading: ComponentLoading,
});
const ImageZoom = dynamic(() => import("@/registry/open-source/ImageZoom"), {
	loading: ComponentLoading,
});
const InfiniteCarousel = dynamic(
	() => import("@/registry/open-source/InfiniteCarousel"),
	{ loading: ComponentLoading }
);
const InfiniteMenu = dynamic(
	() => import("@/registry/open-source/InfiniteMenu"),
	{ loading: ComponentLoading }
);
const InfiniteMovingCards = dynamic(
	() =>
		import("@/registry/open-source/InfiniteMovingCards").then(
			(mod) => mod.InfiniteMovingCards
		),
	{ loading: ComponentLoading }
);
const InfoCard = dynamic(
	() => import("@/registry/open-source/InfoCard").then((mod) => mod.InfoCard),
	{ loading: ComponentLoading }
);
const InfoCardAction = dynamic(
	() =>
		import("@/registry/open-source/InfoCard").then(
			(mod) => mod.InfoCardAction
		),
	{ loading: ComponentLoading }
);
const InfoCardContent = dynamic(
	() =>
		import("@/registry/open-source/InfoCard").then(
			(mod) => mod.InfoCardContent
		),
	{ loading: ComponentLoading }
);
const InfoCardDescription = dynamic(
	() =>
		import("@/registry/open-source/InfoCard").then(
			(mod) => mod.InfoCardDescription
		),
	{ loading: ComponentLoading }
);
const InfoCardDismiss = dynamic(
	() =>
		import("@/registry/open-source/InfoCard").then(
			(mod) => mod.InfoCardDismiss
		),
	{ loading: ComponentLoading }
);
const InfoCardFooter = dynamic(
	() =>
		import("@/registry/open-source/InfoCard").then(
			(mod) => mod.InfoCardFooter
		),
	{ loading: ComponentLoading }
);
const InfoCardMedia = dynamic(
	() =>
		import("@/registry/open-source/InfoCard").then(
			(mod) => mod.InfoCardMedia
		),
	{ loading: ComponentLoading }
);
const InfoCardTitle = dynamic(
	() =>
		import("@/registry/open-source/InfoCard").then(
			(mod) => mod.InfoCardTitle
		),
	{ loading: ComponentLoading }
);
const InnerGlow = dynamic(
	() =>
		import("@/registry/open-source/InnerGlow").then((mod) => mod.InnerGlow),
	{ loading: ComponentLoading }
);
const LampContainer = dynamic(
	() => import("@/registry/open-source/Lamp").then((mod) => mod.LampContainer),
	{ loading: ComponentLoading }
);
const Lane = dynamic(() => import("@/registry/open-source/LaneCard"), {
	loading: ComponentLoading,
});
const ListCard = dynamic(
	() => import("@/registry/open-source/LaneCard").then((mod) => mod.ListCard),
	{ loading: ComponentLoading }
);
const Lanyard = dynamic(() => import("@/registry/open-source/Lanyard"), {
	loading: ComponentLoading,
});
const LayoutGrid = dynamic(
	() =>
		import("@/registry/open-source/LayoutGrid").then((mod) => mod.LayoutGrid),
	{ loading: ComponentLoading }
);
const Lens = dynamic(
	() => import("@/registry/open-source/Lens").then((mod) => mod.Lens),
	{ loading: ComponentLoading }
);
const Letter3DSwap = dynamic(
	() => import("@/registry/open-source/Letter3dSwap"),
	{ loading: ComponentLoading }
);
const LetterSwapForward = dynamic(
	() => import("@/registry/open-source/LetterHover"),
	{ loading: ComponentLoading }
);
const Dialog = dynamic(
	() =>
		import("@/registry/open-source/LinearDialog").then((mod) => mod.Dialog),
	{ loading: ComponentLoading }
);
const DialogClose = dynamic(
	() =>
		import("@/registry/open-source/LinearDialog").then(
			(mod) => mod.DialogClose
		),
	{ loading: ComponentLoading }
);
const DialogContainer = dynamic(
	() =>
		import("@/registry/open-source/LinearDialog").then(
			(mod) => mod.DialogContainer
		),
	{ loading: ComponentLoading }
);
const DialogContent = dynamic(
	() =>
		import("@/registry/open-source/LinearDialog").then(
			(mod) => mod.DialogContent
		),
	{ loading: ComponentLoading }
);
const DialogDescription = dynamic(
	() =>
		import("@/registry/open-source/LinearDialog").then(
			(mod) => mod.DialogDescription
		),
	{ loading: ComponentLoading }
);
const DialogImage = dynamic(
	() =>
		import("@/registry/open-source/LinearDialog").then(
			(mod) => mod.DialogImage
		),
	{ loading: ComponentLoading }
);
const DialogTitle = dynamic(
	() =>
		import("@/registry/open-source/LinearDialog").then(
			(mod) => mod.DialogTitle
		),
	{ loading: ComponentLoading }
);
const DialogTrigger = dynamic(
	() =>
		import("@/registry/open-source/LinearDialog").then(
			(mod) => mod.DialogTrigger
		),
	{ loading: ComponentLoading }
);
const GoogleGeminiEffect = dynamic(
	() =>
		import("@/registry/open-source/LineBackground").then(
			(mod) => mod.GoogleGeminiEffect
		),
	{ loading: ComponentLoading }
);
const LinkPreview = dynamic(
	() =>
		import("@/registry/open-source/LinkPreview").then(
			(mod) => mod.LinkPreview
		),
	{ loading: ComponentLoading }
);
const ListRotator = dynamic(
	() => import("@/registry/open-source/ListRotator"),
	{ loading: ComponentLoading }
);
const MacbookScroll = dynamic(() => import("@/registry/open-source/Macbook"), {
	loading: ComponentLoading,
});
const MagnetLines = dynamic(
	() => import("@/registry/open-source/MagnetLines"),
	{ loading: ComponentLoading }
);
const MarqueeAlongSvgPath = dynamic(
	() => import("@/registry/open-source/MarqueeAlongSVG"),
	{ loading: ComponentLoading }
);
const MaskContainer = dynamic(
	() =>
		import("@/registry/open-source/MaskEffect").then(
			(mod) => mod.MaskContainer
		),
	{ loading: ComponentLoading }
);
const MatrixBackground = dynamic(
	() => import("@/registry/open-source/MatrixBackground"),
	{ loading: ComponentLoading }
);
const MediaBetweenText = dynamic(
	() => import("@/registry/open-source/MediaBetweenText"),
	{ loading: ComponentLoading }
);
const MouseImageTrail = dynamic(
	() =>
		import("@/registry/open-source/MouseImageTrail").then(
			(mod) => mod.MouseImageTrail
		),
	{ loading: ComponentLoading }
);
const NineDotGridRandom = dynamic(
	() => import("@/registry/open-source/NineDotLoader"),
	{ loading: ComponentLoading }
);
const NumberTicker = dynamic(
	() => import("@/registry/open-source/NumberTicker"),
	{ loading: ComponentLoading }
);
const OppositeScroll = dynamic(
	() => import("@/registry/open-source/OppositeScrollLinks"),
	{ loading: ComponentLoading }
);
const ExapmleTransitions = dynamic(
	() =>
		import("@/registry/open-source/page-transitions/ExampleTransitions").then(
			(mod) => mod.ExapmleTransitions
		),
	{ loading: ComponentLoading }
);
const ParallaxCarousel = dynamic(
	() => import("@/registry/open-source/ParallaxCarousel"),
	{ loading: ComponentLoading }
);
const Floating = dynamic(
	() => import("@/registry/open-source/ParallaxFloating"),
	{ loading: ComponentLoading }
);
const FloatingElement = dynamic(
	() =>
		import("@/registry/open-source/ParallaxFloating").then(
			(mod) => mod.FloatingElement
		),
	{ loading: ComponentLoading }
);
const ParallaxScroll = dynamic(
	() =>
		import("@/registry/open-source/ParallaxScroll").then(
			(mod) => mod.ParallaxScroll
		),
	{ loading: ComponentLoading }
);
const GitlabSidebarPage = dynamic(
	() => import("@/registry/open-source/performant-sidebar/PerformantSidebar"),
	{ loading: ComponentLoading }
);
const PinContainer = dynamic(
	() => import("@/registry/open-source/Pin").then((mod) => mod.PinContainer),
	{ loading: ComponentLoading }
);
const PingPong = dynamic(() => import("@/registry/open-source/PingPong"), {
	loading: ComponentLoading,
});
const DemoPipelineView = dynamic(
	() =>
		import("@/registry/open-source/Pipeline").then(
			(mod) => mod.DemoPipelineView
		),
	{ loading: ComponentLoading }
);
const Pointer = dynamic(
	() => import("@/registry/open-source/Pointer").then((mod) => mod.Pointer),
	{ loading: ComponentLoading }
);
const PopularPriceCard = dynamic(
	() => import("@/registry/open-source/PopularPriceCard"),
	{ loading: ComponentLoading }
);
const PowerOffSlide = dynamic(
	() => import("@/registry/open-source/PowerOffSlide"),
	{ loading: ComponentLoading }
);
const Preloader = dynamic(() => import("@/registry/open-source/Preloader"), {
	loading: ComponentLoading,
});
const PricingCard = dynamic(() => import("@/registry/open-source/PriceCard"), {
	loading: ComponentLoading,
});
const ManyOffersVariant1 = dynamic(
	() => import("@/registry/open-source/PricingTable"),
	{ loading: ComponentLoading }
);
const ProgressCarousel = dynamic(
	() =>
		import("@/registry/open-source/ProgressCarousel").then(
			(mod) => mod.ProgressCarousel
		),
	{ loading: ComponentLoading }
);
const SliderBtn = dynamic(
	() =>
		import("@/registry/open-source/ProgressCarousel").then(
			(mod) => mod.SliderBtn
		),
	{ loading: ComponentLoading }
);
const SliderBtnGroup = dynamic(
	() =>
		import("@/registry/open-source/ProgressCarousel").then(
			(mod) => mod.SliderBtnGroup
		),
	{ loading: ComponentLoading }
);
const SliderContent = dynamic(
	() =>
		import("@/registry/open-source/ProgressCarousel").then(
			(mod) => mod.SliderContent
		),
	{ loading: ComponentLoading }
);
const SliderWrapper = dynamic(
	() =>
		import("@/registry/open-source/ProgressCarousel").then(
			(mod) => mod.SliderWrapper
		),
	{ loading: ComponentLoading }
);
const ProgressiveBlur = dynamic(
	() =>
		import("@/registry/open-source/ProgressiveBlur").then(
			(mod) => mod.ProgressiveBlur
		),
	{ loading: ComponentLoading }
);
const RandomLetterSwapForward = dynamic(
	() =>
		import("@/registry/open-source/RandomLetterSwapHover").then(
			(mod) => mod.RandomLetterSwapForward
		),
	{ loading: ComponentLoading }
);
const RandomLetterSwapPingPong = dynamic(
	() =>
		import("@/registry/open-source/RandomLetterSwapHover").then(
			(mod) => mod.RandomLetterSwapPingPong
		),
	{ loading: ComponentLoading }
);
const RoundedScroll = dynamic(
	() => import("@/registry/open-source/RoundedScrollbar"),
	{ loading: ComponentLoading }
);
const ScalingButton = dynamic(
	() =>
		import("@/registry/open-source/ScalingButton").then(
			(mod) => mod.ScalingButton
		),
	{ loading: ComponentLoading }
);
const Screensaver = dynamic(
	() => import("@/registry/open-source/ScreenSaver"),
	{ loading: ComponentLoading }
);
const ScrollFloat = dynamic(
	() => import("@/registry/open-source/ScrollFloat"),
	{ loading: ComponentLoading }
);
const ScrollIsland = dynamic(
	() =>
		import("@/registry/open-source/ScrollIsland").then(
			(mod) => mod.ScrollIsland
		),
	{ loading: ComponentLoading }
);
const ScrollReveal = dynamic(
	() => import("@/registry/open-source/ScrollReveal"),
	{ loading: ComponentLoading }
);
const StickyScroll1 = dynamic(
	() =>
		import(
			"@/registry/open-source/scrolltrigger-replication/components/StickyScroll1"
		),
	{ loading: ComponentLoading }
);
const StickyScroll2 = dynamic(
	() =>
		import(
			"@/registry/open-source/scrolltrigger-replication/components/StickyScroll2"
		),
	{ loading: ComponentLoading }
);
const ExampleScrollReplication = dynamic(
	() =>
		import("@/registry/open-source/scrolltrigger-replication/Example").then(
			(mod) => mod.ExampleScrollReplication
		),
	{ loading: ComponentLoading }
);
const PlaceholdersAndVanishInput = dynamic(
	() =>
		import("@/registry/open-source/Searchbar").then(
			(mod) => mod.PlaceholdersAndVanishInput
		),
	{ loading: ComponentLoading }
);
const SelectModel = dynamic(
	() =>
		import("@/registry/open-source/SelectModal").then(
			(mod) => mod.SelectModel
		),
	{ loading: ComponentLoading }
);
const FeaturesSectionDemo = dynamic(
	() =>
		import("@/registry/open-source/Services").then(
			(mod) => mod.FeaturesSectionDemo
		),
	{ loading: ComponentLoading }
);
const ShapeBlur = dynamic(() => import("@/registry/open-source/ShapeBlur"), {
	loading: ComponentLoading,
});
const ShareButton = dynamic(
	() => import("@/registry/open-source/ShareButton"),
	{ loading: ComponentLoading }
);
const ShuffleHero = dynamic(
	() => import("@/registry/open-source/ShuffleHero"),
	{ loading: ComponentLoading }
);
const SidePanel = dynamic(() => import("@/registry/open-source/Sideivdeo"), {
	loading: ComponentLoading,
});
const FooterThird = dynamic(
	() => import("@/registry/open-source/SimpleFooter"),
	{ loading: ComponentLoading }
);
const SimpleGrid = dynamic(() => import("@/registry/open-source/SimpleGrid"), {
	loading: ComponentLoading,
});
const SlideButton = dynamic(
	() => import("@/registry/open-source/SlideButton"),
	{ loading: ComponentLoading }
);
const SlidingNumber = dynamic(
	() =>
		import("@/registry/open-source/SlidingNumbers").then(
			(mod) => mod.SlidingNumber
		),
	{ loading: ComponentLoading }
);
const AnimatedSlider = dynamic(
	() =>
		import("@/registry/open-source/SmoothSlider").then(
			(mod) => mod.AnimatedSlider
		),
	{ loading: ComponentLoading }
);
const DefaultView = dynamic(
	() =>
		import("@/registry/open-source/SmoothSlider").then(
			(mod) => mod.DefaultView
		),
	{ loading: ComponentLoading }
);
const OnHover = dynamic(
	() =>
		import("@/registry/open-source/SmoothSlider").then((mod) => mod.OnHover),
	{ loading: ComponentLoading }
);
const SliderCard = dynamic(
	() =>
		import("@/registry/open-source/SmoothSlider").then(
			(mod) => mod.AnimatedCard
		),
	{ loading: ComponentLoading }
);
const SliderCardContent = dynamic(
	() =>
		import("@/registry/open-source/SmoothSlider").then(
			(mod) => mod.CardContent
		),
	{ loading: ComponentLoading }
);
const Game = dynamic(() => import("@/registry/open-source/snake-game/Game"), {
	loading: ComponentLoading,
});
const SocialLinks = dynamic(
	() =>
		import("@/registry/open-source/SocialLinks").then(
			(mod) => mod.SocialLinks
		),
	{ loading: ComponentLoading }
);
const SparklesCore = dynamic(
	() =>
		import("@/registry/open-source/Sparkles").then((mod) => mod.SparklesCore),
	{ loading: ComponentLoading }
);
const Spotlight = dynamic(
	() =>
		import("@/registry/open-source/Spotlight").then((mod) => mod.Spotlight),
	{ loading: ComponentLoading }
);
const SpringElement = dynamic(
	() =>
		import("@/registry/open-source/SpringElement").then(
			(mod) => mod.SpringElement
		),
	{ loading: ComponentLoading }
);
const FAQSpring = dynamic(
	() =>
		import("@/registry/open-source/SpringFAQ").then((mod) => mod.FAQSpring),
	{ loading: ComponentLoading }
);
const SpringModal = dynamic(
	() =>
		import("@/registry/open-source/SpringModal").then(
			(mod) => mod.SpringModal
		),
	{ loading: ComponentLoading }
);
const StackedCarousel = dynamic(
	() => import("@/registry/open-source/StackedCarousel"),
	{ loading: ComponentLoading }
);
const StackingCards = dynamic(
	() => import("@/registry/open-source/StackingCards"),
	{ loading: ComponentLoading }
);
const StackingCardItem = dynamic(
	() =>
		import("@/registry/open-source/StackingCards").then(
			(mod) => mod.StackingCardItem
		),
	{ loading: ComponentLoading }
);
const PeelableSticker = dynamic(
	() => import("@/registry/open-source/StickerPeel"),
	{ loading: ComponentLoading }
);
const StickyScroll = dynamic(
	() =>
		import("@/registry/open-source/StickyScrollReveal").then(
			(mod) => mod.StickyScroll
		),
	{ loading: ComponentLoading }
);
const StripeAccordion = dynamic(
	() =>
		import("@/registry/open-source/StripeAccordion").then(
			(mod) => mod.StripeAccordion
		),
	{ loading: ComponentLoading }
);
const ExampleSlider = dynamic(
	() =>
		import("@/registry/open-source/StripeAccordion").then(
			(mod) => mod.ExampleSlider
		),
	{ loading: ComponentLoading }
);
const UnsplashGrid = dynamic(
	() =>
		import("@/registry/open-source/StripeAccordion").then(
			(mod) => mod.UnsplashGrid
		),
	{ loading: ComponentLoading }
);
const VerticalTiles = dynamic(
	() => import("@/registry/open-source/StripesPreloader"),
	{ loading: ComponentLoading }
);
const SwapColumnFeatures = dynamic(
	() => import("@/registry/open-source/SwapColumnFeatures"),
	{ loading: ComponentLoading }
);
const Table = dynamic(
	() => import("@/registry/open-source/Table").then((mod) => mod.Table),
	{ loading: ComponentLoading }
);
const TableBody = dynamic(
	() => import("@/registry/open-source/Table").then((mod) => mod.TableBody),
	{ loading: ComponentLoading }
);
const TableCaption = dynamic(
	() => import("@/registry/open-source/Table").then((mod) => mod.TableCaption),
	{ loading: ComponentLoading }
);
const TableCell = dynamic(
	() => import("@/registry/open-source/Table").then((mod) => mod.TableCell),
	{ loading: ComponentLoading }
);
const TableFoot = dynamic(
	() => import("@/registry/open-source/Table").then((mod) => mod.TableFoot),
	{ loading: ComponentLoading }
);
const TableHead = dynamic(
	() => import("@/registry/open-source/Table").then((mod) => mod.TableHead),
	{ loading: ComponentLoading }
);
const TableHeaderCell = dynamic(
	() =>
		import("@/registry/open-source/Table").then((mod) => mod.TableHeaderCell),
	{ loading: ComponentLoading }
);
const TableRoot = dynamic(
	() => import("@/registry/open-source/Table").then((mod) => mod.TableRoot),
	{ loading: ComponentLoading }
);
const TableRow = dynamic(
	() => import("@/registry/open-source/Table").then((mod) => mod.TableRow),
	{ loading: ComponentLoading }
);
const Tabs = dynamic(
	() => import("@/registry/open-source/Tabs").then((mod) => mod.Tabs),
	{ loading: ComponentLoading }
);
const TextAnimate = dynamic(
	() =>
		import("@/registry/open-source/TextAnimate").then(
			(mod) => mod.TextAnimate
		),
	{ loading: ComponentLoading }
);
const TextCursor = dynamic(() => import("@/registry/open-source/TextCursor"), {
	loading: ComponentLoading,
});
const TextFocus = dynamic(() => import("@/registry/open-source/TextFocus"), {
	loading: ComponentLoading,
});
const TextGradientTransition = dynamic(
	() => import("@/registry/open-source/TextGradient"),
	{ loading: ComponentLoading }
);
const TextHighlighter = dynamic(
	() =>
		import("@/registry/open-source/TextHighlighter").then(
			(mod) => mod.TextHighlighter
		),
	{ loading: ComponentLoading }
);
const TextHoverEffect = dynamic(
	() =>
		import("@/registry/open-source/TextHover").then(
			(mod) => mod.TextHoverEffect
		),
	{ loading: ComponentLoading }
);
const TextMorph = dynamic(
	() =>
		import("@/registry/open-source/TextMorph").then((mod) => mod.TextMorph),
	{ loading: ComponentLoading }
);
const TextParallaxContentExample = dynamic(
	() =>
		import("@/registry/open-source/TextParallaxContent").then(
			(mod) => mod.TextParallaxContentExample
		),
	{ loading: ComponentLoading }
);
const TextCursorProximity = dynamic(
	() => import("@/registry/open-source/TextProximity"),
	{ loading: ComponentLoading }
);
const TextRevealCard = dynamic(
	() =>
		import("@/registry/open-source/TextReveal").then(
			(mod) => mod.TextRevealCard
		),
	{ loading: ComponentLoading }
);
const TextRevealCardDescription = dynamic(
	() =>
		import("@/registry/open-source/TextReveal").then(
			(mod) => mod.TextRevealCardDescription
		),
	{ loading: ComponentLoading }
);
const TextRevealCardTitle = dynamic(
	() =>
		import("@/registry/open-source/TextReveal").then(
			(mod) => mod.TextRevealCardTitle
		),
	{ loading: ComponentLoading }
);
const TextRoll = dynamic(
	() => import("@/registry/open-source/TextRoll").then((mod) => mod.TextRoll),
	{ loading: ComponentLoading }
);
const TextRotate = dynamic(() => import("@/registry/open-source/TextRotate"), {
	loading: ComponentLoading,
});
const AnimatedTextUnderline = dynamic(
	() =>
		import("@/registry/open-source/TextUnderline").then(
			(mod) => mod.AnimatedTextUnderline
		),
	{ loading: ComponentLoading }
);
const ThemeToggleButton = dynamic(
	() =>
		import("@/registry/open-source/theme_changer/ThemeToggleButton").then(
			(mod) => mod.ThemeToggleButton
		),
	{ loading: ComponentLoading }
);
const Threads = dynamic(() => import("@/registry/open-source/Threads"), {
	loading: ComponentLoading,
});
const ThreeDotSimpleLoader = dynamic(
	() => import("@/registry/open-source/ThreeBounceLoader"),
	{ loading: ComponentLoading }
);
const ThreeDotLoaderGrowing = dynamic(
	() => import("@/registry/open-source/ThreeDotLoader"),
	{ loading: ComponentLoading }
);
const TilesBackground = dynamic(
	() => import("@/registry/open-source/TilesBackground"),
	{ loading: ComponentLoading }
);
const Timeline = dynamic(
	() => import("@/registry/open-source/Timeline").then((mod) => mod.Timeline),
	{ loading: ComponentLoading }
);
const AnimatedTooltip = dynamic(
	() =>
		import("@/registry/open-source/ToolTip").then(
			(mod) => mod.AnimatedTooltip
		),
	{ loading: ComponentLoading }
);
const TracingBeam = dynamic(
	() =>
		import("@/registry/open-source/TracingBeam").then(
			(mod) => mod.TracingBeam
		),
	{ loading: ComponentLoading }
);
const TypewriterTestimonial = dynamic(
	() => import("@/registry/open-source/TypewriterTestimonials"),
	{ loading: ComponentLoading }
);
const UnderlineToBackground = dynamic(
	() => import("@/registry/open-source/UnderlineToBackground"),
	{ loading: ComponentLoading }
);
const VerticalCutReveal = dynamic(
	() => import("@/registry/open-source/VerticalCutReveal"),
	{ loading: ComponentLoading }
);
const VideoButton = dynamic(
	() => import("@/registry/open-source/VideoButton"),
	{ loading: ComponentLoading }
);
const VideoHero = dynamic(() => import("@/registry/open-source/VideoHero"), {
	loading: ComponentLoading,
});
const YouTubePlayer2 = dynamic(
	() =>
		import("@/registry/open-source/VideoPlayer2").then(
			(mod) => mod.YouTubePlayer2
		),
	{ loading: ComponentLoading }
);
const VideoContainer = dynamic(
	() =>
		import("@/registry/open-source/VideoViewer").then(
			(mod) => mod.VideoContainer
		),
	{ loading: ComponentLoading }
);
const View = dynamic(() => import("@/registry/open-source/ViewList"), {
	loading: ComponentLoading,
});
const WobbleCard = dynamic(() => import("@/registry/open-source/WobbleCard"), {
	loading: ComponentLoading,
});
const WordTornadoDemo = dynamic(
	() => import("@/registry/open-source/WordTornado"),
	{ loading: ComponentLoading }
);
const Avatar = dynamic(
	() => import("@/components/ui/avatar").then((mod) => mod.Avatar),
	{ loading: ComponentLoading }
);
const AvatarFallback = dynamic(
	() => import("@/components/ui/avatar").then((mod) => mod.AvatarFallback),
	{ loading: ComponentLoading }
);
const AvatarImage = dynamic(
	() => import("@/components/ui/avatar").then((mod) => mod.AvatarImage),
	{ loading: ComponentLoading }
);
const Button = dynamic(
	() => import("@/components/ui/button").then((mod) => mod.Button),
	{ loading: ComponentLoading }
);
const Card = dynamic(
	() => import("@/components/ui/card").then((mod) => mod.Card),
	{ loading: ComponentLoading }
);
const CardContent = dynamic(
	() => import("@/components/ui/card").then((mod) => mod.CardContent),
	{ loading: ComponentLoading }
);
const CardDescription = dynamic(
	() => import("@/components/ui/card").then((mod) => mod.CardDescription),
	{ loading: ComponentLoading }
);
const CardHeader = dynamic(
	() => import("@/components/ui/card").then((mod) => mod.CardHeader),
	{ loading: ComponentLoading }
);
const CardTitle = dynamic(
	() => import("@/components/ui/card").then((mod) => mod.CardTitle),
	{ loading: ComponentLoading }
);
const Command = dynamic(
	() => import("@/components/ui/command").then((mod) => mod.Command),
	{ loading: ComponentLoading }
);
const CommandEmpty = dynamic(
	() => import("@/components/ui/command").then((mod) => mod.CommandEmpty),
	{ loading: ComponentLoading }
);
const CommandGroup = dynamic(
	() => import("@/components/ui/command").then((mod) => mod.CommandGroup),
	{ loading: ComponentLoading }
);
const CommandInput = dynamic(
	() => import("@/components/ui/command").then((mod) => mod.CommandInput),
	{ loading: ComponentLoading }
);
const CommandItem = dynamic(
	() => import("@/components/ui/command").then((mod) => mod.CommandItem),
	{ loading: ComponentLoading }
);
const CommandList = dynamic(
	() => import("@/components/ui/command").then((mod) => mod.CommandList),
	{ loading: ComponentLoading }
);
const CommandSeparator = dynamic(
	() => import("@/components/ui/command").then((mod) => mod.CommandSeparator),
	{ loading: ComponentLoading }
);
const Input = dynamic(
	() => import("@/components/ui/input").then((mod) => mod.Input),
	{ loading: ComponentLoading }
);
const Popover = dynamic(
	() => import("@/components/ui/popover").then((mod) => mod.Popover),
	{ loading: ComponentLoading }
);
const PopoverContent = dynamic(
	() => import("@/components/ui/popover").then((mod) => mod.PopoverContent),
	{ loading: ComponentLoading }
);
const PopoverTrigger = dynamic(
	() => import("@/components/ui/popover").then((mod) => mod.PopoverTrigger),
	{ loading: ComponentLoading }
);
const Select = dynamic(
	() => import("@/components/ui/select").then((mod) => mod.Select),
	{ loading: ComponentLoading }
);
const SelectContent = dynamic(
	() => import("@/components/ui/select").then((mod) => mod.SelectContent),
	{ loading: ComponentLoading }
);
const SelectItem = dynamic(
	() => import("@/components/ui/select").then((mod) => mod.SelectItem),
	{ loading: ComponentLoading }
);
const SelectTrigger = dynamic(
	() => import("@/components/ui/select").then((mod) => mod.SelectTrigger),
	{ loading: ComponentLoading }
);
const SelectValue = dynamic(
	() => import("@/components/ui/select").then((mod) => mod.SelectValue),
	{ loading: ComponentLoading }
);
const Skeleton = dynamic(
	() => import("@/components/ui/skeleton").then((mod) => mod.Skeleton),
	{ loading: ComponentLoading }
);
const ToggleGroup = dynamic(
	() => import("@/components/ui/toggle-group").then((mod) => mod.ToggleGroup),
	{ loading: ComponentLoading }
);
const ToggleGroupItem = dynamic(
	() =>
		import("@/components/ui/toggle-group").then((mod) => mod.ToggleGroupItem),
	{ loading: ComponentLoading }
);
const Tooltip = dynamic(
	() => import("@/components/ui/tooltip").then((mod) => mod.Tooltip),
	{ loading: ComponentLoading }
);
const TooltipContent = dynamic(
	() => import("@/components/ui/tooltip").then((mod) => mod.TooltipContent),
	{ loading: ComponentLoading }
);
const TooltipProvider = dynamic(
	() => import("@/components/ui/tooltip").then((mod) => mod.TooltipProvider),
	{ loading: ComponentLoading }
);
const TooltipTrigger = dynamic(
	() => import("@/components/ui/tooltip").then((mod) => mod.TooltipTrigger),
	{ loading: ComponentLoading }
);
const AccordionBasic = dynamic(
	() =>
		import("@/registry/basic/AccordionBasic").then(
			(mod) => mod.AccordionBasic
		),
	{ loading: ComponentLoading }
);
const BasicCard = dynamic(() => import("@/registry/basic/CardBasic"), {
	loading: ComponentLoading,
});
const CardWithImages = dynamic(() => import("@/registry/basic/CardWithImage"), {
	loading: ComponentLoading,
});
const Page = dynamic(() => import("@/registry/examples/preloaderexample"), {
	loading: ComponentLoading,
});
const CardBody = dynamic(
	() => import("@/registry/open-source/3dCard").then((mod) => mod.CardBody),
	{ loading: ComponentLoading }
);
const CardContainer = dynamic(
	() =>
		import("@/registry/open-source/3dCard").then((mod) => mod.CardContainer),
	{ loading: ComponentLoading }
);
const CardItem = dynamic(
	() => import("@/registry/open-source/3dCard").then((mod) => mod.CardItem),
	{ loading: ComponentLoading }
);
const NavBar = dynamic(() => import("@/registry/open-source/3dNavBar"), {
	loading: ComponentLoading,
});
const AccordionSlices = dynamic(
	() => import("@/registry/open-source/AccordionSlices"),
	{ loading: ComponentLoading }
);
const ActionSearchBar = dynamic(
	() => import("@/registry/open-source/ActionSearchBar"),
	{ loading: ComponentLoading }
);
const AnimatedCard = dynamic(
	() => import("@/registry/open-source/AnimatedHoverCard"),
	{ loading: ComponentLoading }
);
const AnimatedList = dynamic(
	() => import("@/registry/open-source/AnimatedList"),
	{ loading: ComponentLoading }
);
const Attractor = dynamic(() => import("@/registry/open-source/Attractor"), {
	loading: ComponentLoading,
});
const AuroraBackground = dynamic(
	() =>
		import("@/registry/open-source/AuroraBackground").then(
			(mod) => mod.AuroraBackground
		),
	{ loading: ComponentLoading }
);
const AwardsCarousel = dynamic(
	() => import("@/registry/open-source/AwardCarousel"),
	{ loading: ComponentLoading }
);
const Background = dynamic(() => import("@/registry/open-source/Background"), {
	loading: ComponentLoading,
});
const BackgroundBeams = dynamic(
	() =>
		import("@/registry/open-source/BackgroundBeams").then(
			(mod) => mod.BackgroundBeams
		),
	{ loading: ComponentLoading }
);
const Boxes = dynamic(
	() =>
		import("@/registry/open-source/BackgroundBoxes").then((mod) => mod.Boxes),
	{ loading: ComponentLoading }
);
const BackgroundGradient = dynamic(
	() =>
		import("@/registry/open-source/BackgroundGradient").then(
			(mod) => mod.BackgroundGradient
		),
	{ loading: ComponentLoading }
);
const BentoGrid = dynamic(
	() => import("@/registry/open-source/Bento").then((mod) => mod.BentoGrid),
	{ loading: ComponentLoading }
);
const BentoGridItem = dynamic(
	() =>
		import("@/registry/open-source/Bento").then((mod) => mod.BentoGridItem),
	{ loading: ComponentLoading }
);
const BlurVignette = dynamic(
	() =>
		import("@/registry/open-source/BlurVignette").then(
			(mod) => mod.BlurVignette
		),
	{ loading: ComponentLoading }
);
const BlurVignetteArticle = dynamic(
	() =>
		import("@/registry/open-source/BlurVignette").then(
			(mod) => mod.BlurVignetteArticle
		),
	{ loading: ComponentLoading }
);
const BookTestimonial3D = dynamic(
	() => import("@/registry/open-source/BookTestimonials"),
	{ loading: ComponentLoading }
);
const BottomBlurOut = dynamic(
	() =>
		import("@/registry/open-source/bottom-blur").then(
			(mod) => mod.BottomBlurOut
		),
	{ loading: ComponentLoading }
);
const Btn08 = dynamic(
	() => import("@/registry/open-source/Btn08").then((mod) => mod.Btn08),
	{ loading: ComponentLoading }
);
const BubbleText = dynamic(() => import("@/registry/open-source/BubbleText"), {
	loading: ComponentLoading,
});
const FooterSecond = dynamic(
	() => import("@/registry/open-source/BusinessFooter"),
	{ loading: ComponentLoading }
);
const CanvasRevealEffect = dynamic(
	() =>
		import("@/registry/open-source/CanvasReveal").then(
			(mod) => mod.CanvasRevealEffect
		),
	{ loading: ComponentLoading }
);
const CardDeck = dynamic(() => import("@/registry/open-source/CardDeck"), {
	loading: ComponentLoading,
});
const HoverEffect = dynamic(
	() =>
		import("@/registry/open-source/CardHover").then((mod) => mod.HoverEffect),
	{ loading: ComponentLoading }
);
const CardRotation = dynamic(
	() =>
		import("@/registry/open-source/CardRotation").then(
			(mod) => mod.CardRotation
		),
	{ loading: ComponentLoading }
);
const CardStack = dynamic(
	() =>
		import("@/registry/open-source/CardStack").then((mod) => mod.CardStack),
	{ loading: ComponentLoading }
);
const CardSwap = dynamic(() => import("@/registry/open-source/CardSwap"), {
	loading: ComponentLoading,
});
const SwapCard = dynamic(
	() => import("@/registry/open-source/CardSwap").then((mod) => mod.SwapCard),
	{ loading: ComponentLoading }
);
const CarouselCircle = dynamic(
	() => import("@/registry/open-source/CarouselCircle"),
	{ loading: ComponentLoading }
);
const StackCard = dynamic(
	() =>
		import("@/registry/open-source/CarouselStack").then(
			(mod) => mod.StackCard
		),
	{ loading: ComponentLoading }
);
const ChromaGrid = dynamic(() => import("@/registry/open-source/ChromaGrid"), {
	loading: ComponentLoading,
});
const ExampleReplication = dynamic(
	() =>
		import(
			"@/registry/open-source/cielia-replication/ExampleReplication"
		).then((mod) => mod.ExampleReplication),
	{ loading: ComponentLoading }
);
const CircularText = dynamic(
	() => import("@/registry/open-source/CircleText"),
	{ loading: ComponentLoading }
);
const CircularBarsSpinnerLoader = dynamic(
	() => import("@/registry/open-source/CircularBarsLoader"),
	{ loading: ComponentLoading }
);
const ColorChangeCards = dynamic(
	() => import("@/registry/open-source/ColorChangeCards"),
	{ loading: ComponentLoading }
);
const ColourfulText = dynamic(
	() =>
		import("@/registry/open-source/ColorfulText").then(
			(mod) => mod.ColourfulText
		),
	{ loading: ComponentLoading }
);
const ColorPicker = dynamic(
	() => import("@/registry/open-source/ColorPicker"),
	{ loading: ComponentLoading }
);
const Compare = dynamic(
	() => import("@/registry/open-source/Compare").then((mod) => mod.Compare),
	{ loading: ComponentLoading }
);
const ContainerScroll = dynamic(
	() =>
		import("@/registry/open-source/ContainerScroll").then(
			(mod) => mod.ContainerScroll
		),
	{ loading: ComponentLoading }
);
const ContentWithImage = dynamic(
	() => import("@/registry/open-source/ContentWithImage"),
	{ loading: ComponentLoading }
);
const CSSBox = dynamic(() => import("@/registry/open-source/CSSBox"), {
	loading: ComponentLoading,
});
const One = dynamic(() => import("@/registry/open-source/CursorCarousel"), {
	loading: ComponentLoading,
});
const MaskCursor = dynamic(() => import("@/registry/open-source/CursorMask"), {
	loading: ComponentLoading,
});
const CurvedNavbar = dynamic(
	() => import("@/registry/open-source/CurvedNavbar"),
	{ loading: ComponentLoading }
);
const Dither = dynamic(() => import("@/registry/open-source/Dither"), {
	loading: ComponentLoading,
});
const DualRingSpinnerLoader = dynamic(
	() => import("@/registry/open-source/DualRingLoader"),
	{ loading: ComponentLoading }
);
const DynamicIsland = dynamic(
	() => import("@/registry/open-source/DynamicIsland"),
	{ loading: ComponentLoading }
);
const DynamicTheme = dynamic(
	() => import("@/registry/open-source/DynamicTheme"),
	{ loading: ComponentLoading }
);
const ElasticLine = dynamic(
	() => import("@/registry/open-source/ElasticLine"),
	{ loading: ComponentLoading }
);
const ExpandableTabs = dynamic(
	() => import("@/registry/open-source/ExpandingTabs"),
	{ loading: ComponentLoading }
);
const FallingText = dynamic(
	() => import("@/registry/open-source/FallingText"),
	{ loading: ComponentLoading }
);
const Subscribe = dynamic(
	() =>
		import("@/registry/open-source/FancyInput").then((mod) => mod.Subscribe),
	{ loading: ComponentLoading }
);
const FAQPage = dynamic(() => import("@/registry/open-source/FaqSection"), {
	loading: ComponentLoading,
});
const Feature = dynamic(() => import("@/registry/open-source/Feature"), {
	loading: ComponentLoading,
});
const FilmReel = dynamic(() => import("@/registry/open-source/FilmReel"), {
	loading: ComponentLoading,
});
const FlippedMenu = dynamic(
	() => import("@/registry/open-source/FlippedMenu"),
	{ loading: ComponentLoading }
);
const TextAnimationFlippingWords = dynamic(
	() =>
		import("@/registry/open-source/FlippingText").then(
			(mod) => mod.TextAnimationFlippingWords
		),
	{ loading: ComponentLoading }
);
const FloatingDock = dynamic(
	() =>
		import("@/registry/open-source/FloatingDock").then(
			(mod) => mod.FloatingDock
		),
	{ loading: ComponentLoading }
);
const FloatingNav = dynamic(
	() =>
		import("@/registry/open-source/FloatingNav").then(
			(mod) => mod.FloatingNav
		),
	{ loading: ComponentLoading }
);
const FlowerMenu = dynamic(() => import("@/registry/open-source/FlowerMenu"), {
	loading: ComponentLoading,
});
const FlowingMenu = dynamic(() => import("@/registry/open-source/FlowingNav"), {
	loading: ComponentLoading,
});
const FluidMorph = dynamic(() => import("@/registry/open-source/FluidMorph"), {
	loading: ComponentLoading,
});
const FocusCards = dynamic(
	() =>
		import("@/registry/open-source/FocusCards").then((mod) => mod.FocusCards),
	{ loading: ComponentLoading }
);
const Folder = dynamic(() => import("@/registry/open-source/Folder"), {
	loading: ComponentLoading,
});
const FolderHoverButton = dynamic(
	() => import("@/registry/open-source/FoldHoverButton"),
	{ loading: ComponentLoading }
);
const MouseFollower = dynamic(
	() => import("@/registry/open-source/FollowCursor"),
	{ loading: ComponentLoading }
);
const TableOfContent = dynamic(
	() => import("@/registry/open-source/following-headers"),
	{ loading: ComponentLoading }
);
const FollowerPointerCard = dynamic(
	() =>
		import("@/registry/open-source/FollowingPointer").then(
			(mod) => mod.FollowerPointerCard
		),
	{ loading: ComponentLoading }
);
const FuzzyOverlay = dynamic(
	() => import("@/registry/open-source/FuzzyOverlay"),
	{ loading: ComponentLoading }
);
const FuzzyText = dynamic(() => import("@/registry/open-source/FuzzyText"), {
	loading: ComponentLoading,
});
const GalaxyButton = dynamic(
	() => import("@/registry/open-source/GalaxyButton"),
	{ loading: ComponentLoading }
);
const GhostLabel = dynamic(() => import("@/registry/open-source/GhostLabel"), {
	loading: ComponentLoading,
});
const GifText = dynamic(
	() => import("@/registry/open-source/GifText").then((mod) => mod.GifText),
	{ loading: ComponentLoading }
);
const GlassNavigation = dynamic(
	() => import("@/registry/open-source/GlassNav"),
	{ loading: ComponentLoading }
);
const GlowingStarsBackgroundCard = dynamic(
	() =>
		import("@/registry/open-source/GlowingBackground").then(
			(mod) => mod.GlowingStarsBackgroundCard
		),
	{ loading: ComponentLoading }
);
const GlowingStarsDescription = dynamic(
	() =>
		import("@/registry/open-source/GlowingBackground").then(
			(mod) => mod.GlowingStarsDescription
		),
	{ loading: ComponentLoading }
);
const GlowingStarsTitle = dynamic(
	() =>
		import("@/registry/open-source/GlowingBackground").then(
			(mod) => mod.GlowingStarsTitle
		),
	{ loading: ComponentLoading }
);
const GlowingEffect = dynamic(
	() =>
		import("@/registry/open-source/GlowingEffect").then(
			(mod) => mod.GlowingEffect
		),
	{ loading: ComponentLoading }
);
const GooeyFilter = dynamic(() => import("@/registry/open-source/GooeyTabs"), {
	loading: ComponentLoading,
});
const GooeyDemo = dynamic(
	() =>
		import("@/registry/open-source/GooeyTabs").then((mod) => mod.GooeyDemo),
	{ loading: ComponentLoading }
);
const BackgroundGradientAnimation = dynamic(
	() =>
		import("@/registry/open-source/GradientBackground").then(
			(mod) => mod.BackgroundGradientAnimation
		),
	{ loading: ComponentLoading }
);
const GradientCheckbox = dynamic(
	() => import("@/registry/open-source/GradientCheckbox"),
	{ loading: ComponentLoading }
);
const Testimonials = dynamic(
	() => import("@/registry/open-source/GradientTestimonials"),
	{ loading: ComponentLoading }
);
const Gravity = dynamic(() => import("@/registry/open-source/Gravity"), {
	loading: ComponentLoading,
});
const ModelViewer = dynamic(
	() => import("@/registry/open-source/ModelViewer"),
	{
		loading: ComponentLoading,
	}
);
const FluidGlass = dynamic(() => import("@/registry/open-source/FluidGlass"), {
	loading: ComponentLoading,
});
const Scene = dynamic(() => import("@/registry/open-source/ImageRipple"), {
	loading: ComponentLoading,
});

export const ClientWrapper = ({ files }: { files: string[] }) => {
	const cubeRef = useRef<typeof CSSBoxRef>(null);
	const mediaBetweenTextRef = useRef(null);
	const mediaBetweenTextRef2 = useRef(null);
	const containerRef = useRef(null);

	const [basic, setBasic] = useState(false);

	const { scrollYProgress } = useScroll({ container: containerRef });

	const [currentStep, setCurrentStep] = useState(0);
	const screenSize = useWindowSize();
	const getImageCount = () => {
		if (!screenSize?.width) {
			return 80;
		}

		if (screenSize?.width < 150) return 50;
		if (screenSize?.width < 750) return 60;
		if (screenSize?.width < 1500) return 70;

		return 80;
	};

	const getMaxSize = () => {
		if (!screenSize?.width) {
			return 60;
		}
		if (screenSize?.width < 150) return 40;
		if (screenSize?.width < 750) return 50;
		return 60;
	};

	const getMinSize = () => {
		if (!screenSize?.width) {
			return 20;
		}
		if (screenSize?.width < 150) return 10;
		if (screenSize?.width < 750) return 20;
		return 20;
	};

	useEffect(() => {
		const lenis = new Lenis({
			autoRaf: true,
			// wrapper: containerRef.current,
			duration: 1.2,
			orientation: "vertical",
			gestureOrientation: "vertical",
			smoothWheel: true,
			touchMultiplier: 2,
		});

		return () => {
			lenis.destroy();
		};
	}, []);

	const handleNext = () => {
		setCurrentStep((prev) => prev + 1);
	};

	const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
	const pathLengthSecond = useTransform(
		scrollYProgress,
		[0, 0.8],
		[0.15, 1.2]
	);
	const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
	const pathLengthFourth = useTransform(
		scrollYProgress,
		[0, 0.8],
		[0.05, 1.2]
	);
	const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);
	const [isActive, setIsActive] = useState(false);
	const [open, setOpen] = useState(false);

	const [mouseFollowerContainer, setMouseFollowerContainer] =
		useState<HTMLElement | null>();
	const [componentCount, setComponentCount] = useState([]);
	const [selectedFilters, setSelectedFilters] = useState([]);

	useEffect(() => {
		if (window !== undefined) {
			setMouseFollowerContainer(document.getElementById("mouseFollower"));
		}
	}, []);

	const [container, setContainer] = useState<HTMLElement | null>(null);

	const isMobile = useMediaQuery("(min-width: 640px)");

	const screensaverRef = useRef<HTMLDivElement>(null);

	const cutRevealContainer = useRef(null);

	const [colorScheme, setColorScheme] = useState<any>({
		background: "0 0% 100%",
		foreground: "240 10% 3.9%",
		card: "0 0% 100%",
		"card-foreground": "240 10% 3.9%",
		popover: "0 0% 100%",
		"popover-foreground": "240 10% 3.9%",
		primary: "240 5.9% 10%",
		"primary-foreground": "0 0% 98%",
		secondary: "240 4.8% 95.9%",
		"secondary-foreground": "240 5.9% 10%",
		muted: "240 4.8% 95.9%",
		"muted-foreground": "240 3.8% 46.1%",
		accent: "240 4.8% 95.9%",
		"accent-foreground": "240 5.9% 10%",
		destructive: "0 84.2% 60.2%",
		"destructive-foreground": "0 0% 98%",
		border: "240 5.9% 90%",
		input: "240 5.9% 90%",
		ring: "240 5.9% 10%",
	});
	const [lockedColor, setLockedColor] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);
	const [value, setValue] = useState(100);

	const generateHarmoniousColors = useCallback(() => {
		let anchorColors: [number, number, number][] = [];

		if (lockedColor) {
			const [h, s, l] = colorScheme[lockedColor].split(" ").map(parseFloat);
			anchorColors.push([h, s / 100, l / 100]);
		}

		while (anchorColors.length < 3) {
			anchorColors.push([Math.random() * 360, 0.7, 0.5]);
		}

		const poline = new Poline({
			numPoints: 20,
			anchorColors,
			positionFunctionX: positionFunctions.sinusoidalPosition,
			positionFunctionY: positionFunctions.quadraticPosition,
			positionFunctionZ: positionFunctions.linearPosition,
		});

		const newColorScheme = { ...colorScheme };
		const colors = poline.colorsCSS;

		Object.keys(newColorScheme).forEach((key, index) => {
			if (key !== lockedColor) {
				const color = colors[index % colors.length];
				const [h, s, l] = color.match(/\d+(\.\d+)?/g)?.map(Number) || [
					0, 0, 0,
				];

				let adjustedLightness = l;
				if (key.includes("foreground")) {
					adjustedLightness = Math.min(l - 30, 20);
				} else if (key === "background") {
					adjustedLightness = Math.max(l + 30, 90);
				} else if (key === "border" || key === "input") {
					adjustedLightness = Math.min(Math.max(l, 70), 90);
				}

				newColorScheme[key] = `${h.toFixed(1)} ${s.toFixed(
					1
				)}% ${adjustedLightness.toFixed(1)}%`;
			}
		});

		setColorScheme(newColorScheme);
	}, [colorScheme, lockedColor]);

	const resetColors = useCallback(() => {
		setColorScheme({
			background: "0 0% 100%",
			foreground: "240 10% 3.9%",
			card: "0 0% 100%",
			"card-foreground": "240 10% 3.9%",
			popover: "0 0% 100%",
			"popover-foreground": "240 10% 3.9%",
			primary: "240 5.9% 10%",
			"primary-foreground": "0 0% 98%",
			secondary: "240 4.8% 95.9%",
			"secondary-foreground": "240 5.9% 10%",
			muted: "240 4.8% 95.9%",
			"muted-foreground": "240 3.8% 46.1%",
			accent: "240 4.8% 95.9%",
			"accent-foreground": "240 5.9% 10%",
			destructive: "0 84.2% 60.2%",
			"destructive-foreground": "0 0% 98%",
			border: "240 5.9% 90%",
			input: "240 5.9% 90%",
			ring: "240 5.9% 10%",
		});
		setLockedColor(null);
	}, []);

	const copyColorScheme = useCallback(() => {
		const cssVariables = Object.entries(colorScheme)
			.map(([key, value]) => `--${key}: ${value};`)
			.join("\n    ");

		const fullCss = `@layer base {
  :root {
    ${cssVariables}
  }
}`;

		navigator.clipboard.writeText(fullCss);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}, [colorScheme]);

	const getContrastColor = useCallback((color: string) => {
		const [, , lightness] = color.split(" ").map(parseFloat);
		return lightness > 50 ? "0 0% 0%" : "0 0% 100%";
	}, []);

	const toggleLock = useCallback((key: string) => {
		setLockedColor((prev) => (prev === key ? null : key));
	}, []);

	const [titleEls, setTitleEls] = useState<HTMLElement[] | null>([]);
	const [percent, setPercent] = useState(0);
	const [currentTitle, setCurrentTitle] = useState("stack");
	const [text, setText] = useState("Continue");

	const setupTitles = useCallback((node: HTMLDivElement) => {
		if (node) {
			const titleEls = Array.from(
				node.querySelectorAll(".component-container")
			) as HTMLElement[] | null;
			setTitleEls(
				!!titleEls
					? titleEls?.map((el) => el.children[0].children[0])
					: null
			);
		}
	}, []);

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		setPercent(Math.floor(latest * 100));
		titleEls.forEach((el, index) => {
			const top = el.getBoundingClientRect().top;
			if (top >= 0 && top < 32) {
				setCurrentTitle(el.textContent || "");
			}
		});
	});

	const [isOpen, setIsOpen] = useState(false);
	const [isOpenSpringModal, setIsOpenSpringModal] = useState(false);

	const handleIsOpen = () => {
		setIsOpen(!isOpen);
	};

	const renderVideoButton = () => (
		<div
			className={cn(
				"flex items-center w-full justify-start pr-4 md:pl-4 py-1 md:py-1",
				isOpen ? "pr-3" : ""
			)}
		>
			<p className="text-xl font-black tracking-tight text-gray-900 sm:text-3xl">
				<span className="bg-gradient-to-t from-neutral-200 to-stone-300 bg-clip-text font-brand text-xl font-bold text-transparent sm:text-6xl">
					Open
				</span>
			</p>
			<Button
				className="rounded-r-[33px] py-8 ml-2 "
				onClick={handleIsOpen}
				variant="secondary"
			>
				{isOpen ? "close" : "open"}
			</Button>
		</div>
	);

	const [isHover, setIsHover] = useState(false);

	const [gridView, setGridView] = useState(false);

	const [collapsed, setCollapsed] = useState([]);
	const [allElements, setAllElements] = useState<HTMLElement[] | null>([]);

	useEffect(() => {
		const titleEls = Array.from(
			document.querySelectorAll(".component-container")
		) as HTMLElement[] | null;

		setAllElements(!!titleEls ? titleEls.map((el) => el.id) : null);
	}, []);

	useEffect(() => {
		const el = document.getElementById("collapse-all") as HTMLInputElement;
		if (!collapsed.length) {
			el.indeterminate = false;
		} else if (
			!!collapsed.length &&
			[...new Set([...allElements, ...collapsed])].length !==
				allElements.length
		) {
			el.indeterminate = true;
		} else if (
			!!collapsed.length &&
			[...new Set([...allElements, ...collapsed])].length ===
				allElements.length
		) {
			el.indeterminate = false;
		}
	}, [allElements, collapsed]);

	const [gifText, setGifText] = useState("TextGif");
	const [size, setSize] = useState("xl");
	const [weight, setWeight] = useState("bold");

	const gifUrls = [
		"https://media.giphy.com/media/3zvbrvbRe7wxBofOBI/giphy.gif",
		"https://media.giphy.com/media/fnglNFjBGiyAFtm6ke/giphy.gif",
		"https://media.giphy.com/media/9Pmfazv34l7aNIKK05/giphy.gif",
		"https://media.giphy.com/media/4bhs1boql4XVJgmm4H/giphy.gif",
	];

	const [selectedGif, setSelectedGif] = useState(gifUrls[0]);

	const [states, setStates] = useState(Array(4).fill(false));

	const toggle = (index: number) => {
		const updated = [...states];
		updated[index] = !updated[index];
		setStates(updated);
	};

	const [editorContent, setEditorContent] = useState<JSONContent>({
		type: "doc",
		content: [
			{
				type: "heading",
				attrs: { level: 1 },
				content: [{ type: "text", text: "Heading 1" }],
			},
			{
				type: "heading",
				attrs: { level: 2 },
				content: [{ type: "text", text: "Heading 2" }],
			},
			{
				type: "heading",
				attrs: { level: 3 },
				content: [{ type: "text", text: "Heading 3" }],
			},
			{
				type: "heading",
				attrs: { level: 4 },
				content: [{ type: "text", text: "Heading 4" }],
			},
			{
				type: "heading",
				attrs: { level: 5 },
				content: [{ type: "text", text: "Heading 5" }],
			},
			{
				type: "heading",
				attrs: { level: 6 },
				content: [{ type: "text", text: "Heading 6" }],
			},
			{ type: "paragraph" },
			{
				type: "paragraph",
				content: [{ type: "text", text: "Hello, world." }],
			},
			{ type: "paragraph" },
			{
				type: "taskList",
				content: [
					{
						type: "taskItem",
						attrs: { checked: false },
						content: [
							{
								type: "paragraph",
								content: [
									{ type: "text", text: "This is a todo list" },
								],
							},
						],
					},
					{
						type: "taskItem",
						attrs: { checked: false },
						content: [
							{
								type: "paragraph",
								content: [{ type: "text", text: "With two items" }],
							},
						],
					},
				],
			},
			{ type: "paragraph" },
			{
				type: "bulletList",
				content: [
					{
						type: "listItem",
						content: [
							{
								type: "paragraph",
								content: [
									{ type: "text", text: "This is an unordered list" },
								],
							},
							{
								type: "bulletList",
								content: [
									{
										type: "listItem",
										content: [
											{
												type: "paragraph",
												content: [
													{
														type: "text",
														text: "With a nested item",
													},
												],
											},
										],
									},
								],
							},
						],
					},
				],
			},
			{ type: "paragraph" },
			{
				type: "orderedList",
				attrs: { start: 1 },
				content: [
					{
						type: "listItem",
						content: [
							{
								type: "paragraph",
								content: [
									{ type: "text", text: "This is an ordered list" },
								],
							},
						],
					},
					{
						type: "listItem",
						content: [
							{
								type: "paragraph",
								content: [{ type: "text", text: "With two items" }],
							},
						],
					},
				],
			},
			{ type: "paragraph" },
			{
				type: "blockquote",
				content: [
					{
						type: "paragraph",
						content: [
							{
								type: "text",
								text: "This is a quote, probably by someone famous.",
							},
						],
					},
				],
			},
			{ type: "paragraph" },
			{
				type: "paragraph",
				content: [
					{ type: "text", text: "This is some " },
					{ type: "text", marks: [{ type: "code" }], text: "inline code" },
					{ type: "text", text: ", while this is a code block:" },
				],
			},
			{ type: "paragraph" },
			{
				type: "codeBlock",
				attrs: { language: null },
				content: [
					{
						type: "text",
						text: "function x () {\\n  console.log('hello, world.');\\n}",
					},
				],
			},
			{ type: "paragraph" },
			{
				type: "paragraph",
				content: [
					{
						type: "text",
						text: "You can also create complex tables, like so:",
					},
				],
			},
			{
				type: "table",
				content: [
					{
						type: "tableRow",
						content: [
							{
								type: "tableHeader",
								attrs: { colspan: 1, rowspan: 1, colwidth: null },
								content: [
									{
										type: "paragraph",
										content: [
											{ type: "text", text: "Here’s a column" },
										],
									},
								],
							},
							{
								type: "tableHeader",
								attrs: { colspan: 1, rowspan: 1, colwidth: null },
								content: [
									{
										type: "paragraph",
										content: [
											{ type: "text", text: "Another column" },
										],
									},
								],
							},
							{
								type: "tableHeader",
								attrs: { colspan: 1, rowspan: 1, colwidth: null },
								content: [
									{
										type: "paragraph",
										content: [{ type: "text", text: "Yet another" }],
									},
								],
							},
						],
					},
					{
						type: "tableRow",
						content: [
							{
								type: "tableCell",
								attrs: { colspan: 1, rowspan: 1, colwidth: null },
								content: [
									{
										type: "paragraph",
										content: [{ type: "text", text: "Cell 1A" }],
									},
								],
							},
							{
								type: "tableCell",
								attrs: { colspan: 1, rowspan: 1, colwidth: null },
								content: [
									{
										type: "paragraph",
										content: [{ type: "text", text: "Cell 2A" }],
									},
								],
							},
							{
								type: "tableCell",
								attrs: { colspan: 1, rowspan: 1, colwidth: null },
								content: [
									{
										type: "paragraph",
										content: [{ type: "text", text: "Cell 3A" }],
									},
								],
							},
						],
					},
					{
						type: "tableRow",
						content: [
							{
								type: "tableCell",
								attrs: { colspan: 1, rowspan: 1, colwidth: null },
								content: [
									{
										type: "paragraph",
										content: [{ type: "text", text: "Cell 1B" }],
									},
								],
							},
							{
								type: "tableCell",
								attrs: { colspan: 1, rowspan: 1, colwidth: null },
								content: [
									{
										type: "paragraph",
										content: [{ type: "text", text: "Cell 2B" }],
									},
								],
							},
							{
								type: "tableCell",
								attrs: { colspan: 1, rowspan: 1, colwidth: null },
								content: [
									{
										type: "paragraph",
										content: [{ type: "text", text: "Cell 3B" }],
									},
								],
							},
						],
					},
				],
			},
		],
	});

	const handleUpdate = ({ editor }: { editor: Editor }) => {
		const json = editor.getJSON();
		setEditorContent(json);
		console.log(JSON.stringify(json));
	};

	const spinnerVariants: SpinnerProps["variant"][] = [
		"default",
		"circle",
		"pinwheel",
		"circle-filled",
		"ellipsis",
		"ring",
		"bars",
		"infinite",
	];

	const [enableStars, setEnableStars] = useState(true);
	const [enableSpotlight, setEnableSpotlight] = useState(true);
	const [disableAnimations, setDisableAnimations] = useState(false);
	const [spotlightRadius, setSpotlightRadius] = useState([400]);
	const [enableTilt, setEnableTilt] = useState(false);
	const [clickEffect, setClickEffect] = useState(true);
	const [enableMagnetism, setEnableMagnetism] = useState(false);

	// Main FAB state
	const [isExpanded, setIsExpanded] = useState(false);
	const [hoveredButton, setHoveredButton] = useState<string | null>(null);

	const actionButtons = [
		{
			id: "contact",
			icon: Mail,
			label: "Contact",
			color: "bg-blue-500 hover:bg-blue-600",
			position: "bottom-20 right-2",
		},
		{
			id: "feedback",
			icon: Star,
			label: "Feedback",
			color: "bg-green-500 hover:bg-green-600",
			position: "bottom-16 right-16",
		},
		{
			id: "support",
			icon: HelpCircle,
			label: "Support",
			color: "bg-orange-500 hover:bg-orange-600",
			position: "bottom-2 right-16",
		},
		{
			id: "newsletter",
			icon: Bell,
			label: "Newsletter",
			color: "bg-purple-500 hover:bg-purple-600",
			position: "bottom-2 right-2",
		},
	];

	const renderForm = (buttonId: string) => {
		switch (buttonId) {
			case "contact":
				return (
					<>
						<div className="flex flex-col">
							<label>Collapse All</label>
							<input
								type="checkbox"
								id="collapse-all"
								title="collapse all"
								className="w-[25px]"
								checked={allElements.length === collapsed.length}
								onChange={(e) => {
									if (
										collapsed.length &&
										[...new Set([...collapsed, ...allElements])]
											.length !== collapsed.length
									) {
										setCollapsed([]);
									} else if (
										[...new Set([...collapsed, ...allElements])]
											.length === collapsed.length
									) {
										setCollapsed([]);
									} else {
										const containers = [
											...document.querySelectorAll(
												".component-container"
											),
										] as HTMLElement[];

										setCollapsed(containers.map((el) => el.id));
									}
								}}
							/>
						</div>
					</>
				);
			case "feedback":
				return (
					<div className="flex flex-col">
						<label>Components per row</label>

						<ToggleGroup
							className="inline-flex space-x-px rounded border"
							type="single"
							defaultValue="1"
							aria-label="Components per row"
							onClick={(e) => setGridView(e.target.textContent)}
						>
							<ToggleGroupItem value="1" aria-label="1">
								1
							</ToggleGroupItem>

							<ToggleGroupItem value="2" aria-label="2">
								2
							</ToggleGroupItem>
							<ToggleGroupItem value="3" aria-label="3">
								3
							</ToggleGroupItem>
							<ToggleGroupItem value="4" aria-label="4">
								4
							</ToggleGroupItem>
						</ToggleGroup>
					</div>
				);
			case "support":
				return (
					<div className="flex flex-col">
						<label>Filters</label>
						<MultiSelect
							options={filterOptions.sort((a, b) =>
								a.label.localeCompare(b.label)
							)}
							onValueChange={setSelectedFilters}
						/>
					</div>
				);
			case "newsletter":
				return (
					<div className="flex flex-col">
						<label>Component Types</label>
						<ToggleGroup
							className="inline-flex space-x-px rounded border"
							type="single"
							defaultValue="right"
							aria-label="component complexity"
							onClick={() => setBasic(!basic)}
						>
							<ToggleGroupItem value="left" aria-label="Static">
								Static
							</ToggleGroupItem>

							<ToggleGroupItem value="right" aria-label="Complex">
								Animated
							</ToggleGroupItem>
						</ToggleGroup>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<>
			<header className="flex flex-col gap-1 sticky top-0 bg-background z-50">
				<h1 className="text-3xl font-bold tracking-tight">
					{componentCount?.length} examples vs {files.length} total files
				</h1>
				<p className="text-muted-foreground">
					Collection of OOS React components using tailwind and motion.
				</p>
				<p className="text-muted-foreground">
					I recommend Collapsing All and setting components-per-row to 3 or
					4. Once collapsed, you can expand individual components
					vertically and horizontally with controls on each component card.
				</p>
				<p className="text-muted-foreground">
					Live use of 200+ components. Expect some lag and maxed out
					hardware usage.
				</p>
				<div className="flex gap-5 flex-row">
					<div className={"border-l-2 border-white h-[50px]"}></div>

					<div className={"border-l-2 border-white h-[50px]"}></div>

					<div className={"border-l-2 border-white h-[50px]"}></div>
				</div>
			</header>

			<main className="flex flex-col flex-1 gap-8">
				<section
					className={
						"rounded-md w-full flex flex-col md:flex-row shrink-1 overflow-y-auto overflow-x-hidden scroll-container"
					}
					ref={containerRef}
				>
					<ScrollIsland
						gridView={gridView}
						ref={setupTitles}
						containerRef={containerRef}
					>
						{basic ? (
							<>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.HERO
										),
									]}
									selectedFilters={selectedFilters}
									title="Basic Hero"
								></Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.CARD
										),
									]}
									selectedFilters={selectedFilters}
									title="Basic Card"
								>
									<BasicCard />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.CARD
										),
									]}
									selectedFilters={selectedFilters}
									title="Basic Card"
								>
									<CardWithImages />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TRANSITIONS
										),
									]}
									selectedFilters={selectedFilters}
									title="dual ring loader"
								>
									<DualRingSpinnerLoader />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TRANSITIONS
										),
									]}
									selectedFilters={selectedFilters}
									title="circular bars loader"
								>
									<CircularBarsSpinnerLoader />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TRANSITIONS
										),
									]}
									selectedFilters={selectedFilters}
									title="three bounce loader"
								>
									<ThreeDotSimpleLoader />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TRANSITIONS
										),
									]}
									selectedFilters={selectedFilters}
									title="three dot loader"
								>
									<ThreeDotLoaderGrowing />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "preloaders"
										),
									]}
									selectedFilters={selectedFilters}
									title="Stripes Preloader"
								>
									<VerticalTiles rerun>
										<span>Some content</span>
									</VerticalTiles>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.ACCORDION
										),
									]}
									selectedFilters={selectedFilters}
									title="Basic Accordion"
								>
									<AccordionBasic />
								</Component>
							</>
						) : (
							<>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "text"
										),
									]}
									selectedFilters={selectedFilters}
									title="Target Cursor"
								>
									<div>
										<TargetCursor
											spinDuration={2}
											hideDefaultCursor={true}
										/>

										<h1>Hover over the elements below</h1>
										<button className="cursor-target">
											Click me!
										</button>
										<div className="cursor-target">Hover target</div>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "text"
										),
									]}
									selectedFilters={selectedFilters}
									title="Pixel Image"
								>
									<PixelImage
										src="/itjustworks.jpg"
										grid="6x4"
										grayscaleAnimation={true}
									/>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "text"
										),
									]}
									selectedFilters={selectedFilters}
									title="Text Curve"
								>
									<TextCurve marqueeText="Welcome to React Bits ✦" />
									<TextCurve
										marqueeText="Be ✦ Creative ✦ With ✦ React ✦ Bits ✦"
										speed={3}
										curveAmount={500}
										direction="right"
										interactive={true}
										className="custom-text-style"
									/>
									<TextCurve
										marqueeText="Smooth Curved Animation"
										speed={1}
										curveAmount={300}
										interactive={false}
									/>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "text"
										),
									]}
									selectedFilters={selectedFilters}
									title="MagicBento"
								>
									<MagicBento
										enableStars={enableStars}
										enableSpotlight={enableSpotlight}
										disableAnimations={disableAnimations}
										spotlightRadius={spotlightRadius[0]}
										enableTilt={enableTilt}
										clickEffect={clickEffect}
										enableMagnetism={enableMagnetism}
									/>

									<div>
										<Slider
											title="Spotlight Radius"
											min={50}
											max={800}
											step={10}
											value={[spotlightRadius[0]]}
											onValueCommit={setSpotlightRadius}
										/>

										<Switch
											name="Stars Effect"
											checked={enableStars}
											onCheckedChange={setEnableStars}
										/>

										<Switch
											title="Spotlight Effect"
											checked={enableSpotlight}
											onCheckedChange={setEnableSpotlight}
										/>

										<Switch
											title="Tilt Effect"
											checked={enableTilt}
											onCheckedChange={setEnableTilt}
										/>

										<Switch
											title="Click Effect"
											checked={clickEffect}
											onCheckedChange={setClickEffect}
										/>

										<Switch
											title="Magnetism"
											checked={enableMagnetism}
											onCheckedChange={setEnableMagnetism}
										/>

										<Switch
											title="Disable All Animations"
											checked={disableAnimations}
											onCheckedChange={setDisableAnimations}
										/>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "transitions"
										),
									]}
									selectedFilters={selectedFilters}
									title="Editor"
								>
									<div className="w-dvw h-dvh text-2xl sm:text-3xl md:text-5xl flex flex-row items-center justify-center font-overused-grotesk bg-white dark:text-muted text-foreground font-light overflow-hidden p-12 sm:p-20 md:p-24">
										<EditorProvider
											className="h-full w-full overflow-y-auto rounded-lg border bg-background p-4"
											content={editorContent}
											onUpdate={handleUpdate}
											placeholder="Start typing..."
										>
											<EditorFloatingMenu>
												<EditorNodeHeading1 hideName />
												<EditorNodeBulletList hideName />
												<EditorNodeQuote hideName />
												<EditorNodeCode hideName />
												<EditorNodeTable hideName />
											</EditorFloatingMenu>
											<EditorBubbleMenu>
												<EditorSelector title="Text">
													<EditorNodeText />
													<EditorNodeHeading1 />
													<EditorNodeHeading2 />
													<EditorNodeHeading3 />
													<EditorNodeBulletList />
													<EditorNodeOrderedList />
													<EditorNodeTaskList />
													<EditorNodeQuote />
													<EditorNodeCode />
												</EditorSelector>
												<EditorSelector title="Format">
													<EditorFormatBold />
													<EditorFormatItalic />
													<EditorFormatUnderline />
													<EditorFormatStrike />
													<EditorFormatCode />
													<EditorFormatSuperscript />
													<EditorFormatSubscript />
												</EditorSelector>
												<EditorLinkSelector />
												<EditorClearFormatting />
											</EditorBubbleMenu>
											<EditorTableMenu>
												<EditorTableColumnMenu>
													<EditorTableColumnBefore />
													<EditorTableColumnAfter />
													<EditorTableColumnDelete />
												</EditorTableColumnMenu>
												<EditorTableRowMenu>
													<EditorTableRowBefore />
													<EditorTableRowAfter />
													<EditorTableRowDelete />
												</EditorTableRowMenu>
												<EditorTableGlobalMenu>
													<EditorTableHeaderColumnToggle />
													<EditorTableHeaderRowToggle />
													<EditorTableDelete />
													<EditorTableMergeCells />
													<EditorTableSplitCell />
													<EditorTableFix />
												</EditorTableGlobalMenu>
											</EditorTableMenu>
											<EditorCharacterCount.Words>
												Words:{" "}
											</EditorCharacterCount.Words>
										</EditorProvider>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "transitions"
										),
									]}
									selectedFilters={selectedFilters}
									title="Ballpit"
								>
									<div
										style={{
											position: "relative",
											overflow: "hidden",
											minHeight: "100px",
											maxHeight: "400px",
											width: "100%",
										}}
									>
										<Ballpit
											count={300}
											gravity={0.2}
											friction={0.914}
											wallBounce={0.55}
											lightIntensity={100}
											followCursor={false}
										/>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "transitions"
										),
									]}
									selectedFilters={selectedFilters}
									title="Spinner"
								>
									{spinnerVariants.map((variant) => (
										<div
											className="flex flex-col items-center justify-center gap-4"
											key={variant}
										>
											<Spinner key={variant} variant={variant} />
											<span className="font-mono text-muted-foreground text-xs">
												{variant}
											</span>
										</div>
									))}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "transitions"
										),
									]}
									selectedFilters={selectedFilters}
									title="Text Trail"
								>
									<div className="h-[75vh] w-full">
										<TextTrail
											text="Drive Brand Studio"
											fontFamily="Figtree"
											fontWeight="900"
											noiseFactor={1.2}
											noiseScale={0.001}
											rgbPersistFactor={0.95}
											alphaPersistFactor={0.92}
											animateColor={true}
											startColor="#ff6b6b"
											textColor="#4ecdc4"
											backgroundColor="#1a1a2e"
											colorCycleInterval={2000}
											supersample={2}
										/>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "transitions"
										),
									]}
									selectedFilters={selectedFilters}
									title="Fullscreen Image"
								>
									<FullscreenImage>
										<Image
											alt="Placeholder image"
											className="h-auto w-96"
											height={800}
											src="/itjustworks.jpg"
											unoptimized
											width={1200}
										/>
									</FullscreenImage>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "transitions"
										),
									]}
									selectedFilters={selectedFilters}
									title="Text Split"
								>
									<div className="w-dvw h-dvh text-2xl sm:text-3xl md:text-5xl flex flex-row items-center justify-center font-overused-grotesk bg-white dark:text-muted text-foreground font-light overflow-hidden p-12 sm:p-20 md:p-24">
										<TextSplit
											className="text-9xl font-semibold uppercase"
											topClassName="text-red-500"
											bottomClassName="text-zinc-950 dark:text-zinc-50"
										>
											Berlix UI
										</TextSplit>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "transitions"
										),
									]}
									selectedFilters={selectedFilters}
									title="Checkbox animated"
								>
									<div className="flex gap-6 items-end">
										<CheckBoxAnimated
											checked={states[0]}
											onClick={() => toggle(0)}
											size={20}
										/>
										<CheckBoxAnimated
											checked={states[1]}
											onClick={() => toggle(1)}
											size={24}
											color="#3b82f6"
										/>
										<CheckBoxAnimated
											checked={states[2]}
											onClick={() => toggle(2)}
											size={28}
											color="#facc15"
										/>
										<CheckBoxAnimated
											checked={states[3]}
											onClick={() => toggle(3)}
											size={32}
											color="#ef4444"
										/>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "transitions"
										),
									]}
									selectedFilters={selectedFilters}
									title="Input animated"
								>
									<InputAnimated
										label="Email Address"
										value={value}
										onChange={(e) => setValue(e.target.value)}
									/>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "transitions"
										),
									]}
									selectedFilters={selectedFilters}
									title="Flip Card"
								>
									<FlipCard
										front={<Front />}
										back={<Back />}
										panelClassName=""
										flipDirection="horizontal"
										flipRotation="forward"
									/>
									<FlipCard
										front={<Front />}
										back={<Back />}
										className="w-[350px]"
										panelClassName="rounded-2xl bg-black"
										flipDirection="vertical"
										flipRotation="reverse"
									/>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "transitions"
										),
									]}
									selectedFilters={selectedFilters}
									title="Cubes"
								>
									<div
										style={{
											height: "100%",
											width: "100%",
											position: "relative",
										}}
									>
										<Cubes
											gridSize={8}
											maxAngle={60}
											radius={4}
											borderStyle="2px dashed #5227FF"
											faceColor="#1a1a2e"
											rippleColor="#ff6b6b"
											rippleSpeed={1.5}
											autoAnimate={true}
											rippleOnClick={true}
										/>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "transitions"
										),
									]}
									selectedFilters={selectedFilters}
									title="Fluid Glass"
								>
									<div
										style={{
											height: "600px",
											width: "100vw",
											position: "relative",
										}}
									>
										<FluidGlass
											mode="lens" // or "bar", "cube"
											lensProps={{
												scale: 0.25,
												ior: 1.15,
												thickness: 5,
												chromaticAberration: 0.1,
												anisotropy: 0.01,
											}}
											// barProps={} // add specific props if using bar mode
											// cubeProps={} // add specific props if using cube mode
										/>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "transitions"
										),
									]}
									selectedFilters={selectedFilters}
									title="Model Viewer"
								>
									<div className="h-[500px]">
										<ModelViewer
											url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb"
											width={"100%"}
											height={"100%"}
										/>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "transitions"
										),
									]}
									selectedFilters={selectedFilters}
									title="Card Swap"
								>
									<div
										style={{ height: "600px", position: "relative" }}
									>
										<CardSwap
											cardDistance={60}
											verticalDistance={70}
											delay={5000}
											pauseOnHover={false}
										>
											<SwapCard>
												<h3>Card 1</h3>
												<p>Your content here</p>
											</SwapCard>
											<SwapCard>
												<h3>Card 2</h3>
												<p>Your content here</p>
											</SwapCard>
											<SwapCard>
												<h3>Card 3</h3>
												<p>Your content here</p>
											</SwapCard>
										</CardSwap>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "transitions"
										),
									]}
									selectedFilters={selectedFilters}
									title="Chroma Grid"
								>
									<div
										style={{ height: "600px", position: "relative" }}
									>
										<ChromaGrid
											items={chromaItems}
											radius={300}
											damping={0.45}
											fadeOut={0.6}
											ease="power3.out"
										/>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "transitions"
										),
									]}
									selectedFilters={selectedFilters}
									title="Theme Toggle Button"
								>
									<div className="h-full w-full flex items-center justify-center ">
										<ThemeToggleButton
											showLabel
											variant="gif"
											url="https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif?cid=790b76112m5eeeydoe7et0cr3j3ekb1erunxozyshuhxx2vl&ep=v1_stickers_search&rid=giphy.gif&ct=s"
										/>
										<ThemeToggleButton
											showLabel
											variant="gif"
											url="https://media.giphy.com/media/5PncuvcXbBuIZcSiQo/giphy.gif?cid=ecf05e47j7vdjtytp3fu84rslaivdun4zvfhej6wlvl6qqsz&ep=v1_stickers_search&rid=giphy.gif&ct=s"
										/>
										<ThemeToggleButton
											showLabel
											variant="gif"
											url="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3JwcXdzcHd5MW92NWprZXVpcTBtNXM5cG9obWh0N3I4NzFpaDE3byZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/WgsVx6C4N8tjy/giphy.gif"
										/>
										<ThemeToggleButton
											showLabel
											variant="gif"
											url="https://media.giphy.com/media/ArfrRmFCzYXsC6etQX/giphy.gif?cid=ecf05e47kn81xmnuc9vd5g6p5xyjt14zzd3dzwso6iwgpvy3&ep=v1_stickers_search&rid=giphy.gif&ct=s"
										/>

										<ThemeToggleButton showLabel />
										<ThemeToggleButton
											showLabel
											variant="circle-blur"
											start="top-right"
										/>
										<ThemeToggleButton
											showLabel
											variant="circle-blur"
											start="bottom-left"
										/>
										<ThemeToggleButton
											showLabel
											variant="circle-blur"
											start="bottom-right"
										/>

										<ThemeToggleButton
											showLabel
											variant="circle"
											start="top-left"
										/>
										<ThemeToggleButton
											showLabel
											variant="circle"
											start="top-right"
										/>
										<ThemeToggleButton
											showLabel
											variant="circle"
											start="bottom-left"
										/>
										<ThemeToggleButton
											showLabel
											variant="circle"
											start="bottom-right"
										/>

										<ThemeToggleButton
											showLabel
											variant="circle"
											start="center"
										/>
										<ThemeToggleButton
											variant="gif"
											url="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWI1ZmNvMGZyemhpN3VsdWp4azYzcWUxcXIzNGF0enp0eW1ybjF0ZyZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/Fa6uUw8jgJHFVS6x1t/giphy.gif"
										/>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="3dcard"
								>
									<CardContainer className="inter-var">
										<CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
											<CardItem
												translateZ="50"
												className="text-xl font-bold text-neutral-600 dark:text-white"
											>
												Make things float in air
											</CardItem>
											<CardItem
												as="p"
												translateZ="60"
												className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
											>
												Hover over this card to unleash the power of
												CSS perspective
											</CardItem>
											<CardItem
												translateZ="100"
												className="w-full mt-4"
											>
												<img
													src="/itjustworks.jpg"
													height="1000"
													width="1000"
													className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
													alt="thumbnail"
												/>
											</CardItem>
											<div className="flex justify-between items-center mt-20">
												<CardItem
													translateZ={20}
													as="a"
													href="https://twitter.com/mannupaaji"
													target="__blank"
													className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
												>
													Try now →
												</CardItem>
												<CardItem
													translateZ={20}
													as="button"
													className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
												>
													Sign up
												</CardItem>
											</div>
										</CardBody>
									</CardContainer>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TEXT
										),
									]}
									selectedFilters={selectedFilters}
									title="text rotate"
								>
									<div className="w-dvw h-dvh text-2xl sm:text-3xl md:text-5xl flex flex-row items-center justify-center font-overused-grotesk bg-white dark:text-muted text-foreground font-light overflow-hidden p-12 sm:p-20 md:p-24">
										<LayoutGroup>
											<motion.div
												className="flex whitespace-pre"
												layout
											>
												<motion.span
													className="pt-0.5 sm:pt-1 md:pt-2"
													layout
													transition={{
														type: "spring",
														damping: 30,
														stiffness: 400,
													}}
												>
													Make it{" "}
												</motion.span>
												<TextRotate
													texts={[
														"work!",
														"fancy ✽",
														"right",
														"fast",
														"fun",
														"rock",
														"🕶️🕶️🕶️",
													]}
													mainClassName="text-white px-2 sm:px-2 md:px-3 bg-[#ff5941] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
													staggerFrom={"last"}
													initial={{ y: "100%" }}
													animate={{ y: 0 }}
													exit={{ y: "-120%" }}
													staggerDuration={0.025}
													splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
													transition={{
														type: "spring",
														damping: 30,
														stiffness: 400,
													}}
													rotationInterval={2000}
												/>
											</motion.div>
										</LayoutGroup>
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TRANSITIONS
										),
									]}
									selectedFilters={selectedFilters}
									title="Spring Element"
								>
									<SpringElement>
										<Avatar className="size-20">
											<AvatarImage
												draggable={false}
												src="/itjustworks.jpg"
											/>
											<AvatarFallback>AK</AvatarFallback>
										</Avatar>
									</SpringElement>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TRANSITIONS
										),
									]}
									selectedFilters={selectedFilters}
									title="macbook"
								>
									<div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
										<MacbookScroll
											title={
												<span>
													This Macbook is built with Tailwindcss.{" "}
													<br /> No kidding.
												</span>
											}
											badge={
												<a href="https://peerlist.io/manuarora">
													test
												</a>
											}
											src={`/itjustworks.jpg`}
											showGradient={false}
										/>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.NAVIGATION
										),
									]}
									selectedFilters={selectedFilters}
									title="following headers"
								>
									<div className="relative flex w-full flex-col gap-8 md:flex-row">
										<TableOfContent
											className="w-full rounded-lg p-2 md:w-72"
											idOfParentContainer="parent-content"
										/>
										<div className="w-full">
											<p className="mb-2 text-neutral-500 text-xs">
												Scroll the section below
											</p>
											<div
												className="h-96 w-full space-y-20 overflow-scroll rounded-xl bg-neutral-500/10 p-8"
												id="parent-content"
											>
												<h1>Table of content preview</h1>
												<p>
													Commodo labore ullamco excepteur. Labore
													sunt dolore velit et consectetur proident
													minim minim occaecat. Id sit adipisicing
													aliqua proident nisi mollit aute. Duis in
													dolore incididunt ea. Quis quis in do
													quis laboris veniam ex irure consectetur
													incididunt in. Est ipsum in nostrud anim
													ut exercitation. Deserunt in consequat
													Lorem. Id magna culpa anim anim quis
													tempor reprehenderit enim ex fugiat
													veniam aliqua. Commodo proident laboris
													aute qui. Fugiat non ullamco nulla sunt
													officia eu cupidatat sit id qui id.
													Aliquip anim elit eu occaecat id pariatur
													irure labore cupidatat aliqua aliquip
													sunt commodo incididunt officia. Id ea
													elit labore sunt Lorem culpa
													exercitation. Deserunt pariatur enim in.
													Aliquip fugiat irure labore in consequat
													ex consequat et esse cupidatat aute in
													esse.
												</p>{" "}
												<h2>Here is the first h2</h2>
												<p>
													Commodo labore ullamco excepteur. Labore
													sunt dolore velit et consectetur proident
													minim minim occaecat. Id sit adipisicing
													aliqua proident nisi mollit aute. Duis in
													dolore incididunt ea. Quis quis in do
													quis laboris veniam ex irure consectetur
													incididunt in. Est ipsum in nostrud anim
													ut exercitation. Deserunt in consequat
													Lorem. Id magna culpa anim anim quis
													tempor reprehenderit enim ex fugiat
													veniam aliqua. Commodo proident laboris
													aute qui. Fugiat non ullamco nulla sunt
													officia eu cupidatat sit id qui id.
													Aliquip anim elit eu occaecat id pariatur
													irure labore cupidatat aliqua aliquip
													sunt commodo incididunt officia. Id ea
													elit labore sunt Lorem culpa
													exercitation. Deserunt pariatur enim in.
													Aliquip fugiat irure labore in consequat
													ex consequat et esse cupidatat aute in
													esse.
												</p>{" "}
												<h3>Here is the first h3</h3>
												<p>
													Commodo labore ullamco excepteur. Labore
													sunt dolore velit et consectetur proident
													minim minim occaecat. Id sit adipisicing
													aliqua proident nisi mollit aute. Duis in
													dolore incididunt ea. Quis quis in do
													quis laboris veniam ex irure consectetur
													incididunt in. Est ipsum in nostrud anim
													ut exercitation. Deserunt in consequat
													Lorem. Id magna culpa anim anim quis
													tempor reprehenderit enim ex fugiat
													veniam aliqua. Commodo proident laboris
													aute qui. Fugiat non ullamco nulla sunt
													officia eu cupidatat sit id qui id.
													Aliquip anim elit eu occaecat id pariatur
													irure labore cupidatat aliqua aliquip
													sunt commodo incididunt officia. Id ea
													elit labore sunt Lorem culpa
													exercitation. Deserunt pariatur enim in.
													Aliquip fugiat irure labore in consequat
													ex consequat et esse cupidatat aute in
													esse.
												</p>{" "}
												<h3>Here is the second h3</h3>
												<p>
													Commodo labore ullamco excepteur. Labore
													sunt dolore velit et consectetur proident
													minim minim occaecat. Id sit adipisicing
													aliqua proident nisi mollit aute. Duis in
													dolore incididunt ea. Quis quis in do
													quis laboris veniam ex irure consectetur
													incididunt in. Est ipsum in nostrud anim
													ut exercitation. Deserunt in consequat
													Lorem. Id magna culpa anim anim quis
													tempor reprehenderit enim ex fugiat
													veniam aliqua. Commodo proident laboris
													aute qui. Fugiat non ullamco nulla sunt
													officia eu cupidatat sit id qui id.
													Aliquip anim elit eu occaecat id pariatur
													irure labore cupidatat aliqua aliquip
													sunt commodo incididunt officia. Id ea
													elit labore sunt Lorem culpa
													exercitation. Deserunt pariatur enim in.
													Aliquip fugiat irure labore in consequat
													ex consequat et esse cupidatat aute in
													esse.
												</p>{" "}
												<h2>Here is the second h2</h2>
												<p>
													Commodo labore ullamco excepteur. Labore
													sunt dolore velit et consectetur proident
													minim minim occaecat. Id sit adipisicing
													aliqua proident nisi mollit aute. Duis in
													dolore incididunt ea. Quis quis in do
													quis laboris veniam ex irure consectetur
													incididunt in. Est ipsum in nostrud anim
													ut exercitation. Deserunt in consequat
													Lorem. Id magna culpa anim anim quis
													tempor reprehenderit enim ex fugiat
													veniam aliqua. Commodo proident laboris
													aute qui. Fugiat non ullamco nulla sunt
													officia eu cupidatat sit id qui id.
													Aliquip anim elit eu occaecat id pariatur
													irure labore cupidatat aliqua aliquip
													sunt commodo incididunt officia. Id ea
													elit labore sunt Lorem culpa
													exercitation. Deserunt pariatur enim in.
													Aliquip fugiat irure labore in consequat
													ex consequat et esse cupidatat aute in
													esse.
												</p>{" "}
												<h3>Here is the third h3</h3>
												<p>
													Commodo labore ullamco excepteur. Labore
													sunt dolore velit et consectetur proident
													minim minim occaecat. Id sit adipisicing
													aliqua proident nisi mollit aute. Duis in
													dolore incididunt ea. Quis quis in do
													quis laboris veniam ex irure consectetur
													incididunt in. Est ipsum in nostrud anim
													ut exercitation. Deserunt in consequat
													Lorem. Id magna culpa anim anim quis
													tempor reprehenderit enim ex fugiat
													veniam aliqua. Commodo proident laboris
													aute qui. Fugiat non ullamco nulla sunt
													officia eu cupidatat sit id qui id.
													Aliquip anim elit eu occaecat id pariatur
													irure labore cupidatat aliqua aliquip
													sunt commodo incididunt officia. Id ea
													elit labore sunt Lorem culpa
													exercitation. Deserunt pariatur enim in.
													Aliquip fugiat irure labore in consequat
													ex consequat et esse cupidatat aute in
													esse.
												</p>{" "}
												<h3>Here is the fourth h3</h3>
												<p>
													Commodo labore ullamco excepteur. Labore
													sunt dolore velit et consectetur proident
													minim minim occaecat. Id sit adipisicing
													aliqua proident nisi mollit aute. Duis in
													dolore incididunt ea. Quis quis in do
													quis laboris veniam ex irure consectetur
													incididunt in. Est ipsum in nostrud anim
													ut exercitation. Deserunt in consequat
													Lorem. Id magna culpa anim anim quis
													tempor reprehenderit enim ex fugiat
													veniam aliqua. Commodo proident laboris
													aute qui. Fugiat non ullamco nulla sunt
													officia eu cupidatat sit id qui id.
													Aliquip anim elit eu occaecat id pariatur
													irure labore cupidatat aliqua aliquip
													sunt commodo incididunt officia. Id ea
													elit labore sunt Lorem culpa
													exercitation. Deserunt pariatur enim in.
													Aliquip fugiat irure labore in consequat
													ex consequat et esse cupidatat aute in
													esse.
												</p>{" "}
												<h2>Here is the third h2</h2>
												<p>
													Commodo labore ullamco excepteur. Labore
													sunt dolore velit et consectetur proident
													minim minim occaecat. Id sit adipisicing
													aliqua proident nisi mollit aute. Duis in
													dolore incididunt ea. Quis quis in do
													quis laboris veniam ex irure consectetur
													incididunt in. Est ipsum in nostrud anim
													ut exercitation. Deserunt in consequat
													Lorem. Id magna culpa anim anim quis
													tempor reprehenderit enim ex fugiat
													veniam aliqua. Commodo proident laboris
													aute qui. Fugiat non ullamco nulla sunt
													officia eu cupidatat sit id qui id.
													Aliquip anim elit eu occaecat id pariatur
													irure labore cupidatat aliqua aliquip
													sunt commodo incididunt officia. Id ea
													elit labore sunt Lorem culpa
													exercitation. Deserunt pariatur enim in.
													Aliquip fugiat irure labore in consequat
													ex consequat et esse cupidatat aute in
													esse.
												</p>{" "}
												<h3>Here is the fifth h3</h3>
												<p>
													Commodo labore ullamco excepteur. Labore
													sunt dolore velit et consectetur proident
													minim minim occaecat. Id sit adipisicing
													aliqua proident nisi mollit aute. Duis in
													dolore incididunt ea. Quis quis in do
													quis laboris veniam ex irure consectetur
													incididunt in. Est ipsum in nostrud anim
													ut exercitation. Deserunt in consequat
													Lorem. Id magna culpa anim anim quis
													tempor reprehenderit enim ex fugiat
													veniam aliqua. Commodo proident laboris
													aute qui. Fugiat non ullamco nulla sunt
													officia eu cupidatat sit id qui id.
													Aliquip anim elit eu occaecat id pariatur
													irure labore cupidatat aliqua aliquip
													sunt commodo incididunt officia. Id ea
													elit labore sunt Lorem culpa
													exercitation. Deserunt pariatur enim in.
													Aliquip fugiat irure labore in consequat
													ex consequat et esse cupidatat aute in
													esse.
												</p>{" "}
												<h3>Here is the sixth h3</h3>
												<p>
													Commodo labore ullamco excepteur. Labore
													sunt dolore velit et consectetur proident
													minim minim occaecat. Id sit adipisicing
													aliqua proident nisi mollit aute. Duis in
													dolore incididunt ea. Quis quis in do
													quis laboris veniam ex irure consectetur
													incididunt in. Est ipsum in nostrud anim
													ut exercitation. Deserunt in consequat
													Lorem. Id magna culpa anim anim quis
													tempor reprehenderit enim ex fugiat
													veniam aliqua. Commodo proident laboris
													aute qui. Fugiat non ullamco nulla sunt
													officia eu cupidatat sit id qui id.
													Aliquip anim elit eu occaecat id pariatur
													irure labore cupidatat aliqua aliquip
													sunt commodo incididunt officia. Id ea
													elit labore sunt Lorem culpa
													exercitation. Deserunt pariatur enim in.
													Aliquip fugiat irure labore in consequat
													ex consequat et esse cupidatat aute in
													esse.
												</p>{" "}
											</div>
										</div>
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.CARD
										),
									]}
									selectedFilters={selectedFilters}
									title="bottom blur"
								>
									<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
										<div className="relative w-52 dark:text-white">
											{Array.from({ length: 20 }).map((_, index) => (
												<div key={index + "bottom_blur"}>
													Sunt id fugiat dolor nostrud aute eiusmod
													ea sint. Ea laborum do irure et. Ea elit
													incididunt velit veniam anim ullamco elit
													sunt. Ea veniam nisi elit nostrud eu sit
													ut non Lorem adipisicing non ut
													excepteur. Sint elit cupidatat
													reprehenderit nulla ipsum enim Lorem
													cillum velit veniam. Esse elit sit irure
													Lorem. Esse aliqua incididunt amet est
													voluptate esse adipisicing culpa commodo
													est.
													<img
														src="/itjustworks.jpg"
														alt="random"
														width="auto"
														height={100}
													/>
												</div>
											))}
											<BottomBlurOut />
										</div>
										;
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="wobble card"
								>
									<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
										<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
											<WobbleCard
												containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
												className=""
											>
												<div className="max-w-xs">
													<h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
														Gippity AI powers the entire universe
													</h2>
													<p className="mt-4 text-left  text-base/6 text-neutral-200">
														With over 100,000 mothly active bot
														users, Gippity AI is the most popular
														AI platform for developers.
													</p>
												</div>
												<Image
													src="/itjustworks.jpg"
													width={500}
													height={500}
													alt="linear demo image"
													className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
												/>
											</WobbleCard>
											<WobbleCard containerClassName="col-span-1 min-h-[300px]">
												<h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
													No shirt, no shoes, no weapons.
												</h2>
												<p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
													If someone yells “stop!”, goes limp, or
													taps out, the fight is over.
												</p>
											</WobbleCard>
											<WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
												<div className="max-w-sm">
													<h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
														Signup for blazing-fast cutting-edge
														state of the art Gippity AI wrapper
														today!
													</h2>
													<p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
														With over 100,000 mothly active bot
														users, Gippity AI is the most popular
														AI platform for developers.
													</p>
												</div>
												<Image
													src="/itjustworks.jpg"
													width={500}
													height={500}
													alt="linear demo image"
													className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
												/>
											</WobbleCard>
										</div>
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TEXT
										),
									]}
									selectedFilters={selectedFilters}
									title="word tornado"
								>
									<WordTornadoDemo />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TIMELINE
										),
									]}
									selectedFilters={selectedFilters}
									title="timeline"
								>
									<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
										<Timeline
											data={[
												{
													title: "test ",
													decade: "1233",
													images: [
														{ url: "/itjustworks.jpg", alt: "" },
													],
													copy: "asdfdsafdsafdsaf",
												},
												{
													title: "test stete",
													decade: "3456",
													images: [
														{ url: "/itjustworks.jpg", alt: "" },
													],
													copy: "asdfsdfdsafd",
												},
												{
													title: "test etst tewts test",
													decade: "566",
													images: [
														{ url: "/itjustworks.jpg", alt: "" },
													],
													copy: "zzzzzzzzzzzzzzzzzzzzzzz",
												},
												{
													title: "sdafgdg",
													decade: "768",
													images: [
														{ url: "/itjustworks.jpg", alt: "" },
													],
													copy: "asdfsdaf",
												},
											]}
										/>
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.INTERACTIVE
										),
									]}
									selectedFilters={selectedFilters}
									title="tool tip"
								>
									<div className="flex flex-row items-center justify-center mb-10 w-full">
										<AnimatedTooltip items={people} />
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.INTERACTIVE
										),
									]}
									selectedFilters={selectedFilters}
									title="tracing beam"
								>
									<TracingBeam className="px-6">
										<div className="max-w-2xl mx-auto antialiased pt-4 relative">
											{dummyContent.map((item, index) => (
												<div
													key={`content-${index}`}
													className="mb-10"
												>
													<h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
														{item.badge}
													</h2>

													<p className={"text-xl mb-4"}>
														{item.title}
													</p>

													<div className="text-sm  prose prose-sm dark:prose-invert">
														{item?.image && (
															<img
																src={item.image}
																alt="blog thumbnail"
																height="1000"
																width="1000"
																className="rounded-lg mb-10 object-cover"
															/>
														)}
														{item.description}
													</div>
												</div>
											))}
										</div>
									</TracingBeam>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TESTIMONIALS
										),
									]}
									selectedFilters={selectedFilters}
									title="typewriter testimonials"
								>
									<TypewriterTestimonial
										testimonials={typewritterTestimonials}
									/>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.INTERACTIVE
										),
									]}
									selectedFilters={selectedFilters}
									title="underline to background"
								>
									<div className="w-dvw h-dvh flex flex-col items-center justify-center bg-[#f5f5f5]">
										<motion.h2
											className="text-[#0015ff] text-xl p-12 md:p-24"
											initial="hidden"
											animate="visible"
											variants={fadeInVariants}
										>
											{words.map((word, index) => (
												<motion.span
													key={index + word}
													variants={wordVariants}
													className="inline-block mr-1"
												>
													{word}
												</motion.span>
											))}
											<motion.span
												variants={wordVariants}
												className="inline-block"
											>
												<UnderlineToBackground
													label="subscribe"
													targetTextColor="#f0f0f0"
													className="cursor-pointer"
												/>
											</motion.span>
										</motion.h2>
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="video button"
								>
									<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
										<VideoButton videoSrc="/placeholder.mp4">
											<span className="text-xl font-semibold">
												Join the club!
											</span>
										</VideoButton>
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
													filter_constants.INTERACTIVE ||
												filter.label.toLowerCase() ===
													filter_constants.TEXT
										),
									]}
									selectedFilters={selectedFilters}
									title="text roll"
								>
									<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
										<TextRoll className="text-4xl text-black dark:text-white">
											Components
										</TextRoll>{" "}
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="text focus"
								>
									<TextFocus
										sentence="True Focus"
										manualMode={false}
										blurAmount={5}
										borderColor="red"
										animationDuration={2}
										pauseBetweenAnimations={1}
									/>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="Feature"
								>
									<Feature
										data={{
											blogEntries: [
												{
													id: 1,
													title: "test",
													short: "test test 123",
													uri: "https://google.com",
													image: [{ url: "/itjustworks.jpg" }],
												},
												{
													id: 1,
													title: "test",
													short: "test test 123",
													uri: "https://google.com",
													video: ["/placeholder.mp4"],
												},
											],
										}}
									/>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="Text Parallax Content"
								>
									<TextParallaxContentExample />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="sticker peel"
								>
									<PeelableSticker
										message="test"
										stickerImage="/itjustworks.jpg"
									/>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="stacking cards"
								>
									<div
										className="h-[620px] bg-white overflow-auto text-white"
										ref={(node) => setContainer(node)}
									>
										<StackingCards
											totalCards={cards.length}
											scrollOptons={{
												container: { current: container },
											}}
										>
											<div className="relative font-calendas h-[620px] w-full z-10 text-2xl md:text-7xl font-bold uppercase flex justify-center items-center text-[#ff5941] whitespace-pre">
												Scroll down ↓
											</div>
											{cards.map(
												(
													{ bgColor, description, image, title },
													index
												) => {
													return (
														<StackingCardItem
															key={index + description}
															index={index}
															className="h-[620px]"
														>
															<div
																className={cn(
																	bgColor,
																	"h-[80%] sm:h-[70%] flex-col sm:flex-row aspect-video px-8 py-10 flex w-11/12 rounded-3xl mx-auto relative"
																)}
															>
																<div className="flex-1 flex flex-col justify-center">
																	<h3 className="font-bold text-2xl mb-5">
																		{title}
																	</h3>
																	<p>{description}</p>
																</div>

																<div className="w-full sm:w-1/2 rounded-xl aspect-video relative overflow-hidden">
																	<Image
																		src={image}
																		alt={title}
																		width={100}
																		height={100}
																		className="object-cover"
																	/>
																</div>
															</div>
														</StackingCardItem>
													);
												}
											)}

											<div className="w-full h-80 relative overflow-hidden">
												<h2 className="absolute bottom-0 left-0 translate-y-1/3 sm:text-[192px] text-[80px] text-[#ff5941] font-calendas">
													fancy
												</h2>
											</div>
										</StackingCards>
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="stacked carousel"
								>
									<div className="w-full h-full flex justify-center items-center pt-12 pb-4">
										<StackedCarousel
											images={[
												"/itjustworks.jpg",
												"/itjustworks.jpg",
												"/itjustworks.jpg",
												"/itjustworks.jpg",
												"/itjustworks.jpg",
											]}
											width={300}
											height={400}
											borderColor="white"
											borderWidth={8}
										/>
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="simple grid"
								>
									<SimpleGrid />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="slide button"
								>
									<SlideButton />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="sparkles"
								>
									<div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
										<h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
											Components
										</h1>
										<div className="w-[40rem] h-40 relative">
											{/* Gradients */}
											<div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
											<div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
											<div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
											<div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

											{/* Core component */}
											<SparklesCore
												background="transparent"
												minSize={0.4}
												maxSize={1}
												particleDensity={1200}
												className="w-full h-full"
												particleColor="#FFFFFF"
											/>

											{/* Radial Gradient to prevent sharp edges */}
											<div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
										</div>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="spotlight"
								>
									<div className="relative flex h-[40rem] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
										<div
											className={cn(
												"pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
												"[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
											)}
										/>

										<Spotlight
											className="-top-40 left-0 md:-top-20 md:left-60"
											fill="white"
										/>
										<div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
											<h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
												Spotlight <br /> is the new trend.
											</h1>
											<p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
												Spotlight effect is a great way to draw
												attention to a specific part of the page.
												Here, we are drawing the attention towards
												the text section of the page. I don&apos;t
												know why but I&apos;m running out of copy.
											</p>
										</div>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="scroll float"
								>
									<ScrollFloat scrollContainerRef={containerRef}>
										test test 123
									</ScrollFloat>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "text"
										),
									]}
									title="Scroll Reveal"
									selectedFilters={selectedFilters}
								>
									<ScrollReveal
										scrollContainerRef={containerRef}
										baseOpacity={0}
										enableBlur={true}
										baseRotation={5}
										blurStrength={10}
									>
										When does a man die? When he is hit by a bullet?
										No! When he suffers a disease? No! When he ate a
										soup made out of a poisonous mushroom? No! A man
										dies when he is forgotten!
									</ScrollReveal>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="random letter swap hover"
								>
									<div className="w-dvw h-dvh rounded-lg bg-white text-3xl md:text-5xl flex flex-col items-center justify-center font-overused-grotesk">
										<div className="h-full text-red-500 rounded-xl py-12  align-text-center gap-y-1 md:gap-y-2 flex flex-col justify-center items-center">
											<RandomLetterSwapForward
												label="Right here!"
												reverse={true}
												className=""
											/>
											<RandomLetterSwapForward
												label="Right now!"
												reverse={false}
												className="font-bold italic px-4"
											/>
											<RandomLetterSwapPingPong
												label="Right here!"
												className=""
											/>
											<RandomLetterSwapPingPong
												label="Right now!"
												reverse={false}
												className=" font-bold"
											/>
										</div>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="link preview"
								>
									<div className="flex justify-center items-center h-[40rem] flex-col px-4">
										<span className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto mb-10">
											<LinkPreview
												url="https://tailwindcss.com"
												imageSrc="/itjustworks.jpg"
												className="font-bold"
											>
												Tailwind CSS
											</LinkPreview>{" "}
											and{" "}
											<LinkPreview
												url="https://framer.com/motion"
												imageSrc="/itjustworks.jpg"
												className="font-bold"
											>
												Framer Motion
											</LinkPreview>{" "}
											are a great way to build modern websites.
										</span>
										<span className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto">
											Visit{" "}
											<LinkPreview
												url="https://ui.aceternity.com"
												imageSrc="/itjustworks.jpg"
												className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
											>
												Aceternity UI
											</LinkPreview>{" "}
											for amazing Tailwind and Framer Motion
											components.
										</span>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="hover squares"
								>
									<div className="bg-neutral-50 px-4 py-12">
										<div className="mx-auto max-w-7xl">
											<ClipPathLinks />
										</div>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="grid content"
								>
									<GridContent />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="hero highlight"
								>
									<HeroHighlight>
										<motion.h1
											initial={{
												opacity: 0,
												y: 20,
											}}
											animate={{
												opacity: 1,
												y: [20, -5, 0],
											}}
											transition={{
												duration: 0.5,
												ease: [0.4, 0.0, 0.2, 1],
											}}
											className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
										>
											With insomnia, nothing&apos;s real. Everything
											is far away. Everything is a{" "}
											<Highlight className="text-black dark:text-white">
												copy, of a copy, of a copy.
											</Highlight>
										</motion.h1>
									</HeroHighlight>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="hero parallax"
								>
									<HeroParallax products={products} />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="focus cards"
								>
									<FocusCards />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="flipping text"
								>
									<TextAnimationFlippingWords />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="faq section"
								>
									<FAQPage />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="color change cards"
								>
									<ColorChangeCards />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="colorful text"
								>
									<h2>
										Some things are just{" "}
										<ColourfulText text={"awesome"} /> to work with
									</h2>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="compare"
								>
									<Compare
										firstImage="itjustworks.jpg"
										secondImage="thumbnail.png"
									/>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="bubble text"
								>
									<BubbleText text="Bubble text" />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="Background gradient"
								>
									<div>
										<BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
											<img
												src={`/jordans.webp`}
												alt="jordans"
												height="400"
												width="400"
												className="object-contain"
											/>
											<p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
												Air Jordan 4 Retro Reimagined
											</p>

											<p className="text-sm text-neutral-600 dark:text-neutral-400">
												The Air Jordan 4 Retro Reimagined Bred will
												release on Saturday, February 17, 2024. Your
												best opportunity to get these right now is
												by entering raffles and waiting for the
												official releases.
											</p>
											<button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
												<span>Buy now </span>
												<span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
													$100
												</span>
											</button>
										</BackgroundGradient>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "carousel"
										),
									]}
									selectedFilters={selectedFilters}
									title="Letter 3d swap"
								>
									<div className="flex flex-col items-center max-w-2xl ">
										<Letter3DSwap
											text="SET YOUR MIND TO IT"
											mainClassName="text-7xl bg-white lowercase"
											frontFaceClassName={`bg-white  text-black`}
											secondFaceClassName={`bg-white  text-black`}
											rotateDirection="top"
											paddingX={0}
											paddingY={0}
											staggerDuration={0.03}
											staggerFrom="first"
											transition={{
												type: "spring",
												damping: 25,
												stiffness: 160,
											}}
										/>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "text"
										),
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title={"letter hover"}
								>
									<div className="w-dvw h-dvh rounded-lg bg-white text-xl md:text-3xl  flex flex-col items-center justify-center font-calendas">
										<div className=" p-12 text-[#0015ff] rounded-xl align-text-top  gap-y-1 md:gap-y-2 flex flex-col">
											<LetterSwapForward
												label="Hover me chief!"
												reverse={true}
												className="italic"
											/>
											<LetterSwapForward
												label="{awesome}"
												reverse={false}
												className="font-bold"
											/>
											<LetterSwapForward
												label="Good day!"
												staggerFrom={"center"}
												className="mono"
											/>
											<RandomLetterSwapPingPong
												label="More text?"
												staggerFrom={"center"}
												reverse={false}
												className="font-overused-grotesk font-bold"
											/>
											<RandomLetterSwapPingPong
												label="oh, seriously?!"
												staggerFrom={"last"}
											/>
										</div>
									</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="linear dialog"
								>
									<div className="flex gap-4">
										{itemsLinearlDialog.map((item, i) => {
											return (
												<>
													<Dialog
														transition={{
															type: "spring",
															bounce: 0.05,
															duration: 0.5,
														}}
													>
														<DialogTrigger
															style={{
																borderRadius: "12px",
															}}
															className="flex w-full flex-col overflow-hidden  border    dark:bg-black bg-gray-300 hover:bg-gray-200 dark:hover:bg-gray-950"
														>
															<DialogImage
																src={"/itjustworks.jpg"}
																alt=""
																className=" h-64 w-full object-cover"
															/>
															<div className="flex flex-grow flex-row items-end justify-between p-3">
																<div>
																	<DialogTitle className="text-zinc-950 text-xl dark:text-zinc-50">
																		{item.title}
																	</DialogTitle>
																</div>
																<button className="absolute bottom-2 right-2 p-2 dark:bg-gray-900 bg-gray-400 hover:bg-gray-500 rounded-full dark:hover:bg-gray-800">
																	<Plus className="w-6 h-6" />
																</button>
															</div>
														</DialogTrigger>
														<DialogContainer className="pt-20">
															<DialogContent
																style={{
																	borderRadius: "24px",
																}}
																className=" relative flex h-full mx-auto flex-col overflow-y-auto border dark:bg-black bg-gray-300 hover:bg-gray-200 dark:hover:bg-gray-950 lg:w-[900px] w-[80%] "
															>
																<DialogImage
																	src={"/itjustworks.jpg"}
																	alt=""
																	className="h-full  object-contain w-[60%] mx-auto"
																/>
																<div className="p-6">
																	<DialogTitle className="text-5xl text-zinc-950 dark:text-zinc-50">
																		{item.title}
																	</DialogTitle>

																	<DialogDescription
																		disableLayoutAnimation
																		variants={{
																			initial: {
																				opacity: 0,
																				scale: 0.8,
																				y: -40,
																			},
																			animate: {
																				opacity: 1,
																				scale: 1,
																				y: 0,
																			},
																			exit: {
																				opacity: 0,
																				scale: 0.8,
																				y: -50,
																			},
																		}}
																	>
																		<p className="mt-2 text-zinc-500 dark:text-zinc-500">
																			{item.description}
																		</p>
																	</DialogDescription>
																</div>
																<DialogClose className="text-zinc-50  dark:bg-gray-900 bg-gray-400 p-4 hover:bg-gray-500 rounded-full dark:hover:bg-gray-800" />
															</DialogContent>
														</DialogContainer>
													</Dialog>
												</>
											);
										})}
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title="magnet lines"
								>
									<MagnetLines
										rows={9}
										columns={9}
										containerSize="60vmin"
										lineColor="tomato"
										lineWidth="0.8vmin"
										lineHeight="5vmin"
										baseAngle={0}
										style={{ margin: "2rem auto" }}
									/>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "button"
										),
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title={"galaxy button"}
								>
									<div className="flex flex-col items-center justify-center gap-8 ">
										<GalaxyButton
											text="Galaxy Button"
											gradientColors={[
												"#9500FD",
												"#3B82F6",
												"#00ffb6",
											]}
											fontSize="1.2rem"
											padding="1.25rem 4rem"
											onClick={() =>
												console.log("Galaxy Button clicked!")
											}
										/>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "button"
										),
									]}
									selectedFilters={selectedFilters}
									title={"fold hover button"}
								>
									<div className="flex justify-center items-center flex-col gap-6 w-full h-full">
										<FolderHoverButton
											folderName="🗽 New York, USA"
											images={[
												"/itjustworks.jpg",
												"/itjustworks.jpg",
												"/itjustworks.jpg",
												"/itjustworks.jpg",
											]}
										/>
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title="pointer"
								>
									<div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:grid-rows-2">
										<Card className="col-span-1 row-span-1 overflow-hidden border-none bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg transition-all hover:shadow-xl dark:from-slate-900 dark:to-slate-800">
											<CardHeader className="relative pb-2">
												<CardTitle className="text-xl font-bold">
													Animated Pointer
												</CardTitle>
												<CardDescription className="text-sm text-slate-600 dark:text-slate-400">
													Animated pointer
												</CardDescription>
											</CardHeader>
											<CardContent className="relative flex h-40 items-center justify-center p-6">
												<span className="pointer-events-none text-center text-xl font-medium text-slate-800 dark:text-slate-200">
													Move your cursor here
												</span>
											</CardContent>
											<Pointer>
												<motion.div
													animate={{
														scale: [0.8, 1, 0.8],
														rotate: [0, 5, -5, 0],
													}}
													transition={{
														duration: 1.5,
														repeat: Infinity,
														ease: "easeInOut",
													}}
												>
													<svg
														width="40"
														height="40"
														viewBox="0 0 40 40"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														className="text-pink-600"
													>
														<motion.path
															d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
															fill="currentColor"
															animate={{ scale: [1, 1.2, 1] }}
															transition={{
																duration: 0.8,
																repeat: Infinity,
																ease: "easeInOut",
															}}
														/>
													</svg>
												</motion.div>
											</Pointer>
										</Card>

										<Card className="col-span-1 row-span-1 overflow-hidden border-none bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg transition-all hover:shadow-xl dark:from-blue-900 dark:to-blue-800">
											<CardHeader className="relative pb-2">
												<CardTitle className="text-xl font-bold">
													Colored Pointer
												</CardTitle>
												<CardDescription className="text-sm text-blue-700 dark:text-blue-300">
													A custom pointer with different color
												</CardDescription>
											</CardHeader>
											<CardContent className="relative flex h-40 items-center justify-center p-6">
												<span className="pointer-events-none text-center text-xl font-medium text-blue-800 dark:text-blue-200">
													Try me out
												</span>
											</CardContent>
											<Pointer className="fill-blue-500" />
										</Card>

										<Card className="col-span-1 row-span-1 overflow-hidden border-none bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg transition-all hover:shadow-xl dark:from-purple-900 dark:to-purple-800">
											<CardHeader className="relative pb-2">
												<CardTitle className="text-xl font-bold">
													Custom Shape
												</CardTitle>
												<CardDescription className="text-sm text-purple-700 dark:text-purple-300">
													A pointer with a custom SVG shape
												</CardDescription>
											</CardHeader>
											<CardContent className="relative flex h-40 items-center justify-center p-6">
												<span className="pointer-events-none text-center text-xl font-medium text-purple-800 dark:text-purple-200">
													Hover here
												</span>
											</CardContent>
											<Pointer>
												<svg
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<circle
														cx="12"
														cy="12"
														r="10"
														className="fill-purple-500"
													/>
													<circle
														cx="12"
														cy="12"
														r="5"
														className="fill-white"
													/>
												</svg>
											</Pointer>
										</Card>

										<Card className="col-span-1 row-span-1 overflow-hidden border-none bg-gradient-to-br from-green-50 to-green-100 shadow-lg transition-all hover:shadow-xl dark:from-green-900 dark:to-green-800">
											<CardHeader className="relative pb-2">
												<CardTitle className="text-xl font-bold">
													Emoji Pointer
												</CardTitle>
												<CardDescription className="text-sm text-green-700 dark:text-green-300">
													Using an emoji as a custom pointer
												</CardDescription>
											</CardHeader>
											<CardContent className="relative flex h-40 items-center justify-center p-6">
												<span className="pointer-events-none text-center text-xl font-medium text-green-800 dark:text-green-200">
													Check this out
												</span>
											</CardContent>
											<Pointer>
												<div className="text-2xl">👆</div>
											</Pointer>
										</Card>
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title="animated hover card"
								>
									<AnimatedCard
										title="Hover to see the wizardry"
										subtitle="You hovered"
									/>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "text"
										),
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "carousel"
										),
									]}
									selectedFilters={selectedFilters}
									title="award carousel"
								>
									<div>
										<AwardsCarousel
											Award={[
												{
													Brand: "Tech Radar",
													Award: "Best of MWC",
													Saying:
														"This small wearable AI tech impressed us with a hands-free way to get answers and record video in a pin-ch.",
												},
												{
													Brand: "Tom's Guide",
													Award: "Best AI Pin",
													Saying:
														"The basic idea behind the Humane Ai Pin is to get you to use your phones less so you can be more present, while still keeping you connected.",
												},
												{
													Brand: "Apple",
													Award: "Ultra Pro Max",
													Saying:
														"It demonstrates that you need a smartphone for most of the things we use a AI Pin for, freeing you to be more present in the moment and with other people.",
												},
												{
													Brand: "Samsung",
													Award: "Editor's Choice",
													Saying:
														"There’s a futuristic air about the Humane Ai Pin that we can’t help but get excited about.",
												},
											]}
										/>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "text"
										),
									]}
									selectedFilters={selectedFilters}
									title={"Ghost Label"}
								>
									<div className="w-full max-w-2xl mx-auto py-12 px-4">
										<div className="relative ml-[30px] mt-20">
											<GhostLabel text="1920" />
											<p className="w-full max-w-[600px] text-sm font-serif text-justify">
												The film 1920: Evil Returns follows poet
												Jaidev, who helps a woman with amnesia, only
												for her to become possessed by a malevolent
												spirit. As he struggles to save her, dark
												secrets unfold, intertwining love and horror
												in a chilling narrative. This supernatural
												horror film, released in 2012, is a
												quasi-sequel to 1920 and features themes of
												possession and redemption
											</p>
										</div>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												"requires images"
										),
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "carousel"
										),
									]}
									selectedFilters={selectedFilters}
									title="Blur Vignette"
								>
									<div className="w-fit  mx-auto sm:flex gap-2 justify-center ">
										<BlurVignette
											radius="24px"
											inset="10px"
											transitionLength="80px"
											blur="15px"
										>
											<Image
												src="/itjustworks.jpg"
												alt="grid"
												width={600}
												className="mx-auto w-full relative h-full object-cover"
												height={600}
											/>
											<BlurVignetteArticle />
										</BlurVignette>
										<BlurVignette
											radius="24px"
											inset="10px"
											transitionLength="80px"
											blur="15px"
										>
											<Image
												src="/itjustworks.jpg"
												alt="grid"
												width={600}
												className="mx-auto w-full relative h-full object-cover"
												height={600}
											/>
											<BlurVignetteArticle />
										</BlurVignette>
									</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "form"
										),
									]}
									selectedFilters={selectedFilters}
									title="Gradient Checkbox"
									className="p-16"
								>
									<GradientCheckbox />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												"requires images"
										),
									]}
									selectedFilters={selectedFilters}
									title="Progressive Blur"
								>
									<section className="flex">
										<div className="relative my-4 aspect-square w-[300px] overflow-hidden rounded-[4px]">
											<Image
												src="/itjustworks.jpg"
												width={100}
												height={100}
												alt="Benjamin Spiers - Moonlight 2023"
												className="absolute inset-0"
											/>
											<ProgressiveBlur
												className="pointer-events-none absolute bottom-0 left-0 h-[50%] w-full"
												blurIntensity={6}
											/>
											<div className="absolute bottom-0 left-0">
												<div className="flex flex-col items-start gap-0 px-5 py-4">
													<p className="text-base font-medium text-white">
														Benjamin Spiers
													</p>
													<span className="mb-2 text-base text-zinc-300">
														Moonlight 2023
													</span>
													<p className="text-base text-white">
														Oil on linen. 40cm by 30cm
													</p>
												</div>
											</div>
										</div>
										<div
											className="relative my-4 aspect-square h-[300px] overflow-hidden rounded-[4px]"
											onMouseEnter={() => setIsHover(true)}
											onMouseLeave={() => setIsHover(false)}
										>
											<Image
												src="/itjustworks.jpg"
												width={100}
												height={100}
												alt="John Martin - Pandemonium"
												className="absolute inset-0"
											/>
											<ProgressiveBlur
												className="pointer-events-none absolute bottom-0 left-0 h-[75%] w-full"
												blurIntensity={0.5}
												animate={isHover ? "visible" : "hidden"}
												variants={{
													hidden: { opacity: 0 },
													visible: { opacity: 1 },
												}}
												transition={{
													duration: 0.2,
													ease: "easeOut",
												}}
											/>
											<motion.div
												className="absolute bottom-0 left-0"
												animate={isHover ? "visible" : "hidden"}
												variants={{
													hidden: { opacity: 0 },
													visible: { opacity: 1 },
												}}
												transition={{
													duration: 0.2,
													ease: "easeOut",
												}}
											>
												<div className="flex flex-col items-start gap-0 px-5 py-4">
													<p className="text-base font-medium text-white">
														John Martin
													</p>
													<span className="text-base text-zinc-300">
														Pandemonium
													</span>
												</div>
											</motion.div>
										</div>
									</section>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "text"
										),
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												"requires images"
										),
									]}
									title="Media Between Text"
									selectedFilters={selectedFilters}
								>
									<section>
										<h3>Media between text</h3>

										<div className="w-full h-dvh items-center justify-center bg-background overflow-auto">
											<div className="h-full relative w-full flex">
												<h3 className="text-5xl sm:text-8xl tracking-wide absolute sm:bottom-12 sm:left-12 bottom-4 left-4 w-64">
													today's inspo
												</h3>
												<p className="bottom-4 right-4 sm:right-12 sm:bottom-12 absolute ">
													Scroll down ↓
												</p>
											</div>

											<div className="h-full w-full flex flex-col space-y-12 mt-24 justify-center items-center text-6xl px-6">
												{mediaBetweenElements.map(
													(element, index) => (
														<a
															href={element.url}
															target="_blank"
															rel="noreferrer"
														>
															<MediaBetweenText
																key={index + "mediaBetween"}
																firstText={element.left}
																secondText={element.right}
																mediaUrl={element.src}
																mediaType="video"
																triggerType="inView"
																useInViewOptionsProp={{
																	once: false,
																	amount: 1,
																	root: mediaBetweenTextRef,
																	margin: "-5% 0px -0% 0px",
																}}
																containerRef={
																	mediaBetweenTextRef
																}
																mediaContainerClassName="w-full h-[40px] sm:h-[80px] overflow-hidden mx-1 sm:mx-3 mt-1 sm:mt-4"
																className="cursor-pointer text-lg sm:text-4xl font-light flex flex-row items-center justify-center"
																animationVariants={{
																	initial: { width: 0 },
																	animate: {
																		width: isMobile
																			? "40px"
																			: "100px",
																		transition: {
																			duration: 1,
																			type: "spring",
																			bounce: 0,
																			delay: 0.1,
																		},
																	},
																}}
															/>
														</a>
													)
												)}
											</div>
										</div>

										<div className="relative w-full h-dvh flex flex-col items-center justify-center bg-background">
											<Button
												onClick={() => {
													setIsOpen(!isOpen);
													if (!isOpen) {
														mediaBetweenTextRef2.current?.animate();
													} else {
														mediaBetweenTextRef2.current?.reset();
													}
												}}
												size={"sm"}
												variant={"outline"}
												className="absolute top-4 left-4 h-8"
											>
												{isOpen ? "Close" : "Open"}
											</Button>

											<MediaBetweenText
												firstText="Artificial "
												secondText="Intelligence"
												mediaUrl={"/itjustworks.jpg"}
												mediaType="image"
												triggerType="ref"
												ref={mediaBetweenTextRef2}
												mediaContainerClassName="w-full h-[60px] sm:h-[100px] overflow-hidden pt-1"
												className="cursor-pointer text-3xl sm:text-7xl font-calendas flex flex-col font-light items-center justify-center"
												leftTextClassName=""
												rightTextClassName="italic"
												animationVariants={{
													initial: {
														width: isMobile ? "160px" : "280px",
														height: 0,
														transition: {
															duration: 0.7,
															ease: [0.944, 0.008, 0.147, 1.002],
														},
													},
													animate: {
														width: isMobile ? "200px" : "330px",
														height: isMobile ? "200px" : "300px",
														transition: {
															duration: 0.7,
															ease: [0.944, 0.008, 0.147, 1.002],
														},
													},
												}}
											/>
										</div>
									</section>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title="Text Highlighter"
								>
									<div className="w-dvw h-dvh bg-[#fefefe] relative p-0">
										<div className="absolute bottom-0 w-full left-0 h-64 bg-gradient-to-t from-[#fefefe] from-10% via-50% via-[#fefefe]/50 to-transparent pointer-events-none isolate" />

										<div
											className="h-full w-full z-10 bg-[#fefefe] overflow-scroll"
											ref={containerRef}
										>
											<div className="max-w-md mx-auto px-4 mt-40 pb-64 p-0  text-black">
												<h1 className="text-4xl font-medium mb-20 font-calendas tracking-tight">
													Typeface alphabets
												</h1>

												<div className="text leading-normal space-y-4 font-overusedGrotesk ">
													<span className="whitespace-break-spaces">
														The present-day designer has a host of
														printing types at his disposal.{" "}
														<TextHighlighter
															className={highlightClass}
															transition={transition}
															highlightColor={highlightColor}
															useInViewOptions={inViewOptions}
														>
															Since Gutenberg first invented
															movable type in 1436-55
														</TextHighlighter>{" "}
														hundreds of different types have been
														designed and cast in lead.{" "}
														<TextHighlighter
															className={highlightClass}
															transition={transition}
															highlightColor={highlightColor}
															useInViewOptions={inViewOptions}
														>
															The most recent technical
															developments
														</TextHighlighter>{" "}
														with computer and photo-typesetting
														have once again brought new faces or
														variations of old ones on the market.
													</span>

													<span>
														<TextHighlighter
															className={highlightClass}
															transition={transition}
															highlightColor={highlightColor}
															useInViewOptions={inViewOptions}
														>
															The choice is up to the designer
														</TextHighlighter>{" "}
														It is left to his feeling for form to
														use{" "}
														<TextHighlighter
															className={highlightClass}
															transition={transition}
															highlightColor={highlightColor}
															useInViewOptions={inViewOptions}
														>
															good or poor typefaces
														</TextHighlighter>{" "}
														for his design work. In view of the
														limited space available, we shall
														refer here to only a few of the
														outstanding designs of the past and
														the 20th century which have appeared
														most frequently in publications.
													</span>

													<span>
														Knowledge of the quality of a typeface
														is of the greatest importance for the{" "}
														<TextHighlighter
															className={highlightClass}
															transition={transition}
															highlightColor={highlightColor}
															useInViewOptions={inViewOptions}
														>
															functional, aesthetic and
															psychological effect
														</TextHighlighter>{" "}
														of printed matter. Again, the
														typographic design, i. e. the correct
														spaces between letters and words and
														the length and spacing of lines
														conducive to easy reading, does much
														to enhance the impression created.{" "}
														<TextHighlighter
															className={highlightClass}
															transition={transition}
															highlightColor={highlightColor}
															useInViewOptions={inViewOptions}
														>
															Today the field is dominated mainly
															by computer and photo-typesetting
														</TextHighlighter>{" "}
														A typical characteristic of these
														forms of composition is the too narrow
														setting of the letters which makes
														reading difficult. The designer will
														be well advised to demand the normal
														spacing between letters when ordering
														photo-typesetting.
													</span>

													<span>
														<TextHighlighter
															className={highlightClass}
															transition={transition}
															highlightColor={highlightColor}
															useInViewOptions={inViewOptions}
														>
															By studying the classic designs
														</TextHighlighter>{" "}
														of{" "}
														<TextHighlighter
															className={highlightClass}
															transition={transition}
															highlightColor={highlightColor}
															useInViewOptions={inViewOptions}
														>
															Garamond, Casion, Bodoni, Walbaum
														</TextHighlighter>{" "}
														and others, the designer can learn
														what the timeless criteria are which
														produce a refined and artistic
														typeface that makes for ease of
														reading.
													</span>

													<span>
														The lead type designs of{" "}
														<TextHighlighter
															className={highlightClass}
															transition={transition}
															highlightColor={highlightColor}
															useInViewOptions={inViewOptions}
														>
															Berthold, Helvetica, Folio, Univers
														</TextHighlighter>{" "}
														etc. produce pleasant and easily
														legible type areas. The typographic
														rules that apply to the roman
														typefaces are also valid for the sans
														serifs.
													</span>

													<span>
														<TextHighlighter
															className={highlightClass}
															transition={transition}
															highlightColor={highlightColor}
															useInViewOptions={inViewOptions}
														>
															The creators of these type designs
														</TextHighlighter>{" "}
														were extremely intelligent artists
														with high creative powers. This is
														shown by the fact that for more than
														four centuries innumerable type
														designers have sought to create new
														type alphabets but very few of these
														have gained acceptance.{" "}
														<TextHighlighter
															className={highlightClass}
															transition={transition}
															highlightColor={highlightColor}
															useInViewOptions={inViewOptions}
														>
															An alphabet of Garamond
														</TextHighlighter>{" "}
														for example, is an artistic
														achievement of the first order. Each
														letter has its own unmistakable face,
														whether lower or upper case, and
														displays the highest quality of form
														and originality. Each letter has its
														own personality and makes a marked
														impact.
													</span>

													<span>
														Every designer who is concerned with
														typography should take the trouble
														when creating graphic designs to{" "}
														<TextHighlighter
															className={highlightClass}
															transition={transition}
															highlightColor={highlightColor}
															useInViewOptions={inViewOptions}
														>
															sketch words and sentences by hand
														</TextHighlighter>{" "}
														Many designers take advantage of the
														Letraset process, which can
														undoubtedly produce a clean draft
														design that is almost ready for press.
														But a feeling for good letter forms
														and an attractive typeface can be
														acquired only by constant and careful
														practice in sketching letters.
													</span>

													<span>
														<TextHighlighter
															className={highlightClass}
															transition={transition}
															highlightColor={highlightColor}
															useInViewOptions={inViewOptions}
														>
															How the forms of letters can create
															simultaneously both tension and
															nobility
														</TextHighlighter>{" "}
														and how pleasantly legible lines of
														type can appear to the eye of the
														reader may be seen from the examples
														on the following pages.
													</span>

													<span>
														<TextHighlighter
															className={highlightClass}
															transition={transition}
															highlightColor={highlightColor}
															useInViewOptions={inViewOptions}
														>
															The Renaissance created midline
															typography
														</TextHighlighter>{" "}
														which held its position until the 20th
														century.
													</span>

													<span>
														The new typography differs from the
														old in that it is the first to try to{" "}
														<TextHighlighter
															className={highlightClass}
															transition={transition}
															highlightColor={highlightColor}
															useInViewOptions={inViewOptions}
														>
															develop the outward appearance from
															the function of the text
														</TextHighlighter>
													</span>

													<span>
														<TextHighlighter
															className={highlightClass}
															transition={transition}
															highlightColor={highlightColor}
															useInViewOptions={inViewOptions}
														>
															The new typography uses the
															background
														</TextHighlighter>{" "}
														as an element of design which is on a
														par with the other elements.
													</span>

													<span>
														Earlier typography (midline
														typography){" "}
														<TextHighlighter
															className={highlightClass}
															transition={transition}
															highlightColor={highlightColor}
															useInViewOptions={inViewOptions}
														>
															played an active role against a
															dead, passive background.
														</TextHighlighter>
													</span>
												</div>
											</div>
										</div>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title="Attractor"
								>
									<div className="w-full h-full flex flex-col relative justify-center items-center md:items-end bg-white">
										<div>
											<p className="z-20 text-2xl sm:text-3xl md:text-3xl text-foreground dark:text-muted md:pr-24">
												join the{" "}
												<span className="font-calendas  italic">
													community
												</span>
											</p>
										</div>
										<Attractor
											attractorPoint={{ x: "33%", y: "50%" }}
											attractorStrength={0.0005}
											cursorStrength={-0.004}
											cursorFieldRadius={
												screenSize.width < 150 ? 100 : 200
											}
											className="w-full h-full"
										>
											{[...Array(getImageCount())].map((_, i) => {
												const size = Math.max(
													getMinSize(),
													Math.random() * getMaxSize()
												);
												return (
													<MatterBody
														key={i + "matter-body"}
														matterBodyOptions={{
															friction: 0.5,
															restitution: 0.2,
														}}
														x={`${Math.random() * 100}%`}
														y={`${Math.random() * 30}%`}
													>
														<img
															src="/itjustworks.jpg"
															alt={`Avatar ${i}`}
															className="rounded-full object-cover hover:cursor-pointer"
															style={{
																width: `${size}px`,
																height: `${size}px`,
															}}
														/>
													</MatterBody>
												);
											})}
										</Attractor>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "carousel"
										),
									]}
									selectedFilters={selectedFilters}
									title="Image Ripple"
								>
									<Scene />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title="Gravity"
								>
									<div className="w-full h-full flex flex-col relative font-azeretMono bg-white">
										<div className="pt-20 text-6xl sm:text-7xl md:text-8xl text-foreground dark:text-muted w-full text-center font-calendas italic">
											fancy
										</div>
										<p className="pt-4 text-base sm:text-xl md:text-2xl text-foreground dark:text-muted w-full text-center">
											components made with:
										</p>
										<Gravity
											gravity={{ x: 0, y: 1 }}
											className="w-full h-full"
										>
											<MatterBody
												matterBodyOptions={{
													friction: 0.5,
													restitution: 0.2,
												}}
												x="30%"
												y="10%"
											>
												<div className="text-xl sm:text-2xl md:text-3xl bg-blue-500 text-white rounded-full hover:cursor-pointer px-8 py-4">
													react
												</div>
											</MatterBody>
											<MatterBody
												matterBodyOptions={{
													friction: 0.5,
													restitution: 0.2,
												}}
												x="30%"
												y="30%"
											>
												<div className="text-xl sm:text-2xl md:text-3xl bg-pink-500 text-white rounded-full hover:cursor-grab px-8 py-4 ">
													typescript
												</div>
											</MatterBody>
											<MatterBody
												matterBodyOptions={{
													friction: 0.5,
													restitution: 0.2,
												}}
												x="40%"
												y="20%"
												angle={10}
											>
												<div className="text-xl sm:text-2xl md:text-3xl bg-teal-400 text-white rounded-full hover:cursor-grab px-8 py-4 ">
													motion
												</div>
											</MatterBody>
											<MatterBody
												matterBodyOptions={{
													friction: 0.5,
													restitution: 0.2,
												}}
												x="75%"
												y="10%"
											>
												<div className="text-xl sm:text-2xl md:text-3xl bg-red-400 text-white rounded-full hover:cursor-grab px-8 py-4 ">
													tailwind
												</div>
											</MatterBody>
											<MatterBody
												matterBodyOptions={{
													friction: 0.5,
													restitution: 0.2,
												}}
												x="80%"
												y="20%"
											>
												<div className="text-xl sm:text-2xl md:text-3xl bg-orange-400 text-white rounded-full hover:cursor-grab px-8 py-4 ">
													drei
												</div>
											</MatterBody>
											<MatterBody
												matterBodyOptions={{
													friction: 0.5,
													restitution: 0.2,
												}}
												x="50%"
												y="10%"
											>
												<div className="text-xl sm:text-2xl md:text-3xl bg-yellow-400 text-white rounded-full hover:cursor-grab px-8 py-4 ">
													matter-js
												</div>
											</MatterBody>
										</Gravity>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "text"
										),
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title="Falling Text"
								>
									<div className="h-[400px]">
										<FallingText
											text={`React Bits is a library of animated and interactive React components designed to streamline UI development and simplify your workflow.`}
											highlightWords={[
												"React",
												"Bits",
												"animated",
												"components",
												"simplify",
											]}
											highlightClass="highlighted"
											trigger="hover"
											backgroundColor="transparent"
											wireframes={false}
											gravity={0.56}
											fontSize="2rem"
											mouseConstraintStiffness={0.9}
										/>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title="Elastic Line"
								>
									<div className="w-full px-6 sm:px-8 md:px-12">
										<ElasticLine
											releaseThreshold={50}
											strokeWidth={1}
											animateInTransition={{
												type: "spring",
												stiffness: 300,
												damping: 30,
												delay: 0.15,
											}}
										/>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												"requires images"
										),
									]}
									selectedFilters={selectedFilters}
									title="Grid Distortion"
								>
									<div
										style={{
											width: "100%",
											height: "600px",
											position: "relative",
										}}
									>
										<GridDistortion
											imageSrc="/itjustworks.jpg"
											grid={10}
											mouse={0.1}
											strength={0.15}
											relaxation={0.9}
											className="custom-class"
										/>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "carousel"
										),
									]}
									selectedFilters={selectedFilters}
									title="Hover Gallery"
								>
									<HoverCard
										cards={[
											{
												name: "something",
												top: "/itjustworks.jpg",
												left: "/itjustworks.jpg",
												right: "/itjustworks.jpg",
											},
											{
												name: "something else",
												top: "/itjustworks.jpg",
												left: "/itjustworks.jpg",
												right: "/itjustworks.jpg",
											},
											{
												name: "maybe more",
												top: "/itjustworks.jpg",
												left: "/itjustworks.jpg",
												right: "/itjustworks.jpg",
											},
										]}
									/>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												"requires images"
										),
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "carousel"
										),
									]}
									selectedFilters={selectedFilters}
									title="Horizontal Scroll Gallery"
								>
									<Example containerRef={containerRef} />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "carousel"
										),
									]}
									selectedFilters={selectedFilters}
									title="Progress Carousel"
								>
									<ProgressCarousel
										vertical={isMobile ? true : false}
										fastDuration={300}
										duration={4000}
										activeSlider="bbridge"
										className="sm:flex "
									>
										<SliderBtnGroup className="sm:relative absolute bottom-0 lg:w-[28rem] sm:w-96 w-full z-10 sm:flex sm:flex-col grid grid-cols-2 sm:h-[500px] h-fit sm:dark:bg-black sm:bg-white dark:bg-black/80 bg-white/80 backdrop-blur-md overflow-hidden ">
											{items.map((item, index) => (
												<SliderBtn
													key={item?.sliderName + "button"}
													value={item?.sliderName + "button"}
													className="text-left  p-3 sm:border-b border sm:pl-5 sm:pb-0 pb-6 sm:flex-1"
													progressBarClass="left-0 sm:top-0 bottom-0 dark:bg-white bg-black sm:w-3 sm:h-full h-4  before:h-full before:w-4 before:"
												>
													<span className="relative px-4 rounded w-fit dark:bg-blue-500 bg-black text-white mb-2">
														{item.title}
													</span>
													<span className="text-sm font-medium dark:text-slate-200 text-slate-900 line-clamp-2">
														{item.desc}
													</span>
												</SliderBtn>
											))}
										</SliderBtnGroup>
										<SliderContent className="w-full">
											{items.map((item, index) => (
												<SliderWrapper
													className="h-full"
													key={item.sliderName + "wrapper"}
													value={item?.sliderName + "wrapper"}
												>
													<Image
														className=" h-[500px] object-cover"
														src={item.img}
														width={1900}
														height={1080}
														alt={item.desc}
													/>
												</SliderWrapper>
											))}
										</SliderContent>
									</ProgressCarousel>
									<ProgressCarousel
										vertical={false}
										activeSlider="bridge"
									>
										<SliderContent>
											{items.map((item, index) => (
												<SliderWrapper
													value={item?.sliderName + "wrapper"}
												>
													<Image
														className="rounded-xl 2xl:h-[500px] h-[350px] object-cover"
														src={item.img}
														width={1900}
														height={1080}
														alt={item.desc}
													/>
												</SliderWrapper>
											))}
										</SliderContent>

										<SliderBtnGroup className="absolute bottom-0 h-fit dark:text-white text-black dark:bg-black/40 bg-white/40  backdrop-blur-md overflow-hidden grid grid-cols-2 md:grid-cols-4  rounded-md">
											{items.map((item, index) => (
												<SliderBtn
													value={item?.sliderName}
													className="text-left  p-3 border-r"
													progressBarClass="dark:bg-black bg-white h-full"
												>
													<span className="relative px-4 rounded-full w-fit dark:bg-white dark:text-black text-white bg-gray-900 mb-2">
														{item.title}
													</span>
													<span className="text-sm font-medium  line-clamp-2">
														{item.desc}
													</span>
												</SliderBtn>
											))}
										</SliderBtnGroup>
									</ProgressCarousel>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "text"
										),
									]}
									selectedFilters={selectedFilters}
									title="Text Proximity"
								>
									<div
										className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-12 md:p-16 lg:p-24 shadow-lg bg-white"
										ref={containerRef}
									>
										<div className="relative h-full w-full cursor-pointer overflow-hidden  justify-start items-start shadow-lg flex bg-[#0015ff] text-white">
											<div className="flex flex-col justify-center uppercase leading-none pt-4 pl-6">
												<TextCursorProximity
													label="DIGITAL"
													className=" text-3xl will-change-transform sm:text-6xl md:text-6xl lg:text-7xl font-overusedGrotesk"
													styles={{
														transform: {
															from: "scale(1)",
															to: "scale(1.4)",
														},
														color: {
															from: "#ffffff",
															to: "#ff87c1",
														},
													}}
													falloff="gaussian"
													radius={100}
													containerRef={containerRef}
												/>
												<TextCursorProximity
													label="WORKSHOP"
													className="leading-none text-3xl will-change-transform sm:text-6xl md:text-6xl lg:text-7xl font-overusedGrotesk"
													styles={{
														transform: {
															from: "scale(1)",
															to: "scale(1.4)",
														},
														color: {
															from: "#ffffff",
															to: "#ff87c1",
														},
													}}
													falloff="gaussian"
													radius={100}
													containerRef={containerRef}
												/>
											</div>

											<div className="absolute bottom-2 flex w-full justify-between px-6">
												{ASCII.map((hand, i) => (
													<span
														key={i + hand}
														className="text-2xl opacity-80"
													>
														{hand}
													</span>
												))}
											</div>

											<TextCursorProximity
												className="absolute top-6 right-6 hidden sm:block text-xs "
												label="15/01/2025"
												styles={{
													transform: {
														from: "scale(1)",
														to: "scale(1.4)",
													},
													color: {
														from: "#ffffff",
														to: "#ff87c1",
													},
												}}
												falloff="linear"
												radius={10}
												containerRef={containerRef}
											/>
										</div>
									</div>
									<div
										className="w-full h-full rounded-lg items-center justify-center font-overusedGrotesk p-8 sm:p-16 md:p-20 lg:p-24 bg-white cursor-pointer relative overflow-hidden"
										ref={containerRef}
									>
										{/* this is the important stuff */}
										<div className="w-full h-full items-center justify-center grid text-justify">
											<TextCursorProximity
												label={`Just as every problem is novel and different from others. so the grid must be conceived afresh every time so as to meet requirements. This means that the designer must approach each new problem with an open mind and must seek to solve it by analysing it objectively. The difficulties of the task are due to the enormous differences in the demands made on the designer by the various assignments he receives. A small newspaper advertisement does not present the difficulties of designing, say, a daily paper with 10 and more columns. a great variety of subjects, and an additional advertising section. Such a task calls not only for designing talent but also organizing ability since the many constantly changing items of information have to be arranged in a logical order and their priorities reflected in appropriate typography.`}
												className="leading-tight text-primaryBlue"
												styles={{
													opacity: { from: 0.1, to: 1 },
												}}
												falloff="linear"
												radius={80}
												containerRef={containerRef}
											/>
										</div>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "text"
										),
									]}
									selectedFilters={selectedFilters}
									title="Vertical Cut Reveal"
								>
									<button
										onClick={() => {
											cutRevealContainer.current.reset();
										}}
									>
										reset
									</button>
									<button
										onClick={() => {
											cutRevealContainer.current.startAnimation();
										}}
									>
										start
									</button>
									<div className="w-full h-full xs:text-2xl bg-white text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl flex flex-col items-start justify-center font-overusedGrotesk p-10 md:p-16 lg:p-24 text-primaryBlue tracking-wide uppercase">
										<VerticalCutReveal
											ref={cutRevealContainer}
											splitBy="characters"
											staggerDuration={0.025}
											staggerFrom="first"
											transition={{
												type: "spring",
												stiffness: 200,
												damping: 21,
											}}
											autoStart={false}
										>
											{`HI 👋, FRIEND!`}
										</VerticalCutReveal>
									</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "carousel"
										),
									]}
									selectedFilters={selectedFilters}
									title="Accordion Slices"
								>
									<AccordionSlices />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "carousel"
										),
									]}
									selectedFilters={selectedFilters}
									title="Card Deck"
								>
									<CardDeck images={images} />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "carousel"
										),
									]}
									selectedFilters={selectedFilters}
									title="Carousel Circle"
								>
									<CarouselCircle
										images={[
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
										]}
									/>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "carousel"
										),
									]}
									selectedFilters={selectedFilters}
									title="Carousel Stack"
								>
									<StackCard cards={exampleData} />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "text"
										),
									]}
									selectedFilters={selectedFilters}
									title="Circle Text"
								>
									<CircularText
										text="TECH*CHUNKS*COMPONENTS*"
										onHover="speedUp"
										spinDuration={20}
									/>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "carousel"
										),
									]}
									selectedFilters={selectedFilters}
									title="Cursor Carousel"
								>
									<One />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "preloaders"
										),
									]}
									selectedFilters={selectedFilters}
									title="Preloader"
								>
									<Page>
										<Preloader />
									</Page>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
													"interactive" ||
												filter.label.toLowerCase() ===
													filter_constants.TEXT
										),
									]}
									selectedFilters={selectedFilters}
									title="Text Cursor"
								>
									<TextCursor
										text="Hello!"
										delay={0.01}
										spacing={80}
										followMouseDirection={true}
										randomFloat={true}
										exitDuration={0.3}
										removalInterval={20}
										maxPoints={10}
									/>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="Glowing Effect"
								>
									<div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
										<GlowingEffect
											spread={40}
											glow={true}
											disabled={false}
											proximity={64}
											inactiveZone={0.01}
										/>
										<div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
											<div className="relative flex flex-1 flex-col justify-between gap-3">
												<div className="space-y-3">
													<h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-black dark:text-white">
														test tset
													</h3>
													<h2
														className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
                                                  md:text-base/[1.375rem]  text-black dark:text-neutral-400"
													>
														it just works
													</h2>
												</div>
											</div>
										</div>
									</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "button"
										),
									]}
									selectedFilters={selectedFilters}
									title="Share Button"
								>
									<ShareButton
										links={[
											{
												icon: Facebook,
												onClick: () => null,
											},
											{
												icon: Twitter,
												onClick: () => null,
											},
											{
												icon: Instagram,
												onClick: () => null,
											},
											{
												icon: Linkedin,
												onClick: () => null,
											},
										]}
									>
										Share this link!
									</ShareButton>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "button"
										),
									]}
									selectedFilters={selectedFilters}
									title="Btn08"
								>
									<Btn08 />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "navigation"
										),
									]}
									selectedFilters={selectedFilters}
									title="Infinite Menu"
								>
									<div
										style={{ height: "600px", position: "relative" }}
									>
										<InfiniteMenu items={infiniteMenuItems} />
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "navigation"
										),
									]}
									selectedFilters={selectedFilters}
									title={"opposite scroll links"}
								>
									<OppositeScroll
										containerRef={containerRef}
										works={example_opposite_links_data}
									/>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "navigation"
										),
									]}
									selectedFilters={selectedFilters}
									title={"flowing nav"}
								>
									<FlowingMenu items={demoItems} />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "navigation"
										),
									]}
									selectedFilters={selectedFilters}
									title={"curved navbar"}
								>
									<>
										<div
											onClick={() => {
												setIsActive(!isActive);
											}}
											className={`w-20 h-20 rounded-full flex flex-col items-center justify-center`}
										>
											open curve nav
										</div>

										<AnimatePresence mode="wait">
											{isActive && (
												<CurvedNavbar
													isActive={isActive}
													setIsActive={setIsActive}
												/>
											)}
										</AnimatePresence>
									</>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title="Image Reveal"
								>
									<ImageReveal />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "button"
										),
									]}
									selectedFilters={selectedFilters}
									title="Social Links"
								>
									<SocialLinks socials={socials} />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "button"
										),
									]}
									selectedFilters={selectedFilters}
									title="Flower Menu"
								>
									<div className="w-full flex place-content-center">
										<FlowerMenu
											backgroundColor="black"
											menuItems={[
												{
													icon: () => (
														<svg
															width="100%"
															height="100%"
															viewBox="0 0 380 380"
															fill="black"
															xmlns="http://www.w3.org/2000/svg"
															preserveAspectRatio="none"
														>
															<path
																fill-rule="evenodd"
																clip-rule="evenodd"
																d="M0 0H380V380H81L121 340H320C331.046 340 340 331.046 340 320V60C340 48.9541 331.046 40 320 40H60C48.9543 40 40 48.9541 40 60V320C40 331.046 48.9543 340 60 340H81V380H0V0Z"
																fill="black"
															/>
														</svg>
													),
													href: "https://drivebrandstudio.com",
												},
												{
													icon: () => (
														<svg
															width="100%"
															height="100%"
															viewBox="0 0 380 380"
															fill="black"
															xmlns="http://www.w3.org/2000/svg"
															preserveAspectRatio="none"
														>
															<path
																fill-rule="evenodd"
																clip-rule="evenodd"
																d="M0 0H380V380H81L121 340H320C331.046 340 340 331.046 340 320V60C340 48.9541 331.046 40 320 40H60C48.9543 40 40 48.9541 40 60V320C40 331.046 48.9543 340 60 340H81V380H0V0Z"
																fill="black"
															/>
														</svg>
													),
													href: "https://drivebrandstudio.com",
												},
												{
													icon: () => (
														<svg
															width="100%"
															height="100%"
															viewBox="0 0 380 380"
															fill="black"
															xmlns="http://www.w3.org/2000/svg"
															preserveAspectRatio="none"
														>
															<path
																fill-rule="evenodd"
																clip-rule="evenodd"
																d="M0 0H380V380H81L121 340H320C331.046 340 340 331.046 340 320V60C340 48.9541 331.046 40 320 40H60C48.9543 40 40 48.9541 40 60V320C40 331.046 48.9543 340 60 340H81V380H0V0Z"
																fill="black"
															/>
														</svg>
													),
													href: "https://drivebrandstudio.com",
												},
												{
													icon: () => (
														<svg
															width="100%"
															height="100%"
															viewBox="0 0 380 380"
															fill="black"
															xmlns="http://www.w3.org/2000/svg"
															preserveAspectRatio="none"
														>
															<path
																fill-rule="evenodd"
																clip-rule="evenodd"
																d="M0 0H380V380H81L121 340H320C331.046 340 340 331.046 340 320V60C340 48.9541 331.046 40 320 40H60C48.9543 40 40 48.9541 40 60V320C40 331.046 48.9543 340 60 340H81V380H0V0Z"
																fill="black"
															/>
														</svg>
													),
													href: "https://drivebrandstudio.com",
												},
												{
													icon: () => (
														<svg
															width="100%"
															height="100%"
															viewBox="0 0 380 380"
															fill="black"
															xmlns="http://www.w3.org/2000/svg"
															preserveAspectRatio="none"
														>
															<path
																fill-rule="evenodd"
																clip-rule="evenodd"
																d="M0 0H380V380H81L121 340H320C331.046 340 340 331.046 340 320V60C340 48.9541 331.046 40 320 40H60C48.9543 40 40 48.9541 40 60V320C40 331.046 48.9543 340 60 340H81V380H0V0Z"
																fill="black"
															/>
														</svg>
													),
													href: "https://drivebrandstudio.com",
												},
												{
													icon: () => (
														<svg
															width="100%"
															height="100%"
															viewBox="0 0 380 380"
															fill="black"
															xmlns="http://www.w3.org/2000/svg"
															preserveAspectRatio="none"
														>
															<path
																fill-rule="evenodd"
																clip-rule="evenodd"
																d="M0 0H380V380H81L121 340H320C331.046 340 340 331.046 340 320V60C340 48.9541 331.046 40 320 40H60C48.9543 40 40 48.9541 40 60V320C40 331.046 48.9543 340 60 340H81V380H0V0Z"
																fill="black"
															/>
														</svg>
													),
													href: "https://drivebrandstudio.com",
												},
											]}
										/>
									</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "sections"
										),
									]}
									selectedFilters={selectedFilters}
									title="Parallax Floating"
								>
									<section className="w-full h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-center relative">
										<Floating sensitivity={-0.5} className="h-full">
											<FloatingElement
												depth={0.5}
												className="top-[15%] left-[2%] md:top-[25%] md:left-[5%]"
											>
												<motion.img
													src={exampleImages[0].url}
													alt={exampleImages[0].title}
													className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-[3deg] shadow-2xl rounded-xl"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													transition={{ delay: 0.5 }}
												/>
											</FloatingElement>

											<FloatingElement
												depth={1}
												className="top-[0%] left-[8%] md:top-[6%] md:left-[11%]"
											>
												<motion.img
													src={exampleImages[1].url}
													alt={exampleImages[1].title}
													className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													transition={{ delay: 0.7 }}
												/>
											</FloatingElement>

											<FloatingElement
												depth={4}
												className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
											>
												<motion.img
													src={exampleImages[2].url}
													alt={exampleImages[2].title}
													className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													transition={{ delay: 0.9 }}
												/>
											</FloatingElement>

											<FloatingElement
												depth={2}
												className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
											>
												<motion.img
													src={exampleImages[3].url}
													alt={exampleImages[3].title}
													className="w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[6deg] rounded-xl"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													transition={{ delay: 1.1 }}
												/>
											</FloatingElement>

											<FloatingElement
												depth={1}
												className="top-[78%] left-[83%] md:top-[68%] md:left-[83%]"
											>
												<motion.img
													src={exampleImages[4].url}
													alt={exampleImages[4].title}
													className="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[19deg] rounded-xl"
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													transition={{ delay: 1.3 }}
												/>
											</FloatingElement>
										</Floating>

										<div className="flex flex-col justify-center items-center w-[250px] sm:w-[300px] md:w-[500px] lg:w-[700px] z-50 pointer-events-auto">
											<motion.h1
												className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight font-calendas tracking-tight space-y-1 md:space-y-4"
												animate={{ opacity: 1, y: 0 }}
												initial={{ opacity: 0, y: 20 }}
												transition={{
													duration: 0.2,
													ease: "easeOut",
													delay: 0.3,
												}}
											>
												<span>Make your </span>
												<LayoutGroup>
													<motion.span
														layout
														className="flex whitespace-pre"
													>
														<motion.span
															layout
															className="flex whitespace-pre"
															transition={{
																type: "spring",
																damping: 30,
																stiffness: 400,
															}}
														>
															website{" "}
														</motion.span>
														<TextRotate
															texts={[
																"fancy",
																"fun",
																"lovely ♥",
																"weird",
																"🪩 funky",
																"💃🕺",
																"sexy",
																"🕶️ cool",
																"go 🚀",
																"🔥🔥🔥",
																"over-animated?",
																"pop ✨",
																"rock 🤘",
															]}
															mainClassName="overflow-hidden pr-3 text-[#0015ff] py-0 pb-2 md:pb-4 rounded-xl"
															staggerDuration={0.03}
															staggerFrom="last"
															rotationInterval={3000}
															transition={{
																type: "spring",
																damping: 30,
																stiffness: 400,
															}}
														/>
													</motion.span>
												</LayoutGroup>
											</motion.h1>
											<motion.p
												className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center font-overusedGrotesk pt-4 sm:pt-8 md:pt-10 lg:pt-12"
												animate={{ opacity: 1, y: 0 }}
												initial={{ opacity: 0, y: 20 }}
												transition={{
													duration: 0.2,
													ease: "easeOut",
													delay: 0.5,
												}}
											>
												with a growing library of ready-to-use react
												components & microinteractions. free & open
												source.
											</motion.p>

											<div className="flex flex-row justify-center space-x-4 items-center mt-10 sm:mt-16 md:mt-20 lg:mt-20 text-xs">
												<motion.button
													className="sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-background bg-foreground px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl font-calendas"
													animate={{ opacity: 1, y: 0 }}
													initial={{ opacity: 0, y: 20 }}
													transition={{
														duration: 0.2,
														ease: "easeOut",
														delay: 0.7,
														scale: { duration: 0.2 },
													}}
													whileHover={{
														scale: 1.05,
														transition: {
															type: "spring",
															damping: 30,
															stiffness: 400,
														},
													}}
												>
													<Link href="/docs/introduction">
														Check docs{" "}
														<span className="font-serif ml-1">
															→
														</span>
													</Link>
												</motion.button>
												<motion.button
													className="sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-white bg-[#0015ff] px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl font-calendas"
													animate={{ opacity: 1, y: 0 }}
													initial={{ opacity: 0, y: 20 }}
													transition={{
														duration: 0.2,
														ease: "easeOut",
														delay: 0.7,
														scale: { duration: 0.2 },
													}}
													whileHover={{
														scale: 1.05,
														transition: {
															type: "spring",
															damping: 30,
															stiffness: 400,
														},
													}}
												>
													<Link href="https://github.com/danielpetho/fancy">
														★ on GitHub
													</Link>
												</motion.button>
											</div>
										</div>
									</section>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TEXT
										),
									]}
									selectedFilters={selectedFilters}
									title="Text Gradient"
								>
									<TextGradientTransition />
								</Component>
								{/* Unlock this ability with App router, stuck on Page router currently */}
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TRANSITIONS
										),
									]}
									selectedFilters={selectedFilters}
									title="Transition Replication"
									subfolder="page-transitions"
								>
									<ExapmleTransitions />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									title="Infinite Carousel"
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.CAROUSEL
										),
									]}
									selectedFilters={selectedFilters}
								>
									<InfiniteCarousel />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) => (filter) =>
												filter.label.toLowerCase() ===
												filter_constants.INTERACTIVE
										),
									]}
									selectedFilters={selectedFilters}
									title="CSS Box"
								>
									<>
										<CSSBox
											ref={cubeRef}
											width={220}
											height={220}
											depth={220}
											perspective={800}
											draggable
											faces={{
												front: (
													<Image
														width={100}
														height={100}
														src="/itjustworks.jpg"
														alt="Front"
													/>
												),
												back: (
													<Image
														src="/itjustworks.jpg"
														width={100}
														height={100}
														alt="Back"
													/>
												),
												left: (
													<Image
														width={100}
														height={100}
														src="/itjustworks.jpg"
														alt="Left"
													/>
												),
												right: (
													<Image
														src="/itjustworks.jpg"
														width={100}
														height={100}
														alt="Right"
													/>
												),
												top: (
													<Image
														width={100}
														height={100}
														src="/itjustworks.jpg"
														alt="Top"
													/>
												),
												bottom: (
													<Image
														width={100}
														height={100}
														src="/itjustworks.jpg"
														alt="Bottom"
													/>
												),
											}}
										/>

										<Button
											onClick={() => cubeRef.current?.showTop()}
										>
											Show Top
										</Button>
									</>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.CAROUSEL
										),
									]}
									selectedFilters={selectedFilters}
									title="List Rotator"
								>
									<div className="h-screen">
										<ListRotator containerRef={containerRef} />
									</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.BUTTON
										),
									]}
									selectedFilters={selectedFilters}
									title="Power Off Slide"
								>
									<PowerOffSlide />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.CAROUSEL
										),
									]}
									selectedFilters={selectedFilters}
									title={"Smooth Slider"}
								>
									<div className="w-full p-4">
										<AnimatedSlider title="Custom Cards">
											{animeData
												.reverse()
												.slice(0, 5)
												.map((anime) => (
													<SliderCard
														key={anime.id}
														defaultWidth="220px"
														expandedWidth="400px"
														height="300px"
													>
														<SliderCardContent
															defaultAspectRatio="aspect-square"
															expandedAspectRatio="aspect-[21/9]"
														>
															<img
																src={anime.image}
																alt={anime.title}
																className="h-full w-full object-cover"
																style={{
																	transition: "all 0.4s ease",
																}}
															/>

															<OnHover className="bg-gradient-to-t from-cyan-700/90 via-cyan-100/10 to-transparent">
																<div className="space-y-1">
																	<h3 className="text-xl font-bold text-white">
																		{anime.title}
																	</h3>
																	<p className="text-sm text-gray-200">
																		{anime.year} ·{" "}
																		{anime.seasons} ·{" "}
																		{anime.platform}
																	</p>

																	<button className="mt-3 flex items-center gap-1 rounded bg-cyan-500/30 px-3 py-1 text-sm text-white backdrop-blur-sm transition-colors hover:bg-cyan-500/50">
																		Watch now
																	</button>
																</div>
															</OnHover>

															<DefaultView className="bg-gradient-to-t from-cyan-900/90 to-transparent p-4">
																{anime.title}
															</DefaultView>
														</SliderCardContent>
													</SliderCard>
												))}
										</AnimatedSlider>
									</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TEXT
										),
									]}
									selectedFilters={selectedFilters}
									title="Text Animate"
								>
									<TextAnimate
										once={true}
										animation="fadeIn"
										by="character"
										duration={1}
									>
										Components
									</TextAnimate>
								</Component>
								{/* TODO: Why does this grow in height to 3.68xe^10px???? */}
								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) =>
                                                filter.label.toLowerCase() === "interactive"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="Rounded Scrollbar"
                                >
                                    <RoundedScroll />
                                </Component> */}

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) => (filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TRANSITIONS
										),
									]}
									selectedFilters={selectedFilters}
									title="Dynamic Theme"
								>
									<DynamicTheme containerRef={containerRef} />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title="Side Video"
								>
									<div className="w-full max-w-4xl">
										<div className="min-h-[500px]  flex flex-col justify-center border border-dashed rounded-lg space-y-4">
											<SidePanel
												panelOpen={isOpen}
												handlePanelOpen={handleIsOpen}
												renderButton={renderVideoButton}
											>
												<div className="h-16 w-full">
													<div>Content Here</div>
												</div>
											</SidePanel>
										</div>
									</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "form"
										),
									]}
									selectedFilters={selectedFilters}
									title="Fancy Input"
								>
									<section>
										<div className="p-4 w-full">
											<Subscribe />
										</div>
									</section>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title="Inner Glow"
								>
									<div className="grid relative mx-auto w-[300px] h-[300px] overflow-hidden bg-white rounded-md p-6 aspect-square place-items-center text-3xl font-medium">
										<InnerGlow />
										<p>Inner Glow</p>
									</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "text"
										),
									]}
									selectedFilters={selectedFilters}
									title="Text Hover"
								>
									<TextHoverEffect text={"Components"} />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "navigation"
										),
									]}
									selectedFilters={selectedFilters}
									title="Expanding tabs"
								>
									<ExpandableTabs />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "carousel"
										),
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												"requires images"
										),
									]}
									selectedFilters={selectedFilters}
									title="Stripe Accordion"
								>
									<StripeAccordion />
									<UnsplashGrid />
									<ExampleSlider />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "sections"
										),
									]}
									selectedFilters={selectedFilters}
									title="Tiles Background"
								>
									<TilesBackground />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title="Video Viewer"
								>
									<VideoContainer />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "carousel"
										),
									]}
									selectedFilters={selectedFilters}
									title="Film Reel"
								>
									<FilmReel
										videos={socials.map((social) => social.image)}
									/>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title="Follow Cursor"
								>
									<div
										className="w-full h-[33vh] relative"
										id="mouseFollower"
									>
										<MouseFollower
											container={mouseFollowerContainer}
										/>
									</div>
								</Component>
								{/* TODO: Hide until I create an example and a registry example */}
								{/* <Component allFilters={filterOptions}

                                    collapsed={collapsed}
                                    setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) =>
                                                filter.label.toLowerCase() === "interactive"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="Fractal Grid"
                                >
                                    <ConfigurableFractalDotGridDemo />
                                </Component> */}

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "footer"
										),
									]}
									selectedFilters={selectedFilters}
									title="Simple Footer"
								>
									<FooterThird />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "footer"
										),
									]}
									selectedFilters={selectedFilters}
									title="Business Footer"
								>
									<FooterSecond />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "carousel"
										),
									]}
									selectedFilters={selectedFilters}
									title="Parallax Carousel"
								>
									<div
										style={{ height: "600px", position: "relative" }}
									>
										<ParallaxCarousel
											baseWidth={300}
											autoplay={true}
											autoplayDelay={3000}
											pauseOnHover={true}
											loop={true}
											round={false}
										/>
									</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "numbers"
										),
									]}
									selectedFilters={selectedFilters}
									title="Sliding Numbers"
								>
									<div className="flex flex-col items-start gap-0">
										<div className="inline-flex items-center gap-1 font-mono leading-none">
											$<SlidingNumber value={value} />
										</div>
										<input
											type="range"
											value={value}
											min={500}
											max={100000}
											step={50}
											onChange={(e) => setValue(+e.target.value)}
											className="mt-2 accent-indigo-950"
										/>
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												"testimonials"
										),
									]}
									selectedFilters={selectedFilters}
									title={"Gradient testimonials"}
								>
									<Testimonials data={example_testimonials_data} />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												"testimonials"
										),
									]}
									selectedFilters={selectedFilters}
									title={"book testimonials"}
								>
									<BookTestimonial3D testimonials={testimonials} />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "pricing"
										),
									]}
									selectedFilters={selectedFilters}
									title="popular price card"
								>
									<div className="col-span-1 lg:col-span-2  flex items-center justify-center p-4">
										<PopularPriceCard />
									</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									className="overflow-auto mb-5"
									title={"Pingpong"}
									blockConfig={{
										tabs: [{ name: "pingpong" }, { name: "svg" }],
									}}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
								>
									<PingPong />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title="color picker"
								>
									<div className="w-full max-w-4xl mx-auto ">
										<CardContent className="p-6 space-y-6">
											<div className="grid md:grid-cols-1 gap-6">
												<div className="space-y-4">
													<div className="flex flex-col md:flex-row gap-4 md:justify-between">
														<Button
															variant="outline"
															onClick={generateHarmoniousColors}
															className="text-sm"
														>
															Generate Harmonious Colors
														</Button>
														<Button
															variant="outline"
															onClick={resetColors}
															className="text-sm"
														>
															Reset Colors
														</Button>
													</div>
													<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
														{Object.entries(colorScheme).map(
															([key, value]) => (
																<div
																	key={key}
																	className="relative"
																>
																	<div className="flex items-center justify-between">
																		<label className="text-sm font-medium text-muted-foreground mb-2 block">
																			{key}
																		</label>
																		<Button
																			variant="ghost"
																			size="icon"
																			className="ml-2 text-black"
																			onClick={() =>
																				toggleLock(key)
																			}
																		>
																			{lockedColor === key
																				? "unlocked"
																				: "locked"}
																		</Button>
																	</div>
																	<div className="flex items-center">
																		<ColorPicker
																			color={`hsl(${value})`}
																			onChange={(
																				newColor
																			) => {
																				const [h, s, l] =
																					newColor
																						.match(
																							/\d+(\.\d+)?/g
																						)
																						?.map(
																							Number
																						) || [
																						0, 0, 0,
																					];
																				setColorScheme({
																					...colorScheme,
																					[key]: `${h.toFixed(
																						1
																					)} ${s.toFixed(
																						1
																					)}% ${l.toFixed(1)}%`,
																				});
																			}}
																		/>
																	</div>
																</div>
															)
														)}
													</div>
												</div>
												<motion.div
													className="w-full h-full min-h-[24rem] rounded-lg p-6 shadow-lg transition-colors duration-300 ease-in-out overflow-hidden"
													style={{
														backgroundColor: `hsl(${colorScheme.background})`,
														color: `hsl(${colorScheme.foreground})`,
														borderColor: `hsl(${colorScheme.border})`,
														borderWidth: 2,
														borderStyle: "solid",
													}}
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.5 }}
												>
													<h3 className="text-xl font-semibold mb-4">
														Color Preview
													</h3>
													<p className="text-sm mb-4">
														Experience your color palette in
														action. This preview showcases your
														selected colors.
													</p>
													<div className="space-y-2">
														{Object.entries(colorScheme).map(
															([key, value]) => (
																<div
																	key={key}
																	className="flex flex-col md:flex-row gap-4 md:items-center justify-between"
																>
																	<span>{key}</span>
																	<TooltipProvider>
																		<Tooltip>
																			<TooltipTrigger
																				asChild
																			>
																				<Button
																					variant="outline"
																					size="sm"
																					className="font-mono"
																					onClick={() => {
																						navigator.clipboard.writeText(
																							`--${key}: ${value};`
																						);
																						setCopied(
																							true
																						);
																						setTimeout(
																							() =>
																								setCopied(
																									false
																								),
																							2000
																						);
																					}}
																					style={{
																						backgroundColor: `hsl(${value})`,
																						color: `hsl(${getContrastColor(
																							value
																						)})`,
																						borderColor: `hsl(${colorScheme.border})`,
																					}}
																				>
																					{value}
																					{copied
																						? "check"
																						: "copy"}
																				</Button>
																			</TooltipTrigger>
																			<TooltipContent>
																				<p>Click to copy</p>
																			</TooltipContent>
																		</Tooltip>
																	</TooltipProvider>
																</div>
															)
														)}
													</div>
												</motion.div>
												<Button
													onClick={copyColorScheme}
													className="w-full"
												>
													Copy Full Color Scheme
												</Button>
											</div>
										</CardContent>
									</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "carousel"
										),
									]}
									selectedFilters={selectedFilters}
									title={"lane card"}
								>
									<span className="flex">
										<Lane>
											{example_cardstack_data.map((card) => {
												return <ListCard card={card} />;
											})}
										</Lane>
										<Lane>
											{example_cardstack_data.map((card) => {
												return <ListCard card={card} />;
											})}
										</Lane>
										<Lane>
											{example_cardstack_data.map((card) => {
												return <ListCard card={card} />;
											})}
										</Lane>
									</span>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title={"folder"}
								>
									<div
										style={{ height: "600px", position: "relative" }}
									>
										<Folder
											size={2}
											color="#00d8ff"
											className="custom-folder"
										/>
									</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												"requires images"
										),
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "transitions"
										),
									]}
									selectedFilters={selectedFilters}
									title="image zoom"
								>
									<div>
										<ImageZoom
											outsideImage={"/oie_transparent.png"}
											insideImage={"/itjustworks.jpg"}
										/>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "text"
										),
									]}
									selectedFilters={selectedFilters}
									title="cursor mask"
								>
									<MaskCursor />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "sections"
										),
									]}
									selectedFilters={selectedFilters}
									title="threads"
								>
									<section>
										<div
											style={{
												width: "100%",
												height: "600px",
												position: "relative",
											}}
										>
											<Threads
												amplitude={1}
												distance={0}
												enableMouseInteraction={true}
											/>
										</div>
									</section>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "form"
										),
									]}
									selectedFilters={selectedFilters}
									title={"action search bar"}
								>
									<ActionSearchBar />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "carousel"
										),
									]}
									selectedFilters={selectedFilters}
									title={"animated list"}
								>
									<AnimatedList
										items={[
											"Item 1",
											"Item 2",
											"Item 3",
											"Item 4",
											"Item 5",
											"Item 6",
											"Item 7",
											"Item 8",
											"Item 9",
											"Item 10",
										]}
										onItemSelect={(item, index) =>
											console.log(item, index)
										}
										showGradients={true}
										enableArrowNavigation={true}
										displayScrollbar={true}
									/>{" "}
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "text"
										),
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title={"fuzzy text"}
								>
									<FuzzyText
										baseIntensity={0.2}
										hoverIntensity={0.2}
										enableHover={true}
									>
										404
									</FuzzyText>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "navigation"
										),
									]}
									selectedFilters={selectedFilters}
									title="gooey tabs"
								>
									<GooeyDemo />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title={"info card"}
								>
									<InfoCard>
										<InfoCardContent>
											<InfoCardTitle>
												{stepsExamples[currentStep].title}
											</InfoCardTitle>
											<InfoCardDescription>
												{stepsExamples[currentStep].description}
											</InfoCardDescription>
											{stepsExamples[currentStep].image && (
												<InfoCardMedia
													media={stepsExamples[currentStep].image}
													expandHeight={
														stepsExamples[currentStep]
															.expandHeight || undefined
													}
												/>
											)}
											<InfoCardFooter>
												{currentStep ===
												stepsExamples.length - 1 ? (
													<>
														<div />
														<InfoCardDismiss className="flex flex-row items-center gap-1 hover:underline hover:cursor-pointer">
															Got it!
														</InfoCardDismiss>
													</>
												) : (
													<>
														<InfoCardDismiss>
															Dismiss
														</InfoCardDismiss>
														<InfoCardAction
															onClick={handleNext}
															className="flex flex-row items-center gap-1 hover:underline hover:cursor-pointer"
														>
															Next
														</InfoCardAction>
													</>
												)}
											</InfoCardFooter>
										</InfoCardContent>
									</InfoCard>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
									]}
									selectedFilters={selectedFilters}
									title="matrix background"
								>
									<div className="h-[50vh] w-full relative">
										<MatrixBackground />
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "pricing"
										),
									]}
									selectedFilters={selectedFilters}
									title="pricing table"
								>
									<ManyOffersVariant1 />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "interactive"
										),
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												"requires images"
										),
									]}
									selectedFilters={selectedFilters}
									title="screen saver"
								>
									<div
										className="w-dvw h-dvh bg-[#efefef] overflow-hidden flex items-center justify-center relative text-foreground dark:text-muted"
										ref={screensaverRef}
									>
										<h1 className="z-30 text-3xl md:text-6xl font-overused-grotesk">
											page not found
										</h1>
										{[Image1, Image1, Image1, Image1].map(
											(image, index) => (
												<Screensaver
													key={index + "screensaver"}
													speed={1}
													startPosition={{
														x: index * 3,
														y: index * 3,
													}}
													startAngle={40}
													containerRef={containerRef}
												>
													<div className="w-20 h-20 md:w-48 md:h-48 overflow-hidden">
														<Image
															{...image}
															width={100}
															height={100}
															src={image.src}
															alt={`Example ${index + 1}`}
															className="w-full h-full object-cover"
														/>
													</div>
												</Screensaver>
											)
										)}
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "carousel"
										),
									]}
									selectedFilters={selectedFilters}
									title="select modal"
								>
									<div>
										<SelectModel />
									</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "sections"
										),
									]}
									selectedFilters={selectedFilters}
									title="Scroll Replication"
									subfolder="scrolltrigger-replication"
								>
									<div>
										<div className="grid min-h-[100vh] place-items-center bg-white py-20 text-black">
											<div className="container flex min-h-[50vh] flex-col justify-between text-center">
												<h1 className="heading-60-150">
													<Link
														href={
															"https://www.mcsaatchiabel.co.za/"
														}
														target="_blank"
														className="block text-blue"
													>
														m&csaatchi abel
													</Link>
													Replication
												</h1>

												<div className="heading-16-40 flex items-center justify-center gap-x-5 text-center text-blue">
													<Link
														href={
															"https://github.com/PhanDangKhoa96/mcsaatchiabel.co.za-replication"
														}
														target="_blank"
														className="hover:underline"
													>
														Source code
													</Link>
													<span>|</span>
													<Link
														href={
															"https://www.pldkhoa.dev/playground"
														}
														target="_blank"
														className="hover:underline"
													>
														All demos
													</Link>
												</div>
											</div>
										</div>
										<div className="h-px bg-black"></div>
										<StickyScroll1 containerRef={containerRef} />
										<StickyScroll2 containerRef={containerRef} />

										<div
											className="heading-60-150 container grid
                                                 h-screen place-items-center text-balance text-center text-blue"
										>
											Have a good day!
										</div>
									</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "sections"
										),
									]}
									selectedFilters={selectedFilters}
									title="Scroll Replication 2"
									subfolder="cielia-replication"
								>
									<ExampleReplication />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="canvas reveal"
								>
									<>
										<div className="py-20 flex flex-col lg:flex-row items-center justify-center bg-white dark:bg-black w-full gap-4 mx-auto px-8">
											<Card
												title="Sheetal is Nisha"
												icon={() => (
													<svg
														width="66"
														height="65"
														viewBox="0 0 66 65"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white "
													>
														<path
															d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
															stroke="currentColor"
															strokeWidth="15"
															strokeMiterlimit="3.86874"
															strokeLinecap="round"
															style={{ mixBlendMode: "darken" }}
														/>
													</svg>
												)}
											>
												<CanvasRevealEffect
													animationSpeed={5.1}
													containerClassName="bg-emerald-900"
												/>
											</Card>
											<Card
												title="Nisha is Munni"
												icon={() => (
													<svg
														width="66"
														height="65"
														viewBox="0 0 66 65"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white "
													>
														<path
															d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
															stroke="currentColor"
															strokeWidth="15"
															strokeMiterlimit="3.86874"
															strokeLinecap="round"
															style={{ mixBlendMode: "darken" }}
														/>
													</svg>
												)}
											>
												<CanvasRevealEffect
													animationSpeed={3}
													containerClassName="bg-black"
													colors={[
														[236, 72, 153],
														[232, 121, 249],
													]}
													dotSize={2}
												/>
												<div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
											</Card>
											<Card
												title="Munni is Aditi"
												icon={() => (
													<svg
														width="66"
														height="65"
														viewBox="0 0 66 65"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white "
													>
														<path
															d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
															stroke="currentColor"
															strokeWidth="15"
															strokeMiterlimit="3.86874"
															strokeLinecap="round"
															style={{ mixBlendMode: "darken" }}
														/>
													</svg>
												)}
											>
												<CanvasRevealEffect
													animationSpeed={3}
													containerClassName="bg-sky-600"
													colors={[[125, 211, 252]]}
												/>
											</Card>
										</div>
									</>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="card hover"
								>
									<div className="max-w-5xl mx-auto px-8">
										<HoverEffect items={projects} />
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="card rotation"
								>
									<CardRotation />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="card stack"
								>
									<CardStack />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="cards"
								>
									<div>coming soon</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="container scroll"
								>
									<div className="flex flex-col overflow-hidden">
										<ContainerScroll
											titleComponent={
												<>
													<h1 className="text-4xl font-semibold text-black dark:text-white">
														Unleash the power of <br />
														<span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
															Scroll Animations
														</span>
													</h1>
												</>
											}
										>
											<img
												src={`/itjustworks.jpg`}
												alt="hero"
												height={720}
												width={1400}
												className="mx-auto rounded-2xl object-cover h-full object-left-top"
												draggable={false}
											/>
										</ContainerScroll>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="content with image"
								>
									<ContentWithImage />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="dynamic island"
								>
									<DynamicIsland />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="floating dock"
								>
									<FloatingDock />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="floating nav"
								>
									<div className="h-screen overflow-auto">
										<div className="h-[200vh] " />
										<FloatingNav />
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="fluid morph"
								>
									<FluidMorph />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="following pointer"
								>
									<div className="mx-auto w-80">
										<FollowerPointerCard
											title={
												<TitleComponent
													title={blogContent.author}
													avatar={blogContent.authorAvatar}
												/>
											}
										>
											<div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-100 bg-white transition duration-200 hover:shadow-xl">
												<div className="relative aspect-[16/10] w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-gray-100">
													<img
														src={blogContent.image}
														alt="thumbnail"
														className="h-full transform object-cover transition duration-200 group-hover:scale-95 group-hover:rounded-2xl"
													/>
												</div>
												<div className="p-4">
													<h2 className="my-4 text-lg font-bold text-zinc-700">
														{blogContent.title}
													</h2>
													<h2 className="my-4 text-sm font-normal text-zinc-500">
														{blogContent.description}
													</h2>
													<div className="mt-10 flex flex-row items-center justify-between">
														<span className="text-sm text-gray-500">
															{blogContent.date}
														</span>
														<div className="relative z-10 block rounded-xl bg-black px-6 py-2 text-xs font-bold text-white">
															Read More
														</div>
													</div>
												</div>
											</div>
										</FollowerPointerCard>
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="fuzzy overlay"
								>
									<div className="relative overflow-hidden">
										<div className="relative grid h-screen place-content-center space-y-6 bg-neutral-950 p-8">
											<p className="text-center text-6xl font-black text-neutral-50">
												Fuzzy Overlay Example
											</p>
											<p className="text-center text-neutral-400">
												This is a basic example of using a lo-fi
												fuzzy overlay 📺
											</p>
											<div className="flex items-center justify-center gap-3">
												<button className="text-neutral-20 w-fit px-4 py-2 font-semibold text-neutral-200 transition-colors hover:bg-neutral-800">
													Pricing
												</button>
												<button className="w-fit bg-neutral-200 px-4 py-2 font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">
													Try it free
												</button>
											</div>
										</div>{" "}
										<FuzzyOverlay />
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="glass nav"
								>
									<div className="h-screen relative">
										<GlassNavigation demo />
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="glowing background"
								>
									<div className="flex py-20 items-center justify-center antialiased">
										<GlowingStarsBackgroundCard>
											<GlowingStarsTitle>
												Next.js 14
											</GlowingStarsTitle>
											<div className="flex justify-between items-end">
												<GlowingStarsDescription>
													The power of full-stack to the frontend.
													Read the release notes.
												</GlowingStarsDescription>
											</div>
										</GlowingStarsBackgroundCard>
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="gradient background"
								>
									<BackgroundGradientAnimation>
										<div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
											<p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
												Gradients X Animations
											</p>
										</div>
									</BackgroundGradientAnimation>{" "}
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="horizontal CTA"
								>
									<CardCTA />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="hover"
								>
									<div className="h-[40rem] relative  flex items-center justify-center">
										<DirectionAwareHover
											imageUrl={"/itjustworks.jpg"}
										>
											<p className="font-bold text-xl">
												In the mountains
											</p>
											<p className="font-normal text-sm">
												$1299 / night
											</p>
										</DirectionAwareHover>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="hover border"
								>
									<div className="m-40 flex justify-center text-center">
										<HoverBorderGradient
											containerClassName="rounded-full"
											as="button"
											className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
										>
											<span>Aceternity UI</span>
										</HoverBorderGradient>
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="hover card"
								>
									<div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
										<Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
										<Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
										<Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
										<Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

										<EvervaultCard text="hover" />

										<h2 className="dark:text-white text-black mt-4 text-sm font-light">
											Hover over this card to reveal an awesome
											effect. Running out of copy here.
										</h2>
										<p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
											Watch me hover
										</p>
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="hover cards"
								>
									<HoverCards />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="image wheel"
								>
									<ImageWheel />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="infinite moving cards"
								>
									<div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
										<InfiniteMovingCards
											items={testimonialsExamples}
											direction="right"
											speed="slow"
										/>
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="lamp"
								>
									<LampContainer>
										<motion.h1
											initial={{ opacity: 0.5, y: 100 }}
											whileInView={{ opacity: 1, y: 0 }}
											transition={{
												delay: 0.3,
												duration: 0.8,
												ease: "easeInOut",
											}}
											className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
										>
											Build lamps <br /> the right way
										</motion.h1>
									</LampContainer>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="layout grid"
								>
									<div className="h-screen py-20 w-full">
										<LayoutGrid cards={cards} />
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="lens"
								>
									<Lens>
										<Image
											src={"/itjustworks.jpg"}
											alt={"it just woks"}
											width={images?.[0]?.width || 0}
											height={images?.[0]?.height || 0}
											className="object-cover max-h-[80vh] w-auto mx-auto border-8 border-background"
											style={
												images?.[0].focalPoint
													? {
															objectPosition: `${
																images[0]?.focalPoint?.[0] * 100
															}% ${images[0]?.focalPoint?.[1] * 100}%`,
														}
													: {}
											}
										/>
									</Lens>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="line background"
								>
									<GoogleGeminiEffect
										pathLengths={[
											pathLengthFirst,
											pathLengthSecond,
											pathLengthThird,
											pathLengthFourth,
											pathLengthFifth,
										]}
									/>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="mask effect"
								>
									<MaskContainer revealText="it just works">
										<div>Some content</div>
									</MaskContainer>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="number ticker"
								>
									<NumberTicker
										value={100}
										className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
									/>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="parallax scroll"
								>
									<ParallaxScroll
										images={[
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
										]}
									/>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="pin"
								>
									<div className="h-[40rem] w-full flex items-center justify-center ">
										<PinContainer
											title="/components"
											href="https://components.drivedev.net"
										>
											<div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
												<h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
													Aceternity UI
												</h3>
												<div className="text-base !m-0 !p-0 font-normal">
													<span className="text-slate-500 ">
														Customizable Tailwind CSS and Framer
														Motion Components.
													</span>
												</div>
												<div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
											</div>
										</PinContainer>
									</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="pricing card"
								>
									<PricingCard />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="scaling button"
								>
									<ScalingButton>test test 123</ScalingButton>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="search bar"
								>
									<PlaceholdersAndVanishInput />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="services"
								>
									<FeaturesSectionDemo />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="shuffle hero"
								>
									<ShuffleHero />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="spring FAQ"
								>
									<FAQSpring />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="spring modal"
								>
									<div className="px-4 py-64 bg-slate-900 grid place-content-center">
										<button
											onClick={() => setIsOpen(true)}
											className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
										>
											Open Modal
										</button>
										<SpringModal
											isOpen={isOpenSpringModal}
											setIsOpen={setIsOpenSpringModal}
										/>
									</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="sticky scroll reveal"
								>
									<div className="w-full py-4">
										<StickyScroll
											content={content}
											containerRef={containerRef}
										/>
									</div>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="swap column features"
								>
									<SwapColumnFeatures />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="table"
								>
									<TableRoot>
										<Table>
											<TableCaption>Recent invoices.</TableCaption>
											<TableHead>
												<TableRow>
													<TableHeaderCell>Name</TableHeaderCell>
													<TableHeaderCell>
														Sales ($)
													</TableHeaderCell>
													<TableHeaderCell>Region</TableHeaderCell>
													<TableHeaderCell>Status</TableHeaderCell>
													<TableHeaderCell className="text-right">
														Working Hours (h)
													</TableHeaderCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{data.map((item) => (
													<TableRow key={item.id}>
														<TableCell>{item.name}</TableCell>
														<TableCell className="text-right">
															{item.sales}
														</TableCell>
														<TableCell>{item.region}</TableCell>
														<TableCell>{item.status}</TableCell>
														<TableCell className="text-right">
															{item.hours}
														</TableCell>
													</TableRow>
												))}
											</TableBody>
											<TableFoot>
												<TableRow>
													<TableHeaderCell
														colSpan={2}
														scope="row"
														className="text-right"
													>
														4,642
													</TableHeaderCell>
													<TableHeaderCell
														colSpan={3}
														scope="row"
														className="text-right"
													>
														497
													</TableHeaderCell>
												</TableRow>
											</TableFoot>
										</Table>
									</TableRoot>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="tabs"
								>
									<div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
										<Tabs tabs={tabs} />
									</div>{" "}
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="text morph"
								>
									<button
										onClick={() =>
											setText(
												text === "Continue" ? "Confirm" : "Continue"
											)
										}
										className="flex h-10 w-[120px] shrink-0 items-center justify-center rounded-full bg-black px-4 text-base font-medium text-zinc-50 shadow-xs transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
									>
										<TextMorph>{text}</TextMorph>
									</button>{" "}
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TEXT
										),
									]}
									selectedFilters={selectedFilters}
									title="text reveal"
								>
									<div className="flex items-center justify-center bg-[#0E0E10] h-[40rem] rounded-2xl w-full">
										<TextRevealCard
											text="You know the business"
											revealText="I know the chemistry "
										>
											<TextRevealCardTitle>
												Sometimes, you just need to see it.
											</TextRevealCardTitle>
											<TextRevealCardDescription>
												This is a text reveal card. Hover over the
												card to reveal the hidden text.
											</TextRevealCardDescription>
										</TextRevealCard>
									</div>{" "}
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.INTERACTIVE
										),
									]}
									selectedFilters={selectedFilters}
									title="text underline"
								>
									<AnimatedTextUnderline />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="video hero"
								>
									<VideoHero />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.CAROUSEL
										),
									]}
									selectedFilters={selectedFilters}
									title="movie gallery"
								></Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TRANSITIONS
										),
									]}
									selectedFilters={selectedFilters}
									title="page transitions"
								>
									<h2>NOTE!!!!! Only works in App router</h2>
									<ExapmleTransitions />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.NAVIGATION
										),
									]}
									selectedFilters={selectedFilters}
									title="pipeline"
								>
									<DemoPipelineView />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.INTERACTIVE
										),
									]}
									selectedFilters={selectedFilters}
									title="snake game"
									subfolder="snake-game"
								>
									<Game />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TRANSITIONS
										),
									]}
									selectedFilters={selectedFilters}
									title="theme changer"
									subfolder="theme_changer"
								></Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.INTERACTIVE
										),
									]}
									selectedFilters={selectedFilters}
									title="tour"
									subfolder="tour"
								></Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "navigation"
										),
									]}
									selectedFilters={selectedFilters}
									title="performant sidebar"
									subfolder="performant-sidebar"
								>
									<GitlabSidebarPage isDemo />
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="3dnavbar"
								>
									<div className="relative w-full flex items-center justify-center">
										<NavBar className="top-2" />
										<p className="text-black dark:text-white">
											The Navbar will show on top of the page
										</p>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="aurora background"
								>
									<AuroraBackground>
										<motion.div
											initial={{ opacity: 0.0, y: 40 }}
											whileInView={{ opacity: 1, y: 0 }}
											transition={{
												delay: 0.3,
												duration: 0.8,
												ease: "easeInOut",
											}}
											className="relative flex flex-col gap-4 items-center justify-center px-4"
										>
											<div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
												Background lights are cool you know.
											</div>
											<div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
												And this, is chemical burn.
											</div>
											<button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
												Debug now
											</button>
										</motion.div>
									</AuroraBackground>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="background"
								>
									<Background
										image={{
											url: "itjustworks.jpg",
											title: "it just works",
										}}
									/>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="Background Beams"
								>
									<div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
										<div className="max-w-2xl mx-auto p-4">
											<h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
												Join the waitlist
											</h1>
											<p></p>
											<p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
												Welcome to MailJet, the best transactional
												email service on the web. We provide
												reliable, scalable, and customizable email
												solutions for your business. Whether
												you&apos;re sending order confirmations,
												password reset emails, or promotional
												campaigns, MailJet has got you covered.
											</p>
											<input
												type="text"
												placeholder="hi@manuarora.in"
												className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-4  bg-neutral-950 placeholder:text-neutral-700"
											/>
										</div>
										<BackgroundBeams />
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="Background boxes"
								>
									<div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
										<div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

										<Boxes />
										<h1
											className={cn(
												"md:text-4xl text-xl text-white relative z-20"
											)}
										>
											Tailwind is Awesome
										</h1>
										<p className="text-center mt-2 text-neutral-300 relative z-20">
											Framer motion is the best animation library ngl
										</p>
									</div>
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="bento"
								>
									<BentoGrid className="max-w-4xl mx-auto">
										{bentoItems.map((item, i) => (
											<BentoGridItem
												key={i + "bento"}
												title={item.title}
												description={item.description}
												header={item.header}
												icon={item.icon}
												className={
													i === 3 || i === 6 ? "md:col-span-2" : ""
												}
											/>
										))}
									</BentoGrid>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.INTERACTIVE
										),
									]}
									selectedFilters={selectedFilters}
									title="Video Player"
								>
									<div className="space-y-12 p-8">
										<div className="space-y-4">
											<h1 className="text-3xl font-bold">
												YouTube Video Player Examples
											</h1>
											<p className="text-muted-foreground">
												A collection of YouTube video player
												examples showcasing different configurations
												and styling options.
											</p>
										</div>

										{/* Custom Thumbnail */}
										<section className="space-y-4">
											<div>
												<h2 className="text-2xl font-semibold mb-2">
													Custom Thumbnail
												</h2>
												<p className="text-muted-foreground">
													Player with a custom thumbnail image
													instead of the default YouTube thumbnail.
												</p>
											</div>
											<div className="max-w-2xl">
												<YouTubePlayer2
													videoId="jNQXAC9IVRw"
													title="Me at the zoo - First YouTube Video"
													customThumbnail="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop&crop=center"
												/>
											</div>
										</section>

										{/* Custom Styling */}
										<section className="space-y-4">
											<div>
												<h2 className="text-2xl font-semibold mb-2">
													Custom Styling
												</h2>
												<p className="text-muted-foreground">
													Player with custom styling classes for
													different elements.
												</p>
											</div>
											<div className="max-w-2xl">
												<YouTubePlayer2
													videoId="kJQP7kiw5Fk"
													title="Despacito - Luis Fonsi ft. Daddy Yankee"
													containerClassName="border-2 border-primary rounded-2xl shadow-2xl"
													thumbnailImageClassName="opacity-90 saturate-150"
													playButtonClassName="bg-primary/20 border-border/20 hover:bg-primary/30"
													playIconClassName="text-secondary fill-secondary"
													titleClassName="text-secondary font-bold"
													controlsClassName="right-4 top-4"
													expandButtonClassName="bg-secondary/20 hover:bg-secondary/30 border-secondary text-secondary"
												/>
											</div>
										</section>

										{/* Multiple Players Grid */}
										<section className="space-y-4">
											<div>
												<h2 className="text-2xl font-semibold mb-2">
													Multiple Players
												</h2>
												<p className="text-muted-foreground">
													A grid of multiple video players with
													different content.
												</p>
											</div>
											<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
												<YouTubePlayer2
													videoId="9bZkp7q19f0"
													title="PSY - GANGNAM STYLE"
													className="w-full"
												/>
												<YouTubePlayer2
													videoId="fJ9rUzIMcZQ"
													title="Queen – Bohemian Rhapsody"
													className="w-full"
												/>
												<YouTubePlayer2
													videoId="L_jWHffIx5E"
													title="Smash Mouth - All Star"
													className="w-full"
												/>
												<YouTubePlayer2
													videoId="hTWKbfoikeg"
													title="Nirvana - Smells Like Teen Spirit"
													className="w-full"
												/>
												<YouTubePlayer2
													videoId="djV11Xbc914"
													title="a-ha - Take On Me"
													className="w-full"
												/>
												<YouTubePlayer2
													videoId="ZbZSe6N_BXs"
													title="Happy - Pharrell Williams"
													className="w-full"
												/>
											</div>
										</section>

										{/* Different Aspect Ratios */}
										<section className="space-y-4">
											<div>
												<h2 className="text-2xl font-semibold mb-2">
													Different Sizes
												</h2>
												<p className="text-muted-foreground">
													Players in different container sizes to
													show responsive behavior.
												</p>
											</div>
											<div className="space-y-8">
												{/* Small */}
												<div>
													<h3 className="text-lg font-medium mb-3">
														Small (300px)
													</h3>
													<div className="w-[300px]">
														<YouTubePlayer2
															videoId="2yJgwwDcgV8"
															title="Nyan Cat [original]"
														/>
													</div>
												</div>

												{/* Medium */}
												<div>
													<h3 className="text-lg font-medium mb-3">
														Medium (500px)
													</h3>
													<div className="w-[500px]">
														<YouTubePlayer2
															videoId="oHg5SJYRHA0"
															title="RickRoll'D"
														/>
													</div>
												</div>

												{/* Large */}
												<div>
													<h3 className="text-lg font-medium mb-3">
														Large (800px)
													</h3>
													<div className="w-[800px]">
														<YouTubePlayer2
															videoId="y6120QOlsfU"
															title="Darude - Sandstorm"
														/>
													</div>
												</div>
											</div>
										</section>

										{/* URL Formats */}
										<section className="space-y-4">
											<div>
												<h2 className="text-2xl font-semibold mb-2">
													Different URL Formats
												</h2>
												<p className="text-muted-foreground">
													The player can handle different YouTube
													URL formats automatically.
												</p>
											</div>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
												{/* Regular video ID */}
												<div>
													<h3 className="text-sm font-medium mb-2">
														Video ID: "dQw4w9WgXcQ"
													</h3>
													<YouTubePlayer2
														videoId="dQw4w9WgXcQ"
														title="Using Video ID"
													/>
												</div>

												{/* Full YouTube URL */}
												<div>
													<h3 className="text-sm font-medium mb-2">
														Full URL:
														"https://www.youtube.com/watch?v=dQw4w9WgXcQ"
													</h3>
													<YouTubePlayer2
														videoId="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
														title="Using Full YouTube URL"
													/>
												</div>

												{/* Short URL */}
												<div>
													<h3 className="text-sm font-medium mb-2">
														Short URL:
														"https://youtu.be/dQw4w9WgXcQ"
													</h3>
													<YouTubePlayer2
														videoId="https://youtu.be/dQw4w9WgXcQ"
														title="Using Short YouTube URL"
													/>
												</div>
											</div>
										</section>

										{/* Feature Highlights */}
										<section className="space-y-4">
											<div>
												<h2 className="text-2xl font-semibold mb-2">
													Features
												</h2>
												<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
													<div className="space-y-2">
														<h3 className="text-lg font-medium">
															✨ Key Features
														</h3>
														<ul className="text-sm text-muted-foreground space-y-1">
															<li>
																• Expandable full-screen mode
															</li>
															<li>
																• Custom thumbnails support
															</li>
															<li>
																• Smooth animations with Framer
																Motion
															</li>
															<li>
																• Keyboard shortcuts (ESC to
																close)
															</li>
															<li>• Responsive design</li>
															<li>• Accessible controls</li>
															<li>
																• Multiple URL format support
															</li>
														</ul>
													</div>
													<div className="space-y-2">
														<h3 className="text-lg font-medium">
															🎨 Customization
														</h3>
														<ul className="text-sm text-muted-foreground space-y-1">
															<li>
																• Fully customizable styling
															</li>
															<li>
																• Custom play button designs
															</li>
															<li>
																• Thumbnail overlay effects
															</li>
															<li>
																• Control button positioning
															</li>
															<li>
																• Container and backdrop styling
															</li>
															<li>
																• Title and text customization
															</li>
														</ul>
													</div>
												</div>
											</div>
										</section>
									</div>
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TEXT
										),
									]}
									selectedFilters={selectedFilters}
									title="Gif Text"
								>
									<div className="max-w-3xl mx-auto space-y-8 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-xl">
										{/* Preview */}
										<div className="flex items-center justify-center p-12 bg-white dark:bg-black rounded-xl">
											<GifText
												gifUrl={selectedGif}
												text={gifText}
												size={size as any}
												weight={weight as any}
											/>
										</div>

										{/* Controls */}
										<div className="grid gap-6 md:grid-cols-2">
											<div className="space-y-4">
												<label className="text-sm font-medium">
													Text
												</label>
												<Input
													value={gifText}
													onChange={(e) =>
														setGifText(e.target.value)
													}
													placeholder="Enter text"
												/>
											</div>

											<div className="space-y-4">
												<label className="text-sm font-medium">
													GIF Background
												</label>
												<Select
													value={selectedGif}
													onValueChange={setSelectedGif}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select GIF" />
													</SelectTrigger>
													<SelectContent>
														{gifUrls.map((gif, index) => (
															<SelectItem
																key={index + "gif-text"}
																value={gif}
															>
																GIF {index + 1}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>

											<div className="space-y-4">
												<label className="text-sm font-medium">
													Text Size
												</label>
												<Select
													value={size}
													onValueChange={setSize}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select size" />
													</SelectTrigger>
													<SelectContent>
														{["sm", "md", "lg", "xl", "xxl"].map(
															(s) => (
																<SelectItem key={s} value={s}>
																	{s}
																</SelectItem>
															)
														)}
													</SelectContent>
												</Select>
											</div>

											<div className="space-y-4">
												<label className="text-sm font-medium">
													Font Weight
												</label>
												<Select
													value={weight}
													onValueChange={setWeight}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select weight" />
													</SelectTrigger>
													<SelectContent>
														{[
															"normal",
															"medium",
															"semi",
															"bold",
														].map((w) => (
															<SelectItem key={w} value={w}>
																{w}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>
										</div>

										{/* Examples */}
										<div className="space-y-4">
											<h2 className="text-xl font-semibold">
												Examples
											</h2>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
												<div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-black rounded-xl">
													<GifText
														gifUrl={gifUrls[1]}
														text="Headings"
														size="xl"
														weight="bold"
													/>
												</div>
												<div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-black rounded-xl">
													<GifText
														gifUrl={gifUrls[2]}
														text="$49"
														size="xxl"
														weight="bold"
													/>
													<p className="text-sm mt-2">per month</p>
												</div>
											</div>
										</div>
									</div>
								</Component>

								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) => filter.label.toLowerCase() === "sections"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="dither"
                                >
                                    <section>
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "600px",
                                                position: "relative",
                                            }}
                                        >
                                            <Dither
                                                waveColor={[0.5, 0.5, 0.5]}
                                                disableAnimation={false}
                                                enableMouseInteraction={true}
                                                mouseRadius={0.3}
                                                colorNum={4}
                                                waveAmplitude={0.3}
                                                waveFrequency={3}
                                                waveSpeed={0.05}
                                            />
                                        </div>
                                    </section>
                                </Component> */}

								{/* TODO: Figure out why this maxes out gpu */}
								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) =>
                                                filter.label.toLowerCase() === "interactive"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="Smokey Cursor"
                                >
                                    <SmokeyCursorDemo />
                                </Component> */}

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="lanyard"
								>
									<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
										<Lanyard
											position={[0, 0, 20]}
											gravity={[0, -40, 0]}
										/>{" "}
									</div>{" "}
								</Component>

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="marquee along svg"
								>
									<MarqueeAlongSvgPathDemo />
								</Component>

								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) => filter.label.toLowerCase() === "card"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="pointer hover"
                                ></Component> */}

								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                        gridView={gridView}
                                        setComponentCount={setComponentCount}
                                        tags={[
                                            filterOptions.find(
                                                (filter) => filter.label.toLowerCase() === "card"
                                            ),
                                        ]}
                                        selectedFilters={selectedFilters}
                                        title="resize navbar"
                                    ></Component> */}

								{/* TODO: Fix meteors */}
								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) => filter.label.toLowerCase() === "card"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="meteors"
                                >
                                    <MeteorsDemo />
                                </Component> */}

								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) => filter.label.toLowerCase() === "card"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="mobile nav"
                                ></Component>
                                <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) => filter.label.toLowerCase() === "card"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="mobile nav basic"
                                ></Component> */}

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="mouse image trail"
								>
									<MouseImageTrail
										renderImageBuffer={50}
										rotationRange={25}
										images={[
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
											"/itjustworks.jpg",
										]}
									>
										<section className="grid h-screen w-full place-content-center bg-white">
											<span className="flex items-center gap-2 text-3xl font-bold uppercase text-black">
												<FiMousePointer />
												<span>Hover me</span>
											</span>
										</section>
									</MouseImageTrail>
								</Component>

								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) => filter.label.toLowerCase() === "card"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="nav bar"
                                ></Component>
                                <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) => filter.label.toLowerCase() === "card"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="nav bar 2"
                                ></Component>
                                <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) => filter.label.toLowerCase() === "card"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="nav bar 3"
                                ></Component>
                                <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) => filter.label.toLowerCase() === "card"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="navigation"
                                ></Component> */}

								{/* TODO: Fix this components export */}
								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(s
                                            (filter) => filter.label.toLowerCase() === "card"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="flipped menu"
                                >
                                    <div className="h-screen">
                                        <FlippedMenu />
                                    </div>
                                </Component> */}

								{/* TODO: Fix shape blur */}
								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) => filter.label.toLowerCase() === "card"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="shape blur"
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                            height: "500px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <ShapeBlur
                                            variation={0}
                                            pixelRatioProp={1}
                                            shapeSize={0.5}
                                            roundness={0.5}
                                            borderSize={0.05}
                                            circleSize={0.5}
                                            circleEdge={1}
                                        />
                                    </div>
                                </Component> */}

								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) => filter.label.toLowerCase() === "card"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="sidebar"
                                ></Component> */}

								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) => filter.label.toLowerCase() === "card"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="terminal"
                                ></Component> */}

								{/* TODO: find svg path */}
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="text along path"
								>
									<TextAlongPathExample />
								</Component>

								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) => filter.label.toLowerCase() === "card"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="text enhanced"
                                ></Component> */}

								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) => filter.label.toLowerCase() === "card"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="zoom blur card"
                                ></Component> */}

								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) => filter.label.toLowerCase() === "card"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="code block"
                                ></Component> */}

								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) => filter.label.toLowerCase() === "card"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="globe"
                                >
                                    <GlobeDemo />
                                </Component> */}

								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "card"
										),
									]}
									selectedFilters={selectedFilters}
									title="icons"
									subfolder="icons"
								>
									<IconsList icons={ICON_LIST} />
								</Component>

								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) => filter.label.toLowerCase() === "card"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="kanban"
                                    subfolder="kanban"
                                ></Component> */}

								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                    gridView={gridView}
                                    setComponentCount={setComponentCount}
                                    tags={[
                                        filterOptions.find(
                                            (filter) => filter.label.toLowerCase() === "card"
                                        ),
                                    ]}
                                    selectedFilters={selectedFilters}
                                    title="nine dot loader"
                                >
                                    <NineDotGridRandom />
                                </Component> */}

								{/* <Component allFilters={filterOptions}
 collapsed={collapsed} setCollapsed={setCollapsed}
                                gridView={gridView}
                                setComponentCount={setComponentCount}
                                tags={[
                                    filterOptions.find(
                                        (filter) => filter.label.toLowerCase() === "card"
                                    ),
                                ]}
                                selectedFilters={selectedFilters}
                                title="view list"
                            >
                                <View />
                            </Component> */}
								<section>
									shopify logo wall w/ spotlight on hover
								</section>
								<section>Full Screen Hero video player / image</section>
								<section>
									https://spencergabor.work/about footer
								</section>
							</>
						)}
					</ScrollIsland>
				</section>
			</main>
			<div
				className="fixed bottom-6 right-6 z-50"
				onMouseEnter={() => setIsExpanded(true)}
				onMouseLeave={() => setIsExpanded(false)}
			>
				{/* Action Buttons */}
				{actionButtons.map((button, index) => {
					const Icon = button.icon;
					return (
						<div key={button.id}>
							<div
								className=""
								onMouseLeave={() => setHoveredButton(null)}
							>
								{/* Form Card */}
								<div
									className={`
                  transition-all duration-300 ease-in-out z-50
                  ${hoveredButton === button.id ? "opacity-100 bg-black translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
                `}
								>
									{renderForm(button.id)}
								</div>

								{/* Action Button */}
								<Button
									size="sm"
									className={`
                  h-12 w-12 rounded-full shadow-lg transition-all duration-300 ease-in-out
                  ${button.color}
                  ${isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                `}
									style={{
										transitionDelay: isExpanded
											? `${index * 50}ms`
											: "0ms",
									}}
									onMouseEnter={() => setHoveredButton(button.id)}
								>
									{button.label}
								</Button>
							</div>
						</div>
					);
				})}

				{/* Main FAB */}
				<Button
					size="lg"
					onClick={() => setIsExpanded(!isExpanded)}
					className={`
            h-14 w-14 rounded-full shadow-lg transition-all duration-300 ease-in-out
            ${isExpanded ? "bg-red-500 hover:bg-red-600 rotate-45" : "bg-blue-500 hover:bg-blue-600"}
          `}
				>
					<Plus className="h-6 w-6" />
				</Button>
			</div>
		</>
	);
};

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * An array of option objects to be displayed in the multi-select component.
	 * Each option object has a label, value, and an optional icon.
	 */
	options: {
		/** The text to display for the option. */
		label: string;
		/** The unique value associated with the option. */
		value: string;
		/** Optional icon component to display alongside the option. */
		icon?: React.ComponentType<{ className?: string }>;
		disable?: boolean;
	}[];

	/**
	 * Callback function triggered when the selected values change.
	 * Receives an array of the new selected values.
	 */
	onValueChange: (value: string[]) => void;

	/** The default selected values when the component mounts. */
	defaultValue?: string[];

	/**
	 * Placeholder text to be displayed when no values are selected.
	 * Optional, defaults to "Select options".
	 */
	placeholder?: string;

	/**
	 * Animation duration in seconds for the visual effects (e.g., bouncing badges).
	 * Optional, defaults to 0 (no animation).
	 */
	animation?: number;

	/**
	 * Maximum number of items to display. Extra selected items will be summarized.
	 * Optional, defaults to 3.
	 */
	maxCount?: number;

	/**
	 * The modality of the popover. When set to true, interaction with outside elements
	 * will be disabled and only popover content will be visible to screen readers.
	 * Optional, defaults to false.
	 */
	modalPopover?: boolean;

	/**
	 * If true, renders the multi-select component as a child of another component.
	 * Optional, defaults to false.
	 */
	asChild?: boolean;

	/**
	 * Additional class names to apply custom styles to the multi-select component.
	 * Optional, can be used to add custom styles.
	 */
	className?: string;
	popoverClass?: string;
	showall?: boolean;
}

export const MultiSelect = React.forwardRef<
	HTMLButtonElement,
	MultiSelectProps
>(
	(
		{
			options,
			onValueChange,
			defaultValue = [],
			placeholder = "Select options",
			animation = 0,
			maxCount = 3,
			modalPopover = false,
			asChild = false,
			className,
			popoverClass,
			showall = false,
			...props
		},
		ref
	) => {
		const [selectedValues, setSelectedValues] =
			React.useState<string[]>(defaultValue);
		const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

		const handleInputKeyDown = (
			event: React.KeyboardEvent<HTMLInputElement>
		) => {
			if (event.key === "Enter") {
				setIsPopoverOpen(true);
			} else if (event.key === "Backspace" && !event.currentTarget.value) {
				const newSelectedValues = [...selectedValues];
				newSelectedValues.pop();
				setSelectedValues(newSelectedValues);
				onValueChange(newSelectedValues);
			}
		};

		const toggleOption = (option: string) => {
			const newSelectedValues = selectedValues.includes(option)
				? selectedValues.filter((value) => value !== option)
				: [...selectedValues, option];
			setSelectedValues(newSelectedValues);
			onValueChange(newSelectedValues);
		};

		const handleClear = () => {
			setSelectedValues([]);
			onValueChange([]);
		};

		const handleTogglePopover = () => {
			setIsPopoverOpen((prev) => !prev);
		};

		const clearExtraOptions = () => {
			const newSelectedValues = selectedValues.slice(0, maxCount);
			setSelectedValues(newSelectedValues);
			onValueChange(newSelectedValues);
		};
		const filteredOptions = options.filter((option) => !option.disable);
		const toggleAll = () => {
			if (selectedValues.length === filteredOptions.length) {
				handleClear();
			} else {
				const allValues = filteredOptions.map((option) => option.value);
				setSelectedValues(allValues);
				onValueChange(allValues);
			}
		};

		return (
			<Popover
				open={isPopoverOpen}
				onOpenChange={setIsPopoverOpen}
				modal={modalPopover}
			>
				<PopoverTrigger asChild>
					<Button
						ref={ref}
						{...props}
						onClick={handleTogglePopover}
						className={cn(
							"flex w-fit p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-background hover:bg-background",
							className
						)}
					>
						{selectedValues.length > 0 ? (
							<div className="flex justify-between items-center w-full">
								<div className="flex flex-wrap items-center  gap-1 p-1">
									{(showall
										? selectedValues
										: selectedValues.slice(0, maxCount)
									).map((value) => {
										const option = options.find(
											(o) => o.value === value
										);
										const IconComponent = option?.icon;
										return (
											<div
												key={value}
												className={cn(
													"inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold  bg-primary text-primary-foreground  "
												)}
											>
												{IconComponent && (
													<IconComponent className="h-4 w-4 mr-2" />
												)}
												{option?.label}
												<XCircle
													className="ml-2 h-4 w-4 cursor-pointer"
													onClick={(event) => {
														event.stopPropagation();
														toggleOption(value);
													}}
												/>
											</div>
										);
									})}
									{!showall && selectedValues.length > maxCount && (
										<div
											className={cn(
												"bg-primary-foreground inline-flex items-center border px-2 py-0.5  rounded-full text-foreground border-foreground/1 hover:bg-transparent"
											)}
											style={{ animationDuration: `${animation}s` }}
										>
											{`+ ${selectedValues.length - maxCount} more`}
											<XCircle
												className="ml-2 h-4 w-4 cursor-pointer"
												onClick={(event) => {
													event.stopPropagation();
													clearExtraOptions();
												}}
											/>
										</div>
									)}
								</div>
								<div className="flex items-center justify-between">
									<XIcon
										className="h-4 mx-2 cursor-pointer text-muted-foreground"
										onClick={(event) => {
											event.stopPropagation();
											handleClear();
										}}
									/>
									{/* <Separator
                    orientation="vertical"
                    className="flex min-h-6 h-full"
                  /> */}
									<ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
								</div>
							</div>
						) : (
							<div className="flex items-center justify-between w-full mx-auto">
								<span className="text-sm text-muted-foreground mx-3">
									{placeholder}
								</span>
								<ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
							</div>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className={cn("w-auto p-0", popoverClass)}
					align="start"
					onEscapeKeyDown={() => setIsPopoverOpen(false)}
				>
					<Command>
						<CommandInput
							placeholder="Search..."
							onKeyDown={handleInputKeyDown}
						/>
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup>
								<div className="flex items-center justify-between">
									{selectedValues.length > 0 && (
										<>
											<CommandItem
												onSelect={handleClear}
												className="flex-1 justify-center cursor-pointer border-r"
											>
												Clear
											</CommandItem>
										</>
									)}
									<CommandItem
										key="all"
										onSelect={toggleAll}
										className="cursor-pointer"
										disabled={false}
									>
										<div
											className={cn(
												"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
												selectedValues.length ===
													filteredOptions.length
													? "bg-primary text-primary-foreground"
													: "opacity-50 [&_svg]:invisible"
											)}
										>
											<CheckIcon className="h-4 w-4" />
										</div>
										<span>(Select All)</span>
									</CommandItem>
									<CommandItem
										onSelect={() => setIsPopoverOpen(false)}
										className="justify-center cursor-pointer max-w-full"
									>
										Close
									</CommandItem>
								</div>
							</CommandGroup>

							<CommandSeparator />
							<CommandGroup className="columns-4">
								{options.map((option) => {
									const isSelected = selectedValues.includes(
										option.value
									);
									const isDisabled = false; // Check if option is disabled

									return (
										<CommandItem
											key={option.value}
											onSelect={() => toggleOption(option.value)}
											className={cn(
												"cursor-pointer",
												isDisabled &&
													"opacity-50 cursor-not-allowed" // Disable styling
											)}
										>
											<div
												className={cn(
													"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
													isSelected
														? "bg-primary text-primary-foreground"
														: "opacity-50 [&_svg]:invisible"
												)}
											>
												{!isDisabled && (
													<CheckIcon className="h-4 w-4" />
												)}
											</div>
											{option.icon && (
												<option.icon
													className={cn(
														"mr-2 h-4 w-4",
														isDisabled
															? "text-muted-foreground"
															: ""
													)}
												/>
											)}
											<span>{option.label}</span>
										</CommandItem>
									);
								})}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		);
	}
);
