const { useClient } = require("context/AuthContext");
const { useQuery, useQueryClient, useMutation } = require("react-query");

function useHomeworks(options = {}) {
    const client = useClient();

    const result = useQuery({
        queryKey: 'homeworks',
        queryFn: () => client('homeworks').then(data => data),

        ...options,
    },

    );

    var homeworkData;
    if (result.status === 'success')
        homeworkData = result?.data;

    return { ...result, homeworks: homeworkData?.homeworks ?? [] }
}

function useUserHomework({ options = {}, userId }) {
    const client = useClient();

    const result = useQuery({
        queryKey: [`userHomeworks`, userId],
        queryFn: () => client(`homeworks/${userId}`).then(data => data),

        ...options,
    },

    );

    var homeworkData;
    if (result.status === 'success')
        homeworkData = result?.data;

    return { ...result, homeworks: homeworkData?.homeworks ?? [] }
}

function useHomeworkCreate(userId) {
    const client = useClient();
    const queryClient = useQueryClient();

    return useMutation(
        data =>
            client(`homeworks`, {
                method: 'POST',
                data: data
            }),

        {
            onMutate(newItem) {
                //console.log(newItem)
            },
            onSettled: () => {
                queryClient.invalidateQueries(`userHomeworks`)
                queryClient.invalidateQueries(`userStudents`)
            }
        }
    )
}

function useHomeworkDelete(userId) {
    const client = useClient();
    const queryClient = useQueryClient();


    return useMutation(
        data =>
            client(`homeworks/${data.id}`, {
                method: 'DELETE',
            }),

        {
            onMutate(newItem) {
                //console.log(newItem)
            },
            onSettled: () => {
                queryClient.invalidateQueries(`userHomeworks`)
                queryClient.invalidateQueries(`userStudents`)
            }
        }
    )
}

function useHomeworkUpdate(userId) {
    const client = useClient();
    const queryClient = useQueryClient();


    return useMutation(
        updates =>
            client(`students/complete-homeworks/${updates.id}/${updates.homeWorkId}`, {
                method: 'PUT',
            }),

        {
            onMutate(newItem) {
                //   console.log(newItem)
            },
            onSettled: () => {
                queryClient.invalidateQueries(`userHomeworks`)
                queryClient.invalidateQueries(`userStudents`)

            }
        }
    )
}


export {
    useHomeworks,
    useUserHomework,
    useHomeworkCreate,
    useHomeworkDelete,
    useHomeworkUpdate

}