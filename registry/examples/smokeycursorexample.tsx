import React, { useState } from "react";

import SmokeyCursor from "@/components/SmokeyCursor";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SmokeyCursorDemo() {
	// State for cursor settings
	const [settings, setSettings] = useState({
		simResolution: 128,
		dyeResolution: 1024,
		densityDissipation: 3.5,
		velocityDissipation: 2,
		pressure: 0.1,
		pressureIterations: 20,
		curl: 3,
		splatRadius: 0.2,
		splatForce: 6000,
		shading: true,
		colorUpdateSpeed: 10,
		backColor: { r: 0.5, g: 0, b: 0 },
		transparent: true,
		isActive: true,
	});

	// Toggle cursor on/off
	const toggleCursor = () => {
		setSettings((prev) => ({ ...prev, isActive: !prev.isActive }));
	};

	// Handle color change
	const handleColorChange = (component: "r" | "g" | "b", value: number) => {
		setSettings((prev) => ({
			...prev,
			backColor: {
				...prev.backColor,
				[component]: value / 100,
			},
		}));
	};

	// Handle slider change
	const handleSliderChange = (name: string, value: number) => {
		setSettings((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Handle preset selection
	const handlePresetChange = (preset: string) => {
		switch (preset) {
			case "water":
				setSettings((prev) => ({
					...prev,
					densityDissipation: 2.5,
					velocityDissipation: 1.5,
					curl: 4,
					splatRadius: 0.3,
					splatForce: 5000,
					backColor: { r: 0.0, g: 0.3, b: 0.8 },
				}));
				break;
			case "fire":
				setSettings((prev) => ({
					...prev,
					densityDissipation: 4.5,
					velocityDissipation: 3,
					curl: 5,
					splatRadius: 0.15,
					splatForce: 8000,
					backColor: { r: 0.8, g: 0.2, b: 0.0 },
				}));
				break;
			case "smoke":
				setSettings((prev) => ({
					...prev,
					densityDissipation: 2.0,
					velocityDissipation: 1.8,
					curl: 2,
					splatRadius: 0.25,
					splatForce: 4000,
					backColor: { r: 0.2, g: 0.2, b: 0.2 },
				}));
				break;
			case "neon":
				setSettings((prev) => ({
					...prev,
					densityDissipation: 3.2,
					velocityDissipation: 2.5,
					curl: 4.5,
					splatRadius: 0.18,
					splatForce: 7000,
					backColor: { r: 0.6, g: 0.0, b: 0.9 },
				}));
				break;
		}
	};

	return (
		<div className="space-y-8">
			<div className="relative w-full h-[300px] rounded-lg overflow-hidden border flex items-center justify-center">
				<div className="z-10 text-center">
					<h3 className="text-2xl font-medium mb-4">
						Mouse Fluid Simulation
					</h3>
					<Button
						onClick={toggleCursor}
						className="animate-pulse"
						variant={settings.isActive ? "destructive" : "default"}
					>
						{settings.isActive ? "Deactivate Effect" : "Activate Effect"}
					</Button>
				</div>

				{settings.isActive && (
					<SmokeyCursor
						SIM_RESOLUTION={settings.simResolution}
						DYE_RESOLUTION={settings.dyeResolution}
						DENSITY_DISSIPATION={settings.densityDissipation}
						VELOCITY_DISSIPATION={settings.velocityDissipation}
						PRESSURE={settings.pressure}
						PRESSURE_ITERATIONS={settings.pressureIterations}
						CURL={settings.curl}
						SPLAT_RADIUS={settings.splatRadius}
						SPLAT_FORCE={settings.splatForce}
						SHADING={settings.shading}
						COLOR_UPDATE_SPEED={settings.colorUpdateSpeed}
						BACK_COLOR={settings.backColor}
						TRANSPARENT={settings.transparent}
					/>
				)}
			</div>

			<Tabs defaultValue="basic" className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="basic">Basic Settings</TabsTrigger>
					<TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
					<TabsTrigger value="presets">Presets</TabsTrigger>
				</TabsList>

				<TabsContent value="basic" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Basic Configuration</CardTitle>
							<CardDescription>
								Adjust the fluid dynamics behavior
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>
										Density Dissipation:{" "}
										{settings.densityDissipation.toFixed(1)}
									</Label>
									<Slider
										value={[settings.densityDissipation]}
										min={1}
										max={5}
										step={0.1}
										onValueChange={(value) =>
											handleSliderChange(
												"densityDissipation",
												value?.[0]
											)
										}
									/>
								</div>

								<div className="space-y-2">
									<Label>
										Velocity Dissipation:{" "}
										{settings.velocityDissipation.toFixed(1)}
									</Label>
									<Slider
										value={[settings.velocityDissipation]}
										min={0.5}
										max={4}
										step={0.1}
										onValueChange={(value) =>
											handleSliderChange(
												"velocityDissipation",
												value?.[0]
											)
										}
									/>
								</div>

								<div className="space-y-2">
									<Label>
										Splat Radius: {settings.splatRadius.toFixed(2)}
									</Label>
									<Slider
										value={[settings.splatRadius]}
										min={0.1}
										max={0.5}
										step={0.01}
										onValueChange={(value) =>
											handleSliderChange("splatRadius", value?.[0])
										}
									/>
								</div>

								<div className="space-y-2">
									<Label>Splat Force: {settings.splatForce}</Label>
									<Slider
										value={[settings.splatForce]}
										min={1000}
										max={10000}
										step={100}
										onValueChange={(value) =>
											handleSliderChange("splatForce", value?.[0])
										}
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="space-y-2">
									<Label>
										R: {(settings.backColor.r * 100).toFixed(0)}%
									</Label>
									<Slider
										value={[settings.backColor.r * 100]}
										min={0}
										max={100}
										step={1}
										onValueChange={(value) =>
											handleColorChange("r", value?.[0])
										}
									/>
								</div>

								<div className="space-y-2">
									<Label>
										G: {(settings.backColor.g * 100).toFixed(0)}%
									</Label>
									<Slider
										value={[settings.backColor.g * 100]}
										min={0}
										max={100}
										step={1}
										onValueChange={(value) =>
											handleColorChange("g", value?.[0])
										}
									/>
								</div>

								<div className="space-y-2">
									<Label>
										B: {(settings.backColor.b * 100).toFixed(0)}%
									</Label>
									<Slider
										value={[settings.backColor.b * 100]}
										min={0}
										max={100}
										step={1}
										onValueChange={(value) =>
											handleColorChange("b", value?.[0])
										}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="advanced" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Advanced Parameters</CardTitle>
							<CardDescription>
								Fine-tune the fluid simulation performance
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>
										Simulation Resolution: {settings.simResolution}
									</Label>
									<Select
										value={settings.simResolution.toString()}
										onValueChange={(value) =>
											handleSliderChange(
												"simResolution",
												parseInt(value)
											)
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select resolution" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="64">Low (64)</SelectItem>
											<SelectItem value="128">
												Medium (128)
											</SelectItem>
											<SelectItem value="256">High (256)</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label>
										Dye Resolution: {settings.dyeResolution}
									</Label>
									<Select
										value={settings.dyeResolution.toString()}
										onValueChange={(value) =>
											handleSliderChange(
												"dyeResolution",
												parseInt(value)
											)
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select resolution" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="512">Low (512)</SelectItem>
											<SelectItem value="1024">
												Medium (1024)
											</SelectItem>
											<SelectItem value="1440">
												High (1440)
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label>Curl: {settings.curl.toFixed(1)}</Label>
									<Slider
										value={[settings.curl]}
										min={0}
										max={10}
										step={0.1}
										onValueChange={(value) =>
											handleSliderChange("curl", value?.[0])
										}
									/>
								</div>

								<div className="space-y-2">
									<Label>
										Pressure: {settings.pressure.toFixed(2)}
									</Label>
									<Slider
										value={[settings.pressure]}
										min={0.01}
										max={0.5}
										step={0.01}
										onValueChange={(value) =>
											handleSliderChange("pressure", value?.[0])
										}
									/>
								</div>

								<div className="space-y-2">
									<Label>
										Pressure Iterations: {settings.pressureIterations}
									</Label>
									<Slider
										value={[settings.pressureIterations]}
										min={10}
										max={50}
										step={1}
										onValueChange={(value) =>
											handleSliderChange(
												"pressureIterations",
												value?.[0]
											)
										}
									/>
								</div>

								<div className="space-y-2">
									<Label>
										Color Update Speed: {settings.colorUpdateSpeed}
									</Label>
									<Slider
										value={[settings.colorUpdateSpeed]}
										min={1}
										max={20}
										step={1}
										onValueChange={(value) =>
											handleSliderChange(
												"colorUpdateSpeed",
												value?.[0]
											)
										}
									/>
								</div>
							</div>

							{/* <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="shading">Enable Shading</Label>
                  <Switch
                    id="shading"
                    checked={!!settings.shading} // force boolean
                    onCheckedChange={(checked) =>
                      handleSliderChange("shading", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="transparent">Transparent Background</Label>
                  <Switch
                    id="transparent"
                    checked={settings.transparent}
                    onCheckedChange={(checked) =>
                      handleSliderChange("transparent", checked)
                    }
                  />
                </div>
              </div> */}
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="presets" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Ready-Made Presets</CardTitle>
							<CardDescription>
								Choose from pre-configured effects
							</CardDescription>
						</CardHeader>
						<CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<Button
								variant="outline"
								className="h-24 flex flex-col gap-2"
								onClick={() => handlePresetChange("water")}
							>
								<span className="font-medium">Water Effect</span>
								<span className="text-xs text-muted-foreground">
									Flowing blue liquid simulation
								</span>
							</Button>

							<Button
								variant="outline"
								className="h-24 flex flex-col gap-2"
								onClick={() => handlePresetChange("fire")}
							>
								<span className="font-medium">Fire Effect</span>
								<span className="text-xs text-muted-foreground">
									Energetic orange-red flames
								</span>
							</Button>

							<Button
								variant="outline"
								className="h-24 flex flex-col gap-2"
								onClick={() => handlePresetChange("smoke")}
							>
								<span className="font-medium">Smoke Effect</span>
								<span className="text-xs text-muted-foreground">
									Gentle grayscale swirls
								</span>
							</Button>

							<Button
								variant="outline"
								className="h-24 flex flex-col gap-2"
								onClick={() => handlePresetChange("neon")}
							>
								<span className="font-medium">Neon Effect</span>
								<span className="text-xs text-muted-foreground">
									Vibrant purple glowing trails
								</span>
							</Button>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
