import React from 'react'
import { Theme } from '../../types'

interface Props {
	setTheme: React.Dispatch<React.SetStateAction<Theme>>
	theme: Theme
}

export const ThemePane: React.FC<Props> = ({setTheme, theme}) => {
    
	const handleTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTheme(e.target.value as Theme)
	}
	return (
		<div className="absolute top-4 right-[180px] z-50   rounded-lg  px-3 py-1 w-[140px]">
			<form  className="flex flex-col gap-1 bg-white ">
				<select
					id="theme-select"
					name="theme"
					className="text-sm rounded border border-gray-300 p-1"
					onChange={handleTheme}
					defaultValue={theme}
				>
					<option value={Theme.DARK}>Чёрная</option>
					<option value={Theme.LIGHT}>Белая</option>
				</select>
			</form>
		</div>
	)
}
