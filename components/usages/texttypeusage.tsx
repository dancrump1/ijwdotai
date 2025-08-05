import TextType from "@/registry/open-source/text-type";

const Usage = () => {
	return (
		<TextType
			text={["Text typing effect", "for your websites", "Happy coding!"]}
			typingSpeed={75}
			pauseDuration={1500}
			showCursor={true}
			cursorCharacter="|"
		/>
	);
};

export default Usage;
