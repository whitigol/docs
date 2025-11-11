import defaultMdxComponents from "fumadocs-ui/mdx";
import { icons } from "lucide-react";
import * as Bs from "react-icons/bs";
import * as Fa from "react-icons/fa";
import * as Io from "react-icons/io5";
import * as Md from "react-icons/md";
import * as Si from "react-icons/si";
import { Button } from "@/components/ui/button";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import * as AccordionComponents from "fumadocs-ui/components/accordion";
import * as CalloutComponents from "fumadocs-ui/components/callout";
import { Link } from "@tanstack/react-router";
import { WLauncherDownloadButton } from "./wlauncher-download-button";

export default function getMDXComponents() {
	return {
		...defaultMdxComponents,
		...TabsComponents,
		...AccordionComponents,
		...CalloutComponents,
		Lucide: icons,
		Bs,
		Fa,
		Md,
		Io,
		Si,
		Button,
		Link,
		WLauncherDownloadButton,
	};
}
