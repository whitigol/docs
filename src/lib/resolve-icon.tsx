import React from "react";
import * as Bs from "react-icons/bs";
import * as Fa from "react-icons/fa";
import * as Md from "react-icons/md";
import * as Io from "react-icons/io5";
import * as Si from "react-icons/si";
import * as lucideStatic from "lucide-static";

/**
 * Resolve an icon name (e.g. "MdOutlineWavingHand", "Download") to a React element.
 * Used on the server in source.ts so serializePageTree can render icons to HTML.
 */
export function resolveIcon(iconName: string): React.ReactNode {
	if (iconName.startsWith("Bs")) {
		const Component = Bs[iconName as keyof typeof Bs];
		if (Component) return React.createElement(Component, { className: "h-4 w-4" });
	}
	if (iconName.startsWith("Fa")) {
		const Component = Fa[iconName as keyof typeof Fa];
		if (Component) return React.createElement(Component, { className: "h-4 w-4" });
	}
	if (iconName.startsWith("Md")) {
		const Component = Md[iconName as keyof typeof Md];
		if (Component) return React.createElement(Component, { className: "h-4 w-4" });
	}
	if (iconName.startsWith("Io")) {
		const Component = Io[iconName as keyof typeof Io];
		if (Component) return React.createElement(Component, { className: "h-4 w-4" });
	}
	if (iconName.startsWith("Si")) {
		const Component = Si[iconName as keyof typeof Si];
		if (Component) return React.createElement(Component, { className: "h-4 w-4" });
	}
	if (iconName in lucideStatic) {
		const svg = (lucideStatic as Record<string, string>)[iconName];
		if (svg)
			return React.createElement("span", {
				className: "inline-block h-4 w-4 [&_svg]:size-4",
				dangerouslySetInnerHTML: { __html: svg },
			});
	}
	return React.createElement("span", {
		dangerouslySetInnerHTML: { __html: iconName },
	});
}
