/* eslint-disable no-unused-vars */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from "react"
import { useAuth } from "context/AuthContext"
import {  useUserHomework } from 'server-state/Homeworks';
import HomeworkCard from './HomeworkCard';
import { Spinner } from 'shared/components/lib';

function MyHomeworks() {
    const { user } = useAuth()


    const { homeworks, isLoading } = useUserHomework({ userId: user.id })


    


    return (
        <div>
            <h2>My Homeworks</h2>

            <ul css={{ display: 'flex' }}>
                {
                    isLoading
                        ? <Spinner />
                        : homeworks.map(homeWork => {
                            return (
                                <HomeworkCard key={homeWork.id} homeWork={homeWork}/>
                            )
                        }


                        )
                }
            </ul>
        </div>
    )
}

export default MyHomeworks