import React, { useEffect, useState } from 'react'

import GraffitiDecal from './GraffitiDecal'
// import { fakePosts } from '../../data/fakePosts'

export default function GraffitiLayer({ wallMesh, posts }) {

    const [ready, setReady] = useState(false)

    useEffect(() => {

        if (!wallMesh.current) return

        // wait one render frame so matrixWorld updates properly
        requestAnimationFrame(() => {

            wallMesh.current.updateMatrixWorld(true)

            setReady(true)
        })

    }, [wallMesh])

    if (!ready) return null

    return (
        <>
            {posts.map((post) => (
                <GraffitiDecal
                    key={post.id}
                    wallMesh={wallMesh.current}
                    {...post}
                />
            ))}
        </>
    )
}