'use client'

import { useState } from 'react'
import ResultModal from './ResultModal'

interface AuthenModel {
    email: string,
    password: string,
}

export default function BlogPage() {

    const [authModel, setAuthModel] = useState<AuthenModel>({
        email: '',
        password: ''
    })

    const [openModal, setOpenModal] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target

        setAuthModel(prev => ({
            ...prev,
            [id]: value
        }))
    }

    const handleLogin = () => {
        if (!authModel.email || !authModel.password) return

        setOpenModal(true)
    }


    const handleSaveFromChild = (data: AuthenModel) => {
        setAuthModel(data)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }
    return (
        <div>
            <label>Email:</label>
            <input
                id="email"
                type="text"
                value={authModel.email}
                onChange={(e) => handleInputChange(e)}
                style={{
                    border: '1px solid #ccc',
                    padding: '8px',
                    borderRadius: '6px',
                    marginBottom: '10px'
                }}
            />

            <label>Password:</label>
            <input
                id="password"
                type="password"
                value={authModel.password}
                onChange={(e) => handleInputChange(e)}
                style={{
                    border: '1px solid #ccc',
                    padding: '8px',
                    borderRadius: '6px',
                    marginBottom: '10px'
                }}
            />

            <input
                type="button"
                value="Login"
                onClick={handleLogin}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: '1px solid #0056b3',
                    borderRadius: '6px',
                    cursor: 'pointer'
                }}
            />

            {openModal && (
                <ResultModal
                    data={authModel}
                    onSave={handleSaveFromChild}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    )
}