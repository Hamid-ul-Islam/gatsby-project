const bgClassnames = {
  orange:
    'bg-gradient-orange border border-[#F4B285] border-2 hover:bg-gradient-orangeDark hover:border-[#F7C6A5] hover:shadow-[0_0_16px_rgba(251,86,0,0.6)]',
  darkBlue:
    'bg-dark-blue border-[#8FD7FF] border border-2 hover:border-transparent hover:shadow-[0_0_16px_rgba(251,86,0,0.6)]',
}
const Button = ({
  className,
  icon,
  text = '',
  bgColor = 'orange',
  onClick = () => {},
  id,
  ...otherProps
}) => {
  return (
    <button
      className={`${className} whitespace-wrap flex min-h-[56px] items-center justify-center rounded-[12px] px-[26px] py-2 font-tacticSansExt text-sm uppercase tracking-[.08em] text-white md:whitespace-nowrap md:text-lg ${bgClassnames[bgColor]} `}
      role="button"
      onClick={onClick}
      id={id}
      {...otherProps}
    >
      {icon && <div className="mr-[14px]">{icon}</div>}
      {text}
    </button>
  )
}

export default Button
