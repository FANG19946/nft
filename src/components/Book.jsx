import React, { useEffect, useState } from 'react'
import { pageAtom, pages } from './UI'
import Page from './Page'
import { useTexture } from '@react-three/drei'
import { useAtom, useSetAtom } from 'jotai'
import { cameraPositionAtom } from '../lib/atoms'


//This part was causing the could not find errors
pages.forEach((page) => {
    useTexture.preload(`/textures/${page.front}.jpg`);
    useTexture.preload(`/textures/${page.back}.jpg`);

})


export default function Book({ ...props }) {
    const [page, setPage] = useAtom(pageAtom);
    const [delayedPage, setDelayedPage] = useState(page);
    


    useEffect(() => {
        let timeout;
        const goToPage = () => {
            setDelayedPage((delayedPage) => {
                if (page === delayedPage)
                    return delayedPage;
                else {
                    timeout = setTimeout(
                        () => {
                            goToPage();

                        },
                        Math.abs(page - delayedPage) > 2 ? 50 : 150
                    );
                    if (page > delayedPage) {
                        return delayedPage + 1
                    }

                    if (page < delayedPage) {
                        return delayedPage - 1
                    }
                }
            })
            
        }
        goToPage();
        return () => {
            clearTimeout(timeout)
        }
    }, [page])
    return (
        <group {...props} rotation-y={-Math.PI / 2}>
            {
                [...pages].map((pageData, index) =>
                (<Page
                    key={index}
                    number={index}
                    {...pageData}
                    page={delayedPage}
                    opened={delayedPage > index}
                    bookClosed={delayedPage === 0 || delayedPage === pages.length} />)
                )
            }
        </group>
    )
}

