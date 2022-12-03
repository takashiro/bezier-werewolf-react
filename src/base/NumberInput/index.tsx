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
	minValue?: number;
	maxValue?: number;
	onChange?(e: React.ChangeEvent<HTMLInputElement>): void;
}

export default function NumberInput(props: NumberInputProps): JSX.Element {
	const intl = useIntl();
	const {
		defaultValue,
		minValue,
		maxValue,
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
		if (maxValue !== undefined && value > maxValue) {
			return;
		}
		num.value = String(value);
	}, [input, maxValue]);

	const handleDecrease = React.useCallback(() => {
		const num = input.current;
		if (!num) {
			return;
		}
		let value = Number.parseInt(num.value, 10) || 0;
		value--;
		if (minValue !== undefined && value < minValue) {
			return;
		}
		num.value = String(value);
	}, [input]);

	return (
		<div className="number-input">
			<Clickable
				className="decrease"
				aria-label={intl.formatMessage(desc.decrease)}
				onTrigger={handleDecrease}
			/>
			<input
				ref={input}
				type="number"
				defaultValue={defaultValue}
				onChange={onChange}
			/>
			<Clickable
				className="increase"
				aria-label={intl.formatMessage(desc.increase)}
				onTrigger={handleIncrease}
			/>
		</div>
	);
}
