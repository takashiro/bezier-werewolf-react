import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import Clickable from '../Clickable';

import './index.scss';

const desc = defineMessages({
	increase: { defaultMessage: 'Increase' },
	decrease: { defaultMessage: 'Decrease' },
});

export interface ChangeEvent {
	name?: string;
	value: number;
}

interface NumberInputProps {
	name?: string;
	defaultValue?: number;
	min?: number;
	max?: number;
	onChange?(e: ChangeEvent): void;
	'aria-labelledby'?: string;
}

export default function NumberInput(props: NumberInputProps): JSX.Element {
	const intl = useIntl();
	const {
		name,
		defaultValue,
		min,
		max,
		onChange,
		'aria-labelledby': ariaLabelledBy,
	} = props;

	const input = React.useRef<HTMLInputElement>(null);

	function change(delta: number): void {
		const element = input.current;
		if (!element) {
			return;
		}
		const oldValue = Number.parseInt(element.value, 10) || 0;
		let newValue = oldValue + delta;
		if (min !== undefined && newValue < min) {
			newValue = min;
		}
		if (max !== undefined && newValue > max) {
			newValue = max;
		}
		if (newValue !== oldValue) {
			element.value = String(newValue);
			onChange?.({ name, value: newValue });
		}
	}

	function handleDecrease(): void {
		change(-1);
	}

	function handleIncrease(): void {
		change(1);
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
		const value = Number.parseInt(e.currentTarget.value, 10) || 0;
		onChange?.({ name, value });
	}

	return (
		<div className="number-input">
			<Clickable
				tabIndex={-1}
				className="decrease"
				aria-label={intl.formatMessage(desc.decrease)}
				onTrigger={handleDecrease}
			/>
			<input
				ref={input}
				type="number"
				defaultValue={defaultValue}
				min={min}
				max={max}
				onChange={handleChange}
				aria-labelledby={ariaLabelledBy}
			/>
			<Clickable
				tabIndex={-1}
				className="increase"
				aria-label={intl.formatMessage(desc.increase)}
				onTrigger={handleIncrease}
			/>
		</div>
	);
}
