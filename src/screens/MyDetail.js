/* eslint-disable no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from "react"
import { useAuth } from "context/AuthContext"
import MyStudents from 'components/MyStudents';
import MyHomeworks from 'components/MyHomeworks';
function MyDetail() {
    const { isTeacher, isStudent } = useAuth()

    return (
        <>

            <div>
                {
                    isTeacher ?
                        (

                            <MyStudents />
                        )
                        :
                        isStudent ?
                            (
                                <MyHomeworks />

                            )
                            : <p>Not Found</p>

                }

            </div>
        </>
    )
}

export default MyDetail