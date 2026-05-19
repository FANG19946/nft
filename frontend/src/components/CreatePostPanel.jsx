// src/components/CreatePostPanel.jsx

import React, { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

const fonts = [
    'Permanent Marker',
    'Rubik Spray Paint',
    'Rock Salt',
    'Sedgwick Ave',
    'Caveat',
]

export default function CreatePostPanel({
    open,
    onClose,
    fetchPosts,
}) {

    const [text, setText] = useState('')
    const [color, setColor] = useState('#ff0000')
    const [font, setFont] = useState('Permanent Marker')
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const presetColors = [
        '#ff0000',
        '#00ffff',
        '#39ff14',
        '#ff00ff',
        '#ffe600',
    ]

    async function handleSubmit(e) {

        e.preventDefault()

        if (!text.trim()) return

        const postData = {

            text,
            color,
            font,

            position: [
                Math.random() * 8 - 4,
                Math.random() * 4 - 2,
                0.2,
            ],

            rotation: (Math.random() - 0.5) * 0.3,
        }

        try {

            await fetch('http://localhost:5000/api/posts', {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(postData),
            })

            await fetchPosts()

            setText('')

            onClose()

        } catch (err) {

            console.error(err)
        }
    }

    return (
        <AnimatePresence>

            {open && (

                <motion.div
                    initial={{
                        opacity: 0,
                        x: 300,
                    }}

                    animate={{
                        opacity: 1,
                        x: 0,
                    }}

                    exit={{
                        opacity: 0,
                        x: 300,
                    }}

                    transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                    }}

                    className="
                        fixed
                        top-1/2
                        right-6
                        -translate-y-1/2

                        z-50

                        w-[320px]

                        bg-black/70
                        backdrop-blur-xl

                        border
                        border-white/10

                        rounded-3xl

                        p-5

                        shadow-2xl
                    "
                >

                    <div className="flex items-center justify-between mb-4">

                        <h2
                            className="
                                text-white
                                text-xl
                                font-bold
                            "
                        >
                            New Graffiti
                        </h2>

                        <button
                            onClick={onClose}
                            className="
                                text-white/60
                                hover:text-white
                                transition-colors
                            "
                        >
                            ✕
                        </button>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                    >

                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}

                            placeholder="Write something..."

                            className="
                                w-full
                                h-32

                                resize-none

                                rounded-2xl

                                bg-white/5
                                border
                                border-white/10

                                p-4

                                text-white
                                placeholder:text-white/30

                                outline-none
                            "
                        />

                        <div className="flex flex-col gap-3">

                            <label className="text-white text-sm">
                                Color
                            </label>

                            <div className="flex items-center gap-3">

                                {presetColors.map((preset) => (

                                    <button
                                        key={preset}

                                        type="button"

                                        onClick={() => setColor(preset)}

                                        className={`
                    w-10
                    h-10

                    rounded-full

                    border-2

                    transition-all

                    ${color === preset
                                                ? 'border-white scale-110'
                                                : 'border-transparent hover:scale-105'
                                            }
                `}

                                        style={{
                                            backgroundColor: preset,
                                        }}
                                    />

                                ))}

                                {/* CUSTOM COLOR */}

                                <label
                                    className="
                relative

                w-10
                h-10

                rounded-full

                overflow-hidden

                border
                border-white/20

                cursor-pointer
            "
                                >

                                    <div
                                        className="
                    absolute
                    inset-0

                    flex
                    items-center
                    justify-center

                    text-white
                    text-xs
                    font-bold

                    bg-linear-to-br
                    from-red-500
                    via-green-500
                    to-blue-500
                "
                                    >
                                        +
                                    </div>

                                    <input
                                        type="color"

                                        value={color}

                                        onChange={(e) =>
                                            setColor(e.target.value)
                                        }

                                        className="
                    absolute
                    inset-0

                    opacity-0

                    cursor-pointer
                "
                                    />

                                </label>

                            </div>

                        </div>

                        <div className="relative">

                            <label className="text-white text-sm mb-2 block">
                                Font
                            </label>

                            <button
                                type="button"

                                onClick={() =>
                                    setDropdownOpen(!dropdownOpen)
                                }

                                style={{
                                    fontFamily: font,
                                }}

                                className="
                                    w-full

                                    flex
                                    items-center
                                    justify-between

                                    rounded-2xl

                                    bg-white/5
                                    border
                                    border-white/10

                                    px-4
                                    py-3

                                    text-white

                                    hover:bg-white/10

                                    transition-all
                                ">

                                <span>
                                    {font}
                                </span>

                                <span className="text-white/40">
                                    ▼
                                </span>
                            </button>

                            <AnimatePresence>

                                {dropdownOpen && (

                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: -10,
                                        }}

                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}

                                        exit={{
                                            opacity: 0,
                                            y: -10,
                                        }}

                                        className="
                                            absolute
                                            top-full
                                            left-0

                                            mt-2

                                            w-full

                                            overflow-hidden

                                            rounded-2xl

                                            bg-black/95
                                            backdrop-blur-xl

                                            border
                                            border-white/10

                                            shadow-2xl

                                            z-50
                                        "
                                    >

                                        {fonts.map((f) => (

                                            <button
                                                key={f}

                                                type="button"

                                                onClick={() => {

                                                    setFont(f)

                                                    setDropdownOpen(false)
                                                }}

                                                style={{
                                                    fontFamily: f,
                                                }}

                                                className="
                                                    w-full

                                                    text-left

                                                    px-4
                                                    py-3

                                                    text-white

                                                    hover:bg-white/10

                                                    transition-colors
                                                "
                                            >
                                                {f}
                                            </button>

                                        ))}

                                    </motion.div>

                                )}

                            </AnimatePresence>

                        </div>

                        <button
                            type="submit"

                            className="
                                w-full

                                py-3

                                rounded-2xl

                                bg-white
                                text-black

                                font-bold

                                hover:scale-[1.02]
                                active:scale-[0.98]

                                transition-all
                            "
                        >
                            Spray
                        </button>

                    </form>

                </motion.div>

            )}

        </AnimatePresence>
    )
}