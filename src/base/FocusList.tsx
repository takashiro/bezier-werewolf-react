import React from 'react';
import { isModiferKeyPressed, muteEvent } from '../util/keyboard';

type Orientation = 'vertical' | 'horizontal';

interface FocusListProps extends React.HTMLAttributes<HTMLElement> {
	component?: React.ElementType;
	orientation?: Orientation;
	childSelector?: string;
}

function moveFocus(e: React.KeyboardEvent<HTMLElement>, selector: string, offset: number): void {
	const list = e.currentTarget.querySelectorAll(selector);
	if (list.length <= 0) {
		return;
	}
	const current = Array.prototype.indexOf.call(list, e.target);
	if (current < 0) {
		return;
	}
	const target = list[current + offset];
	if (target && target instanceof HTMLElement) {
		target.focus();
	}
}

export default function FocusList(props: FocusListProps): JSX.Element {
	const {
		component: Component = 'ul',
		orientation = 'vertical',
		childSelector = 'button',
		onKeyDown,
		...otherProps
	} = props;

	function handleKeyDown(e: React.KeyboardEvent<HTMLElement>): void {
		if (!isModiferKeyPressed(e)) {
			if (e.key === (orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft')) {
				moveFocus(e, childSelector, -1);
				muteEvent(e);
				return;
			}
			if (e.key === (orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight')) {
				moveFocus(e, childSelector, 1);
				muteEvent(e);
				return;
			}
		}
		onKeyDown?.(e);
	}

	return (
		<Component
			onKeyDown={handleKeyDown}
			{...otherProps}
		/>
	);
}
