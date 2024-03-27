import { ComponentProps } from "react"

const Sidebar = ({children}: ComponentProps<'aside'>) => {
  return (
    <aside className="h-screen" >
        <div className="h-full flex flex-col bg-white border-r shadow-sm" >
            <div className="p-4 pb-2 flex justify-between items-center" >
                <button className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100" >hi</button>
            </div>
            <ul className="flex-1 px-3" >
                {children}
            </ul>
        </div>

    </aside>
  )
}

export default Sidebar
