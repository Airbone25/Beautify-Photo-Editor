
export default function SidebarItem({name,active,handleClick}){
    return(
        <button className={`item ${active ? "active": ""}`} onClick={handleClick}>{name}</button>
    )
}