import { Dialog as HUIDialog } from '@headlessui/react';
import React, { ReactNode } from 'react';

interface DialogProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode | ReactNode[];
}

const Dialog = ({ isOpen, onClose, children }: DialogProps) => (
	<HUIDialog
		open={isOpen}
		onClose={onClose}
		className="fixed z-10 inset-0 overflow-y-auto"
	>
		<HUIDialog.Overlay className="fixed inset-0 bg-black opacity-50" />
		<div className="fixed inset-0 flex items-center justify-center p-4">
			<HUIDialog.Panel className="bg-neutral-800 rounded-lg">
				<div className="py-8 px-4 sm:px-6 lg:px-8 max-h-[90vh] overflow-auto">
					{children}
				</div>

				<div className="bg-neutral-700 sm:flex sm:flex-row-reverse rounded-b-lg">
					<button type="button" className="px-4 sm:px-6 py-3" onClick={onClose}>
						Close
					</button>
				</div>
			</HUIDialog.Panel>
		</div>
	</HUIDialog>
);

export default Dialog;
