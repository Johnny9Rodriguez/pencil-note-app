import React, { Fragment } from 'react'
import { DeleteAccountModal } from './DeleteAccountModal'
import { useSelector } from 'react-redux'
import { modalTypes } from '../slices/modalSlice'

export const Modals = () => {
    const modalType = useSelector((state) => state.modal.modalType);

    return (
        <Fragment>
            {modalType === modalTypes.DelAcc && (
                <div
                    id='delete-account-modal'
                    className='absolute w-full h-full bg-black bg-opacity-50'
                >
                    <DeleteAccountModal />
                </div>
            )}
        </Fragment>
    )
}
