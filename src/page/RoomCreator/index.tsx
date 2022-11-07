import React from 'react';
import RoleButton from '../../common/RoleButton';

import './index.scss';

export default function RoomCreator(): JSX.Element {
	return (
		<div className="room-creator">
			<RoleButton
				icon="Unknown"
				name="Unknown"
			/>
		</div>
	);
}
