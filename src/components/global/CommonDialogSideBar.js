"use client";
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild, } from "@headlessui/react";
import Menu from "./Menu";

/**
 * CommonDialog Component
 *
 * A reusable dialog component built with Headless UI's Dialog.
 * It provides a standardized modal/sidebar-like dialog with a backdrop
 * and a close button. The content inside the dialog is passed as children.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isOpen - Controls the visibility of the dialog.
 * @param {function} props.onClose - Function to call when the dialog should be closed (e.g., on backdrop click or close button click).
 * @param {React.ReactNode} props.children - The content to be rendered inside the dialog panel.
 */
export default function CommonDialogSideBar({ isOpen, onClose, children, setSidebarOpen, HeaderNavigationData, localUrl }) {    


    return (
        // The main Dialog component from Headless UI.
        // 'open' prop controls visibility, 'onClose' is called when dialog should close.
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            {/* DialogBackdrop creates the overlay behind the dialog. */}
            {/* 'transition' enables Headless UI's transition features. */}
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
            />

            {/* Container for the dialog panel. 'justify-start' positions it on the left. */}
            <div className="fixed inset-0 flex justify-start">
                {/* DialogPanel is the actual dialog content container. */}
                {/* 'transition' and 'transform' classes enable slide-in/out animation from the left. */}
                <DialogPanel
                    transition
                    className="relative mr-16 flex w-full max-w-sm flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                >
                    {/* TransitionChild wraps the close button to apply a fade-in/out transition. */}
                    <TransitionChild>
                        {/* Container for the close button. Positions it outside the panel to the right. */}
                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                            <button
                                type="button"
                                onClick={onClose} // Calls the onClose prop to close the dialog
                                className="-m-2.5 p-2.5 bg-white rounded-full cursor-pointer"
                            >
                                <span className="sr-only">Close sidebar</span>
                                {/* <XMarkIcon aria-hidden="true" className="size-6 text-black" /> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-6 text-black" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                </svg>
                            </button>
                        </div>
                    </TransitionChild>

                    {/* This div contains the actual content of the dialog, passed via 'children' prop. */}
                    {/* It sets up flex column layout with some padding and enables vertical scrolling. */}
                    <div className="flex grow flex-col gap-y-2 overflow-y-auto bg-white py-6">
                       
                        {/* Menu component inside the dialog */}
                        <div className="px-6">
                            <Menu
                                HeaderNavigationData={HeaderNavigationData}
                                title="Explore News"
                                onClose={setSidebarOpen} // Pass onClose to Menu if it needs to close the dialog
                                localUrl={localUrl}
                            />
                        </div>
                        {children}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}