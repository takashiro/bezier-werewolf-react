import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import Clickable from '../Clickable';

import './index.scss';

const desc = defineMessages({
	increase: { defaultMessage: 'Increase' },
	decrease: { defaultMessage: 'Decrease' },
});

interface NumberInputProps {
	defaultValue?: number;
	min?: number;
	max?: number;
	onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function NumberInput(props: NumberInputProps): JSX.Element {
	const intl = useIntl();
	const {
		defaultValue,
		min,
		max,
		onChange,
	} = props;

	const input = React.useRef<HTMLInputElement>(null);

	const handleIncrease = React.useCallback(() => {
		const num = input.current;
		if (!num) {
			return;
		}
		let value = Number.parseInt(num.value, 10) || 0;
		value++;
		if (max !== undefined && value > max) {
			return;
		}
		num.value = String(value);
	}, [input, max]);

	const handleDecrease = React.useCallback(() => {
		const num = input.current;
		if (!num) {
			return;
		}
		let value = Number.parseInt(num.value, 10) || 0;
		value--;
		if (min !== undefined && value < min) {
			return;
		}
		num.value = String(value);
	}, [input]);

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
				onChange={onChange}
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
