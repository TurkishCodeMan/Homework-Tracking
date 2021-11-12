/* eslint-disable no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from "react"
import { FaChalkboardTeacher } from 'react-icons/fa';
import { useUserStudent } from 'server-state/Teachers';
import { Listbox, ListboxOption } from 'shared/components/Dropdown/Dropdown';
import { Spinner } from 'shared/components/lib';


function TeacherCard({ teacher }) {
    const { students, isLoading: isLoadingUserHM } = useUserStudent({ userId: teacher.id })
    return (
        <li css={{
            listStyleType: 'none',
            background: 'var(--colors-item)',
            margin: '4px',
            color: 'var(--colors-text)',
            padding: '20px',
            borderRadius: '20px'

        }}
            key={teacher.id}>
            <div css={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <FaChalkboardTeacher size={35} />
                <p>
                    {teacher.name}
                    <span css={{ margin: '4px' }}>{teacher.surname}</span>
                </p>

                {
                    isLoadingUserHM
                        ? <Spinner />
                        : students?.length > 0 ?
                            <Listbox arrow={<h2>Students ▼</h2>}>
                                {
                                    students.map((student) => {
                                        return (
                                            <ListboxOption key={student.id} value={student.id}>
                                                {student.name}
                                            </ListboxOption>

                                        )
                                    })
                                }
                            </Listbox>
                            : 'This teacher does not have a student'
                }
            </div>
        </li>
    )
}

export default TeacherCard