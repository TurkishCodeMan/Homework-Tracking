/* eslint-disable no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from "react"
import { FaSmile, FaRegCheckCircle } from 'react-icons/fa';
import { useHomeworkDelete, useUserHomework } from 'server-state/Homeworks';
import { Listbox, ListboxOption } from 'shared/components/Dropdown/Dropdown';

import 'react-calendar/dist/Calendar.css';
import { Spinner } from 'shared/components/lib';

function StudentCard({ student }) {
    const { homeworks, isLoading: isLoadingUserHM } = useUserHomework({ userId: student.id })
    const { mutateAsync: deleteHm, isLoading: isLoadingDeleteHm } = useHomeworkDelete()
    function deleteHomework(value) {
        return deleteHm({ id: value })
    }

    return (

        <li css={{
            listStyleType: 'none',
            background: 'var(--colors-item)',
            margin: '4px',
            color: 'var(--colors-text)',
            padding: '20px',
            borderRadius: '20px'

        }}>
            <div css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <FaSmile size={35} />
                <p>
                    {student.name}
                    <span css={{ margin: '4px' }}>{student.surname}</span>
                </p>
                {
                    isLoadingUserHM || isLoadingDeleteHm ? <Spinner /> : homeworks.length > 0 ?
                        <Listbox onChange={deleteHomework} defaultValue="" arrow={<h2>Click Delete Homework ▼</h2>}>
                            {
                                homeworks.map((homework) => {
                                    return (
                                        <ListboxOption css={{
                                            background: homework.completed ? 'green' : '',
                                        }} key={homework.id} value={homework.id} >
                                            <div css={{ margin: '0px', display: 'flex', justifyContent: 'space-between' }}>
                                                {homework.subject}
                                                {homework.completed ? <FaRegCheckCircle /> : ''}
                                            </div>

                                        </ListboxOption>

                                    )
                                })
                            }
                        </Listbox>
                        : 'This have not homework'
                }


            </div>
        </li>

    )
}

export default StudentCard;
