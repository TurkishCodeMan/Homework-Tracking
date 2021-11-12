import * as React from 'react'
import { QueryClient, QueryClientProvider as RQProviders } from 'react-query'


const useConstant = fn => React.useState(fn)[0]; //Durumu asla güncelleme
//Güvenli bir yol lazy useState


function QueryClientProvider({ children }) {
    //Bunun asla tekrar oluşturulmaması gerekiyor bu yüzden burada useState vs olmamalı

    const queryClient = useConstant(() => {
        const client = new QueryClient({
            defaultOptions: {
                queries: {
                    useErrorBoundary: true,
                    refetchOnWindowFocus: false,
                    retry(failureCount, error) {
                        if (error.status === 404) return false
                        else if (failureCount < 2) return true
                        else return false
                    },
                },
                mutations: {
                    onError: (err, variables, recover) =>
                        typeof recover === 'function' ? recover() : null,
                }
            }
        });
        window.__devtools?.setQueryClient(client);
        return client;
    });

    return (
        <RQProviders client={queryClient}>
            {children}
        </RQProviders>
    )
}

export { QueryClientProvider }
