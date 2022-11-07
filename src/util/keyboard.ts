import { KeyboardEvent } from 'react';

export function isModiferKeyPressed(e: KeyboardEvent): boolean {
	return e.ctrlKey || e.shiftKey || e.altKey || e.metaKey;
}

export function isConfirmed(e: KeyboardEvent): boolean {
	return e.code === 'Space' || e.code === 'Enter';
}
