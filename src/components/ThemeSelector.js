import { useTheme } from '../hooks/useTheme';
import './ThemeSelector.css'
import modeIcon from '../assets/brightness_6.svg'

const themeColors = ['#58249c', '#249c6b', '#b70233']

const ThemeSelector = () => {
    const { changeColor,changeMode,mode } = useTheme()
    const toggleMode = ()=>{
        changeMode(mode === 'dark' ? 'light' : 'dark')
    }
    return (
        <div className='theme-selector'>
            <div className="mode-toggle">
                <img 
                onClick={toggleMode}
                src={modeIcon} 
                alt="mode-svg" 
                style={{filter: mode==='dark' ? 'invert(100%)' : 'invert(15%)'}}
                />
            </div>
            <div className="theme-buttons">
                {themeColors.map(color => (
                    <div 
                    key={color}
                    onClick={()=>changeColor(color)}
                    style={{background:color}}
                    >
                    </div>))}
            </div>
        </div>
    );
}

export default ThemeSelector;