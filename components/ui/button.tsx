import type { ComponentProps } from "react";
import type { Icon } from "@phosphor-icons/react";

import Styles from "@/styles/modules/button.module.css";

interface ButtonProps extends ComponentProps<"button"> {
	variant?: "primary" | "secondary" | "tertiary" | "danger";
	size?: "small" | "medium" | "large" | "responsive";
	title: string;
	icon?: Icon;
}

const Button = ({
	variant = "primary",
	size = "medium",
	title,
	icon: Icon,
	...props
}: ButtonProps) => {
	const className = `${Styles.button} ${Styles[variant]} ${Styles[size]}`;

	return (
		<button type={"button"} className={className} {...props}>
			{title}
			{Icon && (
				<span className={Styles.icon}>
					<Icon size={24} weight="bold" />
				</span>
			)}
		</button>
	);
};

Button.displayName = "Button";

export { Button };
