import OrnamentLeft from '@images/ornament-left.svg'
import OrnamentTopLeft from '@images/ornament-top-left.svg'
import OrnamentTopRight from '@images/ornament-top-right.svg'

const classNames = {
  bottomLeft: 'left-0 top-[1px]',
  topRight: 'right-0 bottom-[1px]',
  topLeft: 'left-0 bottom-[1px]',
}

const RacingLine = ({ position = 'bottomLeft', className = '' }) => {
  return (
    <div className={`relative h-[2px] w-full bg-yellow ${className}`}>
      <div className={`absolute ${classNames[position]}`}>
        {position === 'bottomLeft' && <OrnamentLeft />}
        {position === 'topLeft' && <OrnamentTopLeft />}
        {position === 'topRight' && <OrnamentTopRight />}
      </div>
    </div>
  )
}

export default RacingLine
