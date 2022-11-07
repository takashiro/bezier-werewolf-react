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

	const handleClick = React.useCallback((e: React.MouseEvent<T>) => {
		onTrigger?.(e);
		onClick?.(e);
	}, [onTrigger, onClick]);

	const handleKeyDown = React.useCallback((e: React.KeyboardEvent<T>) => {
		if (onTrigger && keyboard.isConfirmed(e) && !keyboard.isModiferKeyPressed(e)) {
			onTrigger(e);
		}
		onKeyDown?.(e);
	}, [onTrigger, onKeyDown]);

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
