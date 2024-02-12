import React from 'react';
import { MessageDescriptor, defineMessages, useIntl } from 'react-intl';
import { HttpError } from '@karuta/rest-client';
import { DashboardPlayer, Room } from '@bezier/werewolf-client';

import Clickable from '../../../base/Clickable';

import './index.scss';

const desc = defineMessages({
	chooseYourRole: { defaultMessage: 'Choose Your Role' },
	seatNumber: { defaultMessage: 'Seat Number' },
	viewRole: { defaultMessage: 'View My Role' },
	seatTaken: { defaultMessage: 'The seat has been taken.' },
	seatInvalid: { defaultMessage: 'Please type a valid seat number.' },
	unknownError: { defaultMessage: 'Unknown Error: {messsage}' },
});

const errorCode = new Map<number, MessageDescriptor>([
	[403, desc.seatInvalid],
	[409, desc.seatTaken],
]);

interface SeatFormProps {
	room: Room;
	onSelect?(player: DashboardPlayer): void;
}

export default function SeatForm({
	room,
	onSelect,
}: SeatFormProps): JSX.Element {
	const intl = useIntl();
	const input = React.useRef<HTMLInputElement>(null);
	const config = room.getConfig();
	const playerNum = config && (config.roles.length - (config.cardNum ?? 3));
	const [message, setMessage] = React.useState('');

	async function takeSeat(player: DashboardPlayer): Promise<void> {
		try {
			await player.fetchProfile();
			onSelect?.(player);
		} catch (error) {
			if (error instanceof HttpError) {
				const localeError = errorCode.get(error.status);
				if (localeError) {
					setMessage(intl.formatMessage(localeError));
				} else {
					setMessage(intl.formatMessage(desc.unknownError, { message: error.message }));
				}
			} else {
				setMessage(intl.formatMessage(desc.unknownError, { message: String(error) }));
			}
		}
	}

	function handleSubmit(): void {
		const inputValue = input.current?.value;
		if (!inputValue) {
			return;
		}
		const seat = Number.parseInt(inputValue, 10);
		if (Number.isNaN(seat)) {
			return;
		}
		const player = room.createPlayer(seat);
		takeSeat(player);
	}

	const label = intl.formatMessage(desc.seatNumber);
	return (
		<section className="seat-form">
			<h3>{intl.formatMessage(desc.chooseYourRole)}</h3>
			<input
				ref={input}
				type="number"
				min={0}
				max={playerNum}
				placeholder={label}
				aria-label={label}
			/>
			<Clickable
				className="button"
				onTrigger={handleSubmit}
			>
				{intl.formatMessage(desc.viewRole)}
			</Clickable>
			{message && (
				<div className="message" role="status">
					{message}
				</div>
			)}
		</section>
	);
}
