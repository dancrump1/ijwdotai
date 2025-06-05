import type React from "react";

import { Button } from "@/components/ui/button";

interface GameOverPopupProps {
	score: number;
	onRestart: () => void;
	isDarkMode: boolean;
}

const GameOverPopup: React.FC<GameOverPopupProps> = ({
	score,
	onRestart,
	isDarkMode,
}) => {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div
				className={`${
					isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
				} p-8 rounded-lg shadow-lg text-center`}
			>
				<h2 className="text-3xl font-bold mb-4">Game Over</h2>
				<p className="text-xl mb-6">Your score: {score}</p>
				<Button
					onClick={onRestart}
					variant="default"
					className={`px-6 py-2 ${
						isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : ""
					}`}
				>
					Play Again
				</Button>
			</div>
		</div>
	);
};

export default GameOverPopup;
