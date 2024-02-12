import React from 'react';
import { defineMessages, MessageDescriptor, useIntl } from 'react-intl';

import { HttpError } from '@karuta/rest-client';
import { Role } from '@bezier/werewolf-core';
import { DashboardPlayer, Room } from '@bezier/werewolf-client';

import RoleCard from '../../../common/RoleCard';
import SeatForm from './SeatForm';
import { formatName, formatBackground, formatInstruction } from '../../../util/role';

import './index.scss';

const desc = defineMessages({
	yourRole: { defaultMessage: 'Your Role' },
	seatTaken: { defaultMessage: 'The seat has been taken.' },
	seatInvalid: { defaultMessage: 'Please type a valid seat number.' },
	unknownError: { defaultMessage: 'Unknown Error: {messsage}' },
});

const errorCode = new Map<number, MessageDescriptor>([
	[403, desc.seatInvalid],
	[409, desc.seatTaken],
]);

interface RoleViewerProps {
	room: Room;
}

export default function RoleViewer({ room }: RoleViewerProps): JSX.Element {
	const intl = useIntl();

	const [seat, setSeat] = React.useState(0);
	const [role, setRole] = React.useState(Role.Unknown);
	const [message, setMessage] = React.useState('');

	async function updateProfile(player: DashboardPlayer): Promise<void> {
		try {
			const profile = await player.fetchProfile();
			setSeat(profile.seat);
			setRole(profile.role);
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

	React.useEffect(() => {
		let seat: number | undefined;
		try {
			seat = room.getDashboardSeat();
		} catch (error) {
			return;
		}
		if (seat) {
			const player = room.createPlayer(seat);
			updateProfile(player);
		}
	}, []);

	function handleSubmit(seat: number): void {
		const player = room.createPlayer(seat);
		updateProfile(player);
	}

	const config = room.getConfig();
	const playerNum = config && (config.roles.length - (config.cardNum ?? 3));

	return (
		<section className="role-viewer">
			<h3>{intl.formatMessage(desc.yourRole)}</h3>
			{seat <= 0 ? (
				<>
					<SeatForm
						min={0}
						max={playerNum}
						onSubmit={handleSubmit}
					/>
					{message && (
						<div className="message" role="status">
							{message}
						</div>
					)}
				</>
			) : (
				<RoleCard
					seat={seat}
					icon={Role[role]}
					name={formatName(intl, role)}
					background={formatBackground(intl, role)}
					instruction={formatInstruction(intl, role)}
				/>
			)}
		</section>
	);
}
