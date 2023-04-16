import BasicLocator, { RoleLocatorOptions } from '../common/BasicLocator';
import Button from '../widget/Button';
import SpinButton from '../widget/SpinButton';

export default class Region extends BasicLocator {
	getHeading(options: RoleLocatorOptions) {
		return this.getByRole('heading', options);
	}

	getButton(options: RoleLocatorOptions) {
		return new Button(this.e.getByRole('button', options));
	}

	getSpinButton(options: RoleLocatorOptions) {
		return new SpinButton(this.e.getByRole('spinbutton', options));
	}

	getRegion(options: RoleLocatorOptions) {
		return new Region(this.e.getByRole('region', options));
	}
}
