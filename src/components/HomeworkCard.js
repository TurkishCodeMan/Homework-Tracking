/* eslint-disable no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useAuth } from 'context/AuthContext';
import React from "react"
import { useHomeworkUpdate } from 'server-state/Homeworks';
import { CardCheckbox, Spinner } from 'shared/components/lib';

function HomeworkCard({ homeWork }) {
    const { user } = useAuth()

    const { mutateAsync: updateCompleted, isLoading: isLoadingCompleted } = useHomeworkUpdate(user.id)
    async function handleChange() {

        await updateCompleted({ id: user.id, homeWorkId: homeWork.id })
    }
    return (
        <div
            css={{
                listStyle: 'none',
                background: 'var(--colors-item)',
                borderRadius: '20px',
                padding: '15px',
                margin: '2px 25px'
            }}
        >
            <p>Subject: {homeWork.subject}</p>
            <p css={{ marginBottom: '15px' }}>
                DeadLine: {(new Date(homeWork.deadLine).toDateString())}
            </p>

            <label css={{ display: 'flex', justifyContent: 'space-around' }} htmlFor={'completed'}>
                <div >Completed </div>
                {
                    isLoadingCompleted
                        ? <Spinner />
                        : <CardCheckbox key={homeWork.id} checked={homeWork.completed} onChange={() => handleChange()} id={homeWork.id} />

                }
            </label>


        </div>
    )
}

export default HomeworkCard