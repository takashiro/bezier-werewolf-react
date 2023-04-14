import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import Clickable from '../../../base/Clickable';

const desc = defineMessages({
	seatNumber: { defaultMessage: 'Seat Number' },
	viewRole: { defaultMessage: 'View My Role' },
});

interface SeatFormProps {
	min?: number;
	max?: number;
	onSubmit?(seat: number): void;
}

export default function SeatForm({
	min,
	max,
	onSubmit,
}: SeatFormProps): JSX.Element {
	const intl = useIntl();
	const input = React.useRef<HTMLInputElement>(null);

	const handleSubmit = React.useCallback(() => {
		const inputValue = input.current?.value;
		if (!inputValue) {
			return;
		}
		const seat = Number.parseInt(inputValue, 10);
		if (Number.isNaN(seat)) {
			return;
		}
		onSubmit?.(seat);
	}, [input, onSubmit]);

	const label = intl.formatMessage(desc.seatNumber);
	return (
		<div className="seat-form">
			<input
				ref={input}
				type="number"
				min={min}
				max={max}
				placeholder={label}
				aria-label={label}
			/>
			<Clickable
				className="button"
				onTrigger={handleSubmit}
			>
				{intl.formatMessage(desc.viewRole)}
			</Clickable>
		</div>
	);
}
