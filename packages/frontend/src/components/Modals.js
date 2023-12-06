import React, { Fragment } from 'react'
import { DeleteAccountModal } from './DeleteAccountModal'
import { ContactModal } from './ContactModal'
import { useSelector } from 'react-redux'
import { modalTypes } from '../slices/modalSlice'

export const Modals = () => {
    const modalType = useSelector((state) => state.modal.modalType);

    return (
        <Fragment>
            {modalType === modalTypes.DelAcc && (
                <div
                    id='delete-account-modal'
                    className='absolute z-50 w-full h-full bg-black bg-opacity-70'
                >
                    <DeleteAccountModal />
                </div>
            )}
            {modalType === modalTypes.Contact && (
                <div
                    id='delete-account-modal'
                    className='absolute z-50 w-full h-full bg-black bg-opacity-70'
                >
                    <ContactModal />
                </div>
            )}
        </Fragment>
    )
}
