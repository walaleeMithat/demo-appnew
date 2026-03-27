'use client'

import { useEffect, useRef, useState } from 'react'

interface AuthenModel {
    email: string,
    password: string,
}

interface ResultModalProps {
    data: AuthenModel
    onSave: (data: AuthenModel) => void
    onClose: () => void
}

export default function ResultModal( props: ResultModalProps) {

    const modalRef = useRef<HTMLDivElement | null>(null)
    const modalInstance = useRef<any>(null)

    const [editModel, setEditModel] = useState<AuthenModel>(props.data)
    const [isEditing, setIsEditing] = useState(false)
    const [isVisible, setIsvisible] = useState(true)

    useEffect(() => {
        const init = async () => {
            if (!modalRef.current) return

            const { Modal } = await import('bootstrap')

            modalInstance.current = new Modal(modalRef.current, {
                backdrop: true,
                keyboard: true,
            })

            const handleHidden = () => {
                document.body.classList.remove('modal-open')
                document.body.style.removeProperty('overflow')
                document.body.style.removeProperty('padding-right')

                const backdrops = document.querySelectorAll('.modal-backdrop')
                backdrops.forEach(el => el.remove())

                props.onClose()
            }

            modalRef.current.addEventListener('hidden.bs.modal', handleHidden)
            modalInstance.current.show()
        }

        init()

        return () => {
            const instance = modalInstance.current

            if (instance) {
                const el = modalRef.current

                if (el) {
                    const handleDispose = () => {
                        instance.dispose()
                        modalInstance.current = null

                        document.body.classList.remove('modal-open')
                        document.body.style.removeProperty('overflow')
                        document.body.style.removeProperty('padding-right')
                        document.querySelectorAll('.modal-backdrop').forEach(el => el.remove())
                    }

                    el.addEventListener('hidden.bs.modal', handleDispose, { once: true })
                    instance.hide()
                } else {
                    instance.dispose()
                    modalInstance.current = null
                }
            }
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setEditModel(prev => ({
            ...prev,
            [id.replace('edit-', '')]: value
        }))
    }

    const handleSave = () => {
        props.onSave(editModel)
        setIsEditing(false)
    }


    const onClosed = () => {
        props.onClose()
        setIsEditing(false)
    }
    return (
        <div className="modal fade" tabIndex={-1} ref={modalRef} >
            <div className="modal-dialog">
                <div className="modal-content">
                    display: {isVisible ? 'show' : 'none' }
                    <div className="modal-header">
                        <h5 className="modal-title">Result</h5>
                        <button className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body">
                        {isEditing ? (
                            <>
                                <input
                                    id="edit-email"
                                    className="form-control mb-2"
                                    value={editModel.email}
                                    onChange={handleChange}
                                />
                                <input
                                    id="edit-password"
                                    className="form-control"
                                    value={editModel.password}
                                    onChange={handleChange}
                                />
                            </>
                        ) : (
                            <>
                                <p>Email: {props.data.email}</p>
                                <p>Password: {props.data.password}</p>
                            </>
                        )}
                    </div>

                    <div className="modal-footer">
                        {isEditing ? (
                            <button className="btn btn-primary" onClick={handleSave}>
                                Save
                            </button>
                        ) : (
                            <>
                                <button className="btn btn-warning" onClick={() => setIsEditing(true)}>
                                    Edit
                                </button>
                                <button className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setIsvisible(false)}>
                                    Close
                                </button>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}