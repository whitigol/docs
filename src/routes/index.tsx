import { createFileRoute, Link } from "@tanstack/react-router";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/lib/layout.shared";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Package, Gamepad2, Github, ArrowRight } from "lucide-react";
import { BsDiscord } from "react-icons/bs";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<HomeLayout {...baseOptions()} className="flex min-h-screen items-center justify-center pt-20 pb-12 md:py-0">
			<div className="container mx-auto w-full space-y-12 px-4 md:space-y-16">
				{/* Hero Section */}
				<div className="flex flex-col items-center space-y-6 text-center">
					<div className="flex items-center gap-3">
						<img src="/logo.svg" alt="Whitigol Software" className="size-10 shrink-0 invert md:size-12 dark:invert-0" />
						<h1 className="-translate-y-0.5 text-3xl leading-none font-bold tracking-tight md:-translate-y-1 md:text-5xl">Whitigol Software</h1>
					</div>
					<p className="text-muted-foreground max-w-2xl text-base md:text-lg">
						Comprehensive documentation for all of my software projects, NPM packages, and FiveM scripts
					</p>
					<Button asChild size="lg" className="gap-2">
						<Link
							to="/docs/$"
							params={{
								_splat: "",
							}}
						>
							Get Started
							<ArrowRight className="size-4" />
						</Link>
					</Button>
				</div>

				{/* Documentation Sections */}
				<div className="grid gap-4 sm:gap-6 md:grid-cols-3">
					<Link
						to="/docs/$"
						params={{
							_splat: "software",
						}}
						className="block"
					>
						<Card className="group h-full transition-all hover:shadow-lg">
							<CardHeader className="text-center">
								<div className="bg-primary/10 text-primary mx-auto mb-4 flex size-12 items-center justify-center rounded-lg">
									<Code className="size-6" />
								</div>
								<CardTitle>Software</CardTitle>
								<CardDescription>Documentation for all software projects</CardDescription>
							</CardHeader>
							<CardContent className="flex justify-center">
								<div className="text-primary flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3">
									Explore
									<ArrowRight className="size-4" />
								</div>
							</CardContent>
						</Card>
					</Link>

					<Link
						to="/docs/$"
						params={{
							_splat: "npm-packages",
						}}
						className="block"
					>
						<Card className="group h-full transition-all hover:shadow-lg">
							<CardHeader className="text-center">
								<div className="bg-primary/10 text-primary mx-auto mb-4 flex size-12 items-center justify-center rounded-lg">
									<Package className="size-6" />
								</div>
								<CardTitle>NPM Packages</CardTitle>
								<CardDescription>Documentation for published NPM packages</CardDescription>
							</CardHeader>
							<CardContent className="flex justify-center">
								<div className="text-primary flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3">
									Explore
									<ArrowRight className="size-4" />
								</div>
							</CardContent>
						</Card>
					</Link>

					<Link
						to="/docs/$"
						params={{
							_splat: "fivem-scripts",
						}}
						className="block"
					>
						<Card className="group h-full transition-all hover:shadow-lg">
							<CardHeader className="text-center">
								<div className="bg-primary/10 text-primary mx-auto mb-4 flex size-12 items-center justify-center rounded-lg">
									<Gamepad2 className="size-6" />
								</div>
								<CardTitle>FiveM Scripts</CardTitle>
								<CardDescription>Documentation for FiveM server scripts and resources</CardDescription>
							</CardHeader>
							<CardContent className="flex justify-center">
								<div className="text-primary flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3">
									Explore
									<ArrowRight className="size-4" />
								</div>
							</CardContent>
						</Card>
					</Link>
				</div>

				{/* Social Links */}
				<div className="flex items-center justify-center gap-3 border-t pt-6">
					<Button variant="outline" size="sm" asChild className="gap-2">
						<a href="https://github.com/whitigol/docs" target="_blank" rel="noopener noreferrer">
							<Github className="size-4" />
							GitHub
						</a>
					</Button>
					<Button variant="outline" size="sm" asChild className="gap-2">
						<a href="https://discord.gg/NuPCpBa4Vy" target="_blank" rel="noopener noreferrer">
							<BsDiscord className="size-4" />
							Discord
						</a>
					</Button>
				</div>
			</div>
		</HomeLayout>
	);
}
