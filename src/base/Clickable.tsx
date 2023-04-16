import React from 'react';

import * as keyboard from '../util/keyboard';

interface ClickableProps<T extends HTMLElement> extends React.HTMLAttributes<T> {
	component?: React.ElementType;
	disabled?: boolean;
	onTrigger?: (e: React.SyntheticEvent<T>) => void;
}

export default function Clickable<T extends HTMLElement = HTMLDivElement>(props: ClickableProps<T>): JSX.Element {
	const {
		component: Component = 'div',
		role = 'button',
		tabIndex = 0,
		disabled,
		onTrigger,
		onClick,
		onKeyDown,
		...otherProps
	} = props;

	function handleClick(e: React.MouseEvent<T>): void {
		onTrigger?.(e);
		onClick?.(e);
	}

	function handleKeyDown(e: React.KeyboardEvent<T>): void {
		if (onTrigger && keyboard.isConfirmed(e) && !keyboard.isModiferKeyPressed(e)) {
			onTrigger(e);
		}
		onKeyDown?.(e);
	}

	return (
		<Component
			role={role}
			tabIndex={tabIndex}
			onClick={disabled ? undefined : handleClick}
			onKeyDown={disabled ? undefined : handleKeyDown}
			aria-disabled={disabled}
			{...otherProps}
		/>
	);
}
